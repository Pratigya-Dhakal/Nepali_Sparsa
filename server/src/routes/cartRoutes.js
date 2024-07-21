const express = require('express');
const router = express.Router();
const { addItemToCart, removeItemFromCart } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

router.post('/add', protect, addItemToCart);
router.delete('/remove/:id', protect, removeItemFromCart);

module.exports = router;
