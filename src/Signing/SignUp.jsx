import React, { useState } from "react";
import './Signing.css';
import { FcGoogle } from "react-icons/fc";
import { FaKey } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser, signInWithGoogle } from "../ReduxToolkit/authSlice";

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const handleSignUp = (e) => {
        e.preventDefault();
        dispatch(signUpUser({ email, password }))
            .unwrap()
            .then(() => {
                window.alert('Sign Up Successful! Please sign in.');
                navigate('/signin');
            })
            .catch((err) => {
                alert('Error: ' + err);
            });
    };

    const handleGoogleSignUp = () => {
        dispatch(signInWithGoogle())
            .unwrap()
            .then(() => {
                navigate('/');
            })
            .catch((err) => {
                alert('Google Sign-Up Error: ' + err);
            });
    };

    return (
        <div className="mainm">
            <div className="maincontainer">
                <form onSubmit={handleSignUp}>
                    <p id="welc">Create Account</p>
                    <div className="icons2">
                        <button type="button" className="icons3" onClick={handleGoogleSignUp}>Sign Up With <FcGoogle className="picon" id="fc"/></button>
                    </div>

                    <p id="or">Or</p>

                    <div className="email">
                        <label htmlFor="email"><MdEmail className="icon10" id="post"/></label>
                        <input className="emailinput" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Type Your Email" name="email" id="email" required />
                    </div>
                    <div className="password">
                        <label htmlFor="password"><FaKey className="icon10" id="pasw"/></label>
                        <input className="passwordinput" value={password} onChange={(e) => setPassword(e.target.value)} type={'password'} placeholder="Type Your Password" name="password" id="password" required />
                    </div>

                    {error && <p style={{color: 'red'}}>{error}</p>}

                    <p className="regist">Already have an account? <Link className="signuplink" to="/signin">Sign In</Link></p>
                    
                    <button type="submit" className="signin" disabled={loading}>{loading ? 'Signing Up...' : 'Sign Up'}</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp;