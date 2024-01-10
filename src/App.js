import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import PlayerManagement from './components/PlayerManagement';
import Statistics from './components/Statistics';
// import Account from './pages/Account';
// Import other pages as needed
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          {/* <Route path="/account" element={<Account />} /> */}
          <Route path="/player-management" element={<PlayerManagement />} />
          <Route path="/statistics" element={<Statistics />} />
          {/* Define other routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
