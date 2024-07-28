import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardOverview from '../components/dashboard/DashboardOverview';
import ProductManagement from '../components/dashboard/ProductManagement';
import SubcategoryManagement from '../components/dashboard/SubcategoryManagement';
import UserManagement from '../components/dashboard/UserManagement';
import CommentManagement from '../components/dashboard/CommentManagement';
import SignIn from '../components/login/SignInPage';
import CategoryRoutes from './CategoryRoutes';
import AdminLayout from '../layouts/AdminLayout';

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/admin/dashboard" element={<AdminLayout><DashboardOverview /></AdminLayout>} />
        <Route path="/admin/categories/*" element={<AdminLayout><CategoryRoutes /></AdminLayout>} />
        <Route path="/admin/products" element={<AdminLayout><ProductManagement /></AdminLayout>} />
        <Route path="/admin/subcategories" element={<AdminLayout><SubcategoryManagement /></AdminLayout>} />
        <Route path="/admin/users" element={<AdminLayout><UserManagement /></AdminLayout>} />
        <Route path="/admin/comments" element={<AdminLayout><CommentManagement /></AdminLayout>} />
    </Routes>
);

export default AppRoutes;
