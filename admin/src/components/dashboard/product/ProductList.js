import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, deleteProduct } from '../../../actions/ProductActions';
import './styles/ProductList.css';

const ProductList = () => {
const dispatch = useDispatch();
const { products, loading, error } = useSelector((state) => state.productList);

useEffect(() => {
    dispatch(fetchProducts());
}, [dispatch]);

const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
    dispatch(deleteProduct(id));
    }
};

return (
    <div className="product-list-container">
    {loading ? (
        <p>Loading...</p>
    ) : error ? (
        <p>{error}</p>
    ) : (
        <table className="product-list-table">
        <thead>
            <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th></th>
            </tr>
        </thead>
        <tbody>
            {products.map((product) => (
            <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>
                <button onClick={() => deleteHandler(product._id)}>Delete</button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    )}
    </div>
);
};

export default ProductList;
