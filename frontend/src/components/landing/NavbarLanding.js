// NavbarLanding.js

import React from "react";
import Logo from "../../assets/Logo.svg";
import './NavBarLanding.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo-container">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="navbar-links-container">
        <a href="#">Login</a>
        <a href="#">Signup</a>
        <a href="#">About Us</a>
        <a href="#">Help</a>
      </div>
    </nav>
  );
};

export default Navbar;
