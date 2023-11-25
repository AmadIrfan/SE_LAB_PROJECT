const express = require('express');
const router = express.Router();
const cartcustomerbuyController = require('../../controller/Customer/buyproduct');

router.post('/', cartcustomerbuyController.buyProduct);
module.exports = router;
