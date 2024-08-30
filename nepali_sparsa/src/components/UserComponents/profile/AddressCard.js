import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/AddressCard.css'; // Custom CSS for styling

const AddressManagement = ({ userId }) => {
    const [addresses, setAddresses] = useState([]);
    const [editingAddress, setEditingAddress] = useState(null);

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            const response = await axios.get(`/api/users/${userId}/addresses`);
            setAddresses(response.data);
        } catch (error) {
            console.error('Failed to fetch addresses', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingAddress({ ...editingAddress, [name]: value });
    };

    const handleSaveAddress = async () => {
        if (editingAddress.id) {
            // Update existing address
            try {
                await axios.put(`/api/addresses/${editingAddress.id}`, editingAddress);
                fetchAddresses();
                setEditingAddress(null); // Reset editing state
            } catch (error) {
                console.error('Failed to update address', error);
            }
        } else {
            // Add new address
            try {
                await axios.post(`/api/users/${userId}/addresses`, editingAddress);
                fetchAddresses();
                setEditingAddress(null); // Reset editing state
            } catch (error) {
                console.error('Failed to add address', error);
            }
        }
    };

    const handleEditAddress = (address) => {
        setEditingAddress(address);
    };

    const handleDeleteAddress = async (addressId) => {
        try {
            await axios.delete(`/api/addresses/${addressId}`);
            fetchAddresses();
        } catch (error) {
            console.error('Failed to delete address', error);
        }
    };

    return (
        <div className="address-management-container">
            <h2>Manage My Addresses</h2>

            {addresses.length > 0 && (
                <div className="saved-addresses">
                    <h3>Saved Addresses</h3>
                    {addresses.map((address) => (
                        <div className="address-card" key={address.id}>
                            <p>{address.address1}, {address.address2}, {address.city}, {address.state}, {address.country}, {address.postalCode}</p>
                            <button onClick={() => handleEditAddress(address)}>Edit</button>
                            <button onClick={() => handleDeleteAddress(address.id)}>Delete</button>
                        </div>
                    ))}
                </div>
            )}

            <div className="edit-address-container">
                <h3>{editingAddress?.id ? 'Edit Address' : 'Add New Address'}</h3>
                <input
                    type="text"
                    name="address1"
                    placeholder="Address Line 1"
                    value={editingAddress?.address1 || ''}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="address2"
                    placeholder="Address Line 2"
                    value={editingAddress?.address2 || ''}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={editingAddress?.city || ''}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={editingAddress?.state || ''}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={editingAddress?.country || ''}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={editingAddress?.postalCode || ''}
                    onChange={handleInputChange}
                />
                <button onClick={handleSaveAddress}>{editingAddress?.id ? 'Save Address' : 'Add Address'}</button>
                {editingAddress && (
                    <button onClick={() => setEditingAddress(null)}>Cancel</button>
                )}
            </div>
        </div>
    );
};

export default AddressManagement;
