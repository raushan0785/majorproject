const express = require('express');
const router = express.Router();

const passport = require('passport');
const commentsController = require('../controllers/comments_controller');

console.log('commentsController:', commentsController); // Check if the controller is properly imported

// Route for creating a comment
router.post('/create', passport.checkAuthentication, commentsController.create);
router.get('/destroy/:id', passport.checkAuthentication, commentsController.destroy);

module.exports = router;
