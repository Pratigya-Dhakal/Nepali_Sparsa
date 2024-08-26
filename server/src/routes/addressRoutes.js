import express from 'express';
import {
createAddress,
updateAddress,
deleteAddress,
getUserAddresses,
} from '../controllers/addressController.js';

const router = express.Router();

// Get all addresses for a user
router.get('/:userId', getUserAddresses);

// Create a new address
router.post('/:userId', createAddress);

// Update an existing address
router.put('/:addressId', updateAddress);

// Delete an address
router.delete('/:addressId', deleteAddress);

export default router;
