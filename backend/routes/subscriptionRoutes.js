import express from "express"
import {requireAuth} from '../middleware/clerkAuth.js';
import { createCheckoutSession } from "../controllers/subscriptionController.js";

const router = express.Router();
router.post('/create', requireAuth, createCheckoutSession);

export default router
