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




import React, { useRef, useContext, useState, useEffect } from 'react';
import './Navbar.css';
import Logo from '../../assets/Logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { app, firestore } from '../database'; // Import the Firebase app instance
import 'firebase/storage'; // Import other Firebase services as needed

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Login from '../account/Login'; // Import the Login component




// We may want to use context or state management to manage authentication state

 // not sure about this 
 const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Add Firebase authentication state change listener here
    const unsubscribe = firestore.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is logged in
        setUser(authUser);
      } else {
        // User is not logged in
        setUser(null);
      }
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

function Navbar() {
    // const history = useHistory();
    const fileInputRef = useRef(null);
    const authContext = useContext(AuthContext);

    const handleFileUpload = (e) => {

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
    };

    const openFileInput = () => {
        fileInputRef.current.click();
    };

    const handleSignOut = () => {
        // Perform sign out logic here
        // For example, clear authentication state and redirect to the login page
        authContext.setIsLoggedIn(false);
  //      history.push('/login');
    };

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

                {authContext.isLoggedIn ? (
                    <div className="nav-sign-out" onClick={handleSignOut}>Sign Out</div>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>

            <div></div>
            <div className="nav-search-bar">
                <input type="text" placeholder="Search..." />
                {authContext.isLoggedIn && (
                    <span className="upload-image-text" onClick={openFileInput}>
                        Upload Image
                    </span>
                )}
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
