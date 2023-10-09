import React, { useRef } from "react";
import Navbar from '../landing/NavbarLanding';
import './Help.css';
import { firestore } from "../database";
import { addDoc, collection } from "firebase/firestore";

const Form = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();
  const messagesCollection = collection(firestore, "contactForm"); // Corrected the collection name

  const handleSave = async (e) => { // Added 'async' keyword here
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const message = messageRef.current.value;

    try {
      const newMessageRef = await addDoc(messagesCollection, {
        name,
        email,
        message
      });

      console.log("Message added with ID: ", newMessageRef.id);
    } catch (error) {
      console.error("Error adding message: ", error);
    }

    // Reset the form fields inside the 'try' block
    nameRef.current.value = "";
    emailRef.current.value = "";
    messageRef.current.value = "";
  }

  return (
    <div>
      <Navbar />
      <center><h3>NEED TO GET IN TOUCH?</h3></center>
      <center><h1>Contact Stylize</h1></center>
      <div className="description">
        <p>Have a question that needs to be answered? We're happy to help! Simply fill out the form below. We look forward to hearing from you!</p>
      </div>
      <form onSubmit={handleSave}>
        <b><label htmlFor="name">Name:</label></b>
        <input type="text" name="name" id="name" placeholder='Enter Name' ref={nameRef} />

        <b><label htmlFor="email">Email:</label></b>
        <input type="email" name="email" id="email" placeholder='Enter Email' ref={emailRef} />

        <b><label htmlFor="message">Message:</label></b>
        <textarea name='message' id="message" cols="40" rows="10" placeholder='Enter Message Here' ref={messageRef} />

        <button type='submit'><b>Send Message</b></button>
      </form>
    </div>
  )
}

export default Form;
