// admin/src/components/dashboard/UserManagement.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser, updateUser } from '../slices/adminUserSlice';

const UserManagement = () => {
const dispatch = useDispatch();
const users = useSelector((state) => state.adminUser.users);

useEffect(() => {
    dispatch(fetchUsers());
}, [dispatch]);

const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
};

const handleUpdateUser = (id, role) => {
    dispatch(updateUser({ id, role }));
};

return (
    <div>
    <h2>User Management</h2>
    <ul>
        {users.map((user) => (
        <li key={user.id}>
            {user.username} - {user.role}
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            <button onClick={() => handleUpdateUser(user.id, prompt('Update role:', user.role))}>Update</button>
        </li>
        ))}
    </ul>
    </div>
);
};

export default UserManagement;
