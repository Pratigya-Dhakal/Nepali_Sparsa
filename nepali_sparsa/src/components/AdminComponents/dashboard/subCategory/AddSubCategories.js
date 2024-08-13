// src/components/AddSubCategory.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/AddSubcategory.css';

const AddSubCategory = () => {
const [name, setName] = useState('');
const [description, setDescription] = useState('');
const [parentCategoryId, setParentCategoryId] = useState('');
const [parentCategories, setParentCategories] = useState([]);
const [error, setError] = useState('');

useEffect(() => {
    const fetchParentCategories = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/admin/categories');
        setParentCategories(response.data);
    } catch (error) {
        console.error('Error fetching parent categories:', error);
    }
    };

    fetchParentCategories();
}, []);

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    setError('');
    const newSubCategory = {
        name,
        description,
        parentCategoryId
    };

    await axios.post('http://localhost:5000/api/admin/subcategories', newSubCategory);

    alert('Subcategory added successfully');
    setName('');
    setDescription('');
    setParentCategoryId('');
    } catch (error) {
    if (error.response && error.response.status === 400) {
        setError(error.response.data.message);
    } else {
        console.error('Error adding subcategory:', error);
    }
    }
};

return (
    <div className="add-category-container">
    <h2>Add Subcategory</h2>
    {error && <p className="error-message">{error}</p>}
    <form className="add-category-form" onSubmit={handleSubmit}>
        <div className="form-group">
        <label>Name</label>
        <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
        />
        </div>
        <div className="form-group">
        <label>Description</label>
        <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
        />
        </div>
        <div className="form-group">
        <label>Parent Category</label>
        <select
            value={parentCategoryId}
            onChange={(e) => setParentCategoryId(e.target.value)}
            required
        >
            <option value="">Select Parent Category</option>
            {parentCategories.map(parentCategory => (
            <option key={parentCategory.id} value={parentCategory.id}>
                {parentCategory.name}
            </option>
            ))}
        </select>
        </div>
        <div className='form-buttons'>
        <button type="button" className="btn-cancel-category" onClick={() => window.history.back()}>Cancel</button>
        <button type="submit" className="btn-add-category">Add Subcategory</button>
        </div>
    </form>
    </div>
);
};

export default AddSubCategory;
