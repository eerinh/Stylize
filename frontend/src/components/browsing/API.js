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

import React, { useState } from 'react';
import axios from 'axios';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Navbar from '../navbar/Navbar';
import './API.css';

const GoogleLensComponent = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [images, setImages] = useState([]);
    const [shoppingResults, setShoppingResults] = useState([]);

    const handleImageChange = (e) => {
        setImageUrl(e.target.value);
    };

    const fetchShoppingResults = async (keywords) => {
        try {
            const response = await axios.get('http://localhost:5001/api/google-shopping', {
                params: { q: keywords, api_key: '5b17ad02ca60c1ad6e91884b11d639da3c6ce842cff9023335a54a1fef35a398' } // Replace with your actual API key
            });
            setShoppingResults(response.data.shopping_results);
        } catch (error) {
            console.error('Error fetching shopping data:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/google-lens', { url: imageUrl });
            const visualMatches = response.data.visual_matches;
            const imageLinks = visualMatches.map(item => item.thumbnail);
            setImages(imageLinks);

            // Assuming the visual matches contain keywords or descriptions that can be used for shopping search
            const keywords = visualMatches.map(item => item.description).join(' ');
            fetchShoppingResults(keywords);
        } catch (error) {
            console.error('Error fetching Google Lens data:', error);
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
            <div className="search-content">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter image URL"
                        value={imageUrl}
                        onChange={handleImageChange}
                        className="image-url-input"
                    />
                    <button type="submit">Analyze</button>
                </form>
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
        </div>
    );
};

export default GoogleLensComponent;
