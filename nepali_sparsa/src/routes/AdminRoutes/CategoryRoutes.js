import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AllCategories from '../../components/AdminComponents/dashboard/category/AllCategories';
import AddCategory from '../../components/AdminComponents/dashboard/category/AddCategory';
import UpdateCategory from '../../components/AdminComponents/dashboard/category/UpdateCategory';

const CategoryRoutes = () => {
    return (
        <Routes>
            <Route path="all" element={<AllCategories />} />
            <Route path="add" element={<AddCategory />} />
            <Route path="update/:id" element={<UpdateCategory />} />
        </Routes>
    );
};

export default CategoryRoutes;
