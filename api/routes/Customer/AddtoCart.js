const express = require('express');
const router = express.Router();
const cartcustomerController = require('../../controller/Customer/addToCart');

router.post('/', cartcustomerController.addtocart);
module.exports = router;
