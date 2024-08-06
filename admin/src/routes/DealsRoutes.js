import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDeals from '../components/dashboard/deals/AdminDeals';
import AddDeal from '../components/dashboard/deals/AddDeal';
import EditDeal from '../components/dashboard/deals/EditDeal';

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
