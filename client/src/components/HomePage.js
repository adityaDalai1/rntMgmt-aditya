import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Container,
    Typography,
    Button,
    Box,
    Grid,
    Card,
    CardContent,
    Divider,
    Slide
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import BarChartIcon from '@mui/icons-material/BarChart';
import QrCodeIcon from '@mui/icons-material/QrCode';

const Homepage = () => {
    const [stats] = useState({
        totalRooms: 50, // Example data
        availableRooms: 20,
        rentedRooms: 30
    });

    return (
        <Container maxWidth="lg" sx={{ py: 5 }}>
            {/* Welcome Section */}
            <Box textAlign="center" mb={6}>
                <Typography 
                    variant="h3" 
                    component="h1" 
                    color="primary" 
                    gutterBottom
                >
                    Welcome to Rental Management System
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    Efficiently manage your rentals with ease
                </Typography>
            </Box>

            {/* Stats Section */}
            <Grid container spacing={4} mb={6}>
                <Grid item xs={12} sm={4}>
                    <Slide direction="up" in={true} timeout={600}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <BarChartIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                                <Typography variant="h4">{stats.totalRooms}</Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                    Total Rooms
                                </Typography>
                            </CardContent>
                        </Card>
                    </Slide>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Slide direction="up" in={true} timeout={800}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <HomeIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                                <Typography variant="h4">{stats.availableRooms}</Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                    Available Rooms
                                </Typography>
                            </CardContent>
                        </Card>
                    </Slide>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Slide direction="up" in={true} timeout={1000}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <AddBusinessIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                                <Typography variant="h4">{stats.rentedRooms}</Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                    Rented Rooms
                                </Typography>
                            </CardContent>
                        </Card>
                    </Slide>
                </Grid>
            </Grid>

            {/* Action Section */}
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} sm={6} md={4}>
                    <Button
                        component={Link}
                        to="/rooms"
                        variant="contained"
                        size="large"
                        startIcon={<HomeIcon />}
                        fullWidth
                        sx={{ py: 2 }}
                    >
                        View Rooms
                    </Button>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Button
                        component={Link}
                        to="/create-room"
                        variant="contained"
                        size="large"
                        startIcon={<AddBusinessIcon />}
                        fullWidth
                        sx={{ py: 2 }}
                    >
                        Create Room
                    </Button>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Button
                        component={Link}
                        to="/export"
                        variant="contained"
                        size="large"
                        startIcon={<BarChartIcon />}
                        fullWidth
                        sx={{ py: 2 }}
                    >
                        Export Data
                    </Button>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Button
                        component="a"
                        href="https://github.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="contained"
                        size="large"
                        startIcon={<GitHubIcon />}
                        fullWidth
                        sx={{ py: 2 }}
                    >
                        GitHub
                    </Button>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Button
                        component={Link}
                        to="/search"
                        variant="contained"
                        size="large"
                        startIcon={<SearchIcon />}
                        fullWidth
                        sx={{ py: 2 }}
                    >
                        Search Rooms
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
        <Button
            component={Link}
            to="/qrcodes"
            variant="contained"
            size="large"
            startIcon={<QrCodeIcon />}
            fullWidth
            sx={{ py: 2 }}
        >
            QR Codes
            </Button>
         </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />
        </Container>
    );
};

export default Homepage;
