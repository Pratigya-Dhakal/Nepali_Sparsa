// src/route/route.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/Users/HomePage';
import ShopPage from '../pages/Users/ShopPage';
import SignInPage from '../pages/Users/SignInPage';
import SignUpPage from '../pages/Users/SignUpPage';
import AboutUs from '../pages/Users/AboutUsPage';
import ContactUsPage from '../pages/Users/ContactUsPage';
import SearchResults from '../pages/Users/SearchResults';
import ProductDetail from '../pages/Users/ProductDetail';
import FaqPage from '../pages/Users/FaqPage';
import EmailVerification from '../pages/Users/EmailVerification'; 
import ForgotPassword from '../pages/Users/ForgotPassword';
import ResetPasswordPage from '../pages/Users/ResetPasswordPage';
import CheckoutPage from '../pages/Users/CheckoutPage';
import CartPage from '../pages/Users/CartPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/verify-email" element={<EmailVerification />} />
            <Route path="/signIn" element={<SignInPage />} />
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/cart" element={<CartPage />} />
        </Routes>
    );
};

export default AppRoutes;
