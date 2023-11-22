const express = require('express');
const router = express.Router();
const checkCartController = require('../../controller/Customer/checkCart');

router.post('/', checkCartController.isInCart);

module.exports = router;