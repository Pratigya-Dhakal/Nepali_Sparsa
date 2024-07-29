import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './styles/UserDetail.css'; // Import CSS file

const UserDetail = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/admin/users/${id}`);
                setUser(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);
console.log(user)
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!user) return <div>User not found</div>;

    return (
        <div className="user-detail-container">
            <h2>User Details</h2>
            <div className="user-info">
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>First Name:</strong> {user.firstName}</p>
                <p><strong>Last Name:</strong> {user.lastName}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>Verified:</strong> {user.verify ? 'Yes' : 'No'}</p>
            </div>
            {user.address && (
                <div className="user-address">
                    <h3>Address</h3>
                    <p><strong>Address 1:</strong> {user.address.address1}</p>
                    <p><strong>Address 2:</strong> {user.address.address2}</p>
                    <p><strong>City:</strong> {user.address.city}</p>
                    <p><strong>State:</strong> {user.address.state}</p>
                    <p><strong>Country:</strong> {user.address.country}</p>
                    <p><strong>Postal Code:</strong> {user.address.postalCode}</p>
                </div>
            )}
            {user.orders.length > 0 && (
                <div className="user-orders">
                    <h3>Orders</h3>
                    <ul>
                        {user.orders.map(order => (
                            <li key={order.id}>
                                <p><strong>Order ID:</strong> {order.id}</p>
                                <p><strong>Total:</strong> ${order.total}</p>
                                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserDetail;
