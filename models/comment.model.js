import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    ticketId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket",
        required: true
    },
    commenterId: {
        type: String,
        required: true
    }
    
}, {timestamps: true})

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;