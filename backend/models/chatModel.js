import mongoose from "mongoose";

// Chat schema should be created via mongoose.Schema, not createConnection
const chatSchema = new mongoose.Schema({
    campaignId : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : "Campaign",
        required : true
    },
    username : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true,
    },
    replyTo : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : "Chat",
        default : null
    }
}, {timestamps : true});

export default mongoose.model('Chat', chatSchema);


