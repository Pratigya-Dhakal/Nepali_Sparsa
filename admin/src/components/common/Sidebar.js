import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './styles/Sidebar.css';
import Logout from '../login/logout';

const Sidebar = () => {
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const [isSubcategoriesOpen, setIsSubcategoriesOpen] = useState(false);
    const [isProductsOpen, setIsProductsOpen] = useState(false);
    const [isInventoryOpen, setIsInventoryOpen] = useState(false);
    const [isDiscountOpen, setIsDiscountOpen] = useState(false);

    const toggleCategories = () => setIsCategoriesOpen(!isCategoriesOpen);
    const toggleSubcategories = () => setIsSubcategoriesOpen(!isSubcategoriesOpen);
    const toggleProducts = () => setIsProductsOpen(!isProductsOpen);
    const toggleInventory = () => setIsInventoryOpen(!isInventoryOpen);
    const toggleDiscount = () => setIsDiscountOpen(!isDiscountOpen);

    return (
        <div className="sidebar">
            <div className="logo">
                <h3>Nepali Sparsa.</h3>
            </div>
            <nav className="nav-links">
                <NavLink to="/admin/dashboard">Dashboard</NavLink>
                <div>
                    <button onClick={toggleCategories}>Categories</button>
                    {isCategoriesOpen && (
                        <ul>
                            <li><NavLink to="/admin/categories/all">All Categories</NavLink></li>
                            <li><NavLink to="/admin/categories/add">Add Category</NavLink></li>
                        </ul>
                    )}
                </div>
                <div>
                    <button onClick={toggleSubcategories}>Subcategories</button>
                    {isSubcategoriesOpen && (
                        <ul>
                            <li><NavLink to="/admin/subcategories/all">All Subcategories</NavLink></li>
                            <li><NavLink to="/admin/subcategories/add">Add Subcategory</NavLink></li>
                        </ul>
                    )}
                </div>
                <div>
                    <button onClick={toggleProducts}>Products</button>
                    {isProductsOpen && (
                        <ul>
                            <li><NavLink to="/admin/products/all">All Products</NavLink></li>
                            <li><NavLink to="/admin/products/add">Add Product</NavLink></li>
                        </ul>
                    )}
                </div>
                <div>
                    <button onClick={toggleInventory}>Inventory</button>
                    {isInventoryOpen && (
                        <ul>
                            <li><NavLink to="/admin/inventories">All Inventory</NavLink></li>
                            <li><NavLink to="/admin/inventories/add">Add Inventory</NavLink></li>
                        </ul>
                    )}
                </div>
                <div>
                    <button onClick={toggleDiscount}>Discounts</button>
                    {isDiscountOpen && (
                        <ul>
                            <li><NavLink to="/admin/discounts/all">All Discounts</NavLink></li>
                            <li><NavLink to="/admin/discounts/add">Add Discount</NavLink></li>
                        </ul>
                    )}
                </div>
                <NavLink to="/admin/users">Users</NavLink>
                <NavLink to="/admin/comments">Comments</NavLink>
                <NavLink to="/admin/orders">Orders</NavLink>
                <Logout />
            </nav>
        </div>
    );
};

export default Sidebar;
