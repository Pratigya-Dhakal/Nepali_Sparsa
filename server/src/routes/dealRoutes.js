import express from 'express';
import { getDeals, getDealById, updateDeal, deleteDeal, addDeal } from '../controllers/dealController.js'; // Ensure the correct path is used
const router = express.Router();

router.post('/', addDeal);
router.get('/', getDeals);
router.get('/:id', getDealById);
router.put('/:id', updateDeal);
router.delete('/:id', deleteDeal);

export default router;
