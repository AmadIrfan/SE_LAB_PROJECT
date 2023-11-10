const express = require('express');
const router = express.Router();
const productAdminDelController = require('../../controller/Admin/AdminDelProduct');

router.delete('/', productAdminDelController.deleteProduct);

module.exports = router;