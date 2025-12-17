import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
    url: String,
    resource_type: String,
});

const campaignSchema = new mongoose.Schema({
    creatorId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['image', 'video'],
        required: true,
        default: 'image'
    },
    media: [mediaSchema],
    interactionCount: {
        type: Number,
        default: 0
    },
    uniqueUsers: {
        type: Number,
        default: 0
    },
    ctr: {
        type: Number,
        default: 0
    },
    pollCounts: {
        type: [Number],
        default: []
    },
    votes: [
        {
            userId: String,
            index: Number
        }
    ],
});

const Campaign = mongoose.model('Campaign', campaignSchema);
export default Campaign;