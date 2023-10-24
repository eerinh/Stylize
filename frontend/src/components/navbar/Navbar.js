// import React, { useRef } from 'react';
// import './Navbar.css';
// import Logo from '../../assets/Logo.svg';
// import { Link } from 'react-router-dom';
// import firebase from 'firebase/app';
// import 'firebase/storage';
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';




// function Navbar() {
//     const fileInputRef = useRef(null);

//     const handleFileUpload = (e) => {
//         const file = e.target.files[0];
//         const storage = getStorage(); // Get Firebase storage instance
//         const storageRef = ref(storage, `images/${file.name}`);
//         const uploadTask = uploadBytesResumable(storageRef, file);

//         uploadTask.on(
//             'state_changed',
//             (snapshot) => {
//                 const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                 console.log('Upload is ' + progress + '% done');
//             },
//             (error) => {
//                 console.error('Upload error:', error);
//             },
//             () => {
//                 getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//                     console.log('File available at', downloadURL);
//                 });
//             }
//         );
//     };

//     const openFileInput = () => {
//         fileInputRef.current.click();
//     };

//     return (
//         <div className="navbar">
//             <div className="nav-logo-container">
//                 <img src={Logo} alt="Logo" />
//             </div>
//             <div className="nav-links">
//                 <Link to="/following">Home</Link>
//                 <Link to="/boards">Boards</Link>
//                 <Link to="/share">Social</Link>
//                 <Link to="/profile">Profile</Link>
//                 <Link to="/sizechart">Size Chart</Link>

//                 <div className="nav-sign-out">Sign Out</div>

//             </div>


//             <div></div>
//             <div className="nav-search-bar">
//                 <input type="text" placeholder="Search..." />
//                 <span className="upload-image-text" onClick={openFileInput}>
//                     Upload Image
//                 </span>
//                 <input
//                     type="file"
//                     accept="image/*"
//                     ref={fileInputRef}
//                     style={{ display: 'none' }}
//                     onChange={handleFileUpload}
//                 />

//             </div>
//             <div></div>
//         </div>
//     );
// }

// export default Navbar;


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
    const { setImageUrl } = useContext(ImageContext); // Use context to get the setImageUrl function
    const [isModalOpen, setIsModalOpen] = useState(false); // New state for controlling the modal
    const [isLoading, setIsLoading] = useState(false); // New state to track loading status
    const modalRef = useRef(); // Create a ref for the modal content



    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setIsAuthenticated(!!user); // Set isAuthenticated to true if user is not null
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

    const onDrop = useCallback(async (acceptedFiles) => {
        setIsLoading(true); // Set loading to true when starting the upload
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ustwrvfd');

        const result = await axios.post('https://api.cloudinary.com/v1_1/dmqyrtczb/image/upload', formData);
        setIsModalOpen(false); // Close modal when image is uploaded
        setImageUrl(result.data.url);
        setIsLoading(false); // Set loading to false when the upload is completed
        navigate('/api'); // Navigate to the API component after the image is uploaded and the URL is set
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accepts: 'image/*',
        multiple: false,
    });


    // const handleFileUpload = (e) => {
    //     const file = e.target.files[0];
    //     setUploadedFileName(file.name);  // Set file name to state
    //     const storage = getStorage(); // Get Firebase storage instance
    //     const storageRef = ref(storage, `images/${file.name}`);
    //     const uploadTask = uploadBytesResumable(storageRef, file);

    //     const openFileInput = () => {
    //         fileInputRef.current.click();
    //     };

    //     uploadTask.on(
    //         'state_changed',
    //         (snapshot) => {
    //             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //             console.log('Upload is ' + progress + '% done');
    //         },
    //         (error) => {
    //             console.error('Upload error:', error);
    //         },
    //         () => {
    //             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //                 console.log('File available at', downloadURL);
    //             });
    //         }
    //     );
    // };
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
                    <Link to="/following">Home</Link>
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

