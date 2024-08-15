import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './styles/ProductDetail.css';
import Navbar from '../../components/UserComponents/Navbar';
import Footer from '../../components/UserComponents/Footer';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('details');
    const [mainImageIndex, setMainImageIndex] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(response.data);
                // Only fetch similar products if a category is available
                if (response.data.category?.name) {
                    fetchSimilarProducts(response.data.category.name);
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };
        fetchProduct();
    }, [id]);

    const fetchSimilarProducts = async (category) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/products/similar`, {
                params: { category }
            });
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

    const handleThumbnailClick = (index) => {
        setMainImageIndex(index);
    };

    const handleBuyNowClick = () => {
        navigate(`/checkout`);
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div>
            <Navbar />
            <div className="product-detail">
                <div className="product-detail-container">
                    <nav className="breadcrumb">
                        <span>Browse Products</span> / <span>{product.category?.name || 'Category'}</span> / <span>{product.name}</span>
                    </nav>

                    <div className="product-detail">
                        <div className="image-section">
                            <Swiper
                                spaceBetween={10}
                                slidesPerView={1}
                                loop={true}
                                navigation={true}
                                pagination={{ clickable: true }}
                                modules={[Navigation, Pagination]}
                                className="main-swiper"
                            >
                                {product.images && product.images.length > 0 ? (
                                    product.images.map((image, index) => (
                                        <SwiperSlide key={index}>
                                            <img
                                                src={`http://localhost:5000${image.url}`}
                                                alt={product.name}
                                                className="main-image"
                                            />
                                        </SwiperSlide>
                                    ))
                                ) : (
                                    <p>No images available</p>
                                )}
                            </Swiper>

                            <div className="thumbnails">
                                <Swiper
                                    spaceBetween={10}
                                    slidesPerView={4}
                                    watchSlidesProgress
                                    className="thumbnail-swiper"
                                >
                                    {product.images && product.images.length > 0 ? (
                                        product.images.map((image, index) => (
                                            <SwiperSlide key={index}>
                                                <img
                                                    src={`http://localhost:5000${image.url}`}
                                                    alt={product.name}
                                                    className={`thumbnail ${mainImageIndex === index ? 'active' : ''}`}
                                                    onClick={() => handleThumbnailClick(index)}
                                                />
                                            </SwiperSlide>
                                        ))
                                    ) : (
                                        <p>No images available</p>
                                    )}
                                </Swiper>
                            </div>
                        </div>

                        <div className="info-section">
                            <h1>{product.name}</h1>
                            <div className="rating">
                                <span className="stars">★ ★ ★ ★ ☆</span>
                                <span className="reviews">({product.reviews || 0} reviews)</span>
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
                                    <span>{product.stock > 0 ? `Last ${product.stock} left – make it yours!` : 'Out of stock'}</span>
                                </div>
                                <div className="cart-section">
                                    <div className="cart-column quantity">
                                        <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>-</button>
                                        <input type="number" value={quantity} readOnly />
                                        <button onClick={() => handleQuantityChange(1)}>+</button>
                                    </div>
                                    <div className="cart-column">
                                        <button className="add-to-cart">Add to cart</button>
                                    </div>
                                    <div className="cart-column">
                                        <button className="buy-now" onClick={handleBuyNowClick}>Buy Now</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="tabs">
                        <span className={`tab ${activeTab === 'details' ? 'active' : ''}`} onClick={() => setActiveTab('details')}>The Details</span>
                        <span className={`tab ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>Ratings & Reviews</span>
                        <span className={`tab ${activeTab === 'discussion' ? 'active' : ''}`} onClick={() => setActiveTab('discussion')}>Discussion</span>
                    </div>

                    <div className="tab-content">
                        {activeTab === 'details' && (
                            <div className="details-section">
                                <h3>Product Description</h3>
                                <p>{product.description}</p>
                            </div>
                        )}
                        {activeTab === 'reviews' && (
                            <div className="reviews-section">
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
                        )}
                        {activeTab === 'discussion' && (
                            <div className="discussion-section">
                                <h3>Discussion</h3>
                                <p>Coming soon...</p>
                            </div>
                        )}
                    </div>

                    <div className="similar-products">
                        <h3>Similar Products</h3>
                        <div className="similar-products-list">
                            {similarProducts.length > 0 ? (
                                similarProducts.map((product) => (
                                    <div key={product._id} className="similar-product-item">
                                        <img src={`http://localhost:5000${product.image}`} alt={product.name} />
                                        <div className="similar-product-info">
                                            <h4>{product.name}</h4>
                                            <p>${product.price}</p>
                                            <button onClick={() => navigate(`/products/${product._id}`)}>View Details</button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No similar products found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductDetail;
