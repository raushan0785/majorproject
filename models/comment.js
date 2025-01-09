const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to User who created the comment
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post', // Reference to the Post to which this comment belongs
        required: true
    }
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
