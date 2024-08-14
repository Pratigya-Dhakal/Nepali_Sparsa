import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import './styles/ProductDetail.css';

// Slick Carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(response.data);
                fetchSimilarProducts(response.data.category.name); // Fetch similar products based on category
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };
        fetchProduct();
    }, [id]);

    const fetchSimilarProducts = async (categoryName) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/products/similar/${categoryName}`);
            setSimilarProducts(response.data);
        } catch (error) {
            console.error('Error fetching similar products:', error);
        }
    };

    const handleQuantityChange = (amount) => {
        if (quantity + amount > 0) {
            setQuantity(quantity + amount);
        }
    };

    if (!product) return <div>Loading...</div>;

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    return (
        <div className="product-detail-container">
            <nav className="breadcrumb">
                <span>Browse Products</span> / <span>{product.category?.name}</span> / <span>{product.name}</span>
            </nav>

            <div className="product-detail">
                <div className="image-section">
                    <Slider {...sliderSettings} className="image-slider">
                        {product.images && product.images.length > 0 ? (
                            product.images.map((image, index) => (
                                <div key={index} className="slider-item">
                                    <img src={`http://localhost:5000${image.url}`} alt={product.name} className="main-image" />
                                </div>
                            ))
                        ) : (
                            <p>No images available</p>
                        )}
                    </Slider>
                    <div className="thumbnails">
                        {product.images && product.images.length > 0 ? (
                            product.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={`http://localhost:5000${image.url}`}
                                    alt={product.name}
                                    className="thumbnail"
                                    onClick={() => document.querySelector(`.slick-slide[data-index='${index}']`).scrollIntoView({ behavior: 'smooth' })}
                                />
                            ))
                        ) : (
                            <p>No images available</p>
                        )}
                    </div>
                </div>
                
                <div className="info-section">
                    <h1>{product.name}</h1>
                    <div className="rating">
                        <span className="stars">★ ★ ★ ★ ☆</span>
                        <span className="reviews">({product.reviews} reviews)</span>
                    </div>
                    <div className="price">${product.price}</div>

                    <div className="options">
                        <div className="size">
                            <label>Available Size:</label>
                            <div className="size-options">
                                {product.size ? (
                                    product.size.split(',').map((size) => (
                                        <button
                                            key={size}
                                            className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </button>
                                    ))
                                ) : (
                                    <p>No sizes available</p>
                                )}
                            </div>
                        </div>

                        <div className="color">
                            <label>Available Color:</label>
                            <div className="color-options">
                                {product.color ? (
                                    product.color.split(',').map((color) => (
                                        <button
                                            key={color}
                                            className={`color-button ${selectedColor === color ? 'selected' : ''}`}
                                            style={{ backgroundColor: color }}
                                            onClick={() => setSelectedColor(color)}
                                        />
                                    ))
                                ) : (
                                    <p>No colors available</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="add-to-cart-section">
                        <div className="stock">
                            <span>Last 1 left – make it yours!</span>
                        </div>
                        <div className="quantity">
                            <button onClick={() => handleQuantityChange(-1)}>-</button>
                            <input type="number" value={quantity} readOnly />
                            <button onClick={() => handleQuantityChange(1)}>+</button>
                        </div>
                        <button className="add-to-cart">Add to cart</button>
                    </div>
                </div>
            </div>

            <div className="tabs">
                <span className="tab">The Details</span>
                <span className="tab">Ratings & Reviews</span>
                <span className="tab">Discussion</span>
            </div>

            <div className="discussion-section">
                <h3>Product Description</h3>
                <p>{product.description}</p>
                <h3>Customer Comments</h3>
                {product.comments && product.comments.length > 0 ? (
                    product.comments.map((comment, index) => (
                        <div key={index} className="comment">
                            <p><strong>{comment.user}</strong>: {comment.text}</p>
                        </div>
                    ))
                ) : (
                    <p>No comments available</p>
                )}
            </div>

            <div className="similar-products">
                <h2>Similar Products</h2>
                <div className="similar-products-grid">
                    {similarProducts.length > 0 ? (
                        similarProducts.map((product) => (
                            <div key={product._id} className="similar-product-item">
                                <img src={`http://localhost:5000${product.images[0]?.url}`} alt={product.name} />
                                <h3>{product.name}</h3>
                                <p>${product.price}</p>
                            </div>
                        ))
                    ) : (
                        <p>No similar products found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
