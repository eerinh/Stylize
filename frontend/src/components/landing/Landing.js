import React from 'react';
import './Landing.css';
import Navbar from '../navbar/Navbar';
import backgroundImage from '../../assets/background.jpg';
import { Link } from 'react-router-dom';

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
           <Link to = "/signup">
              <button className="landing-start-button">Get started</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
