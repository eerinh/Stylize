import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from 'firebase/auth';

import InputControl from './InputControl';
import { auth } from '../database';

import styles from './Login.module.css'

function Login(){
    const navigate = useNavigate();
    const[values, setValues]=useState({
        name: "",
        email: "",
        pass: "",
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmission=() => {
        if(!values.email || !values.pass){
            setErrorMsg("Please fill all fields");
            return;
        }
        setErrorMsg("");
        setSubmitButtonDisabled(true);

        signInWithEmailAndPassword(auth, values.email, values.pass)
            .then(async(res) => {
                setSubmitButtonDisabled(false);
                
                navigate("/following");
            })
            .catch((err) => {
                setSubmitButtonDisabled(false);
                setErrorMsg(err.message);
            });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const isPasswordEmpty = values.pass.trim() =='';

    return(
        <div className={styles.container}>
            <div className={styles.innerBox}>
                <h1 className={styles.heading}>Login</h1>

                <InputControl label="Email" placeholder="Enter your Email Address"
                    onChange={(event) =>
                        setValues((prev) => ({...prev, email: event.target.value }))
                    }
                />
                <div className={styles.passwordInput}>
                    <InputControl label="Password" placeholder="Enter your Password"
                        type={showPassword ? 'text' : 'password'}
                        value={values.pass}
                        onChange={(event) =>
                            setValues((prev) => ({...prev, pass: event.target.value }))
                        }
                    />

                    {isPasswordEmpty ? null : (
                        <button 
                            className={styles.togglePasswordButton} 
                            onClick={togglePasswordVisibility}
                        >
                          {showPassword ? 'Hide' : 'Show'}
                        </button>

                    )}
                </div>
              

                <div className={styles.footer}>
                    <b className={styles.error}>{errorMsg}</b>
                    <button disabled={submitButtonDisabled}onClick ={handleSubmission}>Login</button>
                    <p>
                        Already have an account?{" "} 
                        <span>
                            <Link to="/signup">Signup</Link>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
