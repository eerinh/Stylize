import React, { useRef } from "react";
import Navbar from '../landing/NavbarLanding'; // Import Navbar component correctly
import './Help.css'; // Import the necessary CSS file

const Form = () => {
    //useref hooks
    const nameRef = useRef();
    const emailRef = useRef();
    const messageRef = useRef();

    const handleSave = (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const message = messageRef.current.value;

        //test it in the console
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Message:", message);

        // Reset the form fields if needed
        nameRef.current.value = "";
        emailRef.current.value = "";
        messageRef.current.value = "";
    }

    return (
        <div>
            <Navbar />
            {/* text to show on screen  */}
            <center><h3>NEED TO GET IN TOUCH?</h3></center>
            <center><h1>Contact Stylize</h1></center>
            <div className="description">
                <p>Have a question that needs to be answered? We're happy to help! Simply fill out the form below. We look forward to hearing from you!</p>
            </div>
            {/* form for user to enter. Placeholder text in each box. */}
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
