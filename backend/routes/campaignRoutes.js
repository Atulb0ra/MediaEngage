import express from 'espress';
import multer from 'multer';
const upload = multer({ dest: 'tmp/' });

import {requireAuth} from '../middleware/authMiddleware.js';

const router = express.Router();

Router.get('/', getAllCampaigns);
Router.get('/my', requireAuth, getMyCampaigns);
Router.post('/', requireAuth, upload.array('media', 5), createCampaign);

export default router;