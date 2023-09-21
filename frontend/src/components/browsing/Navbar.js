import React, { useRef } from 'react';
import './Navbar.css';
import Logo from '../../assets/Logo.svg';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/storage';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';




function Navbar() {
    const fileInputRef = useRef(null);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const storage = getStorage(); // Get Firebase storage instance
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                console.error('Upload error:', error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                });
            }
        );
    };

    const openFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="navbar">
            <div className="nav-logo-container">
                <img src={Logo} alt="Logo" />
            </div>
            <div className="nav-links">
                <Link to="/following">Home</Link>
                <a href="#">Boards</a>
                <Link to="/share">Social</Link>
                <a href="#">Profile</a>

                <div className="nav-sign-out">Sign Out</div>
            </div>


            <div></div>
            <div className="nav-search-bar">
                <input type="text" placeholder="Search..." />
                <span className="upload-image-text" onClick={openFileInput}>
                    Upload Image
                </span>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
                />

            </div>
            <div></div>
        </div>
    );
}

export default Navbar;
