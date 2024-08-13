import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './styles/ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };
        fetchProduct();
    }, [id]);

    if (!product) return <div>Loading...</div>;

    return (
        <div className="product-detail-container">
            <nav className="breadcrumb">
                <span>Browse Products</span> / <span>{product.category}</span> / <span>{product.name}</span>
            </nav>

            <div className="product-detail">
                <div className="image-section">
                    <img src={`http://localhost:5000${product.images[0].url}`} alt={product.name} className="main-image" />
                    <div className="thumbnails">
                        {product.images.map((image, index) => (
                            <img key={index} src={`http://localhost:5000${image.url}`} alt={product.name} />
                        ))}
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
                                {product.size ? product.size.split(',').map((size) => (
                                    <button
                                        key={size}
                                        className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                )) : <p>No sizes available</p>}
                            </div>
                        </div>

                        <div className="color">
                            <label>Available Color:</label>
                            <div className="color-options">
                                {product.color ? product.color.split(',').map((color) => (
                                    <button
                                        key={color}
                                        className={`color-button ${selectedColor === color ? 'selected' : ''}`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => setSelectedColor(color)}
                                    />
                                )) : <p>No colors available</p>}
                            </div>
                        </div>
                    </div>

                    <div className="add-to-cart-section">
                        <div className="stock">
                            <span>Last 1 left – make it yours!</span>
                        </div>
                        <div className="quantity">
                            <button>-</button>
                            <input type="number" defaultValue="1" />
                            <button>+</button>
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
                {/* Discussion Section */}
            </div>

            <div className="related-products">
                {/* Related Products Section */}
            </div>
        </div>
    );
};

export default ProductDetail;
