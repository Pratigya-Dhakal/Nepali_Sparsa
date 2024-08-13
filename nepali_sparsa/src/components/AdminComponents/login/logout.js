// src/components/login/logout.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogout = async () => {
        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
            setError('No refresh token found');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await axios.post('http://localhost:5000/api/admin/logout', { refreshToken });
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
            setError('Logout failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={handleLogout} disabled={loading}>
                {loading ? 'Logging out...' : 'Logout'}
            </button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Logout;
