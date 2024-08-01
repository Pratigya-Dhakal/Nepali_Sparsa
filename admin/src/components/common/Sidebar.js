import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './styles/Sidebar.css';
import Logout from '../login/logout';

const Sidebar = () => {
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const [isSubcategoriesOpen, setIsSubcategoriesOpen] = useState(false);
    const [isProductsOpen, setIsProductsOpen] = useState(false);
    // const [isInventoryOpen, setIsInventoryOpen] = useState(false);
    const [isDiscountOpen, setIsDiscountOpen] = useState(false);

    const toggleCategories = () => setIsCategoriesOpen(!isCategoriesOpen);
    const toggleSubcategories = () => setIsSubcategoriesOpen(!isSubcategoriesOpen);
    const toggleProducts = () => setIsProductsOpen(!isProductsOpen);
    // const toggleInventory = () => setIsInventoryOpen(!isInventoryOpen);
    const toggleDiscount = () => setIsDiscountOpen(!isDiscountOpen);

    return (
        <div className="sidebar">
            <div className="logo">
                <h3>Nepali Sparsa.</h3>
            </div>
            <nav className="nav-links">
                <NavLink exact to="/admin/dashboard" activeClassName="active">Dashboard</NavLink>
                <div>
                    <button onClick={toggleCategories} className="nav-button">Categories</button>
                    {isCategoriesOpen && (
                        <ul className="nav-submenu">
                            <li><NavLink to="/admin/categories/all" activeClassName="active">All Categories</NavLink></li>
                            <li><NavLink to="/admin/categories/add" activeClassName="active">Add Category</NavLink></li>
                        </ul>
                    )}
                </div>
                <div>
                    <button onClick={toggleSubcategories} className="nav-button">Subcategories</button>
                    {isSubcategoriesOpen && (
                        <ul className="nav-submenu">
                            <li><NavLink to="/admin/subcategories/all" activeClassName="active">All Subcategories</NavLink></li>
                            <li><NavLink to="/admin/subcategories/add" activeClassName="active">Add Subcategory</NavLink></li>
                        </ul>
                    )}
                </div>
                <div>
                    <button onClick={toggleProducts} className="nav-button">Products</button>
                    {isProductsOpen && (
                        <ul className="nav-submenu">
                            <li><NavLink to="/admin/products/all" activeClassName="active">All Products</NavLink></li>
                            <li><NavLink to="/admin/products/add" activeClassName="active">Add Product</NavLink></li>
                        </ul>
                    )}
                </div>
                {/* <div>
                    <button onClick={toggleInventory} className="nav-button">Inventory</button>
                    {isInventoryOpen && (
                        <ul className="nav-submenu">
                            <li><NavLink to="/admin/inventories" activeClassName="active">All Inventory</NavLink></li>
                            <li><NavLink to="/admin/inventories/add" activeClassName="active">Add Inventory</NavLink></li>
                        </ul>
                    )}
                </div> */}
                <div>
                    <button onClick={toggleDiscount} className="nav-button">Discounts</button>
                    {isDiscountOpen && (
                        <ul className="nav-submenu">
                            <li><NavLink to="/admin/discounts/all" activeClassName="active">All Discounts</NavLink></li>
                            <li><NavLink to="/admin/discounts/add" activeClassName="active">Add Discount</NavLink></li>
                        </ul>
                    )}
                </div>
                <NavLink to="/admin/users" activeClassName="active">Users</NavLink>
                <NavLink to="/admin/orders" activeClassName="active">Orders</NavLink>
                <Logout />
            </nav>
        </div>
    );
};

export default Sidebar;
