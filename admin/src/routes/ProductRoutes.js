import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AllProducts from '../components/dashboard/product/AllProducts';
import AddProduct from '../components/dashboard/product/AddProduct';
import UpdateProduct from '../components/dashboard/product/UpdateProduct';
import ViewProduct from '../components/dashboard/product/ViewProduct';

const ProductRoutes = () => {
    return (
        <Routes>
            <Route path="/all" element={<AllProducts />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/:id" element={<ViewProduct />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
        </Routes>
    );
};

export default ProductRoutes;
