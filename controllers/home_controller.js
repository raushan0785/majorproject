module.exports.home = function (req, res) {
    return res.render('home', {
        title: 'Home',
        user: req.user, // Pass the user object for conditional rendering
    });
};
