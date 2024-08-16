import express from 'express';
import { addItemToCart, removeItemFromCart, getCartItems } from '../controllers/cartController.js';
import { userProtect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/add', userProtect, addItemToCart);
router.delete('/remove/:id', userProtect, removeItemFromCart);
router.get('/', userProtect, getCartItems);

export default router;
