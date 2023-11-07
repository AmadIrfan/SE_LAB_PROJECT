var express = require('express');
var router = express.Router();
const controller=require('../utils/middleware')

router.get('/', controller.validateToken)
  
module.exports = router;