// admin/src/components/dashboard/SubcategoryManagement.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubcategories, addSubcategory, deleteSubcategory, updateSubcategory } from '../slices/adminSubcategorySlice';

const SubcategoryManagement = () => {
const dispatch = useDispatch();
const subcategories = useSelector((state) => state.adminSubcategory.subcategories);
const [newSubcategory, setNewSubcategory] = useState('');

useEffect(() => {
    dispatch(fetchSubcategories());
}, [dispatch]);

const handleAddSubcategory = () => {
    dispatch(addSubcategory({ name: newSubcategory }));
    setNewSubcategory('');
};

const handleDeleteSubcategory = (id) => {
    dispatch(deleteSubcategory(id));
};

const handleUpdateSubcategory = (id, name) => {
    dispatch(updateSubcategory({ id, name }));
};

return (
    <div>
    <h2>Subcategory Management</h2>
    <input
        type="text"
        value={newSubcategory}
        onChange={(e) => setNewSubcategory(e.target.value)}
        placeholder="Add new subcategory"
    />
    <button onClick={handleAddSubcategory}>Add</button>
    <ul>
        {subcategories.map((subcategory) => (
        <li key={subcategory.id}>
            {subcategory.name}
            <button onClick={() => handleDeleteSubcategory(subcategory.id)}>Delete</button>
            <button onClick={() => handleUpdateSubcategory(subcategory.id, prompt('New name:', subcategory.name))}>Update</button>
        </li>
        ))}
    </ul>
    </div>
);
};

export default SubcategoryManagement;
