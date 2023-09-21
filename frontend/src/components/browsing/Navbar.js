import React from 'react';
import './Navbar.css';
import Logo from '../../assets/Logo.svg';
import { Link } from 'react-router-dom';


function Navbar() {
    return (
        <div className="navbar">
            <div className="nav-logo-container">
                <img src={Logo} alt="Logo" />
            </div>
            <div className="nav-links">
                <Link to="/following">Home</Link>
                <a href="#">Boards</a>
                <a href="#">Social</a>
                <a href="#">Profile</a>

                <div className="nav-sign-out">Sign Out</div>
            </div>


            <div></div>
            <div className="nav-search-bar">
                <input type="text" placeholder="Search..." />
            </div>
            <div></div>
        </div>
    );
}

export default Navbar;
