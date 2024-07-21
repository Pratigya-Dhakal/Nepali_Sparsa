import express from 'express';
import {forgotPassword, resetPassword, searchItems, addToCart, deleteFromCart, confirmOrder, userSignup, userLogin, verifyEmail } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.post('/signup', userSignup);
router.get('/verify-email', verifyEmail);
router.post('/login', userLogin);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/search', searchItems);
router.post('/cart', protect, addToCart);
router.delete('/cart/:itemId', protect, deleteFromCart);
router.post('/order', protect, confirmOrder);

export default router;
