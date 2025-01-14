const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// Tell passport to use a new strategy for Google login
passport.use(
    new googleStrategy(
        {
            clientID: '1091265327920-jqe09pbj2co1q2fhiig0sg1n9uj0m85h.apps.googleusercontent.com', 
            clientSecret: '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', 
            callbackURL: "http://localhost:8000/users/auth/google/callback",
        },
        async function (accessToken, refreshToken, profile, done) {
            try {
                // Find a user with the email from Google profile
                let user = await User.findOne({ email: profile.emails[0].value });

                if (user) {
                    // If found, set this user as req.user
                    return done(null, user);
                } else {
                    // If not found, create the user and set it as req.user
                    user = await User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex'),
                    });
                    return done(null, user);
                }
            } catch (err) {
                console.log('Error in Google strategy-passport:', err);
                return done(err);
            }
        }
    )
);

module.exports = passport;
