import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDeals from '../../components/AdminComponents/dashboard/deals/AdminDeals';
import AddDeal from '../../components/AdminComponents/dashboard/deals/AddDeal';
import EditDeal from '../../components/AdminComponents/dashboard/deals/EditDeal';

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/all" element={<AdminDeals />} />
            <Route path="/add/:id" element={<AddDeal />} />
            <Route path="/edit/:id" element={<EditDeal />} />
        </Routes>
    );
};

export default AdminRoutes;
