import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../components/common/AdminNavbar';
import AdminFooter from '../components/common/AdminFooter';
import Sidebar from '../components/common/Sidebar';

const DashboardLayout = () => {
    return (
        <div className="admin-layout">
        <AdminNavbar />
        <div className="admin-container">
            <Sidebar />
            <div className="admin-content">
            <Outlet />
            </div>
        </div>
        <AdminFooter />
        </div>
    );
};

export default DashboardLayout;
