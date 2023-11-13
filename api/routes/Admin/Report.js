const express = require('express');
const router = express.Router();
const ReportController = require('../../controller/Admin/report');

router.get('/', ReportController.getreport);

module.exports = router;
