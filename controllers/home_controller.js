const Post = require('../models/post'); // Assuming you have a Post model

module.exports.home = async function(req, res) {
    try {
        // Using async/await instead of .exec()
        const posts = await Post.find({}).populate('user'); // Add .populate('user') if you want to get the user data too
        return res.render('home', {
            title: 'Home Page',
            posts: posts // Pass posts to the view
        });
    } catch (err) {
        console.log('Error in fetching posts:', err);
        return res.status(500).send('Internal Server Error');
    }
};
