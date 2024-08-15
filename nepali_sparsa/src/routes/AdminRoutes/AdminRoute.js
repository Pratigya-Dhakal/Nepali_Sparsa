import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardOverview from '../../components/AdminComponents/dashboard/DashboardOverview';
import SubCategoryRoutes from '../AdminRoutes/SubCategoryRoutes';
import SignIn from '../../components/AdminComponents/login/SignInPage';
import CategoryRoutes from '../AdminRoutes/CategoryRoutes';
import ProductRoutes from '../AdminRoutes/ProductRoutes';
import OrderList from '../../components/AdminComponents/dashboard/order/OrderList';
import AllUsers from '../../components/AdminComponents/dashboard/AllUsers';
import PrivateRoute from '../AdminRoutes/PrivateRoute';
import UserDetail from '../../components/AdminComponents/dashboard/UserDetail';
import DiscountRoutes from '../AdminRoutes/DiscountRoutes';
import CommentsRoutes from '../AdminRoutes/CommentsRoutes';
import DealsRoutes from '../AdminRoutes/DealsRoutes';
import AdminLayout from '../../layouts/AdminLayout';



const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<SignIn />} />
        <Route 
            path="/dashboard" 
            element={
                <PrivateRoute>
                    <AdminLayout>
                        <DashboardOverview />
                    </AdminLayout>
                </PrivateRoute>
            } 
        />
        <Route 
            path="/categories/*" 
            element={
                <PrivateRoute>
                    <AdminLayout>
                        <CategoryRoutes />
                    </AdminLayout>
                </PrivateRoute>
            } 
        />
        <Route 
            path="/subcategories/*" 
            element={
                <PrivateRoute>
                    <AdminLayout>
                        <SubCategoryRoutes />
                    </AdminLayout>
                </PrivateRoute>
            } 
        />
        <Route 
            path="/orders" 
            element={
                <PrivateRoute>
                    <AdminLayout>
                        <OrderList />
                    </AdminLayout>
                </PrivateRoute>
            } 
        />
        <Route 
            path="/products/*" 
            element={
                <PrivateRoute>
                    <AdminLayout>
                        <ProductRoutes />
                    </AdminLayout>
                </PrivateRoute>
            } 
        />
        <Route 
            path="/users/" 
            element={
                <PrivateRoute>
                    <AdminLayout>
                        <AllUsers />
                    </AdminLayout>
                </PrivateRoute>
            } 
        />
        <Route 
            path="/users/detail/:id" 
            element={
                <PrivateRoute>
                    <AdminLayout>
                        <UserDetail />
                    </AdminLayout>
                </PrivateRoute>
            } 
        />
        <Route 
            path="/discounts/*" 
            element={
                <PrivateRoute>
                    <AdminLayout>
                        <DiscountRoutes /> {/* Discount routes */}
                    </AdminLayout>
                </PrivateRoute>
            } 
        />
        <Route 
            path="/deals/*" 
            element={
                <PrivateRoute>
                    <AdminLayout>
                        <DealsRoutes /> 
                    </AdminLayout>
                </PrivateRoute>
            } 
        />
        <Route 
            path="/comments/*" 
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
