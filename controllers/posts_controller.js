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
