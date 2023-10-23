//Context API - manages user data globally across all components

/*import React, {createContext, useState, useEffect} from 'react';
import {auth} from './firebase';

import {useContext} from 'react';
import {UserContext} from './UserContext';

export const UserContext = createContext();

//To provide useres authentication data to all child components in React applicaiton
//ensure when user sign-in state changes, all components consuming context are updated
export const UserProvider = (props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged((userAuth) => {
            setUser(userAuth);
        });
    }, []);

    return (
        <UserContext.Provider value={user}>
            {props.children}
        </UserContext.Provider>
    );

    
};

export function useUser() {
    return useContext(UserContext);
}*/

//UserContext.js is used to create a context for the user data and provide it to all child components in the React application.


import { createContext, useContext, useState, useEffect } from 'react';
//import { auth } from './database'; // Import your auth from Firebase setup
import { auth } from "../database";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    return (
        <UserContext.Provider value={currentUser}>
            {children}
        </UserContext.Provider>
    );
};

export const useCurrentUser = () => useContext(UserContext);
