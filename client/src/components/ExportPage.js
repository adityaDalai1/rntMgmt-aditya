// src/components/ExportPage.js
import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Button, Box, CircularProgress } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TableViewIcon from '@mui/icons-material/TableView';
import DownloadIcon from '@mui/icons-material/Download';
import DescriptionIcon from '@mui/icons-material/Description';
import axios from 'axios';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const ExportPage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/rooms') // Make sure this is the correct endpoint for your rooms data
      .then(res => {
        setRooms(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching rooms:', err);
        setLoading(false);
      });
  }, []);

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Add title and date
    doc.setFontSize(16);
    doc.text('Rooms List', 14, 15);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 25);

    // Create table data
    const tableColumn = ["Room Number", "Max Occupancy", "Phone Number", "Rent per Day", "Type", "Description", "Location", "Availability", "Issued Date"];
    const tableRows = rooms.map(room => [
      room.number,
      room.maxcount,
      room.phonenumber,
      room.rentperday,
      room.type,
      room.description,
      room.location,
      room.availability ? 'Available' : 'Not Available',
      new Date(room.roomIssuedDate).toLocaleDateString()
    ]);

    doc.autoTable({
      startY: 30,
      head: [tableColumn],
      body: tableRows,
      theme: 'grid',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 }
    });

    doc.save('rooms-list.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rooms.map(room => ({
      "Room Number": room.number,
      "Max Occupancy": room.maxcount,
      "Phone Number": room.phonenumber,
      "Rent per Day": room.rentperday,
      "Type": room.type,
      "Description": room.description,
      "Location": room.location,
      "Availability": room.availability ? 'Available' : 'Not Available',
      "Issued Date": new Date(room.roomIssuedDate).toLocaleDateString()
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Rooms");
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, 'rooms-list.xlsx');
  };

  const exportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(rooms.map(room => ({
      "Room Number": room.number,
      "Max Occupancy": room.maxcount,
      "Phone Number": room.phonenumber,
      "Rent per Day": room.rentperday,
      "Type": room.type,
      "Description": room.description,
      "Location": room.location,
      "Availability": room.availability ? 'Available' : 'Not Available',
      "Issued Date": new Date(room.roomIssuedDate).toLocaleDateString()
    })));

    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const data = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    saveAs(data, 'rooms-list.csv');
  };

  const exportToText = () => {
    let content = 'ROOMS LIST\n\n';
    content += `Generated on: ${new Date().toLocaleDateString()}\n\n`;

    rooms.forEach((room, index) => {
      content += `${index + 1}. ROOM DETAILS\n`;
      content += `Room Number: ${room.number}\n`;
      content += `Max Occupancy: ${room.maxcount}\n`;
      content += `Phone Number: ${room.phonenumber}\n`;
      content += `Rent per Day: ₹${room.rentperday}\n`;
      content += `Type: ${room.type}\n`;
      content += `Description: ${room.description || 'N/A'}\n`;
      content += `Location: ${room.location}\n`;
      content += `Availability: ${room.availability ? 'Available' : 'Not Available'}\n`;
      content += `Issued Date: ${new Date(room.roomIssuedDate).toLocaleDateString()}\n`;
      content += '\n----------------------------\n\n';
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'rooms-list.txt');
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center" color="primary">
          Export Rooms
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 4 }} align="center" color="text.secondary">
          Export your room details in different formats
        </Typography>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, 
          gap: 3,
          mt: 4 
        }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<PictureAsPdfIcon />}
            onClick={exportToPDF}
            sx={{ p: 2 }}
          >
            Export as PDF
          </Button>

          <Button
            variant="contained"
            size="large"
            startIcon={<TableViewIcon />}
            onClick={exportToCSV}
            sx={{ p: 2 }}
          >
            Export as CSV
          </Button>

          <Button
            variant="contained"
            size="large"
            startIcon={<DownloadIcon />}
            onClick={exportToExcel}
            sx={{ p: 2 }}
          >
            Export as Excel
          </Button>

          <Button
            variant="contained"
            size="large"
            startIcon={<DescriptionIcon />}
            onClick={exportToText}
            sx={{ p: 2 }}
          >
            Export as Text
          </Button>
        </Box>

        <Typography variant="body2" sx={{ mt: 4 }} align="center" color="text.secondary">
          Total Rooms: {rooms.length}
        </Typography>
      </Paper>
    </Container>
  );
};

export default ExportPage;
