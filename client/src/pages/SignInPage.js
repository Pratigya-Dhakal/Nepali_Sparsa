import React, { useState } from 'react';
import './styles/SignInPage.css';
import sideImage from '../assets/heroSection.png';
import Navbar from '../components/Navbar';
const SignIn = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleSubmit = (e) => {
    e.preventDefault();
    // Add sign in logic here
};

return (
    <div>
        <Navbar/>
        <div className="sign-in">
            <div className="form-container">
                <h3>Sign In</h3>
                <p>Please fill your detail to access your account.</p>
                <form onSubmit={handleSubmit}>
                <label>Email *</label>
                <input 
                    type="email" 
                    placeholder="Enter Email Address" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <label>Password *</label>
                <input 
                    type="password" 
                    placeholder="Enter Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <div className="options">
                    <label>
                    <input type="checkbox" /> Remember me
                    </label>
                    <a href="forgot-password">Forgot Password?</a>
                </div>
                <button type="submit">Sign In</button>
                </form>
                <div className="or">or</div>
                <button className="google-sign-in">Sign In With Google</button>
                <p>Don’t have an account? <a href="signUp">Sign Up</a></p>
            </div>
            <div className="image-container">
                <img src={sideImage} alt="Fashion" />
            </div>
        </div>
    </div>
);
};

export default SignIn;
