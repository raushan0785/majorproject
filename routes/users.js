// users.js (Routes for user-related actions)
const express = require('express');
const router = express.Router();
const passport = require('passport');
const usercontroller = require('../controllers/users_controller');

// Routes for user-related actions
router.get('/profile', passport.checkAuthentication, usercontroller.profile);
router.get('/sign-up', usercontroller.usersignup);
router.get('/sign-in', usercontroller.usersignin);
router.post('/create', usercontroller.create);

// Corrected create-session route
router.post(
    '/create-session',
    passport.authenticate('local', { failureRedirect: '/users/sign-in' }),
    usercontroller.createsession
);

module.exports = router;
