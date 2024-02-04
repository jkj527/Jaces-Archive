import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { TextField, Snackbar, Alert } from '@mui/material';
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
    const [secondPlace, setSecondPlace] = useState('');
    const [thirdPlace, setThirdPlace] = useState('');
    const [fourthPlace, setFourthPlace] = useState('');
    const [gameDate, setGameDate] = useState(null);
    const [winningPlay, setWinningPlay] = useState('');
    const [interestingPlays, setInterestingPlays] = useState('');
    const [mvp, setMvp] = useState('');
    const [otherNotes, setOtherNotes] = useState('');
    const [roundsToWin, setRoundsToWin] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');


    useEffect(() => {
        axios.get('/api/players')
            .then(response => {
                const playerNames = response.data.map(player => player.name);
                setPlayers(playerNames);
            })
            .catch(error => console.error("Failed to fetch players: ", error));
    }, []);
    

    const handlePlayerChange = (index, selectedPlayer) => {
        axios.get(`/api/players/${encodeURIComponent(selectedPlayer)}/decks`)
            .then(response => {
                // Assuming the backend sends an array of deck objects
                const playerDecks = response.data.map(deck => deck.name); // Extract deck names
                const updatedDecks = { ...decks, [selectedPlayer]: playerDecks };
                setDecks(updatedDecks);
    
                const newGameSetup = [...gameSetup];
                newGameSetup[index] = { ...newGameSetup[index], player: selectedPlayer, deck: '' };
                setGameSetup(newGameSetup);
            })
            .catch(error => console.error(`Failed to fetch decks for player ${selectedPlayer}: `, error));
    };
    
    

    const handleDeckChange = (index, selectedDeck) => {
        const newGameSetup = [...gameSetup];
        newGameSetup[index].deck = selectedDeck;
        setGameSetup(newGameSetup);
    };

    const handleSubmitGame = () => {
        const gameData = {
            date: gameDate.format('YYYY-MM-DD'),
            playersAndDecks: gameSetup.map(setup => ({
                player: setup.player,
                deck: setup.deck,
            })),
            winner: { player: winner, deck: gameSetup.find(setup => setup.player === winner)?.deck },
            secondPlace: { player: secondPlace, deck: gameSetup.find(setup => setup.player === secondPlace)?.deck },
            thirdPlace: { player: thirdPlace, deck: gameSetup.find(setup => setup.player === thirdPlace)?.deck },
            fourthPlace: { player: fourthPlace, deck: gameSetup.find(setup => setup.player === fourthPlace)?.deck },
            winningPlay,
            interestingPlays,
            mvp,
            otherNotes,
            roundsToWin,
        };
    
        // console.log('playersAndDecks: ', gameData.playersAndDecks);
        // console.log('1st: ', gameData.winner);
        // console.log('2nd: ', gameData.secondPlace);
        // console.log('3rd: ', gameData.thirdPlace);
        // console.log('4th: ', gameData.fourthPlace);

        axios.post('/api/game-log', gameData)
            .then(() => {
                console.log("Game submitted successfully");
                setSnackbarMessage("Game submitted successfully!");
                setSnackbarOpen(true);
                resetForm();
            })
            .catch(error => {
                console.error("There was an error submitting the game: ", error);
                setSnackbarMessage("Failed to submit game. Please try again.");
                setSnackbarOpen(true);
            });
    };
    
    const resetForm = () => {
        setGameSetup(Array(4).fill({ player: '', deck: '' }));
        setWinner('');
        setSecondPlace('');
        setThirdPlace('');
        setFourthPlace('');
        setGameDate(null);
        setWinningPlay('');
        setInterestingPlays('');
        setMvp('');
        setOtherNotes('');
        setRoundsToWin('');
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
                                        {decks[setup.player]?.map((deckName, idx) => (
                                            <option key={idx} value={deckName}>{deckName}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="game-details-container">
                <TextField
                    label="Winning Play"
                    value={winningPlay}
                    onChange={(e) => setWinningPlay(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Interesting Plays"
                    value={interestingPlays}
                    onChange={(e) => setInterestingPlays(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="MVP"
                    value={mvp}
                    onChange={(e) => setMvp(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Other Notes"
                    value={otherNotes}
                    onChange={(e) => setOtherNotes(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Rounds to Win"
                    value={roundsToWin}
                    onChange={(e) => setRoundsToWin(e.target.value)}
                    fullWidth
                    margin="normal"
                    type="number"
                />
            </div>

            <div className="winner-selection-container">
                {selectedPlayersForGame.length > 0 && (
                    <>
                        <div className='select-item'>
                            <label className='select-label'>Winner:</label>
                            {renderPlayerSelect(winner, setWinner)}
                        </div>
                        <div className='placement-container'>
                            <div className='select-item'>
                                <label className='select-label'>2nd Place:</label>
                                {renderPlayerSelect(secondPlace, setSecondPlace)}
                            </div>
                            <div className='select-item'>
                                <label className='select-label'>3rd Place:</label>
                                {renderPlayerSelect(thirdPlace, setThirdPlace)}
                            </div>
                            <div className='select-item'>
                                <label className='select-label'>4th Place:</label>
                                {renderPlayerSelect(fourthPlace, setFourthPlace)}
                            </div>
                        </div>
                    </>
                )}
            </div>

            <div className="submit-button-container">
                <button className='submit-button' onClick={handleSubmitGame}>Submit Game</button>
            </div>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
                <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%', backgroundColor: 'var(--soft-grey)', color: 'var(--soft-white)' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );

    function renderPlayerSelect(selectedValue, setValueFunc) {
        return (
            <select
                className='select-input'
                value={selectedValue}
                onChange={(e) => setValueFunc(e.target.value)}
            >
                <option value="">Select Player</option>
                {selectedPlayersForGame.map((player, idx) => (
                    <option key={idx} value={player}>{player}</option>
                ))}
            </select>
        );
    }
};

export default Home;
