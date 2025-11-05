import Campaign from '../models/campaignModel.js';
import {cloudinary} from '../config/cloudinary.js';
import fs from 'fs';

export const createCampaign = async (req, res) => {
    try{
        // middleware sets req.userId
        const creatorId = req.userId;
        let {title, maxParticipants, totalBudget, description} = req.body;

        // basic validation and type coercion
        if (!creatorId) return res.status(401).json({ message: 'Unauthorized' });
        if (!title || !totalBudget || !maxParticipants) return res.status(400).json({ message: 'Missing required fields: title, totalBudget or maxParticipants' });

        // coerce numeric fields
        totalBudget = Number(totalBudget);
        maxParticipants = Number(maxParticipants);
        if (isNaN(totalBudget) || isNaN(maxParticipants) || maxParticipants <= 0) return res.status(400).json({ message: 'Invalid numeric values for totalBudget or maxParticipants' });

        const files = req.files || [];

        if(files.length === 0) return res.status(400).json({ message: 'At least one media file is required' }); 
        if(files.length > 5) return res.status(400).json({ message: 'Maximum 5 media files are allowed' });

        const uploaded = [];
        for(const file of files){
            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload(file.path,{resource_type : 'auto'}, (err, res) => {
                    if(err) reject(err);
                    else resolve(res);
                });
            });
            uploaded.push({url : result.secure_url, resource_type : result.resource_type});
            fs.unlink(file.path, () => {});
        }
        // compute per-user budget as a Number
        const perUserBudget = Number((totalBudget / maxParticipants).toFixed(2));

        const campaign = await Campaign.create({
            creatorId,
            title,
            description,
            // model expects lowercase 'image' or 'video'
            type : uploaded.some(item => item.resource_type === 'video') ? 'video' : 'image',
            media : uploaded,
            maxParticipants,
            totalBudget,
            perUserBudget,
            // model expects lowercase status
            status : 'active'
        })

        res.status(201).json({ message: 'Campaign created successfully', campaign});
    }
    catch(error){
        console.error('Error creating campaign:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getMyCampaigns = async (req, res) => {
    try{
        const creatorId = req.userId;       
        const campaigns = await Campaign.find({ creatorId}).sort({ createdAt: -1});
        res.status(200).json(campaigns);
    }           
    catch(error){
        console.error('Error fetching user campaigns:', error);
        res.status(500).json({ message: 'Internal server error' });
    }   
}

export const getAllCampaigns = async (req, res) => {
    try{
        const campaigns = await Campaign.find().sort({createdAt: -1});
        res.status(200).json(campaigns);
    }
    catch(error){
        console.error('Error fetching campaigns:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}