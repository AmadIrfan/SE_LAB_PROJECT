const express = require('express');
const router = express.Router();
const multer = require('multer');
const productController = require('../../controller/Admin/AdminAddProduct');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/', upload.single('images'), productController.addProduct)

module.exports = router;
