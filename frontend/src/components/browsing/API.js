import React, { useState, useContext, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Navbar from '../navbar/Navbar';
import './API.css';
import { ImageContext } from './imageContext';  // Import the context
import ecommerceWebsites from './ecommerceWebsites';
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { auth } from '../database';
import PostForm from './postForm';  // Adjust the path based on your directory structure
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'; //

import Share from '../share/Share';

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
    const [likedItems, setLikedItems] = useState([]);


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

    const handleLike = async (e, image) => {
        e.stopPropagation(); // Prevent the click event from propagating up to the parent div

        if (!auth.currentUser) {
            console.error("No user is authenticated");
            return;
        }
        const userEmail = auth.currentUser.email;

        setLikedItems(prev => [...prev, image]);

        // Add to Firebase
        const db = getFirestore();
        try {
            await addDoc(collection(db, "savedImages"), {
                brand: image.source,
                email: userEmail, // assuming 'values' contains the email of the logged-in user
                price: image.price ? image.price.value : 'Not Available',
                url: image.link,
                thumbnailUrl: image.thumbnail // or store the URL in Firebase Storage and save the download URL here
            });
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };


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
                        <div className="title-container">
                            <h2>{selectedImage.source || 'Shop'}</h2>
                            <i
                                className={`fa ${likedItems.includes(selectedImage) ? 'fa-heart' : 'fa-heart-o'}`}
                                onClick={(e) => !likedItems.includes(selectedImage) && handleLike(e, selectedImage)}
                            ></i>
                            <FontAwesomeIcon
                                icon={faPenToSquare}
                                onClick={(e) => {
                                    e.stopPropagation(); 
                                    togglePostForm();
                                }}
                                className="post-icon"
                            />                        </div>
                        <img src={selectedImage.thumbnail} alt="" />
                        <p>Price: {selectedImage.price ? selectedImage.price.value : 'Not Available'}</p>
                        <a href={selectedImage.link} target="_blank" rel="noreferrer">Go to Shop</a>
                        <Share selectedImage={selectedImage}/>
                    </div>
                </div>
            )}


            <PostForm isVisible={isPostFormVisible} onClose={() => setPostFormVisible(false)}    selectedImage={selectedImage}
 />


        </div>
    );
};

export default GoogleLensComponent;
