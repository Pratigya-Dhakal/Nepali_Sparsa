import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Ensure axios is correctly imported
import ProductCard from './ProductCard';
import './styles/ProductsSection.css'; // Ensure the path to your CSS file is correct

const ProductsSection = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="products-page">
            <h1>Our Products</h1>
            <div className="products-grid">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductsSection;
