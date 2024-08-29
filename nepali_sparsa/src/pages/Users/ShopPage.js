import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles/ShopPage.css';
import Navbar from '../../components/UserComponents/Navbar';
import Footer from '../../components/UserComponents/Footer';
import ProductCard from '../../components/UserComponents/ProductCard';

const baseUrl = 'http://localhost:5000';

const ShopPage = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [totalCount, setTotalCount] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [categories, setCategories] = useState([]);
    const itemsPerPage = window.innerWidth > 768 ? 20 : 10;
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetchCategories();

        const params = new URLSearchParams(location.search);
        const categoryId = params.get('category');
        if (categoryId) {
            setSelectedCategory(categoryId);
        }
    }, [location.search]);

    useEffect(() => {
        setProducts([]);
        setPage(0);
        fetchProducts();
    }, [selectedCategory, subcategory]);

    useEffect(() => {
        if (page > 0) {
            fetchProducts();
        }
    }, [page]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/admin/categories`);
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/products`, {
                params: {
                    page,
                    limit: itemsPerPage,
                    category: selectedCategory,
                    subcategory,
                },
            });

            setProducts(prevProducts => {
                const existingProductIds = new Set(prevProducts.map(product => product.id));
                const newProducts = response.data.products.filter(product => !existingProductIds.has(product.id));
                return [...prevProducts, ...newProducts];
            });

            setTotalCount(response.data.totalCount);
            if (response.data.products.length < itemsPerPage || (page + 1) * itemsPerPage >= response.data.totalCount) {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
        setSubcategory(''); // Clear subcategory when category changes
        navigate(`/shop?category=${categoryId}`);
    };

    const handleSubcategoryChange = (e) => {
        setSubcategory(e.target.value);
    };

    const handleLoadMore = () => {
        if (hasMore) {
            setPage(prevPage => prevPage + 1);
        }
    };
    const handleAddToCart = async (productId) => {
        // Add to cart logic
    };

    return (
        <div>
            <Navbar />
            <div className="shop-page">
                <div className="shop-header">
                    <h2>Browse Products</h2>
                    <p>Showing {products.length} of {totalCount} results</p>
                </div>
                <div className="shop-layout">
                    <div className="filters">
                        {/* Category Filters */}
                        <div className="filter-category">
                            <label>Category:</label>
                            {categories.map(category => (
                                <div key={category.id}>
                                    <button onClick={() => handleCategoryClick(category.id)}>
                                        {category.name}
                                    </button>
                                    {selectedCategory === category.id && category.subcategories && (
                                        <select onChange={handleSubcategoryChange} value={subcategory}>
                                            <option value="">All Subcategories</option>
                                            {category.subcategories.map(subcat => (
                                                <option key={subcat.id} value={subcat.id}>{subcat.name}</option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="product-grid">
                        {products.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onProductClick={() => navigate(`/products/${product.id}`)}
                                onAddToCart={() => handleAddToCart(product.id)}
                                onBuyNow={() => navigate(`/checkout?product=${product.id}`)}
                            />
                        ))}
                    </div>
                </div>

                {hasMore && (
                    <div className="load-more">
                        <button onClick={handleLoadMore}>Load More</button>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default ShopPage;
