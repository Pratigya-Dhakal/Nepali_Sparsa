import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/AddressCard.css'; // Custom CSS for styling

const AddressManagement = ({ userId }) => {
const [addresses, setAddresses] = useState([]);
const [newAddress, setNewAddress] = useState({
    address1: '',
    address2: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
});

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
    setNewAddress({ ...newAddress, [name]: value });
};

const handleAddAddress = async () => {
    try {
    await axios.post(`/api/users/${userId}/addresses`, newAddress);
    fetchAddresses();
    setNewAddress({
        address1: '',
        address2: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
    });
    } catch (error) {
    console.error('Failed to add address', error);
    }
};

const handleUpdateAddress = async (addressId, updatedAddress) => {
    try {
    await axios.put(`/api/addresses/${addressId}`, updatedAddress);
    fetchAddresses();
    } catch (error) {
    console.error('Failed to update address', error);
    }
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
    <div>
    <h2>Manage My Addresses</h2>
    <div>
        <h3>Add New Address</h3>
        <input
        type="text"
        name="address1"
        placeholder="Address Line 1"
        value={newAddress.address1}
        onChange={handleInputChange}
        />
        <input
        type="text"
        name="address2"
        placeholder="Address Line 2"
        value={newAddress.address2}
        onChange={handleInputChange}
        />
        <input
        type="text"
        name="city"
        placeholder="City"
        value={newAddress.city}
        onChange={handleInputChange}
        />
        <input
        type="text"
        name="state"
        placeholder="State"
        value={newAddress.state}
        onChange={handleInputChange}
        />
        <input
        type="text"
        name="country"
        placeholder="Country"
        value={newAddress.country}
        onChange={handleInputChange}
        />
        <input
        type="text"
        name="postalCode"
        placeholder="Postal Code"
        value={newAddress.postalCode}
        onChange={handleInputChange}
        />
        <button onClick={handleAddAddress}>Add Address</button>
    </div>

    <div>
        <h3>Saved Addresses</h3>
        {addresses.map((address) => (
        <div key={address.id}>
            <p>{address.address1}, {address.address2}, {address.city}, {address.state}, {address.country}, {address.postalCode}</p>
            <button onClick={() => handleUpdateAddress(address.id, { ...address, address1: 'Updated Address' })}>Edit</button>
            <button onClick={() => handleDeleteAddress(address.id)}>Delete</button>
        </div>
        ))}
    </div>
    </div>
);
};

export default AddressManagement;
