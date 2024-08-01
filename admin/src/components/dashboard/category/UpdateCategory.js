import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './styles/UpdateCategory.css';

const UpdateCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/admin/categories/${id}`);
                setName(response.data.name || '');
                setDescription(response.data.description || '');
            } catch (error) {
                console.error('Error fetching category:', error);
            }
        };

        fetchCategory();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            if (image) {
                formData.append('image', image);
            }

            await axios.put(`http://localhost:5000/api/admin/categories/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('Category updated successfully');
            navigate('/categories'); // Replace with the correct path
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError(error.response.data.message);
            } else {
                console.error('Error updating category:', error);
            }
        }
    };

    return (
        <div className="add-category-container">
            <h2>Update Category</h2>
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
                    <label>Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <div className='form-buttons'>
                    <button type="button" className="btn-cancel-category" onClick={() => window.history.back()}>Cancel</button>
                    <button type="submit" className="btn-add-category">Update Category</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateCategory;
