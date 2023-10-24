import React, { useState, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Navbar from '../navbar/Navbar';
import './trending.css'; // Import the corresponding CSS file
import { firestore } from "../database";
import { getDocs, collection } from "firebase/firestore";
import { Link } from 'react-router-dom';


function Trending() {
  const [imageData, setImageData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // New state to manage the selected image


  useEffect(() => {
    const sharedImagesCollection = collection(firestore, "sharedImages");

    // Fetch the image data
    getDocs(sharedImagesCollection).then((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        const imageData = doc.data();
        data.push(imageData);
      });
      setImageData(data);
    });
  }, []);

  const openModal = (data) => {
    setSelectedImage(data); // Set the selected image to state when an image is clicked
  };

  const closeModal = () => {
    setSelectedImage(null); // Reset the selected image state when the modal is closed
  };

  const items = imageData.map((data, index) => (

    <div className="trending-image-container" key={index} onClick={() => openModal(data)}> {/* Add click event to open modal with selected image */}
      <img
        src={data.thumbnailUrl}
        alt=""
      />
      <div className="trending-image-text">
        <h3 className="trending-image-title">{data.title}</h3>
        <p className="trending-image-description">{data.description}</p>
      </div>
    </div>
  ));



  return (
    <div className="trending">
      <Navbar />
      <div className="trending-content">
        <div className="trending-nav-type-button">
          <a href="/" className="trending-nav-button-left">Trending</a>
          <Link to="/following" className="trending-nav-button-right">Following</Link>
        </div>
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 300: 2, 500: 3, 700: 4, 900: 5 }}
        >
          <Masonry>{items}</Masonry>
        </ResponsiveMasonry>
      </div>

      {selectedImage && (
        <div className="modal-f fade-in-f" onClick={closeModal}>  {/* Updated class name */}
          <div className="modal-f-content">  {/* Updated class name */}
            <h2>{selectedImage.title}</h2>
            <img src={selectedImage.thumbnailUrl} alt="" />
            <p>{selectedImage.description}</p>
            <p>Username: placeholder</p> {/* Placeholder for username */}
                        <a href={selectedImage.url} target="_blank" rel="noopener noreferrer">
                Go to Store
            </a>

          </div>
        </div>
      )}
    </div>
    
  );
}

export default Trending;
