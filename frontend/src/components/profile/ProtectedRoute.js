/*import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './pathToYourAuthHook'; // adjust the path to your actual auth hook

const ProtectedRoute = ({ element, ...rest }) => {
  const { user } = useAuth(); // assuming your auth hook provides user's auth status

  return user ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" /> // redirecting to login if not authenticated
  );
};

export default ProtectedRoute;*/

// This is a simplified example of what the ProtectedRoute component might look like

//ProtectedRoute is added for the purpose of authentication and authorization of the user
//If the user is not logged in, then the user will be redirected to the login page
//This is done by using the Navigate component from react-router-dom
//The Navigate component is used to redirect the user to a different route
//The Navigate component will be used in the ProtectedRoute component

//The database has been initialized in database.js

import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useCurrentUser } from './UserContext'; // use the user context you created
//import { auth, firestore } from '../database';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';

function ProtectedRoute({ element, ...rest }) {

    const user = useCurrentUser();
    //check if user is authenticated

    const isAuthenticated = !!user;

    if (!isAuthenticated) {
        return <Navigate 
        to="/login"
        state = {{ from: rest.path }} 
        />;
    }

    return <Route {...rest} element={element} />;

    //return user ? <Route {...rest} element={element} /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
