import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import './Profile.css';

const Profile = () => {
  return (
    <div className="profile">
      <Navbar />
      <div className="profile-content">
        <h2>User Profile</h2>
      </div>
    </div>
  );
};

export default Profile;
