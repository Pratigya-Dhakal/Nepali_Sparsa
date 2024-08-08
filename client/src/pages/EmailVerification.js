// EmailVerification.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles/EmailVerification.css';

const EmailVerification = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/verify-email?token=${token}`);
                if (response.status === 200) {
                    setSuccess('Email verified successfully! Redirecting to login...');
                    setTimeout(() => {
                        navigate('/signIn'); // Redirect to login page
                    }, 2000); // Redirect after 2 seconds
                }
            } catch (error) {
                setError(error.response?.data?.message || 'Verification failed. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            verifyEmail();
        } else {
            setError('No verification token provided.');
            setLoading(false);
        }
    }, [token, navigate]);

    return (
        <div className="verification-container">
            {loading && <p>Loading...</p>}
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
        </div>
    );
};

export default EmailVerification;
