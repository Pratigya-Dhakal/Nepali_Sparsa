import React from 'react';
import './styles/Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="footer">
            <div className="container">
                <div className="column">
                    <h3>Men</h3>
                    <ul>
                        <li><a href="/daura-surval">Daura Surval</a></li>
                        <li><a href="/kurthas">Kurthas</a></li>
                        <li><a href="/kurtha-paijama">Kurtha Piajama</a></li>
                        <li><a href="/coat">Coat</a></li>
                        <li><a href="/shirt">Shirt</a></li>
                        <li><a href="/pant">Pant</a></li>
                    </ul>
                </div>
                <div className="column">
                    <h3>Women</h3>
                    <ul>
                        <li><a href="/sari">Sari</a></li>
                        <li><a href="/suits">Suits</a></li>
                        <li><a href="/lengha">Lengha</a></li>
                        <li><a href="/gown">Gown</a></li>
                        <li><a href="/kurtha-surwal">Kurtha Surwal</a></li>
                    </ul>
                </div>
                <div className="column">
                    <h3>Kids</h3>
                    <ul>
                        <li><a href="/lengha">Lengha</a></li>
                        <li><a href="/suit">Suit</a></li>
                    </ul>
                </div>
                <div className="column">
                    <h3>Follow Us</h3>
                    <div className="social">
                        <a href="https://twitter.com"><i className="fab fa-twitter"></i></a>
                        <a href="https://facebook.com"><i className="fab fa-facebook-f"></i></a>
                        <a href="https://instagram.com"><i className="fab fa-instagram"></i></a>
                        <a href="https://linkedin.com"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <div className="subscribe">
                        <input type="email" placeholder="Enter email address" />
                        <button>Subscribe</button>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {currentYear} All rights reserved | Nepali Sparsa</p>
                <p><a href="/terms">Terms & Conditions</a> | <a href="/privacy">Privacy</a></p>
            </div>
        </footer>
    );
}

export default Footer;
