import React, { useState, useEffect } from 'react';
import {
    Container,
    TextField,
    Typography,
    Box,
    Card,
    CardContent,
    Grid,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Button,
    CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import RoomCard from './RoomCard'; // Adjusted to RoomCard for your project
import axios from 'axios';

const SearchRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [roomTypes, setRoomTypes] = useState([]);

    const [filters, setFilters] = useState({
        searchTerm: '',
        searchField: 'room_type',
        sortBy: 'room_number',
        sortOrder: 'asc',
        roomType: 'all'
    });

    useEffect(() => {
        axios.get('https://rntmgmt-aditya.onrender.com/api/rooms')
            .then(res => {
                setRooms(res.data);
                setFilteredRooms(res.data);

                const uniqueTypes = [...new Set(res.data.map(room => room.room_type))];
                setRoomTypes(uniqueTypes);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching rooms:', err);
                setLoading(false);
            });
    }, []);

    const applyFilters = () => {
        let result = [...rooms];

        if (filters.searchTerm) {
            result = result.filter(room => {
                const searchValue = room[filters.searchField]?.toString().toLowerCase();
                return searchValue?.includes(filters.searchTerm.toLowerCase());
            });
        }

        if (filters.roomType !== 'all') {
            result = result.filter(room => room.room_type === filters.roomType);
        }

        result.sort((a, b) => {
            let valueA = a[filters.sortBy]?.toString().toLowerCase();
            let valueB = b[filters.sortBy]?.toString().toLowerCase();

            if (filters.sortBy === 'lease_start' || filters.sortBy === 'lease_end') {
                valueA = new Date(a[filters.sortBy]);
                valueB = new Date(b[filters.sortBy]);
            }

            if (valueA < valueB) return filters.sortOrder === 'asc' ? -1 : 1;
            if (valueA > valueB) return filters.sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        setFilteredRooms(result);
    };

    useEffect(() => {
        applyFilters();
    }, [filters]);

    const resetFilters = () => {
        setFilters({
            searchTerm: '',
            searchField: 'room_type',
            sortBy: 'room_number',
            sortOrder: 'asc',
            roomType: 'all'
        });
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
            <Typography variant='h4' component='h1' gutterBottom align='center' color='primary'>
                Search Rooms
            </Typography>

            <Card sx={{ mb: 4, p: 2 }}>
                <CardContent>
                    <Grid container spacing={2} alignItems='center'>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Search"
                                value={filters.searchTerm}
                                onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
                                InputProps={{
                                    startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
                                }}
                            />
                        </Grid>

                        {/*Search By Dropdown */}
                        <Grid item sx={12} md={2}>
                            <FormControl fullWidth>
                                <InputLabel>Search By</InputLabel>
                                <Select
                                    value={filters.searchField}
                                    label="Search By"
                                    onChange={(e) => setFilters({ ...filters, searchField: e.target.value })}
                                >
                                    <MenuItem value="room_type">Room Type</MenuItem>
                                    <MenuItem value="building_name">Building Name</MenuItem>
                                    <MenuItem value="availability">Availability</MenuItem>
                                    <MenuItem value="rent">Rent</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/*Sort By Dropdown */}
                        <Grid item xs={12} md={2}>
                            <FormControl fullWidth>
                                <InputLabel>Sort By</InputLabel>
                                <Select
                                    value={filters.sortBy}
                                    label="Sort By"
                                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                                >
                                    <MenuItem value="room_number">Room Number</MenuItem>
                                    <MenuItem value="building_name">Building Name</MenuItem>
                                    <MenuItem value="rent">Rent</MenuItem>
                                    <MenuItem value="lease_start">Lease Start Date</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/*Sort Order*/}
                        <Grid item xs={12} md={2}>
                            <FormControl fullWidth>
                                <InputLabel>Order</InputLabel>
                                <Select
                                    value={filters.sortOrder}
                                    label="Order"
                                    onChange={(e) => setFilters({ ...filters, sortOrder: e.target.value })}
                                >
                                    <MenuItem value="asc">Ascending</MenuItem>
                                    <MenuItem value="desc">Descending</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/*Room Type Filter */}
                        <Grid item xs={12} md={2}>
                            <FormControl fullWidth>
                                <InputLabel>Room Type</InputLabel>
                                <Select
                                    value={filters.roomType}
                                    label="Room Type"
                                    onChange={(e) => setFilters({ ...filters, roomType: e.target.value })}
                                >
                                    <MenuItem value="all">All Types</MenuItem>
                                    {roomTypes.map((type, index) => (
                                        <MenuItem key={index} value={type}>
                                            {type}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/*Reset Button*/}
                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="center">
                                <Button
                                    variant='outlined'
                                    startIcon={<RestartAltIcon />}
                                    onClick={resetFilters}
                                >
                                    Reset Filters
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/*Results Section */}
            <Box sx={{ mb: 2 }}>
                <Typography variant='body1' color='text.secondary'>
                    Found {filteredRooms.length} rooms
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {filteredRooms.map((room) => (
                    <Grid item sx={12} sm={6} md={4} key={room._id}>
                        <RoomCard room={room} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default SearchRooms;
