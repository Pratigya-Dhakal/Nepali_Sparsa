// src/components/discount/UpdateDiscount.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './styles/DiscountForm.css'; // Ensure correct path

const UpdateDiscount = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [discountPercent, setDiscountPercent] = useState(0);
    const [active, setActive] = useState(true);

    useEffect(() => {
        const fetchDiscount = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/admin/discounts/${id}`);
                setName(data.name);
                setDescription(data.description || '');
                setDiscountPercent(data.discountPercent);
                setActive(data.active);
            } catch (error) {
                console.error('Error fetching discount details:', error);
            }
        };

        fetchDiscount();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/admin/discounts/${id}`, {
                name,
                description,
                discountPercent,
                active,
            });
            // Handle success
        } catch (error) {
            console.error('Error updating discount:', error);
        }
    };

    return (
        <div className="discount-form">
            <h1>Update Discount</h1>
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
                <button type="submit">Update Discount</button>
            </form>
        </div>
    );
};

export default UpdateDiscount;
