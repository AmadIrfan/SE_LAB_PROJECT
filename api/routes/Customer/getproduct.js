var express = require('express');
var router = express.Router();
const controller=require('../../controller/Customer/getproducts')

router.get('/', controller.getcustomerProducts);
  
module.exports = router;