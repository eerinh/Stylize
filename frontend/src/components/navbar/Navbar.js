import React, { useState, useEffect, useCallback, useContext, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { ImageContext } from '../browsing/imageContext';  // Import the context
import './Navbar.css';
import Logo from '../../assets/Logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../database';
import { signOut } from 'firebase/auth';




function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [imageUrl] = useState('');
    const navigate = useNavigate();
    const { setImageUrl } = useContext(ImageContext);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [isLoading, setIsLoading] = useState(false); 
    const modalRef = useRef(); 



    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setIsAuthenticated(!!user); 
        });

        return () => unsubscribe(); 
    }, []);

    const onDrop = useCallback(async (acceptedFiles) => {
        setIsLoading(true); 
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ustwrvfd');

        const result = await axios.post('https://api.cloudinary.com/v1_1/dmqyrtczb/image/upload', formData);
        setIsModalOpen(false); 
        setImageUrl(result.data.url);
        setIsLoading(false);
        navigate('/api'); 
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accepts: 'image/*',
        multiple: false,
    });

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log('User signed out');
                navigate('/');  // Redirect to landing page after sign out

            })
            .catch((error) => {
                console.error('Error during sign out:', error);
            });
    };



    if (isAuthenticated) {
        return (
            <div className="navbar">
                <div className="nav-logo-container">
                    <img src={Logo} alt="Logo" />
                </div>
                <div className="nav-links">
                    <Link to="/trending">Home</Link>
                    <Link to="/boards">Boards</Link>
                    <Link to="/share">Favourites</Link>
                    <Link to="/profile">Profile</Link>
                    <Link to="/sizechart">Size Chart</Link>

                    <div className="nav-sign-out" onClick={handleSignOut}>Sign Out</div>

                </div>


                <div></div>
                <div className="nav-search-bar">
                    <input type="text" placeholder="Search..." />
                    <button onClick={() => setIsModalOpen(true)} disabled={isLoading}> {/* Disable button when loading */}
                        Upload Image
                    </button>

                    {isModalOpen && (
                        <div className="modal-nav">
                            <div className="modal-nav-content" ref={modalRef}>
                                <button onClick={() => setIsModalOpen(false)} disabled={isLoading}> {/* Disable button when loading */}
                                    Cancel
                                </button>
                                {isLoading ? <p>Loading...</p> : ( /* Conditionally render loading text */
                                    <div {...getRootProps()} style={styles.dropzone}>
                                        <input {...getInputProps()} />
                                        <p>Click here or drag & drop to upload an image</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    } else {
        return (
            <nav className="navbarlanding">
                <div className="nav-logo-container">
                    <Link to="/">
                        <img src={Logo} alt="Logo" />
                    </Link>
                </div>
                <div className="navbarLan-links-container">
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                    <Link to="/aboutus">About Us</Link>
                    <Link to="/help">Help</Link>
                </div>
            </nav>
        );
    }
}

const styles = {
    dropzone: {
        border: '2px dashed #cccccc',
        padding: '20px',
        cursor: 'pointer',
        marginTop: '10px'
    },
    image: {
        marginTop: '20px',
        maxWidth: '100%',
    },
};

export default Navbar;

