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

import React, { useState, useContext, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Navbar from '../navbar/Navbar';
import './API.css';
import { ImageContext } from './imageContext';  // Import the context
import ecommerceWebsites from './ecommerceWebsites';
import { FaStar } from "react-icons/fa"; //importing requried files
import './rating.css';

const GoogleLensComponent = () => {
    const [images, setImages] = useState([]);
    const { imageUrl } = useContext(ImageContext); // Use context to get the imageUrl
    const loadMoreRef = useRef();  // Create a ref for the "load more" div
    const [page, setPage] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);  // New state to manage the selected image
    const [priceFilter, setPriceFilter] = useState('all'); // New state for price filter
    const [isFilterVisible, setIsFilterVisible] = useState(false); // New state to toggle filter visibility
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [areBrandsVisible, setAreBrandsVisible] = useState(false); // New state to toggle brand filters visibility
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


    useEffect(() => {
        const fetchResults = async () => {
            if (imageUrl) {
                try {
                    const response = await axios.post('http://localhost:5001/api/google-lens', { url: imageUrl });
                    const visualMatches = response.data.visual_matches || [];
                    const visualImageLinks = visualMatches
                        .filter(item => item.price || ecommerceWebsites.some(website => item.source && item.source.includes(website)));
                    //       .map(item => item.thumbnail);

                    console.log(visualImageLinks);
                    setImages(visualImageLinks);

                } catch (error) {
                    console.error('Error fetching Google Lens data:', error);
                }
            }
        };

        fetchResults();
    }, [imageUrl]);  // This useEffect hook will run every time imageUrl changes

    const openModal = (image) => {
        setSelectedImage(image);  // Set the selected image to state when an image is clicked
    };

    const closeModal = () => {
        setSelectedImage(null);  // Reset the selected image state when the modal is closed
    };

    const brands = [...new Set(images.map(image => image.source))];

    const toggleBrandsVisibility = () => {
        setAreBrandsVisible(!areBrandsVisible); // Toggle the visibility state of brand filters
    };

    const observer = useRef();
    const lastImageElementRef = useCallback(node => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPage(prevPage => prevPage + 1);
            }
        })
        if (node) observer.current.observe(node)
    }, [])

    const isEcommerceWebsite = (url) => {
        // Check if the URL contains the domain of any known e-commerce website
        return ecommerceWebsites.some(website => url.includes(website));
    };


    const filterByPrice = (item) => {
        console.log('Filtering item', item);  // Add log to check the items being processed
        if (priceFilter === 'all') return true;
        if (!item.price) return false;

        const value = parseFloat(item.price.extracted_value);
        if (isNaN(value)) return false;

        const [min, max] = priceFilter.split('-').map(Number);
        console.log('Price value:', value, 'Min:', min, 'Max:', max);  // Add log to check the filter values
        return value >= min && value <= max;
    };

    const filterImages = (item) => {
        const isPriceOk = filterByPrice(item);
        const isBrandOk = selectedBrands.length === 0 || selectedBrands.includes(item.source);
        return isPriceOk && isBrandOk;
    };

    const filteredImages = images.filter(filterImages);

    const handlePriceFilterChange = (e) => {
        setPriceFilter(e.target.value);
    };

    const handleBrandFilterChange = (e, brand) => {
        if (e.target.checked) {
            setSelectedBrands(prev => [...prev, brand]);
        } else {
            setSelectedBrands(prev => prev.filter(b => b !== brand));
        }
    };

    const imageItems = filteredImages.map((image, index) => (
        <div className="search-image-container"
            key={index}
            onClick={() => openModal(image)}  // Add click event to open modal with selected image
        >

            <img src={image.thumbnail} alt="" />
            <div className="search-image-text">
                <h3 className="search-image-title">{image.source || 'Shop'}</h3> {/* Display shop name, if available */}
                <p className="search-image-description">Price: {image.price ? image.price.value : 'Not Available'}</p> {/* Display price, if available */}
            </div>
        </div>
    ));


    const toggleFilterVisibility = () => {
        setIsFilterVisible(!isFilterVisible);
    };

    return (
        <div className="search">
            <Navbar />
            <h2>Shopping Results</h2>

            <button onClick={toggleFilterVisibility} className="filter-toggle-btn">
                {isFilterVisible ? 'Hide' : 'Show'} Filters
            </button>
            {isFilterVisible && (
                <div className="filters">
                    <label>Filter by price: </label>
                    <select value={priceFilter} onChange={handlePriceFilterChange}>
                        <option value="all">All</option>
                        <option value="0-50">$0 - $50</option>
                        <option value="50-100">$50 - $100</option>
                        <option value="100-500">$100 - $500</option>
                        <option value="500-1000">$500 - $1000</option>
                        <option value="1000-5000">$1000 - $5000</option>
                    </select>


                    <button onClick={toggleBrandsVisibility} className="brand-toggle-btn">
                        {areBrandsVisible ? 'Hide' : 'Show'} Brands
                    </button>

                    {areBrandsVisible && (  // Conditionally render brand filters based on areBrandsVisible state

                        <div className="brand-filters">
                            {brands.map((brand, index) => (
                                <div key={index}>
                                    <input
                                        type="checkbox"
                                        id={brand}
                                        name={brand}
                                        value={brand}
                                        onChange={e => handleBrandFilterChange(e, brand)}
                                    />
                                    <label htmlFor={brand}>{brand}</label>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
            <ResponsiveMasonry
                columnsCountBreakPoints={{ 300: 2, 500: 3, 700: 4, 900: 5 }}
            >
                <Masonry>{imageItems}</Masonry>
            </ResponsiveMasonry>

            {selectedImage && (
                <div className="modal fade-in" onClick={closeModal}>
                    <div className="modal-content">
                        <h2>{selectedImage.source || 'Shop'}</h2> {/* Display shop name as title, if available */}
                        <img src={selectedImage.thumbnail} alt="" />
                        <p>Price: {selectedImage.price ? selectedImage.price.value : 'Not Available'}</p> {/* Updated this line */}
                        <a href={selectedImage.link} target="_blank" rel="noreferrer">Go to Shop</a>

                        <div>
                            <p>Rate this match:</p>
                            {/* five stars created */}
                            {[...Array(5)].map((star, index) => {
                                const ratingValue = index + 1;

                                return (
                                    <label key={index}>
                                        <input type="radio" name="rating" onClick={() => handleRatingClick(ratingValue)} />
                                        <FaStar
                                            className="star"
                                            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                            size={50}
                                            onMouseEnter={() => setHover(ratingValue)}
                                            onMouseLeave={() => setHover(null)}
                                        />
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                </div>


            )}

        </div>
    );
};

export default GoogleLensComponent;
