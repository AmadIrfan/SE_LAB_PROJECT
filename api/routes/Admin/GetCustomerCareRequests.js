const express = require('express');
const router = express.Router();
const admingetcustomerrequests = require('../../controller/Admin/getCustomerCareRequests');

router.get('/', admingetcustomerrequests.getcustomerrequests);

module.exports = router;
