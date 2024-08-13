import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => (
    <nav>
        <ul>
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/products">Products</Link></li>
        <li><Link to="/admin/categories">Categories</Link></li>
        <li><Link to="/admin/subcategories">Subcategories</Link></li>
        <li><Link to="/admin/users">Users</Link></li>
        <li><Link to="/admin/comments">Comments</Link></li>
        <li><Link to="/admin/logout">Logout</Link></li>
        </ul>
    </nav>
);

export default AdminNavbar;
