

// LandingPage.js

import React from 'react';
import './Landing.css';
import Navbar from './NavbarLanding';
import backgroundImage from '../../assets/background.jpg';

const LandingPage = () => {
  return (
    <div className="background" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Navbar />
      <div className="landing-page">
        <div className="content">
          <div className="text-container">
            <h1 className="headline">Discover, Match</h1>
            <h1 className="headline">Stylize</h1>
          </div>
          <div className="button-container">
            {/* <a href="ADD LINK HERE"> */}
              <button className="start-button">Get started</button>
            {/* </a> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
