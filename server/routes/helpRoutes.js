import express from 'express';
import { createHelpRequest, getAllHelpRequests } from '../controllers/helpController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createHelpRequest);
router.get('/', getAllHelpRequests);

export default router;
