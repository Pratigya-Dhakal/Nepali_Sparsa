// admin/src/components/dashboard/ProductManagement.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct, deleteProduct, updateProduct } from '../slices/adminProductSlice';

const ProductManagement = () => {
const dispatch = useDispatch();
const products = useSelector((state) => state.adminProduct.products);
const [newProduct, setNewProduct] = useState({ name: '', price: 0 });

useEffect(() => {
    dispatch(fetchProducts());
}, [dispatch]);

const handleAddProduct = () => {
    dispatch(addProduct(newProduct));
    setNewProduct({ name: '', price: 0 });
};

const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
};

const handleUpdateProduct = (id, name, price) => {
    dispatch(updateProduct({ id, name, price }));
};

return (
    <div>
    <h2>Product Management</h2>
    <input
        type="text"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        placeholder="Product name"
    />
    <input
        type="number"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
        placeholder="Product price"
    />
    <button onClick={handleAddProduct}>Add</button>
    <ul>
        {products.map((product) => (
        <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
            <button onClick={() => handleUpdateProduct(product.id, prompt('New name:', product.name), parseFloat(prompt('New price:', product.price)))}>Update</button>
        </li>
        ))}
    </ul>
    </div>
);
};

export default ProductManagement;
