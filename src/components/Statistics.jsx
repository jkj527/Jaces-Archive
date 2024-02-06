import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './style/Statistics.css';

const Statistics = () => {
    const [statistics, setStatistics] = useState([]);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await axios.get('/api/statistics');
                // console.log('Statistics: ', response.data);
                setStatistics(response.data);
            } catch (error) {
                console.error('Failed to fetch statistics:', error);
            }
        };
    
        fetchStatistics();
    }, []);
    

    const calculateWinPercentage = (firstPlace, gamesPlayed) => {
        return gamesPlayed > 0 ? ((firstPlace / gamesPlayed) * 100).toFixed(2) + '%' : "0%";
    };

    const calculatePlayerTotals = (decks) => {
        return decks.reduce((totals, deck) => {
            totals.gamesPlayed += deck.gamesPlayed;
            totals.first += deck.firstPlace;
            totals.second += deck.secondPlace;
            totals.third += deck.thirdPlace;
            totals.fourth += deck.fourthPlace;
            return totals;
        }, { gamesPlayed: 0, first: 0, second: 0, third: 0, fourth: 0 });
    };

    // const handleDeleteDeck = async (playerName, deckName) => {
    //     try {
    //         await axios.delete(`/api/players/${playerName}/decks/${deckName}`);
    //         // Refresh the statistics to reflect the deletion
    //         // This could be optimized but for simplicity, we're refetching all data
    //         const response = await axios.get('/api/statistics');
    //         setStatistics(response.data);
    //     } catch (error) {
    //         console.error('Failed to delete deck:', error);
    //     }
    // };

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
                                        {/* <td>
                                            <div className="deck-name-with-icon">
                                                <span className="deck-name">{deck.name}</span>
                                                <span className="delete-icon" onClick={() => handleDeleteDeck(player.name, deck.name)}>
                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                </span>
                                            </div>
                                        </td> */}
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