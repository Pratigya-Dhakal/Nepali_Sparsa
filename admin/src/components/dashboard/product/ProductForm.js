import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/ProductForm.css';

const ProductForm = ({ productId, isUpdate }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [sku, setSku] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [subcategoryId, setSubcategoryId] = useState('');
    const [inventory, setInventory] = useState('');
    const [discount, setDiscount] = useState('');
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await axios.get('http://localhost:5000/api/admin/categories');
            setCategories(response.data);
        };

        fetchCategories();

        if (isUpdate && productId) {
            const fetchProduct = async () => {
                const response = await axios.get(`http://localhost:5000/api/admin/products/${productId}`);
                const product = response.data;
                setName(product.name);
                setDescription(product.description);
                setPrice(product.price);
                setSku(product.sku);
                setCategoryId(product.categoryId);
                setSubcategoryId(product.subcategoryId);
                setInventory(product.inventory.quantity);
                setDiscount(product.discount?.id || '');
            };

            fetchProduct();
        }
    }, [productId, isUpdate]);

    const handleFileChange = (e) => {
        setImages(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('sku', sku);
        formData.append('categoryId', categoryId);
        formData.append('subcategoryId', subcategoryId);
        formData.append('inventory', inventory);
        formData.append('discount', discount);

        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        try {
            if (isUpdate) {
                await axios.put(`http://localhost:5000/api/admin/products/${productId}`, formData);
                alert('Product updated successfully');
            } else {
                await axios.post('http://localhost:5000/api/admin/products', formData);
                alert('Product added successfully');
            }
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    return (
        <div className="product-form-container">
            <h2>{isUpdate ? 'Update Product' : 'Add New Product'}</h2>
            <form className="product-form" onSubmit={handleSubmit}>
                <div className="form-section">
                    <label htmlFor="name">Product Name</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-section">
                    <label htmlFor="description">Product Description</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div className="form-section">
                    <label htmlFor="price">Price</label>
                    <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div className="form-section">
                    <label htmlFor="sku">SKU</label>
                    <input type="text" id="sku" value={sku} onChange={(e) => setSku(e.target.value)} required />
                </div>
                <div className="form-section">
                    <label htmlFor="categoryId">Category</label>
                    <select id="categoryId" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-section">
                    <label htmlFor="subcategoryId">Subcategory</label>
                    <select id="subcategoryId" value={subcategoryId} onChange={(e) => setSubcategoryId(e.target.value)} required>
                        <option value="">Select Subcategory</option>
                        {subcategories.map((subcategory) => (
                            <option key={subcategory.id} value={subcategory.id}>
                                {subcategory.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-section">
                    <label htmlFor="inventory">Inventory</label>
                    <input type="number" id="inventory" value={inventory} onChange={(e) => setInventory(e.target.value)} required />
                </div>
                <div className="form-section">
                    <label htmlFor="discount">Discount</label>
                    <input type="text" id="discount" value={discount} onChange={(e) => setDiscount(e.target.value)} />
                </div>
                <div className="form-section">
                    <label htmlFor="images">Product Images</label>
                    <input type="file" id="images" multiple onChange={handleFileChange} />
                </div>
                <div className="form-actions">
                    <button type="submit" className="save-btn">{isUpdate ? 'Update Product' : 'Add Product'}</button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
