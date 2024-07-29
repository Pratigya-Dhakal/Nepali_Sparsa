import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AllUsers from '../components/dashboard/users/AllUsers';
import UserDetail from '../components/dashboard/users/UserDetail';

const UserRoutes = () => {
    return (
        <Routes>
            <Route path="/admin/users" element={<AllUsers />} />
            <Route path="/admin/users/:id" element={<UserDetail />} />
        </Routes>
    );
};

export default UserRoutes;
