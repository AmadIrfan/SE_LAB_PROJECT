const express = require('express');
const router = express.Router();
const signupController = require('../controller/signupController');

// Signup endpoint
router.post('/', signupController.signup);

module.exports = router;
