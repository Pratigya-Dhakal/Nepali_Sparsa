import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './styles/Sidebar.css';
import Logout from '../login/logout';

const Sidebar = () => {
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const [isSubcategoriesOpen, setIsSubcategoriesOpen] = useState(false);
    const [isProductsOpen, setIsProductsOpen] = useState(false);
    const [isDealsOpen, setIsDealsOpen] = useState(false);
    const [isDiscountOpen, setIsDiscountOpen] = useState(false);

    const toggleCategories = () => setIsCategoriesOpen(!isCategoriesOpen);
    const toggleSubcategories = () => setIsSubcategoriesOpen(!isSubcategoriesOpen);
    const toggleProducts = () => setIsProductsOpen(!isProductsOpen);
    const toggleDeals = () => setIsDealsOpen(!isDealsOpen);
    const toggleDiscount = () => setIsDiscountOpen(!isDiscountOpen);

    return (
        <div className="sidebar">
            <div className="logo">
                <h3>Nepali Sparsa.</h3>
            </div>
            <nav className="nav-links">
                <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? 'active' : undefined}>Dashboard</NavLink>
                <div>
                    <button onClick={toggleCategories} className="nav-button">Categories</button>
                    {isCategoriesOpen && (
                        <ul className="nav-submenu">
                            <li><NavLink to="/admin/categories/all" className={({ isActive }) => isActive ? 'active' : undefined}>All Categories</NavLink></li>
                            <li><NavLink to="/admin/categories/add" className={({ isActive }) => isActive ? 'active' : undefined}>Add Category</NavLink></li>
                        </ul>
                    )}
                </div>
                <div>
                    <button onClick={toggleSubcategories} className="nav-button">Subcategories</button>
                    {isSubcategoriesOpen && (
                        <ul className="nav-submenu">
                            <li><NavLink to="/admin/subcategories/all" className={({ isActive }) => isActive ? 'active' : undefined}>All Subcategories</NavLink></li>
                            <li><NavLink to="/admin/subcategories/add" className={({ isActive }) => isActive ? 'active' : undefined}>Add Subcategory</NavLink></li>
                        </ul>
                    )}
                </div>
                <div>
                    <button onClick={toggleProducts} className="nav-button">Products</button>
                    {isProductsOpen && (
                        <ul className="nav-submenu">
                            <li><NavLink to="/admin/products/all" className={({ isActive }) => isActive ? 'active' : undefined}>All Products</NavLink></li>
                            <li><NavLink to="/admin/products/add" className={({ isActive }) => isActive ? 'active' : undefined}>Add Product</NavLink></li>
                        </ul>
                    )}
                </div>
                <div>
                    <button onClick={toggleDeals} className="nav-button">Deals</button>
                    {isDealsOpen && (
                        <ul className="nav-submenu">
                            <li><NavLink to="/admin/deals/all" className={({ isActive }) => isActive ? 'active' : undefined}>All Deals</NavLink></li>
                            {/* <li><NavLink to="/admin/deals/add" className={({ isActive }) => isActive ? 'active' : undefined}>Add Deal</NavLink></li> */}
                        </ul>
                    )}
                </div>
                <div>
                    <button onClick={toggleDiscount} className="nav-button">Discounts</button>
                    {isDiscountOpen && (
                        <ul className="nav-submenu">
                            <li><NavLink to="/admin/discounts/all" className={({ isActive }) => isActive ? 'active' : undefined}>All Discounts</NavLink></li>
                            <li><NavLink to="/admin/discounts/add" className={({ isActive }) => isActive ? 'active' : undefined}>Add Discount</NavLink></li>
                        </ul>
                    )}
                </div>
                <NavLink to="/admin/users" className={({ isActive }) => isActive ? 'active' : undefined}>Users</NavLink>
                <NavLink to="/admin/orders" className={({ isActive }) => isActive ? 'active' : undefined}>Orders</NavLink>
                <Logout />
            </nav>
        </div>
    );
};

export default Sidebar;
