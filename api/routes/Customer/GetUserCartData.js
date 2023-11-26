const express = require('express');
const router = express.Router();
const cartController = require('../../controller/Customer/getUserCart');

// Define the route for fetching the user's cart
router.get('/', cartController.getUserCartdata);

module.exports = router;
