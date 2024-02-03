import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/GameLog.css';

const GameLog = () => {
    const [gameLogs, setGameLogs] = useState([]);

    useEffect(() => {
        axios.get('/api/game-log')
            .then(response => {
                console.log(response.data);
                setGameLogs(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the game logs: ", error);
            });
    }, []);

    return (
        <div className='game-log-container'>
            <h2 className='game-log-heading'>Game Log</h2>
            {gameLogs.map((logGroup, logGroupIndex) => (
                <div key={logGroupIndex} className='game-log-date-group'>
                    <h3>{logGroup._id /* This should be the date string */}</h3>
                    {logGroup.games.map((game, gameIndex) => (
                        <div key={gameIndex} className='game-details-container'>
                            <div className='game-details'>
                                <p>Date: {new Date(game.date).toLocaleDateString()}</p>
                                <p>Players: {game.players?.join(', ')}</p>
                                <p>Winner: {game.winner?.player || 'N/A'} with deck {game.winner?.deck || 'N/A'}</p>
                                {game.secondPlace?.player && <p>2nd Place: {game.secondPlace.player} with deck {game.secondPlace.deck}</p>}
                                {game.thirdPlace?.player && <p>3rd Place: {game.thirdPlace.player} with deck {game.thirdPlace.deck}</p>}
                                {game.fourthPlace?.player && <p>4th Place: {game.fourthPlace.player} with deck {game.fourthPlace.deck}</p>}
                                {game.winningPlay && <p>Winning Play: {game.winningPlay}</p>}
                                {game.interestingPlays && <p>Interesting Plays: {game.interestingPlays}</p>}
                                {game.mvp && <p>MVP: {game.mvp}</p>}
                                {game.otherNotes && <p>Other Notes: {game.otherNotes}</p>}
                                {game.roundsToWin && <p>Rounds to Win: {game.roundsToWin}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
     
};

export default GameLog;

