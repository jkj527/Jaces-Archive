import React, { useState } from 'react';
import './style/PlayerManagement.css'; // Importing the CSS file

const PlayerManagement = () => {
    const [playerName, setPlayerName] = useState('');
    const [deckName, setDeckName] = useState('');

    const handlePlayerSubmit = (e) => {
        e.preventDefault();
        // Logic to add player
        console.log(`Adding player: ${playerName}`);
    };

    const handleDeckSubmit = (e) => {
        e.preventDefault();
        // Logic to add deck to player
        console.log(`Adding deck: ${deckName} to player: ${playerName}`);
    };

    return (
        <div className="player-management-container">
            <h2>Player Management</h2>
            <div className="form-section">
                <form onSubmit={handlePlayerSubmit}>
                    <label className="form-label">
                        Player Name:
                        <input 
                            type="text" 
                            value={playerName} 
                            onChange={(e) => setPlayerName(e.target.value)}
                            className="form-input" 
                        />
                    </label>
                    <button type="submit" className="form-button">Add Player</button>
                </form>
            </div>
            <div className="form-section">
                <form onSubmit={handleDeckSubmit}>
                    <label className="form-label">
                        Deck Name:
                        <input 
                            type="text" 
                            value={deckName} 
                            onChange={(e) => setDeckName(e.target.value)}
                            className="form-input" 
                        />
                    </label>
                    <button type="submit" className="form-button">Add Deck</button>
                </form>
            </div>
        </div>
    );
};

export default PlayerManagement;
