import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './styles/ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(response.data);
            } catch (err) {
                console.error('Error fetching product details:', err);
                setError('Failed to fetch product details');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div className="product-detail">
            <div className="product-images">
                {product.images.length > 0 ? (
                    <>
                        <img
                            src={`http://localhost:5000${product.images[0].url}`}
                            alt={product.name}
                            className="main-image"
                        />
                        <div className="thumbnail-images">
                            {product.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={`http://localhost:5000${image.url}`}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="thumbnail"
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <div>No images available</div>
                )}
            </div>
            <div className="product-info">
                <h1>{product.name}</h1>
                <div className="rating-and-price">
                    <span className="rating">{product.rating} ★</span>
                    <span className="price">${product.price}</span>
                </div>
                <p>{product.description}</p>
                <div className="product-options">
                    <div className="sizes">
                        <label>Available Sizes:</label>
                        <div>
                            {product.size ? (
                                product.size.split(',').map((size, index) => (
                                    <button key={index} className="size-option">{size}</button>
                                ))
                            ) : (
                                <div>No sizes available</div>
                            )}
                        </div>
                    </div>
                </div>
                <button className="add-to-cart">Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductDetail;
