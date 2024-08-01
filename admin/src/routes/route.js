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
import PrivateRoute from './PrivateRoute';
import UserDetail from '../components/dashboard/UserDetail';
import InventoryRoutes from './InventoryRoutes';
import DiscountRoutes from './DiscountRoutes';
import CommentsRoutes from './CommentsRoutes'; // Import CommentsRoutes

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
        <Route 
            path="/admin/users/detail/:id" 
            element={
                <PrivateRoute>
                    <AdminLayout>
                        <UserDetail />
                    </AdminLayout>
                </PrivateRoute>
            } 
        />
        <Route 
            path="/admin/inventories/*" 
            element={
                <PrivateRoute>
                    <AdminLayout>
                        <InventoryRoutes /> {/* Inventory routes */}
                    </AdminLayout>
                </PrivateRoute>
            } 
        />
        <Route 
            path="/admin/discounts/*" 
            element={
                <PrivateRoute>
                    <AdminLayout>
                        <DiscountRoutes /> {/* Discount routes */}
                    </AdminLayout>
                </PrivateRoute>
            } 
        />
        <Route 
            path="/admin/comments/*" 
            element={
                <PrivateRoute>
                    <AdminLayout>
                        <CommentsRoutes /> {/* Comments routes */}
                    </AdminLayout>
                </PrivateRoute>
            } 
        />
    </Routes>
);

export default AppRoutes;
