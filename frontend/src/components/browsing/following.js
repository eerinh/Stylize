import React, { useState, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Navbar from './Navbar';
import './following.css'; // Import the corresponding CSS file
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBxQ2QxWXu3wIdercIR1uevcVOZyPE9gWc",
  authDomain: "imagestore-8635a.firebaseapp.com",
  projectId: "imagestore-8635a",
  storageBucket: "imagestore-8635a.appspot.com",
  messagingSenderId: "804414393725",
  appId: "1:804414393725:web:d98a3330443fcc78e1d014"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function Following() {
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    // Reference to your sharedImages collection
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

    <div className="image-container" key={index}>
      <img
        src={data.URL}
        alt=""
      />
      <div className="image-text">
        <h3 className="image-title">{data.title}</h3>
        <p className="image-description">{data.description}</p>
      </div>
    </div>
  ));

  return (
    <div className="App">
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

export default Following;