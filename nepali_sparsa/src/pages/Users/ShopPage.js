import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/ShopPage.css';
import Navbar from '../../components/UserComponents/Navbar';
import Footer from '../../components/UserComponents/Footer';
import ProductCard from '../../components/UserComponents/ProductCard'; // Import your ProductCard component
import { FaShoppingCart } from 'react-icons/fa';

const baseUrl = 'http://localhost:5000'; // Base URL for your API

const ShopPage = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [totalCount, setTotalCount] = useState(0);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [subcategory, setSubcategory] = useState('');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
    const [size, setSize] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [categories, setCategories] = useState([]);
    const itemsPerPage = window.innerWidth > 768 ? 20 : 10;
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        setProducts([]); // Clear products when filters change
        setPage(0);
        fetchProducts();
    }, [selectedCategories, subcategory, priceRange, size, sortOption]);

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
                    categories: selectedCategories.join(','), 
                    subcategory, 
                    minPrice: priceRange.min, 
                    maxPrice: priceRange.max, 
                    size, 
                    sort: sortOption 
                }
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

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setSelectedCategories(prevCategories =>
            prevCategories.includes(value)
                ? prevCategories.filter(category => category !== value)
                : [...prevCategories, value]
        );
    };

    const handleSubcategoryChange = (e) => {
        setSubcategory(e.target.value);
    };

    const handlePriceRangeChange = (e) => {
        setPriceRange(prevRange => ({ ...prevRange, [e.target.name]: e.target.value }));
    };

    const handleSizeChange = (e) => {
        setSize(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const handleLoadMore = () => {
        if (hasMore) {
            setPage(prevPage => prevPage + 1);
        }
    };
    const handleAddToCart = async (productId) => {};

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
                                    <input 
                                        type="checkbox" 
                                        value={category.id} 
                                        onChange={handleCategoryChange}
                                        checked={selectedCategories.includes(category.id)}
                                    />
                                    <label>{category.name}</label>
                                    {selectedCategories.includes(category.id) && category.subcategories && (
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
                        
                        {/* Price Range Filter */}
                        <div className="filter-price">
                            <label>Price Range:</label>
                            <input 
                                type="number" 
                                name="min" 
                                value={priceRange.min} 
                                onChange={handlePriceRangeChange} 
                                placeholder="Min Price"
                                min="0"
                            />
                            <input 
                                type="number" 
                                name="max" 
                                value={priceRange.max} 
                                onChange={handlePriceRangeChange} 
                                placeholder="Max Price"
                                min="0"
                            />
                        </div>

                        {/* Size Filter */}
                        <div className="filter-size">
                            <label>Size:</label>
                            <select onChange={handleSizeChange} value={size}>
                                <option value="">All Sizes</option>
                                <option value="XS">XS</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                            </select>
                        </div>

                        {/* Sort Options */}
                        <div className="filter-sort">
                            <label>Sort By:</label>
                            <select onChange={handleSortChange} value={sortOption}>
                                <option value="">Default</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="popularity">Popularity</option>
                            </select>
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
