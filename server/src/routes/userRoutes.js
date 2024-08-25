import express from 'express';
import {searchItems, addToCart, deleteFromCart, confirmOrder, userSignup, userLogin, verifyEmail,forgotPassword,resetPassword ,getUserProfile,updateUserProfile} from '../controllers/userController.js';
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
// Get user profile
router.get('/:id',protect, getUserProfile);

// Update user profile
router.put('/:id',protect, updateUserProfile);


export default router;
