import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import './styles/ProductCard.css';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/products/${product.id}`);
    };

    return (
        <div className="product-card" onClick={handleCardClick}>
            <div className="image-slider">
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
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <div className="product-price">${product.price.toFixed(2)}</div>
            </div>
        </div>
    );
};

export default ProductCard;
