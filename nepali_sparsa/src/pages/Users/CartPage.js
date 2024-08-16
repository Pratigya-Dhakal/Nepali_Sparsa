import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            const token = localStorage.getItem('token');
            console.log('Token:', token);
            if (!token) {
                navigate('/signIn');
                return;
            }

            try {
                const { data } = await axios.get('http://localhost:5000/api/cart', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('Cart Data:', data); // Check what data is being returned
                setCartItems(data.items || data); // Adjust based on actual API response
            } catch (err) {
                console.error('Error:', err);
                setError(err.response?.data?.message || 'Error fetching cart items');
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, [navigate]);

    const removeItemHandler = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/cart/remove/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCartItems(cartItems.filter(item => item.id !== id));
        } catch (err) {
            console.error('Error removing item:', err);
            setError(err.response?.data?.message || 'Error removing item');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="cart-page">
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <div>Your cart is empty</div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map(item => (
                            <tr key={item.id}>
                                <td>{item.product.name}</td>
                                <td>${item.product.price.toFixed(2)}</td>
                                <td>{item.quantity}</td>
                                <td>${(item.product.price * item.quantity).toFixed(2)}</td>
                                <td>
                                    <button onClick={() => removeItemHandler(item.id)}>
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CartPage;
