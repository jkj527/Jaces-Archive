import React, { useState } from 'react';
import { TextField, MenuItem, Button } from '@mui/material';
import './style/PlayerManagement.css';

const PlayerManagement = () => {
    const [players, setPlayers] = useState([]);
    const [playerName, setPlayerName] = useState('');
    const [deckName, setDeckName] = useState('');
    const [selectedPlayer, setSelectedPlayer] = useState('');

    const handlePlayerSubmit = (e) => {
        e.preventDefault();
        const newPlayer = {
            name: playerName,
            decks: []
        };
        setPlayers([...players, newPlayer]);
        setPlayerName('');
    };

    const handleDeckSubmit = (e) => {
        e.preventDefault();
        setPlayers(players.map(player => {
            if (player.name === selectedPlayer) {
                return {
                    ...player,
                    decks: [...player.decks, deckName]
                };
            }
            return player;
        }));
        setDeckName('');
        setSelectedPlayer('');
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
                            // Apply the CSS variables directly if they are defined globally
                            // Otherwise, use the hex color codes or rgba values as shown below
                            // backgroundColor: '#D18B8B', // Your soft red color value
                            // color: '#FFFFFF', // Assuming soft white is white
                            '&:hover': {
                                backgroundColor: 'var(--soft-red)', // Keep the same color on hover
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
                                backgroundColor: 'var(--soft-red)', // Keep the same color on hover
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
