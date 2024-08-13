// src/routes/AdminRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AllSubCategories from '../../components/AdminComponents/dashboard/subCategory/AllSubCategories';
import AddSubCategory from '../../components/AdminComponents/dashboard/subCategory/AddSubCategories';
import UpdateSubCategory from '../../components/AdminComponents/dashboard/subCategory/UpdateSubCategory';
// Import other necessary components

const SubCategoryRoutes = () => {
    return (
        <Routes>
        <Route path="all" element={<AllSubCategories />} />
        <Route path="add" element={<AddSubCategory />} />
        <Route path="update/:id" element={<UpdateSubCategory />} />
        </Routes>
    );
};

export default SubCategoryRoutes;
