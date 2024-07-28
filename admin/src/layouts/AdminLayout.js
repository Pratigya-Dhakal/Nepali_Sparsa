import React from 'react';
import Sidebar from '../components/common/Sidebar';
import './styles/AdminLayout.css';

const AdminLayout = ({ children }) => {
    return (
        <div className="admin-layout">
            <Sidebar />
            <div className="admin-content">
                {children}
            </div>
        </div>
    );
};

export default AdminLayout;
