import React from 'react';
import './Landing.css';
import Navbar from './NavbarLanding';
import backgroundImage from '../../assets/background.jpg';

const LandingPage = () => {
  return (
    <div className="landing-background" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Navbar />
      <div className="landing-page">
        <div className="landing-content">
          <div className="landing-text-container">
            <h1 className="landing-headline">Discover, Match</h1>
            <h1 className="landing-headline">Stylize</h1>
          </div>
          <div className="landing-button-container">
            {/* <a href="ADD LINK HERE"> */}
              <button className="landing-start-button">Get started</button>
            {/* </a> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
