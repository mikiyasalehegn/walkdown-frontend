import React, { useState } from 'react';
import axiosInstance from "../../axios/axiosConfig"; // Adjust the path if needed

const RegistrationScreen = ({ onRegister, onBackToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Email validation: must end with @siemens-energy.com
    if (
      !formData.email ||
      !/^[A-Za-z0-9._%+-]+@siemens-energy\.com$/.test(formData.email)
    ) {
      alert('Please enter a valid Siemens Energy email (e.g., gashaw.tadie@siemens-energy.com)');
      return;
    }
    if (!formData.password) {
      alert('Please enter your password');
      return;
    }
    if (formData.password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/users/register", {
        username: formData.username,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });
      alert("Registration Successful!");
      if (onRegister) onRegister(data);
    } catch (error) {
      alert("Something went wrong");
      console.log(error.stack);
    } finally {
      setLoading(false);
    }
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
      
      <h1>Create New Account</h1>
      <div className="timestamp" id="registration-time">
        Last updated: {new Date().toLocaleString()}
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Employee Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your Siemens Energy email"
            value={formData.email}
            onChange={handleInputChange}
            required
            pattern="^[A-Za-z0-9._%+-]+@siemens-energy\.com$"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter password (min 6 characters)"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        <button type="button" className="secondary" onClick={onBackToLogin} style={{ marginTop: '10px' }}>
          Back to Login
        </button>
      </form>
    </div>
  );
};

export default RegistrationScreen;