const express = require('express');
const router = express.Router();
const cartcustomerBuyController = require('../../controller/Customer/buy');

router.get('/', cartcustomerBuyController.buy);
module.exports = router;
