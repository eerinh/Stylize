// import React, { useState } from 'react';
// import axios from 'axios';
// import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";  // Import ResponsiveMasonry
// import Navbar from '../navbar/Navbar';  // Import Navbar
// import './API.css';  // Update the path if needed

// const GoogleLensComponent = () => {
//     const [imageUrl, setImageUrl] = useState('');
//     const [images, setImages] = useState([]);

//     const handleImageChange = (e) => {
//         setImageUrl(e.target.value);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:5001/api/google-lens', { url: imageUrl });
//             const visualMatches = response.data.visual_matches;
//             const imageLinks = visualMatches.map(item => item.thumbnail);
//             setImages(imageLinks);
//         } catch (error) {
//             console.error('Error fetching Google Lens data:', error);
//         }
//     };

//     const items = images.map((imgUrl, index) => (
//         <div className="search-image-container" key={index}>
//             <img src={imgUrl} alt="" />
//             <div className="search-image-text">
//                 <h3 className="search-image-title">Image {index + 1}</h3>  {/* Placeholder, adapt as needed */}
//                 <p className="search-image-description">Description here</p>  {/* Placeholder, adapt as needed */}
//             </div>
//         </div>
//     ));

//     return (
//         <div className="search">
//             <Navbar />
//             <div className="search-content">
//                 <form onSubmit={handleSubmit}>
//                     <input
//                         type="text"
//                         placeholder="Enter image URL"
//                         value={imageUrl}
//                         onChange={handleImageChange}
//                         className="image-url-input" 
//                     />
//                     <button type="submit">Analyze</button>
//                 </form>
//                 <ResponsiveMasonry
//                     columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
//                 >
//                     <Masonry>{items}</Masonry>
//                 </ResponsiveMasonry>
//             </div>
//         </div>
//     );
// };

// export default GoogleLensComponent;

import React, { useState , useContext, useEffect} from 'react';
import axios from 'axios';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Navbar from '../navbar/Navbar';
import './API.css';
import { ImageContext } from './imageContext';  // Import the context


const GoogleLensComponent = () => {
    const [images, setImages] = useState([]);
    const [shoppingResults, setShoppingResults] = useState([]);
    const { imageUrl } = useContext(ImageContext); // Use context to get the imageUrl

    useEffect(() => {
        const fetchResults = async () => {
            if (imageUrl) {
                try {
                    const response = await axios.post('http://localhost:5001/api/google-lens', { url: imageUrl });
                    const visualMatches = response.data.visual_matches;
                    const imageLinks = visualMatches.map(item => item.thumbnail);
                    setImages(imageLinks);

                    const keywords = visualMatches.map(item => item.description).join(' ');
                    await fetchShoppingResults(keywords);
                } catch (error) {
                    console.error('Error fetching Google Lens data:', error);
                }
            }
        };

        fetchResults();
    }, [imageUrl]);  // This useEffect hook will run every time imageUrl changes

    const fetchShoppingResults = async (keywords) => {
        try {
            const response = await axios.get('http://localhost:5001/api/google-shopping', {
                params: { q: keywords, api_key: 'your-api-key' }
            });
            setShoppingResults(response.data.shopping_results);
        } catch (error) {
            console.error('Error fetching shopping data:', error);
        }
    };

    const imageItems = images.map((imgUrl, index) => (
        <div className="search-image-container" key={index}>
            <img src={imgUrl} alt="" />
            <div className="search-image-text">
                <h3 className="search-image-title">Image {index + 1}</h3>  {/* Placeholder, adapt as needed */}
                <p className="search-image-description">Description here</p>  {/* Placeholder, adapt as needed */}
            </div>
        </div>
    ));

    const shoppingItems = shoppingResults.map((result, index) => (
        <div key={index}>
            <h4>{result.title}</h4>
            <img src={result.thumbnail} alt={result.title} />
            <p>{result.price}</p>
            <a href={result.link} target="_blank" rel="noopener noreferrer">View Product</a>
        </div>
    ));

    return (
        <div className="search">
            <Navbar />
            
                <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                >
                    <Masonry>{imageItems}</Masonry>
                </ResponsiveMasonry>
                <h2>Shopping Results</h2>
                <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                >
                    <Masonry>{shoppingItems}</Masonry>
                </ResponsiveMasonry>
            </div>
    );
};

export default GoogleLensComponent;
