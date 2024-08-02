import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './styles/HeroSection.css';
import onlineShop from '../assets/onlineShop.png';
import OnlineShopCart from '../assets/onlineShopCart.png';
import OnlineShopHandPhone from '../assets/onlineShopHandPhone.png';

const HeroSection = () => {
    return (
        <div className="hero-section">
            <div className="hero-content">
                <h1 className="hero-title">Embrace the Elegance of Nepali Craftsmanship</h1>
                <p className="hero-description">Discover the latest trends in clothing, accessories, and utensils. Enjoy premium quality at affordable prices with Nepali Sparsa.</p>
                <button className="hero-button">Shop Now</button>
            </div>
            <div className="hero-carousel">
                <Carousel 
                    showThumbs={false} 
                    infiniteLoop 
                    autoPlay 
                    interval={3000} 
                    showStatus={false} 
                    swipeable
                    showArrows={true}
                >
                    <div className="hero-image">
                        <img src={onlineShop} alt="Fashion 1" />
                    </div>
                    <div className="hero-image">
                        <img src={OnlineShopCart} alt="Fashion 2" />
                    </div>
                    <div className="hero-image">
                        <img src={OnlineShopHandPhone} alt="Fashion 3" />
                    </div>
                </Carousel>
            </div>
        </div>
    );
};

export default HeroSection;
