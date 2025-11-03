import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    checkId : {
        type: String,
        required: true,
        unique: true
    },
    email : String,
    name : String,
    role : {
        type : String,
        enum : ['tester', 'admin', 'admin'],
        default : 'tester'
    },
    balance : {
        type: Number,
        default: 0
    },
    createdAt :{
        type: Date,
        default: Date.now
    },
});

const User = mongoose.model('User', userSchema);
export default User;