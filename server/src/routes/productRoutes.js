import express from 'express';
import {
    getAllProducts,
    getProductByName,
    getProductsByCategory,
    getProductById
} from '../controllers/productController.js'; // Ensure this path is correct

const router = express.Router();

// Route to get all products with optional filters and pagination
router.get('/products', getAllProducts);

// Route to get products by name
router.get('/products/name/:name', getProductByName);

// Route to get products by category
router.get('/products/category/:categoryName', getProductsByCategory);

// Route to get a product by ID
router.get('/products/:id', getProductById);

export default router;
