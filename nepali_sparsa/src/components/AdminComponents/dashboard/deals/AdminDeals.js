import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles/AdminDeals.css'; // Import the CSS file

const AdminDeals = () => {
    const [deals, setDeals] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDeals();
    }, []);

    const fetchDeals = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/deals');
            setDeals(response.data);
        } catch (error) {
            console.error('Error fetching deals:', error);
            setError('Failed to fetch deals. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const deleteDeal = async (id) => {
        if (window.confirm('Are you sure you want to delete this deal?')) {
            try {
                await axios.delete(`http://localhost:5000/api/deals/${id}`);
                fetchDeals(); // Refresh the deals list after deletion
            } catch (error) {
                console.error('Error deleting deal:', error);
                setError('Failed to delete deal. Please try again later.');
            }
        }
    };

    return (
        <div className="container">
            <h1>Deals</h1>
            {error && <div className="error-message">{error}</div>}
            {loading ? (
                <div className="loading-message">Loading deals...</div>
            ) : (
                <>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Subcategory</th>
                                <th>Discount</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Rating</th>
                                <th>Type</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deals.length > 0 ? (
                                deals.map((deal) => (
                                    <tr key={deal.id}>
                                        <td>{deal.title}</td>
                                        <td>{deal.product ? deal.product.name : 'N/A'}</td>
                                        <td>{deal.category ? deal.category.name : 'N/A'}</td>
                                        <td>{deal.subcategory ? deal.subcategory.name : 'N/A'}</td>
                                        <td>{deal.discount}%</td>
                                        <td>{new Date(deal.startDate).toLocaleDateString()}</td>
                                        <td>{new Date(deal.endDate).toLocaleDateString()}</td>
                                        <td>{deal.rating}</td>
                                        <td>{deal.type}</td>
                                        <td>
                                            <Link to={`/admin/deals/edit/${deal.id}`} className="button link-button">Edit</Link>
                                            <button onClick={() => deleteDeal(deal.id)} className="button">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10">No deals found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default AdminDeals;
