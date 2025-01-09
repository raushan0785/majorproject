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
       // Import the Post model

       module.exports.destroy = async function(req, res) {
        console.log('Destroy route hit!'); // Log to confirm the route is accessed
        console.log('Comment ID:', req.params.id); 
    
        try {
            // Find the comment by ID
            const comment = await Comment.findById(req.params.id);
    
            if (!comment) {
                console.log('Comment not found');
                return res.redirect('back');
            }
    
            // Check if the logged-in user is the author of the comment
            if (comment.user.toString() === req.user.id) {
                const postId = comment.post;
    
                // Remove the comment
                await comment.deleteOne();  // Use deleteOne instead of remove
    
                // Pull the comment ID from the associated post's comments array
                await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
    
                console.log('Comment deleted successfully');
                return res.redirect('back');
            } else {
                console.log('Unauthorized attempt to delete comment');
                return res.redirect('back');
            }
        } catch (err) {
            console.log('Error in deleting the comment:', err);
            return res.redirect('back');
        }
    };
    