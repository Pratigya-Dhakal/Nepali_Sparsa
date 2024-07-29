import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardOverview from '../components/dashboard/DashboardOverview';
import SubCategoryRoutes from './SubCategoryRoutes';
import SignIn from '../components/login/SignInPage';
import CategoryRoutes from './CategoryRoutes';
import AdminLayout from '../layouts/AdminLayout';
import ProductRoutes from './ProductRoutes';
import OrderList from '../components/dashboard/order/OrderList';
import AllUsers from '../components/dashboard/AllUsers';
// import UserRoutes from './UserRoutes';
import PrivateRoute from './PrivateRoute'; // Import the PrivateRoute component

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<SignIn />} />
        <Route 
            path="/admin/dashboard" 
            element={
                <PrivateRoute>
                    <AdminLayout>
                        <DashboardOverview />
                    </AdminLayout>
                </PrivateRoute>
            } 
        />
        <Route 
            path="/admin/categories/*" 
            element={
                <PrivateRoute>
                    <AdminLayout>
                        <CategoryRoutes />
                    </AdminLayout>
                </PrivateRoute>
            } 
        />
        <Route 
            path="/admin/subcategories/*" 
            element={
                <PrivateRoute>
                    <AdminLayout>
                        <SubCategoryRoutes />
                    </AdminLayout>
                </PrivateRoute>
            } 
        />
        <Route 
            path="/admin/orders" 
            element={
                <PrivateRoute>
                    <AdminLayout>
                        <OrderList />
                    </AdminLayout>
                </PrivateRoute>
            } 
        />
        <Route 
            path="/admin/products/*" 
            element={
                <PrivateRoute>
                    <AdminLayout>
                        <ProductRoutes />
                    </AdminLayout>
                </PrivateRoute>
            } 
        />
        <Route 
            path="/admin/users/" 
            element={
                <PrivateRoute>
                    <AdminLayout>
                        <AllUsers />
                    </AdminLayout>
                </PrivateRoute>
            } 
        />
    </Routes>
);

export default AppRoutes;
