import mongoose from "mongoose";

const userPlanSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    plan: { type: String, enum: ["free", "premium", "premium_plus"], default: "free" },
    tasksToday: { type: Number, default: 0 },
    campaignsCreated: { type: Number, default: 0 },
    planExpiresAt: Date,
    lastTaskReset: Date
}, { timestamps: true });

export default mongoose.model("UserPlan", userPlanSchema)