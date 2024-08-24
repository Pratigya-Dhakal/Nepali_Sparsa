import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import { FaShoppingCart } from 'react-icons/fa';
import './styles/ProductCard.css';

const ProductCard = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    const handleDecrement = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleBuyNow = (e) => {
        e.stopPropagation();
        navigate('/checkout');
    };

    const handleViewDetails = () => {
        navigate(`/products/${product.id}`);
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        // Add to cart logic here
    };

    return (
        <div className="product-card">
            <div className="image-slider">
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    {product.images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img 
                                src={`http://localhost:5000${image.url}`} 
                                alt={product.name} 
                                onError={(e) => e.target.src = '/path/to/default-image.jpg'}
                                className="product-image"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="product-details">
                <div className="title-row">
                    <h3 className="product-title">{product.name}</h3>
                    <button className="cart-icon-btn" onClick={handleAddToCart}>
                        <FaShoppingCart />
                    </button>
                </div>

                <p className="product-description">{product.description}</p>
                <div className="product-actions">
                    <p className="product-price">$ {product.price}</p>
                    <div className="quantity-control">
                        <button className="quantity-btn" onClick={handleDecrement}>
                            <i className="fa fa-minus"></i>
                        </button>
                        <span className="quantity">{quantity}</span>
                        <button className="quantity-btn" onClick={handleIncrement}>
                            <i className="fa fa-plus"></i>
                        </button>
                    </div>
                </div>
                <div className="button-row">
                    <button className="view-details-btn" onClick={handleViewDetails}>View Details</button>
                    <button className="buy-now-btn" onClick={handleBuyNow}>Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
