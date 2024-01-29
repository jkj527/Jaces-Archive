import React from 'react';
import { Link } from 'react-router-dom';
import './style/NavBar.css';

const NavBar = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="nav-link">Home</Link>
            <h1>Jace's Archive</h1>
            <div className="dropdown">
                <button className="dropbtn">☰</button>
                <div className="dropdown-content">
                    <Link to="/player-management">Manage Players</Link>
                    <Link to="/statistics">Statistics</Link>
                    <Link to="/game-log">Game Log</Link>
                    <Link to="/superlatives">Superlatives</Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
