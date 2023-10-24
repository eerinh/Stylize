import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Signup from './Signup';
import { BrowserRouter as Router } from 'react-router-dom';

const mockCreateUser = jest.fn();
const mockUpdateProfile = jest.fn();

jest.mock('firebase/auth', () => ({
    createUserWithEmailAndPassword: mockCreateUser,
    updateProfile: mockUpdateProfile,
}));

// Mock the Navbar
jest.mock('../navbar/Navbar', () => {
    return function DummyNavbar() {
        return <div data-testid="mockNavbar"></div>;
    };
});

// Mock the database if 'auth' from the database is used in Signup.js
jest.mock('../database', () => ({
    auth: {}
}));

describe("Signup component", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("calls the signup function with correct email and password", async () => {
        render(
            <Router>
                <Signup />
            </Router>
        );

        const nameInput = screen.getByPlaceholderText("Enter your Full Name");
        const emailInput = screen.getByPlaceholderText("Enter your Email Address");
        const passwordInput = screen.getByPlaceholderText("Enter your Password");
        const signupButton = screen.getByRole('button', { name: /Sign Up/i });

        fireEvent.change(nameInput, { target: { value: "John Doe" } });
        fireEvent.change(emailInput, { target: { value: "johndoe@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });

        fireEvent.click(signupButton);
        expect(mockCreateUser).toHaveBeenCalledWith({}, "johndoe@example.com", "password123");
    });

    it("shows error for short passwords", () => {
        render(
            <Router>
                <Signup />
            </Router>
        );
    

        const passwordInput = screen.getByPlaceholderText("Enter your Password");
        const signupButton = screen.getByRole('button', { name: /Sign Up/i });

        fireEvent.change(passwordInput, { target: { value: "pass" } }); // A short password
        fireEvent.click(signupButton);

        const errorElement = screen.getByText(/Please fill all fields/i);
        expect(errorElement).toBeInTheDocument();
    });
});
