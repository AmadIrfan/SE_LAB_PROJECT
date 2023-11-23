const express = require('express');
const router = express.Router();
const boughtproductcontroller = require('../../controller/Customer/boughtproducts');

router.get('/', boughtproductcontroller.getcustomerProducts);
module.exports = router;
