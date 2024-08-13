import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './styles/SearchResults.css';
import Navbar from '../../components/UserComponents/Navbar';
import Footer from '../../components/UserComponents/Footer';
import ProductCard from '../../components/UserComponents/ProductCard'; // Import ProductCard

const SearchResults = () => {
    const [results, setResults] = useState([]);
    const [error] = useState(null);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q');

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/name/${encodeURIComponent(query)}`);
                setResults(response.data);
            } catch (err) {
                console.error('Error fetching products:', err);
            }
        };

        if (query) {
            fetchResults();
        }
    }, [query]);

    return (
        <div>
            <Navbar />
            <div className="search-results-page">
                <h1>Search Results</h1>
                {error && <p className="search-error">{error}</p>}
                <div className="product-grid">
                    {results.length > 0 ? (
                        results.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <p>No products found</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SearchResults;
