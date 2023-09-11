import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Navbar from './Navbar'; 
import './following.css'; // Import the corresponding CSS file

function following() {

  const items = Array.from({ length: 100 }).map((_, index) => (
    <img
      key={index}
      src={`https://picsum.photos/200/${Math.floor(
        Math.random() * (300 - 200 + 1) + 200
      )}`}
      style={{ width: "90%", margin: "10px", borderRadius: "10px" }}
    />
  ));

  return (
    <div className="following">
      <Navbar />
      <div className="content">
      <div className="nav-type-button">
                <a href="#" className="nav-button-left">Trending</a>
                <a href="#" className="nav-button-right">Following</a>
            </div>
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 300: 2, 500: 3, 700: 4, 900: 5 }}
        >
          <Masonry>{items}</Masonry>
        </ResponsiveMasonry>
      </div>
    </div>
  );
}

export default following;
