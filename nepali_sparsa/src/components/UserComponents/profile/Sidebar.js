import React from 'react';
import './styles/Sidebar.css';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <p>Hello, [Username]</p>
            <button className="verified-account-btn">Verified Account</button>
            <nav>
                <NavLink to="/account" activeClassName="active">Manage My Account</NavLink>
                <ul>
                    <li><NavLink to="/profile">My Profile</NavLink></li>
                    <li><NavLink to="/address-book">Address Book</NavLink></li>
                    <li><NavLink to="/payment-options">My Payment Options</NavLink></li>
                </ul>
                <NavLink to="/orders" activeClassName="active">My Orders</NavLink>
                <ul>
                    <li><NavLink to="/returns">My Returns</NavLink></li>
                    <li><NavLink to="/cancellations">My Cancellations</NavLink></li>
                </ul>
                <NavLink to="/reviews" activeClassName="active">My Reviews</NavLink>
            </nav>
        </div>
    );
};

export default Sidebar;
