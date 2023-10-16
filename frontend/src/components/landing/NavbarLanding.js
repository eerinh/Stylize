// NavbarLanding.js

import React from "react";
import Logo from "../../assets/Logo.svg";
import { Link } from 'react-router-dom';

import './NavBarLanding.css';
import Login from '../account/Login'; // Import the Login component


const NavbarLanding = () => {
  return (
    <nav className="navbarlanding">
      <div className="navLan-logo-container">
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
      </div>
      <div className="navbarLan-links-container">
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/aboutus">About Us</Link>
        <Link to="/help">Help</Link>
      </div>
    </nav>
  );
};

export default NavbarLanding;
