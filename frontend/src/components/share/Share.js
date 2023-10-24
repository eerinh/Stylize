import React, { useState, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Navbar from '../navbar/Navbar';
import './Share.css';
import { firestore } from "../database";
import { getDocs, collection } from "firebase/firestore";
import { Link } from 'react-router-dom';


function Share() {
  const [imageData, setImageData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // New state to manage the selected image


  useEffect(() => {
    const sharedImagesCollection = collection(firestore, "savedImages");

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
    setSelectedImage(data);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const items = imageData.map((data, index) => (

    <div className="share-image-container" key={index} onClick={() => openModal(data)}>
      <img
        src={data.thumbnailUrl}
        alt=""
      />
      <div className="share-image-text">
        <h3 className="share-image-title">{data.brand}</h3>
        <p className="share-image-description">{data.price}</p>
      </div>
    </div>
  ));



  return (
    <>
      <div className="share">
        <Navbar />
        <h2>My Favourites</h2>

        <ResponsiveMasonry
          columnsCountBreakPoints={{ 300: 2, 500: 3, 700: 4, 900: 5 }}
        >
          <Masonry>{items}</Masonry>
        </ResponsiveMasonry>
      </div>

      {selectedImage && (
        <div className="modal-s fade-in-s" onClick={closeModal}>  {/* Updated class name */}
          <div className="modal-s-content">  {/* Updated class name */}
            <h2>{selectedImage.brand}</h2>
            <img src={selectedImage.thumbnailUrl} alt="" />
            <p>{selectedImage.price}</p>
            <a href={selectedImage.url} target="_blank" rel="noopener noreferrer">
              Go to Store
            </a>

          </div>
        </div>
      )}
    </>
  );
}

export default Share;
