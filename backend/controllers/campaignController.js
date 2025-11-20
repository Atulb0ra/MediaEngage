import Campaign from '../models/campaignModel.js';
import { cloudinary } from '../config/cloudinary.js';
import fs from 'fs';

export const createCampaign = async (req, res) => {
    try {
        const creatorId = req.userId;
        let { title, maxParticipants, totalBudget, description } = req.body;

        // basic validation and type coercion
        if (!creatorId) return res.status(401).json({ message: 'Unauthorized' });
        if (!title || !totalBudget || !maxParticipants) return res.status(400).json({ message: 'Missing required fields: title, totalBudget or maxParticipants' });

        // coerce numeric fields
        totalBudget = Number(totalBudget);
        maxParticipants = Number(maxParticipants);
        if (isNaN(totalBudget) || isNaN(maxParticipants) || maxParticipants <= 0) return res.status(400).json({ message: 'Invalid numeric values for totalBudget or maxParticipants' });

        const files = req.files || [];

        if (files.length === 0) return res.status(400).json({ message: 'At least one media file is required' });
        if (files.length > 5) return res.status(400).json({ message: 'Maximum 5 media files are allowed' });

        // upload files in parallel to reduce overall upload time (max 5 files)
        const startUpload = Date.now();
        const uploadPromises = files.map((file) => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload(file.path, { resource_type: 'auto' }, (err, result) => {
                    // remove temp file regardless of outcome
                    fs.unlink(file.path, () => { });
                    if (err) return reject(err);
                    resolve({ url: result.secure_url, resource_type: result.resource_type });
                });
            });
        });

        // Await all uploads in parallel. If one fails, it will throw and be caught below.
        const uploaded = await Promise.all(uploadPromises);
        // const uploadDuration = Date.now() - startUpload;
        // console.log(`Uploaded ${uploaded.length} files in ${uploadDuration}ms`);

        // compute per-user budget as a Number
        const perUserBudget = Number((totalBudget / maxParticipants).toFixed(2));

        const campaign = await Campaign.create({
            creatorId,
            title,
            description,
            // model expects lowercase 'image' or 'video'
            type: uploaded.some(item => item.resource_type === 'video') ? 'video' : 'image',
            media: uploaded,
            maxParticipants,
            totalBudget,
            perUserBudget,
            // model expects lowercase status
            status: 'active'
        })

        res.status(201).json({ message: 'Campaign created successfully', campaign });
    }
    catch (error) {
        console.error('Error creating campaign:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getMyCampaigns = async (req, res) => {
    try {
        const creatorId = req.userId;
        const campaigns = await Campaign.find({ creatorId }).sort({ createdAt: -1 });
        res.status(200).json(campaigns);
    }
    catch (error) {
        console.error('Error fetching user campaigns:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getAllCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find().sort({ createdAt: -1 });
        res.status(200).json(campaigns);
    }
    catch (error) {
        console.error('Error fetching campaigns:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getCampaignById = async (req, res) => {
    try {
        const { id } = req.params;
        const campaign = await Campaign.findById(id);
        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }
        res.status(200).json(campaign);
    }
    catch (error) {
        console.error('Error fetching campaign by id:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


export const campaignVote = async (req, res) => {
    try {
        const { userId, index } = req.body;
        if (!userId) return res.status(400).json({ error: "user ID required" });

        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) return res.status(400).json({ error: "campaign not found" });

        if (!campaign.pollCounts.length) {
            campaign.pollCounts = new Array(campaign.media.length).fill(0);
        }

        const existingVote = campaign.votes.find(v => v.userId === userId);

        if (existingVote) {
            campaign.pollCounts[existingVote.index] -= 1;
            existingVote.index = index;
        }
        else {
            campaign.votes.push({ userId, index });
        }
        campaign.pollCounts[index] += 1;

        await campaign.save();

        res.json({ success: true, pollCounts: campaign.pollCounts })
    }
    catch(error){
        console.error('Error in vote contribution:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


export const getCampaignVotes = async (req, res) => {
    try{
        const id = req.params.id
        const campaign = await Campaign.findById(id);
        if(!campaign){
            return res.status(404).json({ message: 'Campaign not found' });
        }
        res.json({
            pollCounts : campaign.pollCounts || [],
            votes : campaign.votes || []
        })
    }
    catch(error){
        console.error('Error fetching vote by userId:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

