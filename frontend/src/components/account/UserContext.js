import React, { createContext, useContext, useReducer } from 'react';

//create new user context using the createContext function
const UserContext = createContext();

//define initial state for the user context
const initialState = {
  user: null, //intially no user is logged in
  isLoggedIn: false, //initially the user is not logged in
};

//create a user reducer function to manage state updates
const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      //if the action type is LOGIN, update the state to set the user and mark them as logged in.
      return {
        user: action.payload.user, //set the user to the payload provided in the action
        isLoggedIn: true, //mark the user as logged in
      };
    case 'LOGOUT':
      //if the action type is LOGOUT, update the state to clear the user and mark them as not logged
      return {
        user: null, //clear user info
        isLoggedIn: false, //mark user as not logged in
      };
    default:
      //if action type doesnt match any known actions, return the current state.
      return state;
  }
};

//create user provider component to wrap the application with the user context
export const UserProvider = ({ children }) => {
  //use the useReducer hook to manage the user state using the userReducer and intialState
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    //provide the usre state and dispatch function via the UserContext.Provider 
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

//create a custom hook, useUser, to access the user context's state and dispatch function.
export const useUser = () => {
  //use the useContext hook to retrieve the user state and dispatch function from the UserContext
    console.log('UserContext state:', UserContext);
  return useContext(UserContext);
};
