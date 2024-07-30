import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './styles/ViewProduct.css'; // Import the CSS file for styling

const ViewProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Added error state

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/admin/products/${id}`);
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
                setError('Failed to fetch product. Please try again later.'); // Set error message
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>; // Display error message
    if (!product) return <div>Product not found</div>;

    return (
        <div className="view-product">
            <div className="product-images">
                {product.images.length > 0 ? (
                    <div className="carousel">
                        {product.images.map((image, index) => (
                            <div key={index} className="carousel-item">
                                <img src={`http://localhost:5000/uploads/${image.url}`} alt={`Product ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No images available</p>
                )}
            </div>
            <div className="product-details">
                <h1 className="product-name">{product.name}</h1>
                <p className="product-description">{product.description}</p>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <p className="product-sku">SKU: {product.sku}</p>
                <p className="product-category">Category: {product.category ? product.category.name : 'N/A'}</p>
                <p className="product-subcategory">Subcategory: {product.subcategory ? product.subcategory.name : 'N/A'}</p>
                {product.inventory && (
                    <p className="product-inventory">Inventory: {product.inventory.quantity}</p>
                )}
                {product.discount && (
                    <p className="product-discount">Discount: {product.discount.discountPercent}%</p>
                )}
            </div>
        </div>
    );
};

export default ViewProduct;
