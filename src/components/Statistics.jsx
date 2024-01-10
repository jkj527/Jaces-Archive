import React, { useState, useEffect } from 'react';
import './style/Statistics.css';

const Statistics = () => {
    // This state would ideally come from a context, Redux store, or fetched from a backend.
    const [statistics, setStatistics] = useState([
        // ... populate with actual data
    ]);

    useEffect(() => {
        // Fetch the statistics data from your data source when the component mounts
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
            <table className='statistics-table'>
                <thead>
                    <tr>
                        <th>Player</th>
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
                    {statistics.map((player) => player.decks.map((deck) => (
                        <tr key={player.name + deck.name}>
                            <td>{player.name}</td>
                            <td>{deck.name}</td>
                            <td>{deck.active ? 'Yes' : 'No'}</td>
                            <td>{deck.gamesPlayed}</td>
                            <td>{deck.first}</td>
                            <td>{deck.second}</td>
                            <td>{deck.third}</td>
                            <td>{deck.fourth}</td>
                            <td>{calculateWinPercentage(deck)}</td>
                        </tr>
                    )))}
                </tbody>
            </table>
        </div>
    );
};

export default Statistics;
