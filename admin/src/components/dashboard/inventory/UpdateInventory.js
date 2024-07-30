import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './styles/InventoryForm.css';

const UpdateInventory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/admin/inventories/${id}`);
                setQuantity(data.quantity);
            } catch (error) {
                console.error('Error fetching inventory details:', error);
            }
        };

        fetchInventory();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/admin/inventories/${id}`, { quantity });
            navigate('/admin/inventories');
        } catch (error) {
            console.error('Error updating inventory:', error);
        }
    };

    return (
        <div className="inventory-form">
            <h1>Update Inventory</h1>
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
                <button type="submit">Update Inventory</button>
            </form>
        </div>
    );
};

export default UpdateInventory;
