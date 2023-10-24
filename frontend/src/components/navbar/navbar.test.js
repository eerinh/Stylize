import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ImageContext } from '../browsing/imageContext';
import Navbar from './Navbar';
import { auth } from '../database';

import { signOut } from 'firebase/auth';

const axios = require('axios');
jest.mock('axios', () => ({
    post: jest.fn().mockResolvedValue({ data: {} }) // Mocks axios.post() method
}));
jest.mock('../database', () => ({
    auth: {
        onAuthStateChanged: jest.fn(callback => {
            callback(true);  // Simulate an authenticated user
            return () => {};  // This is a dummy unsubscribe function
        })
    }
}));
jest.mock('firebase/auth', () => ({
    signOut: jest.fn(() => Promise.resolve("User signed out!"))
  }));

const mockSetImageUrl = jest.fn();

const MockImageContextProvider = ({ children }) => {
    return (
        <ImageContext.Provider value={{ setImageUrl: mockSetImageUrl }}>
            {children}
        </ImageContext.Provider>
    );
};

describe("Navbar Component", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("handles the sign out correctly", async () => {
        render(
            <Router>
                <MockImageContextProvider>
                    <Navbar />
                </MockImageContextProvider>
            </Router>
        );

        // Check if the Sign Out link is in the document
        const signOutLink = screen.getByText("Sign Out");
        expect(signOutLink).toBeInTheDocument();

        // Simulate a user clicking on the Sign Out link
        fireEvent.click(signOutLink);

        // Verify that the signOut function has been called
        expect(signOut).toHaveBeenCalled();

        // ... Further assertions can be made to ensure other outcomes,
        // such as navigation to the landing page, if necessary.
    });
});
