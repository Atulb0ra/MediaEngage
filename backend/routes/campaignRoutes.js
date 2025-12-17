import express from 'express';
import multer from 'multer';
import {getAllCampaigns, getMyCampaigns, createCampaign, getCampaignById, campaignVote, getCampaignVotes, getCampaignChat, createCampaignChat} from '../controllers/campaignController.js';
const upload = multer({ dest: 'tmp/' });

import {requireAuth} from '../middleware/clerkAuth.js';

const router = express.Router();

router.get('/', getAllCampaigns);
router.get('/my', requireAuth, getMyCampaigns);
router.post('/create', requireAuth, upload.array('media', 5), createCampaign);
router.post('/:id/vote', requireAuth, campaignVote);
router.post('/:id/votes', requireAuth, getCampaignVotes);
// Chat endpoints
// Use singular '/chat' for both GET and POST to match frontend usage
router.get('/:id/chat', requireAuth, getCampaignChat);
router.post('/:id/chat', requireAuth, createCampaignChat);
// Specific routes above; place the generic GET /:id after them
router.get('/:id', getCampaignById);

export default router;