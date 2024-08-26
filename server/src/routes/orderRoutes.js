import express from 'express';
import { protect } from '../middlewares/authMiddleware.js'; // Adjust path as needed
import { placeOrder, getUserOrders } from '../controllers/orderController.js'; // Adjust path as needed

const router = express.Router();

// Route to place an order
router.post('/place-order', protect, placeOrder);
router.get('/user',protect, getUserOrders);

export default router;
