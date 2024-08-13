import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/InventoryForm.css';

const AddInventory = () => {
    const [quantity, setQuantity] = useState(0);
    const [successMessage, setSuccessMessage] = useState(''); // State for success message
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/admin/inventories', { quantity });
            setSuccessMessage('Inventory added successfully!'); // Set success message
            setTimeout(() => {
                setSuccessMessage(''); // Clear message after 3 seconds
                navigate('/admin/inventory/all');
            }, 3000);
        } catch (error) {
            console.error('Error adding inventory:', error);
        }
    };

    return (
        <div className="inventory-form">
            <h1>Add Inventory</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Quantity:
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        required
                    />
                </label>
                <button type="submit">Add Inventory</button>
            </form>
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );
};

export default AddInventory;
