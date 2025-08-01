import React, { useState } from 'react';

const LoginScreen = ({ onLogin }) => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (employeeId.length !== 4 || !/^\d{4}$/.test(employeeId)) {
      alert('Please enter a valid 4-digit employee ID');
      return;
    }
    if (!password) {
      alert('Please enter your password');
      return;
    }
    onLogin();
  };

  return (
    <div className="login-form">
      {/* Logo */}
      <div className="logo-container">
        <img 
          src="/Images/Siemens-Energy-logo-1.png" 
          alt="Siemens Energy Logo" 
          className="logo"
        />
      </div>
      
      <h1>WALKDOWN SIEMENS ENERGY</h1>
      <h2>SIEMENS ENERGY</h2>
      <h2>OPC ENERGY</h2>
      <h2>OUR GOAL-ZERO HARM! SAFETY FIRST - <span>{new Date().toLocaleDateString()}</span></h2>
      <div className="timestamp" id="login-time">
        Last updated: {new Date().toLocaleString()}
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="employee-id">Employee ID:</label>
          <input
            type="text"
            id="employee-id"
            placeholder="Enter 4-digit ID"
            maxLength="4"
            pattern="\d{4}"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginScreen;
