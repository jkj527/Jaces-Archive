import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';
import './style/Home.css';

const Home = () => {
    const mockPlayers = ['Ben', 'Mason', 'Tim', 'Scott', 'Connor', 'David', 'Jake'];
    const mockDecks = {
        'Ben': ['Ragavan', 'Lady Caleria'],
        'Mason': ['Breya', 'Shirei'],
        'Tim': ['Prismatic Bridge', 'Zndersplt & Okaun'],
        'Scott': ['Kalamax', 'Carth the Lion'],
        'Connor': ['Jorn', 'Tovolar'],
        'David': ['Mishra', 'Aesi'],
        'Jake': ['Galazeth Prismari', 'Obeka']
    };

    const [players, setPlayers] = useState(mockPlayers);
    const [decks, setDecks] = useState(mockDecks);
    const [gameSetup, setGameSetup] = useState(Array(4).fill({ player: '', deck: '' }));
    const [winner, setWinner] = useState('');
    const [gameDate, setGameDate] = useState(null);

    const handlePlayerChange = (index, selectedPlayer) => {
        const newGameSetup = [...gameSetup];
        newGameSetup[index] = { ...newGameSetup[index], player: selectedPlayer, deck: '' };
        setGameSetup(newGameSetup);
    };

    const handleDeckChange = (index, selectedDeck) => {
        const newGameSetup = [...gameSetup];
        newGameSetup[index].deck = selectedDeck;
        setGameSetup(newGameSetup);
    };

    const handleSubmitGame = () => {
        console.log(`Game winner: ${winner}`);
        console.log(`Game setup:`, gameSetup);
        setGameSetup(Array(4).fill({ player: '', deck: '' }));
        setWinner('');
    };

    const selectedPlayersForGame = gameSetup.filter(setup => setup.player).map(setup => setup.player);

    return (
        <div className='home-container'>
            <div className="title-container">
                <h2>Enter a New Game</h2>
            </div>

            <div className="date-picker-container">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Game Date"
                        value={gameDate}
                        onChange={(newValue) => setGameDate(newValue)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>

            <div className="player-selection-container">
                {gameSetup.map((setup, index) => (
                    <div className='select-row' key={index}>
                        <div className='select-item'>
                            <label className='select-label'>
                                Player {index + 1}:
                                <select
                                    className='select-input'
                                    value={setup.player}
                                    onChange={(e) => handlePlayerChange(index, e.target.value)}
                                >
                                    <option value="">Select Player</option>
                                    {players.map((player, idx) => (
                                        <option key={idx} value={player}>{player}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        {setup.player && (
                            <div className='select-item'>
                                <label className='select-label'>
                                    Deck:
                                    <select
                                        className='select-input'
                                        value={setup.deck}
                                        onChange={(e) => handleDeckChange(index, e.target.value)}
                                    >
                                        <option value="">Select Deck</option>
                                        {decks[setup.player]?.map((deck, idx) => (
                                            <option key={idx} value={deck}>{deck}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="winner-selection-container">
                {selectedPlayersForGame.length > 0 && (
                    <div className='select-item'>
                        <label className='select-label'>
                            Winner:
                            <select
                                className='select-input'
                                value={winner}
                                onChange={(e) => setWinner(e.target.value)}
                            >
                                <option value="">Select Winner</option>
                                {selectedPlayersForGame.map((player, idx) => (
                                    <option key={idx} value={player}>{player}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                )}
            </div>

            <div className="submit-button-container">
                <button className='submit-button' onClick={handleSubmitGame}>Submit Game</button>
            </div>
        </div>
    );
};

export default Home;
