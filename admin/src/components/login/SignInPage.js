import React, { useState } from 'react';
import axios from 'axios';
import './styles/SignInPage.css';
import sideImage from '../../assets/heroSection.png';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/admin/login', { email, password });
            const { accessToken, refreshToken } = response.data;
            // Save tokens to localStorage or context for future use
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            setErrorMessage('');
            // Redirect to the admin dashboard or another protected route
            window.location.href = '/admin/dashboard';
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="sign-in">
            <div className="form-container">
                <h3>Admin Sign In</h3>
                <p>Enter Your Credentials</p>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
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
    );
};

export default SignIn;
