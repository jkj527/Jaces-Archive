import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, MenuItem, Button, Snackbar, Alert } from '@mui/material';
import './style/PlayerManagement.css';

const PlayerManagement = () => {
    const [players, setPlayers] = useState([]);
    const [playerName, setPlayerName] = useState('');
    const [deckName, setDeckName] = useState('');
    const [selectedPlayer, setSelectedPlayer] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        fetchPlayers();
    }, []);

    const fetchPlayers = async () => {
        try {
            const response = await axios.get('/api/players');
            setPlayers(response.data);
        } catch (error) {
            console.error('Error fetching players:', error);
        }
    };

    const handlePlayerSubmit = async (e) => {
        e.preventDefault();
        if (playerName.trim()) {
            try {
                await axios.post('/api/players', { name: playerName.trim() });
                fetchPlayers();
                setPlayerName('');
                setSnackbarMessage('Player added successfully');
                setSnackbarOpen(true);
            } catch (error) {
                console.error('Error adding player:', error);
                setSnackbarMessage('Error adding player');
                setSnackbarOpen(true);
            }
        }
    };

    const handleDeckSubmit = async (e) => {
        e.preventDefault();
        if (selectedPlayer && deckName.trim()) {
            try {
                await axios.post(`/api/players/${encodeURIComponent(selectedPlayer)}/decks`, { name: deckName.trim() });
                fetchPlayers();
                setDeckName('');
                setSelectedPlayer('');
                setSnackbarMessage('Deck added successfully');
                setSnackbarOpen(true);
            } catch (error) {
                console.error('Error adding deck:', error);
                setSnackbarMessage('Error adding deck');
                setSnackbarOpen(true);
            }
        }
    };

    // const handleCloseSnackbar = () => {
    //     setSnackbarOpen(false);
    // };

    return (
        <div className="player-management-container">
            <h2>Player Management</h2>
            <div className="form-section">
                <form onSubmit={handlePlayerSubmit}>
                    <TextField
                        label="Player Name"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            backgroundColor: 'var(--soft-red)',
                            color: 'var(--soft-white)',
                            '&:hover': {
                                backgroundColor: 'var(--soft-red)',
                                // transform: 'translateY(-3px)',
                                boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.25)',
                            }
                        }}
                    >
                        Add Player
                    </Button>

                </form>
            </div>
            <div className="form-section">
                <form onSubmit={handleDeckSubmit}>
                    <TextField
                        select
                        label="Select Player"
                        value={selectedPlayer}
                        onChange={(e) => setSelectedPlayer(e.target.value)}
                        fullWidth
                        margin="normal"
                    >
                        {players.map((player) => (
                            <MenuItem key={player.name} value={player.name}>
                                {player.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Deck Name"
                        value={deckName}
                        onChange={(e) => setDeckName(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            backgroundColor: 'var(--soft-red)',
                            color: 'var(--soft-white)',
                            '&:hover': {
                                backgroundColor: 'var(--soft-red)',
                                // transform: 'translateY(-3px)',
                                boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.25)',
                            }
                        }}
                    >
                        Add Deck
                    </Button>

                </form>
            </div>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
                <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%', backgroundColor: 'var(--soft-grey)', color: 'var(--soft-white)' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default PlayerManagement;
