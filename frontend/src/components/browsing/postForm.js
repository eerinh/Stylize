// PostForm.js
import React, { useState } from 'react';  // <-- useState import added
import './postForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { firestore, auth } from '../database';
import { collection, addDoc } from 'firebase/firestore';
import { FaStar } from "react-icons/fa";


const PostForm = ({ isVisible, onClose, selectedImage }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [userRating, setUserRating] = useState(null);  //for the stars 
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    if (!isVisible) return null;

    //handling changes in the userating
    const handleRatingChange = (ratingValue) => {
        setUserRating(ratingValue);
    };

    //user clicks on the star
    const handleRatingClick = (ratingValue) => {
        setRating(ratingValue);
        handleRatingChange(ratingValue);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const userEmail = auth.currentUser?.email;

        if (!userEmail) {
            console.error("No user is authenticated");
            return;
        }

        const sharedImage = {
            url: selectedImage.link,
            thumbnailUrl: selectedImage.thumbnail,
            description,
            title,
            userEmail,
            userUploadTime: new Date().toISOString()
        };
        try {
            await addDoc(collection(firestore, "sharedImages"), sharedImage);
            onClose();
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };


    return (
        <div className="post-form-modal">
            <div className="post-form-content">
                {/* Use FontAwesome icon for the close button */}
                <FontAwesomeIcon
                    icon={faTimes}
                    onClick={onClose}
                    className="close-icon"
                />

                <h2>Create a Post</h2>

                <img src={selectedImage.thumbnail} alt="Selected Thumbnail" className="post-form-thumbnail" />

                <form onSubmit={handleFormSubmit}>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter post title" />

                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter post description"></textarea>

                    <a href={selectedImage.link} target="_blank" rel="noreferrer" className="go-to-store-link">Go to Store</a>


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

                    <div><br></br></div>


                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};


export default PostForm;
