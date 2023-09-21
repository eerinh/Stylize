// GoogleLensComponent.js
import React, { useState } from 'react';
import axios from 'axios';
import Masonry from 'react-masonry-css';
import "./API.css";

const GoogleLensComponent = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [images, setImages] = useState([]);

    const handleImageChange = (e) => {
        setImageUrl(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/google-lens', { url: imageUrl });
            
            const visualMatches = response.data.visual_matches;
            
            // Extract image links from visualMatches, ensuring they have valid images
            console.log(response.data);
            

            const imageLinks = visualMatches.map(item => item.link);

                console.log(imageLinks);

            setImages(imageLinks);
        } catch (error) {
            console.error('Error fetching Google Lens data:', error);
        }
    };
    

    const breakpointColumnsObj = {
        default: 3,
        1100: 3,
        700: 2,
        500: 1
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter image URL"
                    value={imageUrl}
                    onChange={handleImageChange}
                />
                <button type="submit">Analyze</button>
            </form>

            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
                {images.map((imgUrl, index) => (
                    <img key={index} src={imgUrl} alt="Masonry Content" />
                ))}
            </Masonry>
        </div>
    );
};

export default GoogleLensComponent;
