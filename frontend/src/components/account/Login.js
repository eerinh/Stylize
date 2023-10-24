import React, { useState } from 'react' //import react and useState hook
import { Link, useNavigate } from "react-router-dom"; //import Link and useNavigate with react router dom library
import { signInWithEmailAndPassword } from 'firebase/auth'; //import signin function from firebase/auth library

import InputControl from './InputControl'; //import input control
import { auth } from '../database'; //import 'auth' object from the database

import styles from './Login.module.css' //import css for styling

function Login(){
    const navigate = useNavigate(); //get navigate function from router
    const[values, setValues]=useState({
        name: "",
        email: "",
        pass: "",
    }); //initialise state variables for user input values

    const [errorMsg, setErrorMsg] = useState(""); //initialise state variable for error messages
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false); //initialise state variable for disabling the submit button
    const [showPassword, setShowPassword] = useState(false); //initialise  state variable for showing and hiding the password

    const handleSubmission=() => {
        if(!values.email || !values.pass){
            setErrorMsg("Please fill all fields"); //display error message if email or pass is empty
            return;
        }
        setErrorMsg("");
        setSubmitButtonDisabled(true);

        signInWithEmailAndPassword(auth, values.email, values.pass)
            .then(async(res) => {
                setSubmitButtonDisabled(false);
                
                navigate("/following"); //if successful, navigate tot the following page
            })
            .catch((err) => {
                setSubmitButtonDisabled(false);
                setErrorMsg(err.message); //if theres an error then display the error message
            });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); //toggle visibility of show/hide password
    };

    const isPasswordEmpty = values.pass.trim() ==''; //check if whitespace if empty after trimming whitespace

    return(
        <div className={styles.container}>
            <div className={styles.innerBox}>
                <h1 className={styles.heading}>Login</h1>

                <InputControl label="Email" placeholder="Enter your Email Address"
                    onChange={(event) =>
                        setValues((prev) => ({...prev, email: event.target.value }))
                    } 
                /> {/*Render input control for email with an event handler for updating the state */}

                <div className={styles.passwordInput}>
                    <InputControl label="Password" placeholder="Enter your Password"
                        type={showPassword ? 'text' : 'password'}
                        value={values.pass}
                        onChange={(event) =>
                            setValues((prev) => ({...prev, pass: event.target.value }))
                        }
                    /> {/*Render input control for password with an event handler for updating the state */}

                    {isPasswordEmpty ? null : (
                        <button 
                            className={styles.togglePasswordButton} 
                            onClick={togglePasswordVisibility}
                        >
                          {showPassword ? 'Hide' : 'Show'}
                        </button>

                    )} {/*Render button to toggle password visibility either show/hide */}
                </div>
              

                <div className={styles.footer}>
                    <b className={styles.error}>{errorMsg}</b> {/*Display error messages. if any*/}
                    <button disabled={submitButtonDisabled}onClick ={handleSubmission}>Login</button> {/*Render submit button for login*/}
                    <p>
                        Already have an account?{" "} 
                        <span>
                            <Link to="/signup">Signup</Link> {/*Provide link to signup page if user has an existing account*/}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login; //export login component
