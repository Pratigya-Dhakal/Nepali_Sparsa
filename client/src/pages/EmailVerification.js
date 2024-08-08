// EmailVerification.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './styles/EmailVerification.css';

const EmailVerification = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/verify-email?token=${token}`);
                
                if (response.status === 200) {
                    setSuccess('Email verified successfully! Redirecting to login page...');
                    setTimeout(() => {
                        navigate('/signIn'); // Redirect to login page after 3 seconds
                    }, 3000);
                }
            } catch (error) {
                setError('Oops, the link has expired or is invalid.');
            } finally {
                setLoading(false);
            }
        };

        verifyEmail();
    }, [token, navigate]);

    const handleResendEmail = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/users/resend-verification-email', { email });
            
            if (response.status === 200) {
                setEmailSent(true);
                setSuccess('Verification email resent. Please check your email.');
            }
        } catch (error) {
            setError('Failed to resend verification email. Please try again.');
        }
    };

    return (
        <div className="verification-container">
            {loading && <p>Loading...</p>}
            {error && (
                <div className="error-message">
                    {error}
                    {!emailSent && (
                        <div>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button onClick={handleResendEmail}>Resend Verification Email</button>
                        </div>
                    )}
                </div>
            )}
            {success && <div className="success-message">{success}</div>}
        </div>
    );
};

export default EmailVerification;
