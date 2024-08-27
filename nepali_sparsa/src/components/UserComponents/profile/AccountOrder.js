import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderCard from './OrderCard';
import './styles/AccountOrders.css';

const AccountOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/orders/user');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="account-orders">
            <h2>Recent Orders</h2>
            {orders.length > 0 ? (
                orders.map((order) => <OrderCard key={order.id} order={order} />)
            ) : (
                <p>No orders found</p>
            )}
        </div>
    );
};

export default AccountOrders;
