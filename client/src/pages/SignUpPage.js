import React from 'react';
import './styles/SignUpForm.css';
import sideImage from '../assets/heroSection.png';
import Navbar from '../components/Navbar';

const SignUpForm = () => {
return (
    <div>
        <Navbar />
        <div className="sign-up-container">
            <div className="form-section">
                <div className="form-header">
                    <h1>Sign Up</h1>
                    <p>Fill your information below or register with your social account.</p>
                </div>
                <form className="sign-up-form">
                <div className="form-group">
                    <label>First Name *</label>
                    <input type="text" placeholder="Enter First Name" required />
                </div>
                <div className="form-group">
                    <label>Last Name *</label>
                    <input type="text" placeholder="Enter Last Name" required />
                </div>
                <div className="form-group">
                    <label>Email *</label>
                    <input type="email" placeholder="Enter Email Address" required />
                </div>
                <div className="form-group">
                    <label>Password *</label>
                    <div className="password-input">
                    <input type="password" placeholder="Enter Password" required />
                    <span className="toggle-password">👁️</span>
                    </div>
                </div>
                <button type="submit" className="sign-up-button">Sign Up</button>
                </form>
                <div className="form-footer">
                <p>Already have an account? <a href="signIn">Sign In</a></p>
                </div>
            </div>
            <div className="image-section">
                <img src={sideImage} alt="Fashion Enthusiast" />
            </div>
        </div>
    </div>
);
};

export default SignUpForm;
