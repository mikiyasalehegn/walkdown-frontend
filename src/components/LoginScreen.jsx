import React, { useState } from 'react';
import axiosInstance from "../../axios/axiosConfig"; // Update the path as needed

const LoginScreen = ({ onLogin, onShowRegistration, navigate }) => {
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Email validation: must end with @siemens-energy.com
    if (
      !employeeEmail ||
      !/^[A-Za-z0-9._%+-]+@siemens-energy\.com$/.test(employeeEmail)
    ) {
      alert('Please enter a valid Siemens Energy email (e.g., gashaw.tadie@siemens-energy.com)');
      return;
    }
    if (!password) {
      alert('Please enter your password');
      return;
    }
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/users/login", {
        email: employeeEmail,
        password: password,
      });
      alert("Login Successfully!");
      const user = {
        username: data.username,
        userid: data.userId,
      };
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(user));
      if (navigate) navigate("/");
      if (onLogin) onLogin(data);
    } catch (error) {
      alert("Something went wrong");
      console.log(error.stack);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form">
      {/* Logos side by side */}
      <div
        className="logo-container"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '32px',
          marginBottom: '16px'
        }}
      >
        <img
          src="/Images/99Asset-4@2x.png"
          alt="99Asset Logo"
          className="logo"
          style={{ height: '60px', objectFit: 'contain' }}
        />
        <img
          src="/Images/Siemens-Energy-logo-1.png"
          alt="Siemens Energy Logo"
          className="logo"
          style={{ height: '60px', objectFit: 'contain' }}
        />
      </div>

      <h1 className="walkdow_title">WALKDOWN</h1>
      <h2>
        OUR GOAL-ZERO HARM!
      </h2>
      <h2>
        SAFETY FIRST - <span>{new Date().toLocaleDateString()}</span>
      </h2>
      <div className="timestamp" id="login-time">
        Last updated: {new Date().toLocaleString()}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="employee-email">Employee Email:</label>
          <input
            type="email"
            id="employee-email"
            placeholder="Enter your Siemens Energy email"
            value={employeeEmail}
            onChange={(e) => setEmployeeEmail(e.target.value)}
            required
            pattern="^[A-Za-z0-9._%+-]+@siemens-energy\.com$"
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
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {/* Registration link */}
      <div className="registration-link">
        <p>Don't have an account?</p>
        <button type="button" onClick={onShowRegistration}>
          Create a new account
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
