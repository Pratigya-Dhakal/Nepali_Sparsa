import React from 'react';
import FilterOptions from '../components/FilterOptions';
import ProductList from '../components/ProductList';
import Footer from '../components/Footer';
import './styles/ShopPage.css';
import Navbar from '../components/Navbar';

const ShopPage = () => {
    return (
        <div className="shop-page">
            <Navbar />
            <div className="header">
                <h1>Shop</h1>
            </div>
            <div className="shop-content">
                <FilterOptions />
                <ProductList />
            </div>
            <Footer />
        </div>
    );
};

export default ShopPage;
