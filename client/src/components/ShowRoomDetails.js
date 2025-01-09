import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Button,
  Card,
  CardMedia,
  Divider,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

const ShowRoomDetails = () => {
  const [room, setRoom] = useState(null);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .get(`https://rntmgmt-aditya.onrender.com/api/rooms/${id}`)
        .then((res) => setRoom(res.data))
        .catch((err) => setError('Failed to load room details.'));
    }
  }, [id]);

  const handleDelete = () => {
    axios
      .delete(`https://rntmgmt-aditya.onrender.com/api/rooms/${id}`)
      .then(() => navigate('/rooms'))
      .catch(() => setError('Failed to delete the room.'));
    setOpenDialog(false);
  };

  const formatDate = (date) => (date ? new Date(date).toLocaleDateString() : 'N/A');

  if (error) {
    return (
      <Container maxWidth="md">
        <StyledPaper>
          <Typography color="error" variant="h5" align="center">
            {error}
          </Typography>
        </StyledPaper>
      </Container>
    );
  }

  if (!room) {
    return (
      <Container maxWidth="md">
        <StyledPaper>
          <Typography variant="h5" align="center">
            Loading room details...
          </Typography>
        </StyledPaper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <StyledPaper>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5IqxP_qjMeWYD8iJsQ28ZO-YnPPT4EURVsg&s"
                alt={room.room_number || 'Room Image'}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                }}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" component="h1" gutterBottom>
              Room {room.room_number}
            </Typography>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              {room.room_type} - {room.building_name}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box>
              <Typography variant="body1">Room Number: {room.room_number}</Typography>
              <Typography variant="body1">Floor: {room.floor_number}</Typography>
              <Typography variant="body1">Building: {room.building_name}</Typography>
              <Typography variant="body1">Rent: ${room.rent}</Typography>
              <Typography variant="body1">
                Availability: {room.availability ? 'Available' : 'Occupied'}
              </Typography>
              <Typography variant="body1">Tenant: {room.tenant_name || 'N/A'}</Typography>
              <Typography variant="body1">Tenant Email: {room.tenant_email || 'N/A'}</Typography>
              <Typography variant="body1">Lease Start Date: {formatDate(room.lease_start)}</Typography>
              <Typography variant="body1">Lease End Date: {formatDate(room.lease_end)}</Typography>
            </Box>
          </Grid>
        </Grid>
        <Box mt={4} display="flex" justifyContent="space-between">
          <Button
            startIcon={<ArrowBackIcon />}
            component={RouterLink}
            to="/rooms"
            variant="outlined"
          >
            Back to Room List
          </Button>
          <Box>
            <Button
              startIcon={<EditIcon />}
              component={RouterLink}
              to={`/edit-room/${room._id}`}
              variant="contained"
              color="primary"
              sx={{ mr: 1 }}
            >
              Edit Room
            </Button>
            <Button
              startIcon={<DeleteIcon />}
              variant="outlined"
              color="error"
              onClick={() => setOpenDialog(true)}
            >
              Delete Room
            </Button>
          </Box>
        </Box>
      </StyledPaper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this room? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ShowRoomDetails;
