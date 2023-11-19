var express = require('express');
var router = express.Router();
const controller=require('../../controller/Customer/getspecefiedproducts')

router.get('/:ProductID', controller.getcustomerProductsspecefied);
  
module.exports = router;