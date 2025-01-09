// src/components/QRCodePage.js
import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Box
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import axios from 'axios';

const QRCodePage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = 'https://rntmgmt-aditya.onrender.com/api/rooms/';

  useEffect(() => {
    axios.get('https://rntmgmt-aditya.onrender.com/api/rooms')
      .then(res => {
        setRooms(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching rooms:', err);
        setLoading(false);
      });
  }, []);

  const downloadQR = (roomId, buildingName) => {
    const canvas = document.createElement("canvas");
    const svg = document.getElementById(`qr-${roomId}`);
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);

    const img = new Image();
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const a = document.createElement('a');
      a.download = `QR-${buildingName.replace(/\s+/g, '-')}.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
    };
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
        Room QR Codes
      </Typography>
      <Typography variant="body1" gutterBottom align="center" sx={{ mb: 4 }}>
        Scan QR codes to quickly access room details
      </Typography>

      <Grid container spacing={3}>
        {rooms.map((room) => (
          <Grid item xs={12} sm={6} md={4} key={room._id}>
            <Card sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 2
            }}>
              <CardContent sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                width: '100%'
              }}>
                <QRCodeSVG
                  id={`qr-${room._id}`}
                  value={`${baseUrl}${room._id}`}
                  size={200}
                  level="H"
                  includeMargin
                />
                <Typography 
                  variant="h6" 
                  component="div" 
                  align="center" 
                  sx={{ mt: 2, mb: 1 }}
                >
                  Room {room.room_number}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  align="center" 
                >
                  Floor: {room.floor_number}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  align="center" 
                  sx={{ mb: 2 }}
                >
                  Building: {room.building_name}
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={() => downloadQR(room._id, room.building_name)}
                  size="small"
                >
                  Download QR
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default QRCodePage;
