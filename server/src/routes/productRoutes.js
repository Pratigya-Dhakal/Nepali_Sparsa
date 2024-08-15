import express from 'express';
import {
    getAllProducts,
    getProductByName,
    getProductsByCategory,
    getProductById,getSimilarProducts
} from '../controllers/productController.js'; // Ensure this path is correct

const router = express.Router();

// Route to get all products with optional filters and pagination
router.get('/', getAllProducts);

// Route to get products by name
router.get('/name/:name', getProductByName);

// Route to get products by category
router.get('/category/:categoryName', getProductsByCategory);

// Route to get a product by ID
router.get('/:id', getProductById);
router.get('/similar/:category', getSimilarProducts);

export default router;
