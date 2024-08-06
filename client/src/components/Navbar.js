import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faShoppingCart, faBars, faTimes, faHome } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import './styles/Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Initialize based on current width
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // Fetch categories when the component mounts
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/admin/categories');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const toggleMenu = () => setIsOpen(prevState => !prevState);

    const closeMenu = () => setIsOpen(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
        }
    };

    const fetchSubcategories = async (categoryName) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/subcategories/${categoryName}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setSubcategories(data);
        } catch (error) {
            console.error('Error fetching subcategories:', error);
        }
    };
    

    const handleMouseEnter = (category) => {
        setHoveredCategory(category);
        fetchSubcategories(category);
    };

    const handleMouseLeave = () => {
        setHoveredCategory(null);
        setSubcategories([]);
    };

    return (
        <>
            <header className="navbar">
                {!isMobile && (
                    <div className="navbar-top">
                        <div className="social-icons">
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <FontAwesomeIcon icon={faFacebook} />
                            </a>
                        </div>
                        <div className="free-shipping">
                            Nepali Sparsa
                        </div>
                        <div className="currency-language">
                            <select aria-label="Currency">
                                <option value="AUD">AUD</option>
                                <option value="INR">Rupees</option>
                            </select>
                        </div>
                    </div>
                )}
                <div className="navbar-main">
                    <div className="logo">
                        <Link to="/">Nepali Sparsa</Link>
                    </div>
                    <form className="search-field" onSubmit={handleSearch}>
                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="Enter your product name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                aria-label="Search"
                            />
                            <button type="submit" aria-label="Search">
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                    </form>
                    {!isMobile && (
                        <div className="navbar-icons">
                            <Link to="/cart" aria-label="Shopping Cart">
                                <FontAwesomeIcon icon={faShoppingCart} />
                            </Link>
                            <Link to="/login" aria-label="User Profile">
                                <FontAwesomeIcon icon={faUser} />
                            </Link>
                        </div>
                    )}
                </div>
                {!isMobile && (
                    <div className="menu">
                        <Link to="/" aria-label="Home">Home</Link>
                        {categories.map(category => (
                            <div
                                key={category.name}
                                className="menu-item"
                                onMouseEnter={() => handleMouseEnter(category.name)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <Link to={`/${category.name.toLowerCase()}`} aria-label={`${category.name} Products`}>
                                    {category.name}
                                </Link>
                                {hoveredCategory === category.name && (
                                    <div className="subcategory-card">
                                        <h4>{category.name}'s </h4>
                                        <ul>
                                            {subcategories.map(subcategory => (
                                                <li key={subcategory.id}>
                                                    <Link to={`/${category.name.toLowerCase()}/${subcategory.id}`} aria-label={subcategory.name}>
                                                        {subcategory.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                        <Link to="/faq" aria-label="FAQ">FAQ</Link>
                        <Link to="/about-us" aria-label="About Us">About Us</Link>
                        <Link to="/contact-us" aria-label="Contact Us">Contact Us</Link>
                    </div>
                )}
            </header>
            {isMobile && (
                <div className={`bottom-navbar ${isOpen ? 'open' : ''}`}>
                    <Link to="/" className="bottom-nav-link" aria-label="Home">
                        <FontAwesomeIcon icon={faHome} />
                        <span>Home</span>
                    </Link>
                    <Link to="/cart" className="bottom-nav-link" aria-label="Shopping Cart">
                        <FontAwesomeIcon icon={faShoppingCart} />
                        <span>Cart</span>
                    </Link>
                    <Link to="/login" className="bottom-nav-link" aria-label="User Profile">
                        <FontAwesomeIcon icon={faUser} />
                        <span>Profile</span>
                    </Link>
                    <Link className="bottom-nav-link menu-toggle" onClick={toggleMenu} aria-label={isOpen ? 'Close Menu' : 'Open Menu'}>
                        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
                        <span>{isOpen ? 'Close' : 'Menu'}</span>
                    </Link>
                </div>
            )}
            {isMobile && isOpen && (
                <div className="mobile-menu">
                    <Link className="mobile-menu-close" onClick={closeMenu} aria-label="Close Menu">
                        <FontAwesomeIcon icon={faTimes} />
                        <span>Close</span>
                    </Link>
                    <Link to="/" onClick={closeMenu} aria-label="Home">Home</Link>
                    <Link to="/categories" onClick={closeMenu} aria-label="Categories">Categories</Link>
                    {categories.map(category => (
                        <Link key={category.name} to={`/${category.name.toLowerCase()}`} onClick={closeMenu} aria-label={`${category.name} Products`}>
                            {category.name}
                        </Link>
                    ))}
                    <Link to="/about-us" onClick={closeMenu} aria-label="About Us">About Us</Link>
                    <Link to="/contact-us" onClick={closeMenu} aria-label="Contact Us">Contact Us</Link>
                    <div className="mobile-menu-top">
                        <div className="social-icons">
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <FontAwesomeIcon icon={faFacebook} />
                            </a>
                        </div>
                        <div className="currency-language">
                            <select aria-label="Currency">
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
