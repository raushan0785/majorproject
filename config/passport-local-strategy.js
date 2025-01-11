const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// Authentication using Passport
passport.use(
    new LocalStrategy(
        { 
            usernameField: 'email',
            passReqToCallback: true // Correct placement of passReqToCallback
        },
        (req, email, password, done) => {  // You need to accept `req` as the first argument here.
            // Find a user and establish identity using Promises
            User.findOne({ email: email })
                .then((user) => {
                    if (!user || user.password !== password) {
                        req.flash('error', 'invalid');
                        //console.log('Invalid username/password');
                        return done(null, false, { message: 'Invalid username or password' });
                    }

                    return done(null, user);
                })
                .catch((err) => {
                    console.log('Error in finding user in Passport:', err);
                    return done(err);
                });
        }
    )
);

// Serialize the user to store in session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize the user from session
passport.deserializeUser((id, done) => {
    // Use Promise-based approach for deserialization
    User.findById(id)
        .then((user) => {
            if (!user) {
                console.log('User not found during deserialization');
                return done(null, false, { message: 'User not found' });
            }

            return done(null, user);
        })
        .catch((err) => {
            console.log('Error in finding user during deserialization:', err);
            return done(err, false);
        });
});

passport.checkAuthentication = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/users/sign-in');
};

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
};

module.exports = passport;
