var express = require('express');
var router = express.Router();
const { verifyFile } = require('../middlewares/verifyFile')
const { uploadImage } = require('../controllers/images_controllers');

router.post('/', verifyFile, uploadImage);

module.exports = router;