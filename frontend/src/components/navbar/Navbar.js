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


import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import Logo from '../../assets/Logo.svg';
import { Link, useNavigate } from 'react-router-dom';  // Add useNavigate
import firebase from 'firebase/app';
import 'firebase/auth';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { auth } from '../database'; // Import Firebase auth
import { signOut } from 'firebase/auth';



function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication
    const fileInputRef = useRef(null);
    const navigate = useNavigate();  // Get the navigate function


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setIsAuthenticated(!!user); // Set isAuthenticated to true if user is not null
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

    const handleFileUpload = (e) => {
        // ... (same as before)
    };

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

    const openFileInput = () => {
        fileInputRef.current.click();
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
                    <Link to="/share">Social</Link>
                    <Link to="/profile">Profile</Link>
                    <Link to="/sizechart">Size Chart</Link>

                    <div className="nav-sign-out" onClick={handleSignOut}>Sign Out</div>

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
    } else {
        return (
            <nav className="navbarlanding">
                <div className="navLan-logo-container">
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

export default Navbar;

