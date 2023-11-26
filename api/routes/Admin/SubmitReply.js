var express = require('express');
var router = express.Router();
const submitreplyController=require('../../controller/Admin/submitReply')

router.put('/', submitreplyController.reply)
  
module.exports = router;