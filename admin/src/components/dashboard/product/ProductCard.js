import React from 'react';
import './styles/ProductCard.css';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <div className="product-details">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Category: {product.category.name}</p>
                <p>Subcategory: {product.subcategory.name}</p>
            </div>
        </div>
    );
};

export default ProductCard;
