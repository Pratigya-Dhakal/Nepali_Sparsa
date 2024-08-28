// src/routes/productRoutes.js

import express from 'express';
import {
    getAllProducts,
    getProductByName,
    getProductsByCategory,
    getProductById,
    getSimilarProducts
} from '../controllers/productController.js';

const router = express.Router();

// Route to get all products with optional filters and pagination
router.get('/', getAllProducts);

// Route to get products by name
router.get('/name/:name', getProductByName);

// Route to get products by category
router.get('/category/:categoryName', getProductsByCategory);

// Route to get a product by ID
router.get('/:id', getProductById);

// Route to get similar products by category
router.get('/similar/:categoryName', getSimilarProducts);

export default router;
