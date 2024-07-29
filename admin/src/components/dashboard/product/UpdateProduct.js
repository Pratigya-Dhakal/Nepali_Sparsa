import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateProduct = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        sku: '',
        categoryId: '',
        subcategoryId: '',
        images: []
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/admin/products/${productId}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [productId]);

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
            await axios.put(`http://localhost:5000/api/admin/products/${productId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Product updated successfully');
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className="update-product">
            <h2>Update Product</h2>
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
                    <label>Category ID</label>
                    <input type="text" name="categoryId" value={product.categoryId} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Subcategory ID</label>
                    <input type="text" name="subcategoryId" value={product.subcategoryId} onChange={handleChange} required />
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
