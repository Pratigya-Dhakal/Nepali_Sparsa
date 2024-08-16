import express from 'express';
import { getAddress, updateAddress, deleteAddress } from '../controllers/addressController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(protect, getAddress)
    .put(protect, updateAddress)
    .delete(protect, deleteAddress); // Added the delete route

export default router;
