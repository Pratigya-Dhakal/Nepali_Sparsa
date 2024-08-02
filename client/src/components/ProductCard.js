import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faInfoCircle , faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import './styles/ProductCard.css';

const ProductCard = ({ product }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
    };

    return (
        <div className="product-card">
            <div className="image-slider">
                <button className="prev-button" onClick={handlePrevImage}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <img src={product.images[currentImageIndex]} alt={product.name} />
                <button className="next-button" onClick={handleNextImage}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
            <div className="product-details">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <div className="product-price">${product.price.toFixed(2)}</div>
                <div className="product-actions">
                    <button className="add-to-cart">
                        <FontAwesomeIcon icon={faShoppingCart} />
                        <span>Add to Cart</span>
                    </button>
                    <button className="see-more">
                        <FontAwesomeIcon icon={faInfoCircle} />
                        <span>See More</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
