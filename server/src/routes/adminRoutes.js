import express from 'express';
import {
    adminSignup, verifyEmail, adminLogin, resendVerificationEmail,
    getAllCategories, addCategory, updateCategory, deleteCategory,
    getAllSubcategories, addSubcategory, updateSubcategory, deleteSubcategory,
    getAllProducts, addProduct, updateProduct, deleteProduct, getProductsByCategory,
    getCategoryById,getOrderedItemsList,
    getAllUsers,
    getUserById,
    deleteUserById,
    searchUserByName,getUserDetailById
} from '../controllers/adminController.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

// Admin Signup and Login routes
router.post('/signup', adminSignup);
router.get('/verify-email', verifyEmail);
router.post('/login', adminLogin);
router.post('/resend-verification-email', resendVerificationEmail);

// Category routes
router.get('/categories', getAllCategories);
router.post('/categories', upload.single('image'), addCategory);
router.put('/categories/:categoryId', upload.single('image'), updateCategory);
router.delete('/categories/:categoryId', deleteCategory);
router.get('/categories/:id', getCategoryById);

// Subcategory routes
router.get('/subcategories', getAllSubcategories);
router.post('/subcategories', addSubcategory);
router.put('/subcategories/:subcategoryId', updateSubcategory);
router.delete('/subcategories/:subcategoryId', deleteSubcategory);

// Product routes
router.get('/products', getAllProducts);
router.post('/products', upload.array('images'), addProduct);
router.put('/products/:productId', upload.array('images'), updateProduct);
router.delete('/products/:productId', deleteProduct);

// Get products by category
router.get('/products/category/:categoryName', getProductsByCategory);
router.get('/orders/', getOrderedItemsList);

//user routes
router.get('/users',getAllUsers)
router.get('/users/:id',getUserById)
router.get('/users/detail/:id',getUserDetailById )
router.delete('/users/:id',deleteUserById)
router.get('/users/:name',searchUserByName)

export default router;