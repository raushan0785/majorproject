const User = require('../models/user');

// Render the profile page
module.exports.profile = function (req, res) {
    return res.render('user_profile', {
        title: 'User Profile',
    });
};

// Render the sign-up page
module.exports.usersignup = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: 'Codeial | Sign Up',
    });
};

// Render the sign-in page
module.exports.usersignin = function (req, res) {
    return res.render('user_sign_in', {
        title: 'Codeial | Sign In',
    });
};

// Create a new user
module.exports.create = function (req, res) {
    if (req.body.password !== req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email })
        .then((existingUser) => {
            if (!existingUser) {
                // Create the user
                return User.create(req.body)
                    .then(() => res.redirect('/users/sign-in'))
                    .catch((err) => {
                        console.log('Error during user creation:', err);
                        return res.redirect('back');
                    });
            } else {
                return res.redirect('back');
            }
        })
        .catch((err) => {
            console.log('Error during user lookup:', err);
            return res.redirect('back');
        });
};

// Handle user login and create a session
module.exports.createsession = function (req, res) {
    return res.redirect('/users/profile');
};

// Handle user logout and destroy the session
module.exports.destroysession = function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            console.log('Error during logout:', err);
            return next(err);
        }
        return res.redirect('/');
    });
};
