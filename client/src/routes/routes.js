// src/route/route.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ShopPage from '../pages/ShopPage';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import AboutUs from '../pages/AboutUsPage';
import ContactUsPage from '../pages/ContactUsPage';
import SearchResults from '../pages/SearchResults';
import ProductDetail from '../pages/ProductDetail';
import FaqPage from '../pages/FaqPage'; // Add this line   
import EmailVerification from '../pages/EmailVerification'; // Add this line 

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/signIn" element={<SignInPage />} />
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/faq" element={< FaqPage/>} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/products/:id" element={<ProductDetail/>} />
            <Route path="/verify-email" element={<EmailVerification />} />
            
        </Routes>
    );
};

export default AppRoutes;