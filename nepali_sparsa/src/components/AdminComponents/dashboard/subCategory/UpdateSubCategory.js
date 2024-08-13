import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './styles/UpdateSubcategory.css';

const UpdateSubcategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [subcategory, setSubcategory] = useState({
        name: '',
        categoryId: ''
    });

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSubcategory = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/admin/subcategories/${id}`);
                setSubcategory(response.data);
            } catch (error) {
                console.error('Error fetching subcategory:', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchSubcategory();
        fetchCategories();
    }, [id]);

    const handleChange = (e) => {
        setSubcategory({
            ...subcategory,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/admin/subcategories/${id}`, subcategory);
            alert('Subcategory updated successfully');
            navigate('/subcategories'); // Replace with the correct path
        } catch (error) {
            console.error('Error updating subcategory:', error.message);
            if (error.response) {
                setError(error.response.data.message);
            }
        }
    };

    return (
        <div className="update-subcategory">
            <h2>Update Subcategory</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={subcategory.name} 
                        onChange={handleChange} 
                        required 
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <select 
                        name="categoryId" 
                        value={subcategory.categoryId} 
                        onChange={handleChange} 
                        required 
                        className="form-select"
                    >
                        <option value="">Select a category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="submit-button">Update Subcategory</button>
            </form>
        </div>
    );
};

export default UpdateSubcategory;
