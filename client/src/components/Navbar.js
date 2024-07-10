import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './styles/Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <span className="logo-text">Nepali Sparsa</span>.
            </div>
            <ul className="nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="shop">Shop</a></li>
                <li><a href="women">Women</a></li>
                <li><a href="men">Men</a></li>
                <li><a href="accessories">Accessories</a></li>
                <li><a href="handicraft">HandiCraft</a></li>
                <li><a href="about-us">About Us</a></li>
                <li><a href="contact-us">Contact Us</a></li>
            </ul>
            <div className="nav-icons">
                <i className="fas fa-search"></i>
                <i className="fas fa-shopping-cart"></i>
                {/* Wrap the profile icon with Link */}
                <Link to="/signIn">
                    <i className="fas fa-user"></i>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;