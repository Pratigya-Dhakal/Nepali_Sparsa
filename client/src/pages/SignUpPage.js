import React, { useState } from 'react';
import axios from 'axios';
import './styles/SignUpForm.css';
import sideImage from '../assets/heroSection.png';
import Navbar from '../components/Navbar';

const SignUpForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/users/signup', {
                firstName,
                lastName,
                email,
                password,
            });

            if (response.status === 201) {
                setSuccess('Sign-up successful! Please check your email to verify your account.');
                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
            }
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <Navbar />
            <div className="sign-up-container">
                <div className="form-section">
                    <div className="form-header">
                        <h1>Sign Up</h1>
                        <p>Fill in your information below or register with your social account.</p>
                    </div>
                    <form className="sign-up-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>First Name *</label>
                            <input 
                                type="text" 
                                placeholder="Enter First Name" 
                                value={firstName} 
                                onChange={(e) => setFirstName(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name *</label>
                            <input 
                                type="text" 
                                placeholder="Enter Last Name" 
                                value={lastName} 
                                onChange={(e) => setLastName(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label>Email *</label>
                            <input 
                                type="email" 
                                placeholder="Enter Email Address" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label>Password *</label>
                            <div className="password-input">
                                <input 
                                    type={showPassword ? 'text' : 'password'} 
                                    placeholder="Enter Password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                />
                                <span 
                                    className="toggle-password" 
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? '🙈' : '👁️'}
                                </span>
                            </div>
                        </div>
                        {error && <div className="error-message">{error}</div>}
                        {success && <div className="success-message">{success}</div>}
                        <button type="submit" className="sign-up-button" disabled={loading}>
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </form>
                    <div className="form-footer">
                        <p>Already have an account? <a href="/signIn">Sign In</a></p>
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
