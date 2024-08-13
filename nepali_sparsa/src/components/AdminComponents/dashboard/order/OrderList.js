// src/components/OrdersList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/OrderList.css';

const OrdersList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/orders', {
                    headers: {
                        'Authorization': `Bearer YOUR_ACCESS_TOKEN`
                    }
                });
                setOrders(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Orders List</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User ID</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Items</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.userId}</td>
                            <td>{order.user.username}</td>
                            <td>{order.user.email}</td>
                            <td>${order.total}</td>
                            <td>{order.status || 'N/A'}</td>
                            <td>{new Date(order.createdAt).toLocaleString()}</td>
                            <td>{new Date(order.updatedAt).toLocaleString()}</td>
                            <td>
                                <ul>
                                    {order.items.map(item => (
                                        <li key={item.id}>
                                            Product ID: {item.productId}, Quantity: {item.quantity}, Price: ${item.price}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersList;
