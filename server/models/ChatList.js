import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    chatList: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    }
    }, 
    {
        timestamps: true
    }
);

export default mongoose.model('ChatList', ChatSchema);
