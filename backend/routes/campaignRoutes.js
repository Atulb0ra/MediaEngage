import express from 'express';
import multer from 'multer';
import {getAllCampaigns, getMyCampaigns, createCampaign, getCampaignById, campaignVote, getCampaignVotes} from '../controllers/campaignController.js';
const upload = multer({ dest: 'tmp/' });

import {requireAuth} from '../middleware/clerkAuth.js';

const router = express.Router();

router.get('/', getAllCampaigns);
router.get('/my', requireAuth, getMyCampaigns);
router.get('/:id', getCampaignById);
router.post('/create', requireAuth, upload.array('media', 5), createCampaign);
router.post('/:id/vote', requireAuth, campaignVote);
router.post(':id/votes', requireAuth, getCampaignVotes);

export default router;