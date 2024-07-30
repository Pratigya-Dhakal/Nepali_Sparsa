import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/InventoryList.css'; // Import the CSS file

const InventoryList = () => {
    const [inventories, setInventories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInventories = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/admin/inventories');
                setInventories(data);
            } catch (error) {
                console.error('Error fetching inventories:', error);
                // Optionally, you can set an error state here and display an error message to the user
            }
        };

        fetchInventories();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this inventory?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:5000/api/admin/inventories/${id}`);
            setInventories(inventories.filter(inventory => inventory.id !== id));
        } catch (error) {
            console.error('Error deleting inventory:', error);
            // Optionally, you can set an error state here and display an error message to the user
        }
    };

    return (
        <div className="inventory-list">
            <h1>Inventory List</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {inventories.length > 0 ? (
                        inventories.map(inventory => (
                            <tr key={inventory.id}>
                                <td>{inventory.id}</td>
                                <td>{inventory.quantity}</td>
                                <td>
                                    <button 
                                        className="btn-update" 
                                        onClick={() => navigate(`/admin/inventories/update/${inventory.id}`)}
                                    >
                                        Update
                                    </button>
                                    <button 
                                        className="btn-delete" 
                                        onClick={() => handleDelete(inventory.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No inventories available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default InventoryList;
