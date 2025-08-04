import React , { useState } from "react";
import './Signing.css'
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInUser, signInWithGoogle } from "../ReduxToolkit/authSlice";
import { toast } from "react-toastify";
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";


function SignIn(props){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const handleSignIn = (e) => {
        e.preventDefault();
        dispatch(signInUser({ email, password }))
            .unwrap()
            .then((payload) => {
                toast.success(`Sign In Successful! Welcome ${payload.email}`);
                navigate('/');
            })
            .catch((err) => {
                toast.error('Error: ' + err);
            });
    };

    const handleGoogleSignIn = () => {
        dispatch(signInWithGoogle())
            .unwrap()
            .then((payload) => {
                toast.success(`Sign In Successful! Welcome ${payload.displayName || payload.email}`);
                navigate('/');
            })
            .catch((err) => {
                toast.error('Google Sign-In Error: ' + err);
            });
    };

    return(
        <div className="mainm">
            <div className="maincontainer">
        <form onSubmit={handleSignIn}>
            <p id="welc">Welcome</p>
            <div className="icons2">
                <button type="button" className="icons3" onClick={handleGoogleSignIn}>Sign In With <FcGoogle className="picon" id="fc"/></button>
            </div>

            <p id="or">Or</p>

            <form className="form1">
                <div className="email">
                    <label htmlFor="email" className="emaillabel"><MdOutlineEmail className="emailicon" /></label>
                    <input className="emailinput" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Type Your Email" name="email" id="email" required />
                </div>
                <div className="password">
                    <label htmlFor="password" ><TbLockPassword className="passwordicon" /></label>
                    <input className="passwordinput" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} type={'password'} placeholder="Type Your Password" name="password" id="password" required />
                </div>
            </form>
            
            <p className="regist">Don't have an account ? <Link className="signuplink" to="/signup">Sign Up</Link></p>
            
            <button type="submit" className="signin" disabled={loading}>{loading ? 'Signing In...' : 'Sign In'}</button>
        </form>
        </div>
        </div>
    )
}

export default SignIn;