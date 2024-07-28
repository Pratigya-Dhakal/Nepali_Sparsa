import React, { useState } from 'react';
import './styles/SignInPage.css';
import sideImage from '../../assets/heroSection.png';
const SignIn = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleSubmit = (e) => {
    e.preventDefault();
    // Add sign in logic here
};

return (
    <div>
        <div className="sign-in">
            <div className="form-container">
                <h3> Admin Sign In</h3>
                <p>Enter Your Credentials</p>
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
            </div>
            <div className="image-container">
                <img src={sideImage} alt="Fashion" />
            </div>
        </div>
    </div>
);
};

export default SignIn;
