import express from 'express';
import { protect } from '../middlewares/authMiddleware.js'; // Adjust path as needed
import { placeOrder } from '../controllers/orderController.js'; // Adjust path as needed

const router = express.Router();

// Route to place an order
router.post('/place-order', protect, placeOrder);

export default router;
