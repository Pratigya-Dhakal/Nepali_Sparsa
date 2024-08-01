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
        images: [],
        quantity: ''
    });

    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [discountOptions, setDiscountOptions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/admin/products/${id}`);
                setProduct(response.data);
                setSelectedCategory(response.data.categoryId);
            } catch (error) {
                console.error('Error fetching product:', error);
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
        setProduct({
            ...product,
            images: e.target.files
        });
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setProduct({
            ...product,
            categoryId: e.target.value,
            subcategoryId: '' // Reset subcategory when category changes
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let key in product) {
            if (key === 'images') {
                for (let i = 0; i < product.images.length; i++) {
                    formData.append('images', product.images[i]);
                }
            } else {
                formData.append(key, product[key]);
            }
        }

        try {
            await axios.put(`http://localhost:5000/api/admin/products/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Product updated successfully');
            navigate('/products'); // Replace with the correct path
        } catch (error) {
            console.error('Error updating product:', error.message);
            if (error.response) {
                setError(error.response.data.message);
            }
        }
    };

    return (
        <div className="update-product">
            <h2>Update Product</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" value={product.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea name="description" value={product.description} onChange={handleChange} required></textarea>
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input type="number" name="price" value={product.price} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>SKU</label>
                    <input type="text" name="sku" value={product.sku} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <select name="categoryId" value={product.categoryId} onChange={handleCategoryChange} required>
                        <option value="">Select a category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Subcategory</label>
                    <select name="subcategoryId" value={product.subcategoryId} onChange={handleChange} required>
                        <option value="">Select a subcategory</option>
                        {subcategories.map(subcategory => (
                            <option key={subcategory.id} value={subcategory.id}>
                                {subcategory.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Quantity</label>
                    <input type="number" name="quantity" value={product.quantity} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Discount</label>
                    <select name="discountId" value={product.discountId} onChange={handleChange}>
                        <option value="">Select a discount</option>
                        {discountOptions.map(discount => (
                            <option key={discount.id} value={discount.id}>
                                {discount.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Images</label>
                    <input type="file" name="images" multiple onChange={handleFileChange} />
                </div>
                <button type="submit">Update Product</button>
            </form>
        </div>
    );
};

export default UpdateProduct;
