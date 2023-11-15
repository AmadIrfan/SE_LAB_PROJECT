const express = require('express');
const router = express.Router();
const profileController = require('../controller/getprofile');

// Define the route for fetching the user's cart
router.get('/', profileController.getprofile);

module.exports = router;
