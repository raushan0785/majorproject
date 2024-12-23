const User = require('../models/user');

// Render user profile page
module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    });
}

// Render the sign-up page
module.exports.usersignup = function(req, res){
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
}

// Render the sign-in page
module.exports.usersignin = function(req, res){
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
}

// Get the sign-up data and create the user
module.exports.create = function(req, res) {
    // Check if passwords match
    if (req.body.password !== req.body.confirm_password) {
        return res.redirect('back');
    }

    // Check if user already exists
    User.findOne({ email: req.body.email })
        .then(function(user) {
            if (user) {
                return res.redirect('back');
            }

            // Create new user if not exists
            User.create({
                email: req.body.email,
                password: req.body.password,
                name: req.body.name
            })
            .then(function() {
                console.log('User created successfully');
                return res.redirect('/users/sign-in');
            })
            .catch(function(err) {
                console.log('Error in creating user while signing up:', err);
                return res.redirect('back');
            });
        })
        .catch(function(err) {
            console.log('Error in finding user while signing up:', err);
            return res.redirect('back');
        });
}

// Create a session for the user (TODO)
module.exports.createsession = function(req, res) {
    // Find the user by email
    User.findOne({ email: req.body.email })
        .then(function(user) {
            // If no user is found, redirect back to sign-in page
            if (!user) {
                return res.redirect(req.get("Referrer") || "/");
            }

            // Check if the password is correct
            if (user.password !== req.body.password) {
                return res.redirect(req.get("Referrer") || "/");
            }

            // Set the user_id cookie to the user's id
            res.cookie('user_id', user.id);

            // Redirect to the profile page
            return res.redirect('/users/profile');
        })
        .catch(function(err) {
            // Log any errors that occur and redirect back
            console.log("Error in finding user while signing in:", err);
            return res.redirect(req.get("Referrer") || "/");
        });
};

