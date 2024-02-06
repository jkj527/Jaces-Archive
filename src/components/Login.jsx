import React, { useState } from 'react';
import './style/Login.css';

const Login = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const correctPassword = 'RizzReef';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      onLogin(true);
    } else {
      alert('Incorrect Password!');
    }
  };

  return (
    <div className="login-container">
      <div className="welcome-message">Welcome to Jace's Archive</div>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
          className="login-input"
        />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
