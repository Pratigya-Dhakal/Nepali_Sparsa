import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/UserCard.css'; // Custom CSS for styling
import Navbar from '../Navbar';
import Sidebar from './Sidebar';

const UserProfileCard = () => {
    const [user, setUser] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        dob: '',
        gender: '',
    });

    // Fetch user data when the component mounts
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve token
                if (!token) {
                    console.error('No token found. Please log in.');
                    return;
                }

                const userId = 'actualUserId'; // Replace with the logic to retrieve the userId dynamically

                const response = await axios.get(`http://localhost:5000/api/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send token in headers
                    },
                });

                setUser(response.data);
                setFormData({
                    firstName: response.data.firstName || '',
                    lastName: response.data.lastName || '',
                    phone: response.data.phone || '',
                    dob: response.data.dob ? new Date(response.data.dob).toISOString().substr(0, 10) : '',
                    gender: response.data.gender || '',
                });
            } catch (error) {
                console.error('Error fetching user data', error);
            }
        };

        fetchUser();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission to update user data
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:5000/api/users/${user.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(response.data);
            setEditMode(false);
        } catch (error) {
            console.error('Error updating user data', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="main-container">
                <Sidebar />
                <div className="user-profile-card">
                    <h2>User Profile</h2>

                    <div className="user-info">
                        {!editMode ? (
                            <>
                                <p><strong>Username:</strong> {user.username || 'N/A'}</p>
                                <p><strong>Email:</strong> {user.email || 'N/A'}</p>
                                <p><strong>Phone:</strong> {user.phone || 'N/A'}</p>
                                <p><strong>Date of Birth:</strong> {user.dob ? new Date(user.dob).toLocaleDateString() : 'N/A'}</p>
                                <p><strong>Gender:</strong> {user.gender || 'N/A'}</p>
                                <button className="edit-btn" onClick={() => setEditMode(true)}>Edit Profile</button>
                            </>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Date of Birth</label>
                                    <input
                                        type="date"
                                        name="dob"
                                        value={formData.dob}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Gender</label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="MALE">Male</option>
                                        <option value="FEMALE">Female</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>
                                <button type="submit" className="save-btn">Save</button>
                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={() => setEditMode(false)}
                                >
                                    Cancel
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfileCard;
