import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, MenuItem, Button } from '@mui/material';
import './style/PlayerManagement.css';

const PlayerManagement = () => {

    const [players, setPlayers] = useState([]);
    const [playerName, setPlayerName] = useState('');
    const [deckName, setDeckName] = useState('');
    const [selectedPlayer, setSelectedPlayer] = useState('');

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
                const response = await axios.post('/api/players', { name: playerName.trim() });
                // Refresh the players list to get the most up-to-date information
                fetchPlayers();
                setPlayerName('');
            } catch (error) {
                console.error('Error adding player:', error);
            }
        }
    };

    const handleDeckSubmit = async (e) => {
        e.preventDefault();
        if (selectedPlayer && deckName.trim()) {
            try {
                await axios.post(`/api/players/${encodeURIComponent(selectedPlayer)}/decks`, { deck: deckName.trim() });
                // Refresh the players list or the specific player's decks
                fetchPlayers();
                setDeckName('');
            } catch (error) {
                console.error('Error adding deck:', error);
            }
        }
    };

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
        </div>
    );
};

export default PlayerManagement;
