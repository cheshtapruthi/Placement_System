import express from 'express';
import { createApplication } from '../controllers/applicationController.js';

const router = express.Router();

// Create a new job application
router.post('/', createApplication);

export default router;
