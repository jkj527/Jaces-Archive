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
                    <Link to="/account">Account</Link>
                    <Link to="/player-management">Manage Players</Link>
                    <Link to="/statistics" className="nav-link">Statistics</Link>
                    {/* Add other links here if needed */}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
