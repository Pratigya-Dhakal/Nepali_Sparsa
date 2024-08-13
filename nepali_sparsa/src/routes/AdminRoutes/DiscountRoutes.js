// src/routes/DiscountRoutes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Ensure these paths are correct
import AddDiscount from '../../components/AdminComponents/dashboard/discount/AddDiscount';
import UpdateDiscount from '../../components/AdminComponents/dashboard/discount/UpdateDiscount';
import DiscountList from '../../components/AdminComponents/dashboard/discount/DiscountList';

const DiscountRoutes = () => (
    <Routes>
        <Route path="/all" element={<DiscountList />} />
        <Route path="/add" element={<AddDiscount />} />
        <Route path="/update/:id" element={<UpdateDiscount />} />
    </Routes>
);

export default DiscountRoutes;
