import React, { useState } from 'react';
import axios from 'axios';
import './styles/ForgotPassword.css';
import Navbar from '../components/Navbar';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await axios.post('http://localhost:5000/api/users/forgot-password', { email });

            if (response.status === 200) {
                setMessage('Password reset link sent to your email.');
                setEmail('');
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="forgot-password-container">
                <div className="forgot-password-form-section">
                    <div className="form-header">
                        <h1>Forgot Password</h1>
                        <p>Enter your email address below to receive a password reset link.</p>
                    </div>
                    <form className="forgot-password-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email *</label>
                            <input 
                                id="email"
                                type="email" 
                                placeholder="Enter your email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </div>
                        {message && <div className="message">{message}</div>}
                        <button type="submit" className="submit-button" disabled={loading}>
                            {loading ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </form>
                    <div className="form-footer">
                        <p>Remembered your password? <a href="/signIn">Sign In</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
