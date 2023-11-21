const express = require('express');
const router = express.Router();
const productcartDelController = require('../../controller/Customer/deletecart');

router.delete('/', productcartDelController.deleteProductincart);

module.exports = router;