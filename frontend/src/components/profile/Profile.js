import React, { useState } from 'react';
import Navbar from '../browsing/Navbar';
import './Profile.css';
import { FaStar } from "react-icons/fa"; //importing requried files

function Profile() {
  //using useState hook
  const [userRating, setUserRating] = useState(null);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  //handling changes in the userating
  const handleRatingChange = (ratingValue) => {
    setUserRating(ratingValue);
  };

  //user clicks on the star
  const handleRatingClick = (ratingValue) => {
    setRating(ratingValue);
    handleRatingChange(ratingValue);
  };

  return (
    <div className='profile-nav'>
      <Navbar />
      <div className='profile-info'>
        <center><h1>Profile</h1></center>
      </div>
      <div>
        {/* five stars created */}
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;

          return (
            <label key={index}>
              <input type="radio" name="rating" onClick={() => handleRatingClick(ratingValue)} />
              <FaStar
                className="star"
                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                size={75}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
