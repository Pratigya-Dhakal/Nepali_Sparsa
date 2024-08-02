import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faShoppingCart, faBars, faTimes, faHome } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import './styles/Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    // const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Check initial screen size

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
        }
    };

    return (
        <>
            <header className="navbar">
                {!isMobile && (
                    <div className="navbar-top">
                        <div className="social-icons">
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faFacebook} />
                            </a>
                        </div>
                        <div className="free-shipping">
                            Nepali Sparsa .
                        </div>
                        <div className="currency-language">
                            <select>
                                <option value="AUD">AUD</option>
                                <option value="INR">Rupees</option>
                            </select>
                        </div>
                    </div>
                )}
                <div className="navbar-main">
                    <div className="logo">
                        <Link to="/">Nepali Sparsa .</Link>
                    </div>
                    <form className="search-field" onSubmit={handleSearch}>
                        <div className="search-box">
                        <input
                            type="text"
                            placeholder="Enter your product name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit">
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                        </div>
                    </form>
                    {!isMobile && (
                        <div className="navbar-icons">
                            <Link to="/cart"><FontAwesomeIcon icon={faShoppingCart} /></Link>
                            <Link to="/login"><FontAwesomeIcon icon={faUser} /></Link>
                        </div>
                    )}
                </div>
                {!isMobile && (
                    <div className={`menu ${isOpen ? 'open' : ''}`}>
                        <Link to="/">Home</Link>
                        <Link to="/categories">Categories</Link>
                        <Link to="/mens">Men's</Link>
                        <Link to="/womens">Women's</Link>
                        <Link to="/jewelry">Jewelry</Link>
                        <Link to="/handicraft">Handicraft</Link>
                        <Link to="/kids">Kids</Link>
                        <Link to="/about-us">About Us</Link>
                        <Link to="/contact-us">Contact Us</Link>
                    </div>
                )}
            </header>
            {isMobile && (
                <div className={`bottom-navbar ${isOpen ? 'open' : ''}`}>
                    <Link to="/" className="bottom-nav-link">
                        <FontAwesomeIcon icon={faHome} />
                        <span>Home</span>
                    </Link>
                    <Link to="/cart" className="bottom-nav-link">
                        <FontAwesomeIcon icon={faShoppingCart} />
                        <span>Cart</span>
                    </Link>
                    <Link to="/login" className="bottom-nav-link">
                        <FontAwesomeIcon icon={faUser} />
                        <span>Profile</span>
                    </Link>
                    <Link className="bottom-nav-link menu-toggle" onClick={toggleMenu}>
                        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
                        <span>Menu</span>
                    </Link>
                </div>
            )}
            {isMobile && isOpen && (
                <div className="mobile-menu">
                    <Link className="mobile-menu-close" onClick={closeMenu}>
                        <FontAwesomeIcon icon={faTimes} />
                        <span>Close</span>
                    </Link>
                    <Link to="/" onClick={closeMenu}>Home</Link>
                    <Link to="/categories" onClick={closeMenu}>Categories</Link>
                    <Link to="/mens" onClick={closeMenu}>Men's</Link>
                    <Link to="/womens" onClick={closeMenu}>Women's</Link>
                    <Link to="/jewelry" onClick={closeMenu}>Jewelry</Link>
                    <Link to="/handicraft" onClick={closeMenu}>Handicraft</Link>
                    <Link to="/kids" onClick={closeMenu}>Kids</Link>
                    <Link to="/about-us" onClick={closeMenu}>About Us</Link>
                    <Link to="/contact-us" onClick={closeMenu}>Contact Us</Link>
                    <div className="mobile-menu-top">
                        <div className="social-icons">
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faFacebook} />
                            </a>
                        </div>
                        <div className="currency-language">
                            <select>
                                <option value="AUD">AUD</option>
                                <option value="INR">Rupees</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
