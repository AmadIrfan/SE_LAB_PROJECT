const express = require('express');
const router = express.Router();
const GetCountsinAdminController = require('../../controller/Admin/getCountsinadmin');

router.get('/', GetCountsinAdminController.getcountsina);

module.exports = router;
