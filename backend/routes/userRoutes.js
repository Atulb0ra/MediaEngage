import express from 'express';
import multer from 'multer';
import {getUserById} from '../controllers/userController.js';
import {requireAuth} from '../middleware/clerkAuth.js'; 

const router = express.Router();

router.get('/:userId', requireAuth, getUserById);

export default router;