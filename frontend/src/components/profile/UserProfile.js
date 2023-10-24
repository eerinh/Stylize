//To create a page that lets users have their own separate profiles every time they log in so that they can view their own data and edit it, 
//we need to create a new component called UserProfile.js. This component will be a protected route, 
//meaning that only logged-in users can access it. We will use the useUser hook to get the user data from the 
//UserContext and display it on the page. We will also use the useAuth hook to redirect users to the login page if they are not logged in. 

//We will also create a new component called EditProfile.js. This component will be a protected route,

//meaning that only logged-in users can access it. We will use the useUser hook to get the user data from the UserContext and display it on the page.
// We will also use the useAuth hook to redirect users to the login page if they are not logged in.

// UserProfile.js is a component used to display the information of users

/*import React, {useEffect} from 'react';
import {useUser} from './useUser';

const UserProfile = () => { 
const user = useUser();
const isAuthenticated = useAuth();
const history = useHistory();


useEffect(() => {
    if (!isAuthenticated) // if not authenticated, user gets redirected to login
    {
        history.push('/login');        
    }
}, [isAuthenticated, history]);

if (!user) //indicator to show user is loading

    return null; //can replace with loading indicator

    return (
        <div>
            <h1>User Profile</h1>
            <p><strong>Name: </strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
        </div>

    )

};

export default UserProfile;*/

// This is a simplified example. 
// You should retrieve user data from Firebase and allow fields to be edited.
//import { useState, useEffect } from 'react';
//import { auth, firestore } from '../database'; // Import your firestore from Firebase setup
import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';





function Profile() {
    const [userData, setUserData] = useState({}); // user data state
    const [message, setMessage] = useState(''); 

    const auth = getAuth();
    const db = getFirestore();

    useEffect(() => {

        const currentUser = auth.currentUser;
        if (currentUser) {
            //const userRef = firestore.collection('users').doc(currentUser.uid);
            const userRef = doc(db, 'users', currentUser.uid);

            //userRef.get().then((doc) 
            getDoc(userRef).then((docSnap) => {
                if (docSnap.exists()) {
                    setUserData(doc.data());
                }
                else {
                    console.log('No such document!');
                }
            })
                .catch((error) => {
                    console.log('Error getting document:', error);
                });
            }
        }, [auth, db]);

    // Here, you'd implement a function to handle data updates
    // and another function to save the updates to Firebase

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };


    const handleSaveChanges = () => {
        const currentUser = auth.currentUser;
        if (currentUser) {

           let specificDoc = "001"; // or "S2" or whatever document you're targeting
            const userRef = doc(db, 'userProfile', specificDoc);
            //const userRef = doc(db, 'userProfile', currentUser.uid);
            updateDoc(userRef, userData)
                .then(() => {

                    // create pop up to show user a message
                    
                    alert(' Changes saved successfully!' );

                    //setMessage('Profile updated successfully!');
                    //setTimeout(() => setMessage(''), 3000);

                })

                .catch((error) => {
                    //alert('Failed to update profile: ' + error.message);
                    alert('Failed to update profile: ' );

                    // Convert to integer and increment
                    let incrementedValue = parseInt(specificDoc, 10) + 1; // The "10" here specifies base-10 numbering

                    // Convert back to string, preserving the leading zeros
                    specificDoc = incrementedValue.toString().padStart(3, '0');

                console.log(specificDoc); // Outputs: "002"
                })
                .catch((error) => {
                    alert('Failed to update profile: ' + error.message);
                });
        }
    };

    


    return (
        // Return a form or detailed page displaying user data 
        // with input fields pre-populated with current data,
        // which can be edited and saved.

        <div style={{ display: 'flex' }}>
            <div style={{
                padding: '20px',
                borderRadius: '10px',
                background: '#f0f0f0',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                margin: '20px',
                minWidth: '300px',
            }}>
                <h2>Profile</h2>
                <p><strong>Name: </strong>{userData.name}</p>
                <p><strong>Email: </strong>{userData.email}</p>
                <p><strong>Message: </strong>{userData.message}</p>
                {/* Add other fields as necessary */}
            </div>
            <div style={{ flex: 1, marginLeft: '20px' }}>
                <h2>Edit Profile</h2>
                {message && <div>{message}</div>}
                <form>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={userData.name || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="text"
                            name="email"
                            value={userData.email || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>About Me:</label>
                        <textarea
                            name="message"
                            value={userData.message || ''}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                    {/* Add other fields as necessary */}
                    <button type="button" onClick={handleSaveChanges}>Save Changes</button>
                </form>
            </div>
        </div>


    );
}

export default Profile;
