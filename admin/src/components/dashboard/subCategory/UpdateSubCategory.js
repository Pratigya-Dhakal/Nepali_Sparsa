import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './styles/AddSubcategory.css'; // Use the same CSS file

const UpdateSubcategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [parentCategories, setParentCategories] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSubcategory = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/admin/subcategories/${id}`);
                setName(response.data.name || '');
                setDescription(response.data.description || '');
                setParentCategoryId(response.data.parentCategoryId || '');
            } catch (error) {
                console.error('Error fetching subcategory:', error);
            }
        };

        const fetchParentCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/categories');
                setParentCategories(response.data);
            } catch (error) {
                console.error('Error fetching parent categories:', error);
            }
        };

        fetchSubcategory();
        fetchParentCategories();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            const data = {
                name,
                description,
                parentCategoryId,
            };

            await axios.put(`http://localhost:5000/api/admin/subcategories/${id}`, data);

            alert('Subcategory updated successfully');
            navigate('/admin/subcategories/all');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError(error.response.data.message);
            } else {
                console.error('Error updating subcategory:', error);
            }
        }
    };

    return (
        <div className="add-category-container"> {/* Use the same class name */}
            <h2>Update Subcategory</h2>
            {error && <p className="error-message">{error}</p>}
            <form className="add-category-form" onSubmit={handleSubmit}> {/* Use the same class name */}
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
                        {parentCategories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='form-buttons'>
                    <button type="button" className="btn-cancel-subcategory" onClick={() => window.history.back()}>Cancel</button>
                    <button type="submit" className="btn-add-subcategory">Update Subcategory</button> {/* Use the same class name */}
                </div>
            </form>
        </div>
    );
};

export default UpdateSubcategory;
