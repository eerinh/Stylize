import React, { useState, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Navbar from './Navbar';
import './following.css'; // Import the corresponding CSS file


function Following() {
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    const sharedImagesCollection = collection(db, "sharedImages");

    // Fetch the image data
    getDocs(sharedImagesCollection).then((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        const imageData = doc.data();
        data.push(imageData);
      });
      setImageData(data);
    });
  }, [db]);


  const items = imageData.map((data, index) => (

    <div className="following-image-container" key={index}>
      <img
        src={data.URL}
        alt=""
      />
      <div className="following-image-text">
        <h3 className="following-image-title">{data.title}</h3>
        <p className="following-image-description">{data.description}</p>
      </div>
    </div>
  ));

  return (
    <div className="following">
      <Navbar />
      <div className="following-content">
        <div className="following-nav-type-button">
          <a href="#" className="following-nav-button-left">Trending</a>
          <a href="#" className="following-nav-button-right">Following</a>
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

export default Following;