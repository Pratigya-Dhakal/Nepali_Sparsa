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

    // Use a Set to keep track of product IDs
    const [productIds, setProductIds] = useState(new Set());

    useEffect(() => {
        fetchProducts(page);
    }, [page]);

    const fetchProducts = async (page) => {
        try {
            const response = await axios.get('http://localhost:5000/api/products', {
                params: { page, limit: itemsPerPage }
            });

            // Filter out products that are already in the productIds set
            const newProducts = response.data.products.filter(product => !productIds.has(product.id));

            // Update the Set with new product IDs
            setProductIds(prevIds => new Set([...prevIds, ...newProducts.map(product => product.id)]));

            // Combine existing products with the new ones and remove duplicates
            setProducts(prevProducts => {
                const combinedProducts = [...prevProducts, ...newProducts];
                const uniqueProducts = Array.from(new Map(combinedProducts.map(product => [product.id, product])).values());
                return uniqueProducts;
            });

            setTotalCount(response.data.totalCount);

            if (newProducts.length < itemsPerPage || (page + 1) * itemsPerPage >= response.data.totalCount) {
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
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
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
