const express = require('express');
const router = express.Router();
const getPaymentsController = require('../../controller/Admin/getPayments');

router.get('/', getPaymentsController.getAdminPayments);

module.exports = router;
