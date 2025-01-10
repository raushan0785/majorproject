const User = require('../models/user');

// Render the profile page
module.exports.profile = async function (req, res) {
    try {
        // Fetch the user by ID using async/await
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).send('User not found');
        }

        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    } catch (err) {
        console.error('Error in fetching user profile:', err);
        return res.status(500).send('Internal Server Error');
    }
};
module.exports.update = async function (req, res) {
    try {
        // Check if the user is trying to update their own profile
        if (req.user.id == req.params.id) {
            // Update the user profile using async/await
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
                new: true, // This ensures the updated document is returned
                runValidators: true // This ensures validation is applied during the update
            });

            if (!updatedUser) {
                return res.status(404).send('User not found');
            }

            return res.redirect('back'); // Redirect back after the update
        } else {
            // If the user is trying to update someone else's profile, send a 401 Unauthorized error
            return res.status(401).send('Unauthorized');
        }
    } catch (err) {
        console.error('Error updating user profile:', err);
        return res.status(500).send('Internal Server Error');
    }
};

// Render the sign-up page
module.exports.usersignup = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect(`/users/profile/${req.user.id}`);
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
    return res.redirect(`/users/profile/${req.user.id}`);
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
