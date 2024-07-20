import React from 'react';
import './styles/HeroSection.css';
import heroImage from '../assets/heroSection.png';

const HeroSection = () => {
    return (
        <div className="hero-section">
            <div className="hero-content">
                <h1 className="hero-title">Embrace the Elegance of Nepali Craftsmanship</h1>
                <p className="hero-description">Discover the latest trends in clothing, accessories, and utensils. Enjoy premium quality at affordable prices with Nepali Sparsa.</p>
                <button className="hero-button">Shop Now</button>
            </div>
            <div className="hero-image">
                <img src={heroImage} alt="Fashion" />
            </div>
        </div>
    );
};
    

export default HeroSection;
