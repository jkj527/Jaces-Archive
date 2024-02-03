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
            {gameLogs.map((log, logIndex) => (
                <div key={logIndex} className='game-log-date-group'>
                    <h3>{log.date}</h3>
                    <div className='game-details-container'>
                        <div className='game-details'>
                            <p>Players: {log.players?.join(', ')}</p>
                            <p>Winner: {log.winner} (Deck used: {log.deckUsed})</p>
                            {/* Display new fields if they are present */}
                            {log.secondPlace && <p>2nd Place: {log.secondPlace}</p>}
                            {log.thirdPlace && <p>3rd Place: {log.thirdPlace}</p>}
                            {log.fourthPlace && <p>4th Place: {log.fourthPlace}</p>}
                            {log.winningPlay && <p>Winning Play: {log.winningPlay}</p>}
                            {log.interestingPlays && <p>Interesting Plays: {log.interestingPlays}</p>}
                            {log.mvp && <p>MVP: {log.mvp}</p>}
                            {log.otherNotes && <p>Other Notes: {log.otherNotes}</p>}
                            {log.roundsToWin && <p>Rounds to Win: {log.roundsToWin}</p>}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
     
};

export default GameLog;

