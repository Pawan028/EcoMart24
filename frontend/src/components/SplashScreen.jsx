import React from 'react';
import logo from '../assets/logo.ico'; // Import your logo
import '../assets/styles/SplashScreen.css'; // Import the CSS file

const SplashScreen = () => {
  return (
    <div className="splash-container">
      <img src={logo} alt="Company Logo" className="splash-logo" />
      <div className="splash-spinner"></div> {/* Spinner animation */}
    </div>
  );
};

export default SplashScreen;
