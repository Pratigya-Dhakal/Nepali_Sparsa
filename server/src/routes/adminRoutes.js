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
    searchUserByName,getUserDetailById,getSubcategoriesByCategoryId,getProductById,getSubcategoriesByID
} from '../controllers/adminController.js';
import {
    createDiscount, getAllDiscounts, getDiscountById, updateDiscount, deleteDiscount
} from '../controllers/discountController.js';
import upload from '../middlewares/upload.js';
import { addComment, getComments, addReply, getReplies, updateComment, deleteComment, updateReply, deleteReply } from '../controllers/commentController.js';
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
router.get('/subcategoriesByCategory', getSubcategoriesByCategoryId);
router.get('/subcategories/:subcategoryId', getSubcategoriesByID);

// Product routes
router.get('/products', getAllProducts);
router.post('/products', upload.array('images', 10), addProduct);
router.get('/products/:id', getProductById);
router.put('/products/:id', upload.array('images'), updateProduct);
router.delete('/products/:id', deleteProduct);
// Get products by category
router.get('/products/category/:categoryName', getProductsByCategory);
router.get('/orders/', getOrderedItemsList);

//user routes
router.get('/users',getAllUsers)
router.get('/users/:id',getUserById)
router.get('/users/detail/:id',getUserDetailById )
router.delete('/users/:id',deleteUserById)
router.get('/users/:name',searchUserByName)


// Discount routes
router.post('/discounts', createDiscount);
router.get('/discounts', getAllDiscounts);
router.get('/discounts/:id', getDiscountById);
router.put('/discounts/:id', updateDiscount);
router.delete('/discounts/:id', deleteDiscount);

router.post('/comments', addComment);
router.get('/comments/:productId', getComments);
router.put('/comments/:id', updateComment);
router.delete('/comments/:id', deleteComment);

router.post('/replies', addReply);
router.get('/replies/:commentId', getReplies);
router.put('/replies/:id', updateReply);
router.delete('/replies/:id', deleteReply);

export default router;