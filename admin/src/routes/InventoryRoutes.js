import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddInventory from '../components/dashboard/inventory/AddInventory';
import UpdateInventory from '../components/dashboard/inventory/UpdateInventory';
import InventoryList from '../components/dashboard/inventory/InventoryList';

const InventoryRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<InventoryList />} />
            <Route path="add" element={<AddInventory />} />
            <Route path="update/:id" element={<UpdateInventory />} />
        </Routes>
    );
};

export default InventoryRoutes;
