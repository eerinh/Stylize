import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from './Help'; // Change the path to the correct one
import { addDoc, collection } from "firebase/firestore";
const axios = require('axios');


jest.mock('axios', () => ({
  post: jest.fn().mockResolvedValue({ data: {} }) // Mocks axios.post() method
}));
// Mocking Firestore
jest.mock("../database", () => ({
  firestore: {}
}));

jest.mock('../navbar/Navbar', () => {
  return function DummyNavbar() {
    return <div data-testid="mockNavbar"></div>;
  };
});

jest.mock('../browsing/imageContext', () => ({
  ImageContext: {
    Consumer: ({ children }) => children({
      setImageUrl: jest.fn()
    }), 
    Provider: ({ children }) => children
  }
}));

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  addDoc: jest.fn()
}));

describe("Form component", () => {

  beforeEach(() => {
    collection.mockReturnValue("mockCollection");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("submits the correct email data to Firestore", async () => {
    render(
      <Router> 
        <Form />
      </Router>
    );

    const nameInput = screen.getByPlaceholderText("Enter Name");
    const emailInput = screen.getByPlaceholderText("Enter Email");
    const messageInput = screen.getByPlaceholderText("Enter Message Here");
    const sendButton = screen.getByText("Send Message");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "johndoe@example.com" } });
    fireEvent.change(messageInput, { target: { value: "Hello!" } });

    await fireEvent.click(sendButton);

    expect(addDoc).toHaveBeenCalledWith("mockCollection", {
      name: "John Doe",
      email: "johndoe@example.com",
      message: "Hello!"
    });
  });
});
