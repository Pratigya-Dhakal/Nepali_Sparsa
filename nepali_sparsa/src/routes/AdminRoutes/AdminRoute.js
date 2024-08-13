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
        <Route path="/admin/signIn" element={<SignIn />} />
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
            path="/admin/deals/*" 
            element={
                <PrivateRoute>
                    <AdminLayout>
                        <DealsRoutes /> 
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
