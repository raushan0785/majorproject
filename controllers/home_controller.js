const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function (req, res) {
    try {
        // Populate posts with user and comment data
        const posts = await Post.find({})
            .populate('user') // Populate user for each post
            .populate({
                path: 'comments',
                populate: {
                    path: 'user', // Populate user for each comment
                    select: 'name' // Select only the 'name' field
                }
            });

        // Fetch all users
        const users = await User.find({});

        // Render the view with posts and users
        return res.render('home', {
            title: "Codeial/Home",
            posts: posts,
            all_users: users
        });

    } catch (err) {
        console.error('Error in fetching posts or users:', err);
        return res.status(500).redirect('/');
    }
};
