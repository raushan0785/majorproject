const Post = require('../models/post'); // Assuming you have a Post model
const User = require('../models/user'); // Assuming you have a User model

module.exports.create = async function(req, res) {
    try {
        const content = req.body.content;  // Content from the form
        const user = req.user;  // User from session or passport

        if (!content) {
            return res.status(400).send('Content is required');
        }

        // Create a new post
        const newPost = await Post.create({
            content: content,
            user: user._id
        });

        // Redirect to home page (or wherever you need)
        return res.redirect('/');
    } catch (err) {
        console.log('Error creating post:', err);
        return res.status(500).send('Internal Server Error');
    }
};
module.exports.destroy = function(req, res) {
    Post.findById(req.params.id)
        .then((post) => {
            if (!post) {
                console.log('Post not found');
                return res.redirect('back');
            }

            // Assuming the user can delete only their own posts
            if (post.user.toString() !== req.user.id) {
                console.log('Unauthorized attempt to delete a post');
                return res.redirect('back');
            }

            // Delete the post
            return Post.deleteOne({ _id: req.params.id });
        })
        .then(() => {
            console.log('Post deleted successfully');
            return res.redirect('back');
        })
        .catch((err) => {
            console.log('Error in deleting the post:', err);
            return res.redirect('back');
        });
};

