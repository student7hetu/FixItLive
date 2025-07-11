import express from 'express';
import {
  createHelpRequest,
  getAllHelpRequests,
  getAllHelpRequestById,
  acceptHelpRequest,
  getAcceptedRequests,
  getMyHelpRequests,
} from '../controllers/helpController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createHelpRequest);
router.get('/', getAllHelpRequests);
router.get('/accepted', authMiddleware, getAcceptedRequests);
router.get('/my', authMiddleware, getMyHelpRequests);
router.get('/:id', getAllHelpRequestById); // ✅ Always place this LAST
router.put('/:id/accept', authMiddleware, acceptHelpRequest);


export default router;
