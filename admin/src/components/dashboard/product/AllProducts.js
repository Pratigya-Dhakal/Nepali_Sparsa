import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import './styles/AllProduct.css'; // Import the CSS file

const AllProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/admin/products');
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    console.error('Invalid data format:', data);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                alert('An error occurred while fetching products. Please try again later.');
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this product?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:5000/api/admin/products/${id}`);
            setProducts(products.filter(product => product.id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('An error occurred while deleting the product. Please try again.');
        }
    };

    return (
        <div className="table-container">
            <h1>All Products</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map(product => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>${product.price.toFixed(2)}</td>
                                <td>{product.category?.name || 'No Category'}</td>
                                <td>
                                    <NavLink to={`/admin/products/${product.id}`} className="view-button">
                                        View
                                    </NavLink>
                                    <NavLink to={`/admin/products/update/${product.id}`} className="update-button">
                                        Update
                                    </NavLink>
                                    <NavLink 
                                        to={`/admin/deals/add/${product.id}`}
                                        className="add-deal-button"
                                    >
                                        Add Deals
                                    </NavLink>
                                    <button 
                                        className="delete-button" 
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No products available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AllProducts;
