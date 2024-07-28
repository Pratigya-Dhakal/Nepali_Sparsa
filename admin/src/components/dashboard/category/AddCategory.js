import React, { useState } from 'react';
import axios from 'axios';
import './styles/AddCategory.css';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');

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

            await axios.post('/api/admin/categories', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('Category added successfully');
            setName('');
            setDescription('');
            setImage(null);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError(error.response.data.message);
            } else {
                console.error('Error adding category:', error);
            }
        }
    };

    return (
        <div className="add-category-container">
            <h2>Add Category</h2>
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
                    <button type="submit" className="btn-add-category">Add Category</button>
                </div>
            </form>
        </div>
    );
};

export default AddCategory;
