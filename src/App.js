import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import PlayerManagement from './components/PlayerManagement';
import Statistics from './components/Statistics';
import GameLog from './components/GameLog';
import Superlatives from './components/Superlatives';
import Login from './components/Login';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <NavBar />}
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Login onLogin={() => setIsAuthenticated(true)} />} />
        </Routes>
        <div className='main-content'>
          <Routes>
            <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
            <Route path="/player-management" element={isAuthenticated ? <PlayerManagement /> : <Navigate to="/" />} />
            <Route path="/statistics" element={isAuthenticated ? <Statistics /> : <Navigate to="/" />} />
            <Route path="/game-log" element={isAuthenticated ? <GameLog /> : <Navigate to="/" />} />
            <Route path="/superlatives" element={isAuthenticated ? <Superlatives /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
