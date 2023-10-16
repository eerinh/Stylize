import React from 'react';
import Navbar from '../navbar/Navbar';
import './Boards.css'; // Import the required files

function Boards() {
  return (
    <div className='board-nav'>
      <Navbar />
      <center><h1>Your Boards</h1></center>
    </div>
  );
}

export default Boards;
