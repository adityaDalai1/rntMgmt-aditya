import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const RoomCard = ({ room }) => {
    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s, box-shadow 0.3s',
                borderRadius: 3,
                boxShadow: 4,
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 8,
                },
            }}
        >
            {/* Room Image */}
            <CardMedia
                component="img"
                height="200"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5IqxP_qjMeWYD8iJsQ28ZO-YnPPT4EURVsg&s"
                alt="Room"
            />

            {/* Room Details */}
            <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Typography 
                    variant="h6" 
                    component="div" 
                    color="primary" 
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                >
                    <Link to={`/room-details/${room._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        Room {room.room_number} - {room.room_type}
                    </Link>
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Floor: {room.floor_number}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
                    Rent: <strong>${room.rent}</strong> / month
                </Typography>
                <Typography
                    variant="subtitle2"
                    color={room.availability ? 'success.main' : 'error.main'}
                    sx={{ mt: 1 }}
                >
                    {room.availability ? 'Available' : 'Occupied'}
                </Typography>
                {room.tenant_name && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Tenant: {room.tenant_name}
                    </Typography>
                )}
            </CardContent>

            {/* Action Button */}
            <Box sx={{ p: 2, mt: 'auto' }}>
                <Button
                    component={Link}
                    to={`/rooms/${room._id}`}
                    variant="contained"
                    color="primary"
                    size="medium"
                    fullWidth
                    sx={{
                        fontWeight: 'bold',
                        textTransform: 'none',
                    }}
                >
                    View Details
                </Button>
            </Box>
        </Card>
    );
};

export default RoomCard;
