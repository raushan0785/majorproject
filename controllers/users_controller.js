const User = require('../models/user');
const fs = require('fs'); // Import the File System module
const path = require('path'); 

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
module.exports.update = async function(req, res){
   

    if(req.user.id == req.params.id){

        try{

            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if (err) {console.log('*****Multer Error: ', err)}
                
                user.name = req.body.name;
                user.email = req.body.email;

                if (req.file){

                    if (user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }


                    // this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });

        }catch(err){
            req.flash('error', err);
            return res.redirect('back');
        }


    }else{
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
}



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
    req.flash('success','logged in successfully');
    return res.redirect(`/users/profile/${req.user.id}`);
};

// Handle user logout and destroy the session
module.exports.destroysession = function (req, res, next) {
    req.flash('success','you have logged out');
    req.logout(function (err) {
        if (err) {
            console.log('Error during logout:', err);
            return next(err);
        }
        return res.redirect('/');
    });
};
