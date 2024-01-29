import React, { useState } from 'react';
import './style/GameLog.css';

const GameLog = () => {
    // mock data
    const [gameLogs, setGameLogs] = useState([
        {
            date: '2024-01-10',
            games: [
                {
                    players: ['Scott', 'Connor', 'Jake', 'Mason'],
                    winner: 'Scott',
                    deckUsed: 'Kalamax, the Stormsire'
                },
                {
                    players: ['Scott', 'Connor', 'Mason'],
                    winner: 'Mason',
                    deckUsed: 'Kenrith, the Returned King'
                },
                // ... additional games
            ],
        },
        {
            date: '2024-01-09',
            games: [
                {
                    players: ['Ben', 'David', 'Jake', 'Connor'],
                    winner: 'Ben',
                    deckUsed: 'The First Sliver'
                },
                {
                    players: ['Ben', 'Jake', 'Connor', 'Tim'],
                    winner: 'Jake',
                    deckUsed: 'Obeka, Brute Chronologist'
                },
                // ... additional games
            ],
        },
        // ... additional game log entries
    ]);

    // ... useEffect if you need to fetch real data ...

    return (
        <div className='game-log-container'>
            <h2 className='game-log-heading'>Game Log</h2>
            {gameLogs.map((log) => (
                <div key={log.date} className='game-log-entry'>
                    <h3>{log.date}</h3>
                    {log.games.map((game, index) => (
                        <div key={index} className='game-details'>
                            <p>Players: {game.players.join(', ')}</p>
                            <p>Winner: {game.winner} (Deck used: {game.deckUsed})</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default GameLog;
