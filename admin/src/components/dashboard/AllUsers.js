import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import './styles/AllUsers.css'; // Ensure this path is correct

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/users');
                console.log('API Response:', response.data); // Log response data
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error.message); // Log error message
                setError('Failed to fetch users');
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
                setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
            } catch (error) {
                console.error('Error deleting user:', error.message); // Log error message
                setError('Failed to delete user');
            }
        }
    };

    if (error) return <div className="error-message">Error: {error}</div>;

    return (
        <div className="all-users">
            <h2>All Users</h2>
            {users.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Verify Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.phone || 'N/A'}</td>
                                <td>{user.role}</td>
                                <td>{user.verify}</td>
                                <td>
                                    <button 
                                        className="button-delete"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Delete
                                    </button>
                                    <NavLink 
                                        to={`/admin/users/${user.id}`} 
                                        className="button-view"
                                    >
                                        View
                                    </NavLink>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>No users found</div>
            )}
        </div>
    );
};

export default AllUsers;
