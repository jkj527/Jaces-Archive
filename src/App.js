import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import PlayerManagement from './components/PlayerManagement';
import Statistics from './components/Statistics';
import GameLog from './components/GameLog';
import Superlatives from './components/Superlatives';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/player-management" element={<PlayerManagement />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/game-log" element={<GameLog />} />
          <Route path="/superlatives" element={<Superlatives />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
