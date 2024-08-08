import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/SignInPage.css';
import sideImage from '../assets/heroSection.png';
import Navbar from '../components/Navbar';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // For redirection

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/users/login', { email, password });

            if (response.data.accessToken) {
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                navigate('/'); // Redirect to home or another page after successful login
            } else {
                setError('Login failed. Please try again.');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="sign-in">
                <div className="form-container">
                    <h3>Sign In</h3>
                    <p>Please fill in your details to access your account.</p>
                    <form onSubmit={handleSubmit}>
                        <label>Email *</label>
                        <input 
                            type="email" 
                            placeholder="Enter Email Address" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required
                        />
                        <label>Password *</label>
                        <input 
                            type="password" 
                            placeholder="Enter Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required
                        />
                        <div className="options">
                            <label>
                                <input type="checkbox" /> Remember me
                            </label>
                            <a href="/forgot-password">Forgot Password?</a>
                        </div>
                        {error && <div className="error-message">{error}</div>}
                        <button type="submit" disabled={loading}>
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                    <div className="or">or</div>
                    <button className="google-sign-in">Sign In With Google</button>
                    <p>Don’t have an account? <a href="/signUp">Sign Up</a></p>
                </div>
                <div className="image-container">
                    <img src={sideImage} alt="Fashion" />
                </div>
            </div>
        </div>
    );
};

export default SignIn;
