import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
    url : String,
    resourceType : String,
});

const campaignSchema = new mongoose.Schema({
    creatorId :{
        type: String,
        required: true
    },
    title : {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['image', 'video'],
        required: true,
        default: 'image'
    },
    media : [mediaSchema],
    totalBudget : {
        type: Number,
        required: true,
    },
    maxParticipants : {
        type: Number,
        required: true,     
    },
    perUserBudget : {
        type: Number,
        required: true, 
    },
    interactionCount :{
        type: Number,
        default: 0
    },
    uniqueUsers : {
        type: Number,
        default: 0
    },
    ctr : {
        type: Number,
        default: 0
    },
    status:{
        type: String,
        enum: ['active', 'completed', 'draft', 'cancelled'],
        default: 'active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});