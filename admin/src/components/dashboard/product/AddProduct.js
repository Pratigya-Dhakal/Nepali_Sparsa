import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/AddProduct.css';

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        sku: '',
        categoryId: '',
        subcategoryId: '',
        inventoryId: '',
        discountId: '',
        images: []
    });
    
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [inventoryOptions, setInventoryOptions] = useState([]);
    const [discountOptions, setDiscountOptions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

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
        const fetchInventory = async () => {
            try {
                const response= await axios.get(`http://localhost:5000/api/admin/inventories`);
                setInventoryOptions(response.data);
            } catch (error) {
                console.error('Error fetching inventory details:', error);
            }
        };

        fetchInventory();
    }, []);

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
            await axios.post('http://localhost:5000/api/admin/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Product added successfully');
        } catch (error) {
            console.error('Error adding product:', error.message);
            if (error.response) {
                console.error('Error details:', error.response.data);
                console.error('Error status:', error.response.status);
                console.error('Error headers:', error.response.headers);
                if (error.response.data.includes('File too large')) {
                    alert('File size exceeds the limit of 5MB');
                }
            } else if (error.request) {
                console.error('Error request:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
        }
    };
    
    
    return (
        <div className="add-product">
            <h2>Add New Product</h2>
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
                    <label>Inventory</label>
                    <select name="inventoryId" value={product.inventoryId} onChange={handleChange}>
                        <option value="">Select an inventory</option>
                        {inventoryOptions.map(inventory => (
                            <option key={inventory.id} value={inventory.id}>
                                {inventory.quantity}
                            </option>
                        ))}
                    </select>
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
                    <input type="file" name="images" multiple onChange={handleFileChange} required />
                </div>
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
