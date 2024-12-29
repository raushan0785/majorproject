const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/users_controller');

// Ensure all controller methods exist
console.log(userController);

// Routes for user actions
router.get('/profile', passport.checkAuthentication, userController.profile);
router.get('/sign-up', userController.usersignup);
router.get('/sign-in', userController.usersignin);
router.post('/create', userController.create);
router.get('/sign-out', passport.checkAuthentication, userController.destroysession);

// Login route
router.post(
    '/create-session',
    passport.authenticate('local', { failureRedirect: '/users/sign-in' }),
    userController.createsession
);

module.exports = router;
