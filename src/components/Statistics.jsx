import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/Statistics.css';

const Statistics = () => {
    // mock data
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
        const fetchStatistics = async () => {
            try {
                const response = await axios.get('/api/statistics');
                console.log(response.data);
                setStatistics(response.data);
                console.log(statistics);
            } catch (error) {
                console.error('Failed to fetch statistics:', error);
            }
        };
    
        fetchStatistics();
    }, []);
    

    // Function to calculate win percentage for an individual deck or a player's total
    const calculateWinPercentage = (first, gamesPlayed) => {
        return gamesPlayed > 0 ? ((first / gamesPlayed) * 100).toFixed(2) + '%' : "0%";
    };

    // Function to calculate totals for an individual player
    const calculatePlayerTotals = (decks) => {
        return decks.reduce((totals, deck) => {
            totals.gamesPlayed += deck.gamesPlayed;
            totals.first += deck.first;
            totals.second += deck.second;
            totals.third += deck.third;
            totals.fourth += deck.fourth;
            return totals;
        }, { gamesPlayed: 0, first: 0, second: 0, third: 0, fourth: 0 });
    };

    return (
        <div className='statistics-container'>
            <h2 className='statistics-heading'>Player Statistics</h2>
            {statistics.map((player) => {
                const playerTotals = calculatePlayerTotals(player.decks);
                return (
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
                                {player.decks.map((deck, index) => (
                                    <tr key={index}>
                                        <td>{deck.name}</td>
                                        <td>{deck.activeDeck ? 'Yes' : 'No'}</td>
                                        <td>{deck.gamesPlayed}</td>
                                        <td>{deck.firstPlace}</td>
                                        <td>{deck.secondPlace}</td>
                                        <td>{deck.thirdPlace}</td>
                                        <td>{deck.fourthPlace}</td>
                                        <td>{calculateWinPercentage(deck.firstPlace, deck.gamesPlayed)}</td>
                                    </tr>
                                ))}
                                <tr className="totals-row">
                                    <td colSpan="2">Total</td>
                                    <td>{playerTotals.gamesPlayed}</td>
                                    <td>{playerTotals.first}</td>
                                    <td>{playerTotals.second}</td>
                                    <td>{playerTotals.third}</td>
                                    <td>{playerTotals.fourth}</td>
                                    <td>{calculateWinPercentage(playerTotals.first, playerTotals.gamesPlayed)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                );
            })}
        </div>
    );
};

export default Statistics;