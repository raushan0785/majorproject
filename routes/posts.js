const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts_controller'); // Ensure correct import
const passport = require('passport');

// Use the checkAuthentication middleware to secure the route
router.post('/create', passport.checkAuthentication, postsController.create);
router.get('/destroy/:id', passport.checkAuthentication, postsController.destroy);

module.exports = router;
