// src/components/discount/AddDiscount.js
import React, { useState } from 'react';
import axios from 'axios';
import './styles/DiscountForm.css'; // Ensure correct path

const AddDiscount = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [discountPercent, setDiscountPercent] = useState(0);
    const [active, setActive] = useState(true);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/admin/discounts', {
                name,
                description,
                discountPercent,
                active,
            });
            // Handle success
        } catch (error) {
            console.error('Error adding discount:', error);
        }
    };

    return (
        <div className="discount-form">
            <h1>Add Discount</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <label>
                    Discount Percent:
                    <input
                        type="number"
                        value={discountPercent}
                        onChange={(e) => setDiscountPercent(Number(e.target.value))}
                        required
                    />
                </label>
                <label>
                    Active:
                    <input
                        type="checkbox"
                        checked={active}
                        onChange={(e) => setActive(e.target.checked)}
                    />
                </label>
                <button type="submit">Add Discount</button>
            </form>
        </div>
    );
};

export default AddDiscount;
