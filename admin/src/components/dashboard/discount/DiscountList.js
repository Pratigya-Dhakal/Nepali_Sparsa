import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/DiscountList.css'; // Ensure the CSS file exists and is correctly imported

const DiscountList = () => {
    const [discounts, setDiscounts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDiscounts = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/admin/discounts');
                setDiscounts(data);
            } catch (error) {
                console.error('Error fetching discounts:', error);
            }
        };

        fetchDiscounts();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this discount?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:5000/api/admin/discounts/${id}`);
            setDiscounts(discounts.filter(discount => discount.id !== id));
        } catch (error) {
            console.error('Error deleting discount:', error);
        }
    };

    return (
        <div className="discount-list">
            <h1>Discount List</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Discount (%)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {discounts.length > 0 ? (
                        discounts.map(discount => (
                            <tr key={discount.id}>
                                <td>{discount.id}</td>
                                <td>{discount.name}</td>
                                <td>{discount.description || 'N/A'}</td>
                                <td>{discount.discountPercent}</td>
                                <td>
                                    <button 
                                        className="btn-update" 
                                        onClick={() => navigate(`/admin/discounts/update/${discount.id}`)}
                                    >
                                        Update
                                    </button>
                                    <button 
                                        className="btn-delete" 
                                        onClick={() => handleDelete(discount.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No discounts available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DiscountList;
