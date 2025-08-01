import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import PositionSelection from './components/PositionSelection';
import ShiftSelection from './components/ShiftSelection';
import ChecklistScreen from './components/ChecklistScreen';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [position, setPosition] = useState(null);
  const [shiftInfo, setShiftInfo] = useState(null);

  const handleLogin = () => {
    setCurrentScreen('position');
  };

  const handlePositionSelect = (selectedPosition) => {
    setPosition(selectedPosition);
    setCurrentScreen('shift');
  };

  const handleShiftSelect = (shiftData) => {
    setShiftInfo(shiftData);
    setCurrentScreen('checklist');
  };

  const handleBackToLogin = () => {
    setCurrentScreen('login');
    setPosition(null);
    setShiftInfo(null);
  };

  return (
    <div className="app">
      {currentScreen === 'login' && <LoginScreen onLogin={handleLogin} />}
      {currentScreen === 'position' && (
        <PositionSelection 
          onPositionSelect={handlePositionSelect} 
          onBack={handleBackToLogin}
        />
      )}
      {currentScreen === 'shift' && (
        <ShiftSelection
          position={position}
          onShiftSelect={handleShiftSelect}
          onBack={() => setCurrentScreen('position')}
        />
      )}
      {currentScreen === 'checklist' && (
        <ChecklistScreen
          position={position}
          shiftInfo={shiftInfo}
          onLogout={handleBackToLogin}
        />
      )}
    </div>
  );
}

export default App;