import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './styles/UpdateProduct.css';

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        sku: '',
        categoryId: '',
        subcategoryId: '',
        discountId: '',
        quantity: ''
    });
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [discountOptions, setDiscountOptions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [images, setImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/admin/products/${id}`);
                setProduct({
                    ...response.data,
                    images: response.data.images || [] // Ensure images are handled correctly
                });
                setImages(response.data.images || []); // Initialize images
                setSelectedCategory(response.data.categoryId || '');
            } catch (error) {
                console.error('Error fetching product:', error);
                setError('Failed to fetch product details.');
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError('Failed to fetch categories.');
            }
        };

        fetchProduct();
        fetchCategories();
    }, [id]);

    useEffect(() => {
        const fetchSubcategories = async (categoryId) => {
            try {
                const response = await axios.get(`http://localhost:5000/api/admin/subcategories?categoryId=${categoryId}`);
                setSubcategories(response.data);
            } catch (error) {
                console.error('Error fetching subcategories:', error);
                setError('Failed to fetch subcategories.');
            }
        };

        if (selectedCategory) {
            fetchSubcategories(selectedCategory);
        } else {
            setSubcategories([]);
        }
    }, [selectedCategory]);

    useEffect(() => {
        const fetchDiscountOptions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/discounts');
                setDiscountOptions(response.data);
            } catch (error) {
                console.error('Error fetching discount options:', error);
                setError('Failed to fetch discount options.');
            }
        };

        fetchDiscountOptions();
    }, []);

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        setNewImages(e.target.files);
    };

    const handleCategoryChange = (e) => {
        const newCategory = e.target.value;
        setSelectedCategory(newCategory);
        setProduct({
            ...product,
            categoryId: newCategory,
            subcategoryId: '' // Reset subcategory when category changes
        });
    };

    const handleImageDelete = async (imageId) => {
        try {
            await axios.delete(`http://localhost:5000/api/admin/products/${id}/images/${imageId}`);
            setImages(images.filter(image => image.id !== imageId));
            setSuccessMessage('Image deleted successfully');
        } catch (error) {
            console.error('Error deleting image:', error);
            setError('Failed to delete image.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let key in product) {
            formData.append(key, product[key]);
        }
        formData.append('oldImageIds', JSON.stringify(images.map(image => image.id)));
        for (let i = 0; i < newImages.length; i++) {
            formData.append('newImages', newImages[i]);
        }

        try {
            await axios.put(`http://localhost:5000/api/admin/products/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSuccessMessage('Product updated successfully');
            navigate('/admin/products/all'); // Adjust path if needed
        } catch (error) {
            console.error('Error updating product:', error);
            setError('Failed to update product.');
        }
    };

    return (
        <div className="update-product">
            <h2>Update Product</h2>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        id="name" 
                        type="text" 
                        name="name" 
                        value={product.name} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea 
                        id="description" 
                        name="description" 
                        value={product.description} 
                        onChange={handleChange} 
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input 
                        id="price" 
                        type="number" 
                        name="price" 
                        value={product.price} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sku">SKU</label>
                    <input 
                        id="sku" 
                        type="text" 
                        name="sku" 
                        value={product.sku} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select 
                        id="category" 
                        name="categoryId" 
                        value={product.categoryId || ''} 
                        onChange={handleCategoryChange} 
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="subcategory">Subcategory</label>
                    <select 
                        id="subcategory" 
                        name="subcategoryId" 
                        value={product.subcategoryId || ''} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="">Select a subcategory</option>
                        {subcategories.map(subcategory => (
                            <option key={subcategory.id} value={subcategory.id}>
                                {subcategory.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="discount">Discount</label>
                    <select 
                        id="discount" 
                        name="discountId" 
                        value={product.discountId || ''} 
                        onChange={handleChange}
                    >
                        <option value="">Select a discount</option>
                        {discountOptions.map(discount => (
                            <option key={discount.id} value={discount.id}>
                                {discount.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input 
                        id="quantity" 
                        type="number" 
                        name="quantity" 
                        value={product.quantity} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="images">New Images</label>
                    <input 
                        id="images" 
                        type="file" 
                        multiple 
                        onChange={handleFileChange} 
                    />
                </div>
                <div className="form-group">
                    <h4>Existing Images</h4>
                    <div className="image-gallery">
                        {images.map(image => (
                            <div key={image.id} className="image-item">
                                <img src={`http://localhost:5000${image.url}`} alt="Product" />
                                <button type="button" onClick={() => handleImageDelete(image.id)}>Delete</button>
                            </div>
                        ))}
                    </div>
                </div>
                <button type="submit">Update Product</button>
            </form>
        </div>
    );
};

export default UpdateProduct;
