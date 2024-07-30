import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './styles/UserDetail.css'; // Import CSS file
import ProfileImage from '../../assets/heroSection.png'; // Import default profile image

const UserDetail = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/admin/users/detail/${id}`);
                setUser(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!user) return <div>User not found</div>;

    return (
        <div className="user-detail-container">
            <h2>User Profile</h2>
            <div className="profile-section">
                <div className="profile-info">
                <img src={ProfileImage} alt="Fashion"  className='profile-picture'/>
                    <div className="profile-details">
                        <h4>{user.firstName} {user.lastName}</h4>
                        <p>{user.role}</p>
                        <p>{user.location}</p>
                    </div>
                </div>
                <div className="personal-info">
                    <h3>Personal Information</h3>
                    <div className="personal-infos">
                        <p><strong>First Name:</strong> {user.firstName}</p>
                        <p><strong>Last Name:</strong> {user.lastName}</p>
                        <p><strong>Email address:</strong> {user.email}</p>
                        <p><strong>Phone:</strong> {user.phone || 'N/A'}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                        <p><strong>Verified:</strong> {user.verify ? 'Yes' : 'No'}</p>
                    </div>
                </div>
                <div className="address-section">
                    <h3>Address</h3>
                    {user.address ? (
                        <div className="address-info">
                            <p><strong>Address 1:</strong> {user.address.address1}</p>
                            <p><strong>Address 2:</strong> {user.address.address2}</p>
                            <p><strong>City:</strong> {user.address.city}</p>
                            <p><strong>State:</strong> {user.address.state}</p>
                            <p><strong>Country:</strong> {user.address.country}</p>
                            <p><strong>Postal Code:</strong> {user.address.postalCode}</p>
                        </div>
                    ) : (
                        <p>No address provided</p>
                    )}
                </div>
                <div className="orders-section">
                    <h3>Orders</h3>
                    {user.orders && user.orders.length > 0 ? (
                        <ul className="orders-list">
                            {user.orders.map(order => (
                                <li key={order.id} className="order-item">
                                    <p><strong>Order ID:</strong> {order.id}</p>
                                    <p><strong>Total:</strong> ${order.total}</p>
                                    <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No orders made</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDetail;
