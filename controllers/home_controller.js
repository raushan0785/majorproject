const Post = require('../models/post');

module.exports.home = async function (req, res) {
    try {
        // Populate comments with the user data
        const posts = await Post.find({})
            .populate('user')   // Populate user for the post
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',  // Populate user for each comment
                    select: 'name' // Only select the 'name' field
                }
            })
            .exec();

        return res.render('home', {
            title: 'Home Page',
            posts: posts
        });
    } catch (err) {
        console.log('Error in fetching posts:', err);
        return res.redirect('/');
    }
};
