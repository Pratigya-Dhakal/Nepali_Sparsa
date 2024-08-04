import express from 'express';
import {
createReview,
getReviewsByProduct,
updateReview,
deleteReview,
} from '../controllers/reviewController.js';

const router = express.Router();

router.post('/', createReview);
router.get('/product/:productId', getReviewsByProduct);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

export default router;
