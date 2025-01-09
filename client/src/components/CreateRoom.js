import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, MenuItem, Button, FormControlLabel, Checkbox, Container, Typography, Grid, Paper } from '@mui/material';

const CreateRoom = () => {
    const navigate = useNavigate();
    const [room, setRoom] = useState({
        room_number: '',
        floor_number: '',
        building_name: '',
        room_type: 'Single',
        rent: '',
        availability: true,
        tenant_name: '',
        tenant_email: '',
        tenant_phone: '',
        lease_start_date: '',
        lease_end_date: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const onChange = (e) => {
        const { name, value, type, checked } = e.target;
        setRoom({
            ...room,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Validate rent
        if (room.rent <= 0) {
            setError('Rent must be a positive number.');
            setLoading(false);
            return;
        }

        // Validate lease dates
        if (room.lease_start_date && room.lease_end_date && new Date(room.lease_start_date) > new Date(room.lease_end_date)) {
            setError('Lease start date cannot be later than the lease end date.');
            setLoading(false);
            return;
        }

        axios
            .post('https://rntmgmt-aditya.onrender.com/api/rooms', room)
            .then(() => {
                alert('Room created successfully!');
                setRoom({
                    room_number: '',
                    floor_number: '',
                    building_name: '',
                    room_type: 'Single',
                    rent: '',
                    availability: true,
                    tenant_name: '',
                    tenant_email: '',
                    tenant_phone: '',
                    lease_start_date: '',
                    lease_end_date: '',
                });
                setError('');
                navigate('/rooms');
            })
            .catch((err) => {
                const errorMessage = err.response?.data || 'Failed to create room. Please try again.';
                setError(errorMessage);
            })
            .finally(() => setLoading(false));
    };

    return (
        <Container maxWidth="sm" sx={{ my: 5 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Create New Room
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center" gutterBottom>
                Please fill in the details below to create a new room. Fields marked with <span style={{ color: 'red' }}>*</span> are mandatory.
            </Typography>
            <Paper sx={{ padding: 3 }}>
                <form onSubmit={onSubmit}>
                    {/* Room Number */}
                    <TextField
                        label="Room Number *"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="room_number"
                        value={room.room_number}
                        onChange={onChange}
                        required
                    />

                    {/* Floor Number */}
                    <TextField
                        label="Floor Number *"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="floor_number"
                        type="number"
                        value={room.floor_number}
                        onChange={onChange}
                        required
                    />

                    {/* Building Name */}
                    <TextField
                        label="Building Name *"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="building_name"
                        value={room.building_name}
                        onChange={onChange}
                        required
                    />

                    {/* Room Type */}
                    <TextField
                        select
                        label="Room Type *"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="room_type"
                        value={room.room_type}
                        onChange={onChange}
                        required
                    >
                        <MenuItem value="Single">Single</MenuItem>
                        <MenuItem value="Double">Double</MenuItem>
                        <MenuItem value="Shared">Shared</MenuItem>
                    </TextField>

                    {/* Rent */}
                    <TextField
                        label="Rent (₹ per month) *"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="rent"
                        type="number"
                        value={room.rent}
                        onChange={onChange}
                        required
                    />

                    {/* Availability */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="availability"
                                checked={room.availability}
                                onChange={onChange}
                            />
                        }
                        label="Available"
                    />

                    {/* Tenant Details */}
                    <Typography variant="h6" gutterBottom>
                        Tenant Details (Optional)
                    </Typography>
                    <TextField
                        label="Tenant Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="tenant_name"
                        value={room.tenant_name}
                        onChange={onChange}
                    />
                    <TextField
                        label="Tenant Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="tenant_email"
                        type="email"
                        value={room.tenant_email}
                        onChange={onChange}
                    />
                    <TextField
                        label="Tenant Phone"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="tenant_phone"
                        type="tel"
                        value={room.tenant_phone}
                        onChange={onChange}
                    />

                    {/* Lease Dates */}
                    <Typography variant="h6" gutterBottom>
                        Lease Dates
                    </Typography>
                    <TextField
                        label="Lease Start Date"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="lease_start_date"
                        type="date"
                        value={room.lease_start_date}
                        onChange={onChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        label="Lease End Date"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="lease_end_date"
                        type="date"
                        value={room.lease_end_date}
                        onChange={onChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    {/* Buttons */}
                    <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                        {loading ? 'Creating...' : 'Create Room'}
                    </Button>
                    <Button variant="outlined" color="secondary" fullWidth sx={{ mt: 2 }} onClick={() => navigate('/rooms')}>
                        Cancel
                    </Button>
                </form>

                {/* Error Message */}
                {error && <Typography color="error" variant="body2" sx={{ mt: 2 }}>{error}</Typography>}
            </Paper>
        </Container>
    );
};

export default CreateRoom;
