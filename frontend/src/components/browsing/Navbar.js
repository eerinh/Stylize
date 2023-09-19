import React from 'react';
import './Navbar.css'; // Import the corresponding CSS file
import Logo from '../../assets/Logo.svg';

function Navbar() {
    return (
        <div className="navbar">
            <div className="nav-logo-container">
                <img src={Logo} alt="Logo" />
            </div>
            <div className="nav-links">
                <a href="#">Home</a>
                <a href="#">Boards</a>
                <a href="#">Social</a>
                <a href="#">Profile</a>
                <div className="sign-out">Sign Out</div>
            </div>
            <div></div>
            <div className="search-bar">
                <input type="text" placeholder="Search..." />
            </div>
            <div></div>
        </div>
    );
}

export default Navbar;
