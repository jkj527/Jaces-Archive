import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/GameLog.css';

const GameLog = () => {
    const [groupedGameLogs, setGroupedGameLogs] = useState({});

    useEffect(() => {
        axios.get('/api/game-log')
            .then(response => {
                const grouped = response.data.reduce((acc, log) => {
                    const date = log.date.slice(0, 10);
                    // If the acc already has an array for that date, push the log into it, otherwise create a new array
                    !acc[date] ? acc[date] = [log] : acc[date].push(log);
                    return acc;
                }, {});

                setGroupedGameLogs(grouped);
            })
            .catch(error => {
                console.error("There was an error fetching the game logs: ", error);
            });
    }, []);

    return (
        <div className='game-log-container'>
            <h2 className='game-log-heading'>Game Log</h2>
            {Object.entries(groupedGameLogs).map(([date, logs], index) => (
                <div key={index} className='game-log-date-group'>
                    <h3>{date.split('-').join('/').replace(/^(\d{4})\/(\d{2})\/(\d{2})$/, `$2/$3/$1`)}</h3>
                    {logs.map((log, logIndex) => (
                        <div key={logIndex} className='game-details-container'>
                            <div className='game-details'>
                                <p><b>Winner:</b> {log.winner?.player} with {log.winner?.deck}</p>
                                {log.secondPlace?.player && <p><b>2nd Place:</b> {log.secondPlace.player} with {log.secondPlace.deck}</p>}
                                {log.thirdPlace?.player && <p><b>3rd Place:</b> {log.thirdPlace.player} with {log.thirdPlace.deck}</p>}
                                {log.fourthPlace?.player && <p><b>4th Place:</b> {log.fourthPlace.player} with {log.fourthPlace.deck}</p>}
                                {log.winningPlay && <p><b>Winning Play:</b> {log.winningPlay}</p>}
                                {log.interestingPlays && <p><b>Interesting Plays:</b> {log.interestingPlays}</p>}
                                {log.mvp && <p><b>MVP:</b> {log.mvp}</p>}
                                {log.otherNotes && <p><b>Other Notes:</b> {log.otherNotes}</p>}
                                {log.roundsToWin && <p><b>Rounds to Win:</b> {log.roundsToWin}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default GameLog;
