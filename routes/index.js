const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

// Handle root route
router.get('/', homeController.home);

// Delegate /users routes to users.js
router.use('/users', require('./users'));

module.exports = router;
