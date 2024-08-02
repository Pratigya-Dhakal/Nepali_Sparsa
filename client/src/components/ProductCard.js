import React from 'react';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import './styles/ProductCard.css';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        appendArrows: '.slick-custom-arrows',
    };
    const navigate = useNavigate();


    const handleSeeMore = () => {
        navigate(`/products/${product.id}`);
    }

    return (
        <div className="product-card">
            <div className="image-slider">
                <Slider {...settings}>
                    {product.images.map((image, index) => (
                        <div key={index} className="slider-image">
                            <img 
                                src={`http://localhost:5000/uploads/${image.url}`} 
                                alt={product.name} 
                                onError={() => console.error(`Image failed to load: http://localhost:5000/uploads/${image.url}`)}
                            />
                        </div>
                    ))}
                </Slider>
                <div className="slick-custom-arrows" />
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
                    <button className="see-more" onClick={handleSeeMore}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        <span>See More</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
