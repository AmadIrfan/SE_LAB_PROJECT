const express = require('express');
const router = express.Router();
const ccarecustomerController = require('../../controller/Customer/customerCareIssue');

router.post('/', ccarecustomerController.customercareadd);
module.exports = router;
