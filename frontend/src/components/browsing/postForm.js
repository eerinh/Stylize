// PostForm.js
import React, { useState } from 'react';  // <-- useState import added
import './postForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { firestore, auth } from '../database';
import { collection, addDoc } from 'firebase/firestore';

const PostForm = ({ isVisible, onClose, selectedImage }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    if (!isVisible) return null;

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

                    <a href={selectedImage.link} target="_blank" rel="noreferrer" className="go-to-store-link">Go to Store</a>
                    
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter post description"></textarea>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};


export default PostForm;
