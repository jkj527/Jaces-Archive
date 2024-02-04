import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/GameLog.css';

const GameLog = () => {
    const [groupedGameLogs, setGroupedGameLogs] = useState({});
    const [openGroups, setOpenGroups] = useState({});

    useEffect(() => {
        axios.get('/api/game-log')
            .then(response => {
                const grouped = response.data.reduce((acc, log) => {
                    const date = log.date.slice(0, 10);
                    !acc[date] ? acc[date] = [log] : acc[date].push(log);
                    return acc;
                }, {});

                setGroupedGameLogs(grouped);
                // Initialize all groups as closed (false)
                const initialOpenStates = Object.keys(grouped).reduce((acc, date) => {
                    acc[date] = false; // Start with all groups collapsed
                    return acc;
                }, {});
                setOpenGroups(initialOpenStates);
            })
            .catch(error => {
                console.error("There was an error fetching the game logs: ", error);
            });
    }, []);

    const toggleGroup = (date) => {
        setOpenGroups(prevState => ({ ...prevState, [date]: !prevState[date] }));
    };

    return (
        <div className='game-log-container'>
            <h2 className='game-log-heading'>Game Log</h2>
            {Object.entries(groupedGameLogs).map(([date, logs], index) => (
                <div key={index} className='game-log-date-group'>
                    <h3 onClick={() => toggleGroup(date)} className={openGroups[date] ? 'open' : ''}>
                        {date.split('-').join('/').replace(/^(\d{4})\/(\d{2})\/(\d{2})$/, `$2/$3/$1`)}
                        <span className="toggle-indicator">{openGroups[date] ? '▲' : '▼'}</span>
                    </h3>
                    {openGroups[date] && logs.map((log, logIndex) => (
                        <div key={logIndex} className='game-details-container'>
                            <div className='game-details'>
                                <p><b>Winner:</b> {log.winner?.player} ● {log.winner?.deck}</p>
                                {log.secondPlace?.player && <p><b>2nd Place:</b> {log.secondPlace.player} ● {log.secondPlace.deck}</p>}
                                {log.thirdPlace?.player && <p><b>3rd Place:</b> {log.thirdPlace.player} ● {log.thirdPlace.deck}</p>}
                                {log.fourthPlace?.player && <p><b>4th Place:</b> {log.fourthPlace.player} ● {log.fourthPlace.deck}</p>}
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
