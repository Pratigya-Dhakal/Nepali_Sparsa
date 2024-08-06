import express from 'express';
import { getDeals, getDealById, updateDeal, deleteDeal, addDeal } from '../controllers/dealController.js'; // Ensure the correct path is used
const router = express.Router();

router.post('/deals', addDeal);
router.get('/deals', getDeals);
router.get('/deals/:id', getDealById);
router.put('/deals/:id', updateDeal);
router.delete('/deals/:id', deleteDeal);

export default router;
