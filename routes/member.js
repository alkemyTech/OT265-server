var express = require('express');
var router = express.Router();
const member = require('../controllers/member_controllers');

router.get('/', member.create);


module.exports = router;