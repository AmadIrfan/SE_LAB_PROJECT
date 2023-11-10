const express = require('express');
const router = express.Router();
const productAdminController = require('../../controller/Admin/getproductAdmin');

router.get('/', productAdminController.getAdminProducts);

module.exports = router;
