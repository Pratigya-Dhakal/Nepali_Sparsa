import React from 'react';
import './styles/ErrorPage.css';
import { Link } from 'react-router-dom';
const NotFoundPage = () => {
    return (
        <div className="not-found-page">
        <div className="not-found-content">
            <h1 className="not-found-title">
            <span className="not-found-404">404</span>
            </h1>
            <p className="not-found-subtitle">Oops! Page not Found</p>
            <p className="not-found-text">
            The page you are looking for cannot be found. Take a break before trying again.
            </p>
            <Link to="/" className="not-found-button">
            Go To Home Page
            </Link>
        </div>
        </div>
    );
};

export default NotFoundPage;
