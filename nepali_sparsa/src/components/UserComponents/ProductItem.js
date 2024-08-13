import React from 'react';
import './styles/ProductItem.css';

const ProductItem = ({ product }) => {
return (
    <div className="product-item">
    <div className="discount">{product.discount}</div>
    <img src={product.image} alt={product.name} />
    <h3>{product.name}</h3>
    <p>{product.category}</p>
    <p>
        ${product.price} <span className="old-price">${product.oldPrice}</span>
    </p>
    <p>Rating: {product.rating}</p>
    <button>Add to Cart</button>
    </div>
);
};

export default ProductItem;
