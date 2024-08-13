import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './styles/ProductsSection.css';

const ProductsSection = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [totalCount, setTotalCount] = useState(0);
    const itemsPerPage = window.innerWidth > 768 ? 20 : 10;

    useEffect(() => {
        fetchProducts(page);
    }, [page]);

    const fetchProducts = async (page) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/products`, {
                params: { page, limit: itemsPerPage }
            });
            setProducts(prevProducts => [...prevProducts, ...response.data.products]);
            setTotalCount(response.data.totalCount);
            if (response.data.products.length < itemsPerPage || (page + 1) * itemsPerPage >= response.data.totalCount) {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const loadMoreProducts = () => {
        setPage(prevPage => prevPage + 1);
    };

    return (
        <div className="products-page">
            <h1>Our Products</h1>
            <div className="products-grid">
                {products.map((product, index) => (
                    <ProductCard key={`${product.id}-${index}`} product={product} />
                ))}
            </div>
            {hasMore && (
                <div className="show-more-button">
                    <button onClick={loadMoreProducts}>Show More</button>
                </div>
            )}
        </div>
    );
};

export default ProductsSection;
