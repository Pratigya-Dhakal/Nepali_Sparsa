import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import './styles/ProductCard.css';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const handleBuyNow = (e) => {
        e.stopPropagation();  // Prevent triggering any parent click handlers
        navigate('/checkout');
    };

    const handleViewDetails = (e) => {
        e.stopPropagation();  // Prevent triggering any parent click handlers
        navigate(`/products/${product.id}`);
    };

    return (
        <div className="product-card">
            <div className="image-slider" onClick={handleViewDetails}>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    {product.images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img 
                                src={`http://localhost:5000${image.url}`} 
                                alt={product.name} 
                                onError={(e) => e.target.src = '/path/to/default-image.jpg'}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="product-details">
                <h3>{product.name}</h3>
                
                <p className="product-description">{product.description}</p>
                <div>
                    <div className="product-price">${product.price.toFixed(2)}</div>
                    <div className="quantity-controls">
                        <button>-</button>
                        <span>1</span>
                        <button>+</button>
                    </div>
                </div>
            </div>
            <div className="product-actions">
                <button className="add-to-cart">
                    <i className="fa fa-shopping-cart"></i>
                </button>
                <button className="buy-now" onClick={handleBuyNow}>
                    Buy now
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
