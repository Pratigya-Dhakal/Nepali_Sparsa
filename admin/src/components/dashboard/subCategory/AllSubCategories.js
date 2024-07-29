// src/components/AllSubCategories.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import './styles/AllSubCategories.css'; // Reusing the CSS

const AllSubCategories = () => {
const [subCategories, setSubCategories] = useState([]);

useEffect(() => {
    const fetchSubCategories = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/admin/subcategories');
        setSubCategories(response.data);
    } catch (error) {
        console.error('Error fetching subcategories:', error);
    }
    };

    fetchSubCategories();
}, []);

const handleDelete = async (id) => {
    try {
    await axios.delete(`http://localhost:5000/api/admin/subcategories/${id}`);
    setSubCategories(subCategories.filter(subCategory => subCategory.id !== id));
    } catch (error) {
    console.error('Error deleting subcategory:', error);
    }
};

return (
    <div className="all-categories">
    <h2>All Subcategories</h2>
    <table>
        <thead>
        <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {subCategories.map(subCategory => (
            <tr key={subCategory.id}>
            <td>{subCategory.name}</td>
            <td>{subCategory.description}</td>
            <td>
                <button 
                className="button-delete"
                onClick={() => handleDelete(subCategory.id)}
                >
                Delete
                </button>
                <NavLink 
                to={`/admin/subcategories/update/${subCategory.id}`} 
                className="button-update"
                >
                Update
                </NavLink>
            </td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>
);
};

export default AllSubCategories;
