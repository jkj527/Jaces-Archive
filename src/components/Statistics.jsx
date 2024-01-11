import React, { useState, useEffect } from 'react';
import './style/Statistics.css';

const Statistics = () => {
    // Initialize with mock data for demonstration
    const [statistics, setStatistics] = useState([
        {
            name: 'Scott',
            decks: [
                { name: 'Kalamax, the Stormsire', active: true, gamesPlayed: 10, first: 4, second: 3, third: 2, fourth: 1 },
                { name: 'Carth the Lion', active: true, gamesPlayed: 5, first: 1, second: 1, third: 2, fourth: 1 },
                // ... additional decks
            ],
        },
        {
            name: 'Connor',
            decks: [
                { name: 'Admiral Beckett Brass', active: true, gamesPlayed: 8, first: 2, second: 2, third: 3, fourth: 1 },
                { name: 'Jorn, God of Winter', active: true, gamesPlayed: 6, first: 0, second: 3, third: 2, fourth: 1 },
                // ... additional decks
            ],
        },
        // ... additional players
    ]);

    useEffect(() => {
        // Fetch the statistics data from your data source when the component mounts
        // This will be replaced with actual fetch call
    }, []);

    const calculateWinPercentage = (deck) => {
        const totalGames = deck.gamesPlayed;
        if (totalGames === 0) return "0%";
        const totalWins = deck.first;
        return ((totalWins / totalGames) * 100).toFixed(2) + '%';
    };

    return (
        <div className='statistics-container'>
            <h2 className='statistics-heading'>Player Statistics</h2>
            {statistics.map((player) => (
                <div key={player.name}>
                    <h3>{player.name}'s Decks</h3>
                    <table className='statistics-table'>
                        <thead>
                            <tr>
                                <th>Deck</th>
                                <th>Active Deck?</th>
                                <th>Total Games Played</th>
                                <th>First Place</th>
                                <th>Second Place</th>
                                <th>Third Place</th>
                                <th>Fourth Place</th>
                                <th>Win Percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {player.decks.map((deck) => (
                                <tr key={deck.name}>
                                    <td>{deck.name}</td>
                                    <td>{deck.active ? 'Yes' : 'No'}</td>
                                    <td>{deck.gamesPlayed}</td>
                                    <td>{deck.first}</td>
                                    <td>{deck.second}</td>
                                    <td>{deck.third}</td>
                                    <td>{deck.fourth}</td>
                                    <td>{calculateWinPercentage(deck)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default Statistics;
