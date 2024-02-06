// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './style/GameLog.css';

// const GameLog = () => {
//     const [groupedGameLogs, setGroupedGameLogs] = useState({});
//     const [openGroups, setOpenGroups] = useState({});

//     useEffect(() => {
//         axios.get('/api/game-log')
//             .then(response => {
//                 const grouped = response.data.reduce((acc, log) => {
//                     const date = log.date.slice(0, 10);
//                     !acc[date] ? acc[date] = [log] : acc[date].push(log);
//                     return acc;
//                 }, {});

//                 setGroupedGameLogs(grouped);
//                 // Initialize all groups as closed (false)
//                 const initialOpenStates = Object.keys(grouped).reduce((acc, date) => {
//                     acc[date] = false; // Start with all groups collapsed
//                     return acc;
//                 }, {});
//                 setOpenGroups(initialOpenStates);
//             })
//             .catch(error => {
//                 console.error("There was an error fetching the game logs: ", error);
//             });
//     }, []);

//     const toggleGroup = (date) => {
//         setOpenGroups(prevState => ({ ...prevState, [date]: !prevState[date] }));
//     };

//     return (
//         <div className='game-log-container'>
//             <h2 className='game-log-heading'>Game Log</h2>
//             {Object.entries(groupedGameLogs).map(([date, logs], index) => (
//                 <div key={index} className='game-log-date-group'>
//                     <h3 onClick={() => toggleGroup(date)} className={openGroups[date] ? 'open' : ''}>
//                         {date.split('-').join('/').replace(/^(\d{4})\/(\d{2})\/(\d{2})$/, `$2/$3/$1`)}
//                         <span className="toggle-indicator">{openGroups[date] ? '▲' : '▼'}</span>
//                     </h3>
//                     {openGroups[date] && logs.map((log, logIndex) => (
//                         <div key={logIndex} className='game-details-container'>
//                             <div className='game-details'>
//                                 <p><b>Winner:</b> {log.winner?.player} ● {log.winner?.deck}</p>
//                                 {log.secondPlace?.player && <p><b>2nd Place:</b> {log.secondPlace.player} ● {log.secondPlace.deck}</p>}
//                                 {log.thirdPlace?.player && <p><b>3rd Place:</b> {log.thirdPlace.player} ● {log.thirdPlace.deck}</p>}
//                                 {log.fourthPlace?.player && <p><b>4th Place:</b> {log.fourthPlace.player} ● {log.fourthPlace.deck}</p>}
//                                 {log.winningPlay && <p><b>Winning Play:</b> {log.winningPlay}</p>}
//                                 {log.interestingPlays && <p><b>Interesting Plays:</b> {log.interestingPlays}</p>}
//                                 {log.mvp && <p><b>MVP:</b> {log.mvp}</p>}
//                                 {log.otherNotes && <p><b>Other Notes:</b> {log.otherNotes}</p>}
//                                 {log.roundsToWin && <p><b>Rounds to Win:</b> {log.roundsToWin}</p>}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default GameLog;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/GameLog.css';

const PlacingEntry = ({ label, player, deck }) => (
  <div className="placing-entry">
    <h4>{label}</h4>
    <p>{player} ● {deck}</p>
  </div>
);

const DetailEntry = ({ label, content }) => (
  <div className="detail-entry">
    <strong>{label}:</strong> {content}
  </div>
);

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
                        <div key={logIndex} className='game-log-entry'>
                            <div className='placings-container'>
                                <PlacingEntry label="Winner" player={log.winner?.player} deck={log.winner?.deck} />
                                {log.secondPlace?.player && <PlacingEntry label="2nd Place" player={log.secondPlace.player} deck={log.secondPlace.deck} />}
                                {log.thirdPlace?.player && <PlacingEntry label="3rd Place" player={log.thirdPlace.player} deck={log.thirdPlace.deck} />}
                                {log.fourthPlace?.player && <PlacingEntry label="4th Place" player={log.fourthPlace.player} deck={log.fourthPlace.deck} />}
                            </div>
                            <div className='details-section'>
                                {log.winningPlay && <DetailEntry label="Winning Play" content={log.winningPlay} />}
                                {log.interestingPlays && <DetailEntry label="Interesting Plays" content={log.interestingPlays} />}
                                {log.mvp && <DetailEntry label="MVP" content={log.mvp} />}
                                {log.otherNotes && <DetailEntry label="Other Notes" content={log.otherNotes} />}
                                {log.roundsToWin && <DetailEntry label="Rounds to Win" content={log.roundsToWin} />}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default GameLog;
