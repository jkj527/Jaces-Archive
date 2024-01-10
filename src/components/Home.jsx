import React, { useState } from 'react';
import './style/Home.css';

const Home = () => {
    // Mock data for players
    const mockPlayers = ['Ben', 'Mason', 'Tim', 'Scott', 'Connor', 'David', 'Jake'];

    // Mock data for decks (each player has an array of decks)
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
        // Logic to handle game submission
        console.log(`Game winner: ${winner}`);
        console.log(`Game setup:`, gameSetup);
        // Reset game setup and winner after submission
        setGameSetup(Array(4).fill({ player: '', deck: '' }));
        setWinner('');
    };

    // Filter selected players for the winner dropdown
    const selectedPlayersForGame = gameSetup.filter(setup => setup.player).map(setup => setup.player);

    return (
        <div className='home-container'>
            <h2>Enter a New Game</h2>
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

            {selectedPlayersForGame.length > 0 && (
                <div>
                    <label>
                        Winner:
                        <select 
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

            <button onClick={handleSubmitGame}>Submit Game</button>
        </div>
    );
};

export default Home;
