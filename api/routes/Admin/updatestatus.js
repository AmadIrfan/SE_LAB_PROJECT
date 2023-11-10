const express = require('express');
const router = express.Router();
const productAdminController = require('../../controller/Admin/AdminUpdateProduct');

router.put('/', productAdminController.updateProductStatus);

module.exports = router;
