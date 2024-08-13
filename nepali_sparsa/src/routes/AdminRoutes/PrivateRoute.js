import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('accessToken'); // Adjust based on your auth logic

    return isAuthenticated ? children : <Navigate to="/admin/signIn" />;
};

export default PrivateRoute;
