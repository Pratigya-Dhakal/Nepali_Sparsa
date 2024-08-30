import React from 'react';
import './styles/Order.css';

const OrderCard = ({ order }) => {
    if (!order) {
        return <div>No order data available</div>;
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="order-card">
            <div className="order-header">
                <span className="order-number">Order #{order.id}</span>
                <span className="order-date">Placed On: {formatDate(order.createdAt)}</span>
            </div>
            <div className="order-body">
                {order.items.map((item) => (
                    <div key={item.id} className="order-item">
                        <img src={item.product.imageUrl} alt={item.product.name} className="item-image" />
                        <div className="item-details">
                            <span className="item-name">{item.product.name}</span>
                            <span className="item-quantity">Qty: {item.quantity}</span>
                            <span className="item-price">Rs. {item.price}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="order-footer">
                <span className="order-total">Total: Rs. {order.total}</span>
                <button className="manage-btn">Manage</button>
            </div>
        </div>
    );
};

export default OrderCard;
