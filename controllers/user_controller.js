const User = require('../models/user');

module.exports.create = async function (req, res) {
    try {
        if (req.body.password !== req.body.confirm_password) {
            return res.redirect('back');
        }

        // Use 'await' to handle the async operation
        let user = await User.findOne({ email: req.body.email });

        if (!user) {
            await User.create(req.body);
            return res.redirect('/users/sign-in');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.error('Error in user creation:', err);
        return res.redirect('back');
    }
};

module.exports.profile = function (req, res) {
    return res.render('user_profile', {
        title: 'User Profile'
    });
};

module.exports.signUp = function (req, res) {
    return res.render('user_sign_up', {
        title: "codeial | sign up"
    });
};

module.exports.signIn = function (req, res) {
    return res.render('user_sign_in', {
        title: "codeial | sign in"
    });
};
