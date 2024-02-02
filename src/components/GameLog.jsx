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
                <div key={logIndex} className='game-log-entry'>
                    <h3>{new Date(log.date).toLocaleDateString()}</h3>
                    {log.games.map((game, gameIndex) => (
                        <div key={gameIndex} className='game-details'>
                            <p>Players: {game.players.join(', ')}</p>
                            <p>Winner: {game.winner} (Deck used: {game.deckUsed})</p>
                            {/* Display new fields if they are present */}
                            {game.secondPlace && <p>2nd Place: {game.secondPlace}</p>}
                            {game.thirdPlace && <p>3rd Place: {game.thirdPlace}</p>}
                            {game.fourthPlace && <p>4th Place: {game.fourthPlace}</p>}
                            {game.winningPlay && <p>Winning Play: {game.winningPlay}</p>}
                            {game.interestingPlays && <p>Interesting Plays: {game.interestingPlays}</p>}
                            {game.mvp && <p>MVP: {game.mvp}</p>}
                            {game.otherNotes && <p>Other Notes: {game.otherNotes}</p>}
                            {game.roundsToWin && <p>Rounds to Win: {game.roundsToWin}</p>}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default GameLog;

