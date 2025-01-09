const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function (req, res) {
    try {
        console.log('create function called');
        
        // Use await for findById and handle as a promise
        const post = await Post.findById(req.body.post);

        if (!post) {
            console.error("Post not found");
            return res.redirect('/');
        }

        // Create a new comment
        const comment = await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id // The user who created the comment
        });

        // Push the comment to the post's comments array and save the post
        post.comments.push(comment);
        await post.save(); // Wait for the post to save

        // Redirect to home or the post view after saving
        return res.redirect('/');
    } catch (err) {
        console.error("Error creating comment:", err);
        return res.redirect('/');
    }
};
