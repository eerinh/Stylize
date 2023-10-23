import React, { useState } from 'react' //import navigate and useState hook
import { Link, useNavigate } from "react-router-dom"; //import link and useNavigate
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'; //import functions fom firebase/auth library

import InputControl from './InputControl'; //import input control component
import { auth } from '../database'; //import auth object from the .database file

//import stylesheet
import styles from './Signup.module.css'

function Signup(){
    const navigate = useNavigate(); //get navigate function from the router
    const[values, setValues]=useState({
        name: "",
        email: "",
        pass: "",
    }); //initialise state variables for user input values

    const [errorMsg, setErrorMsg] = useState(""); //initialise state variable for error messages
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false); //initialise state for disabling submit
    const [showPassword, setShowPassword] = useState(false); //initialise state variable for showing/hiding the password

    const handleSubmission=() => {
        if(!values.name || !values.email || !values.pass){
            setErrorMsg("Please fill all fields"); //display an error if any of the fields are empty
            return;
        }
        setErrorMsg("");
        setSubmitButtonDisabled(true);

        createUserWithEmailAndPassword(auth, values.email, values.pass) //create new user with provided email and password
            .then(async(res) => {
                setSubmitButtonDisabled(false);
                const user =res.user;
                await updateProfile(user, {
                    displayName: values.name,
                }); //update user profile with the provided name
                navigate("/following"); //navigate to the /following page if successful
            })
            .catch((err) => {
                setSubmitButtonDisabled(false); 
                setErrorMsg(err.message); //display error if unsuccessful
            });
    };
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); //toggle visibility of password either show/hide
    };

    const isPasswordEmpty = values.pass.trim() ===''; //check if password is empty after triming whitespace
    
    return(
        <div className={styles.container}>
            <div className={styles.innerBox}>
                <h1 className={styles.heading}>Sign Up</h1>

                <InputControl label="Name" placeholder="Enter your Full Name"
                    onChange={(event) =>
                        setValues((prev) => ({...prev, name: event.target.value }))
                }
                /> {/*Render input control for name with an event handler for updating the state*/}
                <InputControl label="Email" placeholder="Enter your Email Address"
                    onChange={(event) =>
                        setValues((prev) => ({...prev, email: event.target.value }))
                }
                /> {/*Render an input control for the email*/}

                <div className={styles.passwordInput}>
                    <InputControl label="Password" placeholder="Enter your Password"
                        type={showPassword ? 'text' : 'password'}
                        value={values.pass}
                        onChange={(event) =>
                            setValues((prev) => ({...prev, pass: event.target.value }))
                        }   
                    /> {/*Render an input control for the password*/}

                    {!isPasswordEmpty && (
                        <button
                            className={styles.togglePasswordButton}
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    )} {/*Render a button to toggle password visibility (show/hide) */}
                </div>

                

                <div className={styles.footer}>
                    <b className={styles.error}> {errorMsg}</b> {/**Display error message if there is any */}
                    <button onClick={handleSubmission} disabled = {submitButtonDisabled}>Sign Up</button>
                    <p>
                        Already have an account?{" "} 
                        <span>
                            <Link to="/login">Login</Link> {/*Redirect to the login page if user already has account*/}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup; //export signup
