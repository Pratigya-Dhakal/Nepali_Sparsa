import React from 'react';
import './styles/LatestOrders.css';

const LatestOrders = ({ orders }) => {
    return (
        <div className="latest-orders">
        <h2>Latest Orders</h2>
        <table>
            <thead>
            <tr>
                <th>Date</th>
                <th>Billing Name</th>
                <th>Amount</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {orders.map((order) => (
                <tr key={order.id}>
                <td>{order.date}</td>
                <td>{order.billingName}</td>
                <td>${order.amount}</td>
                <td>{order.status}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default LatestOrders;
