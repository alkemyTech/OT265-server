var express = require('express');
var router = express.Router();
const isAuthenticated = require('../middlewares/isAuthenticated');
const { get } = require('../controllers/member_controllers');
const { isAdmin } = require('../middlewares/isAdmin');

router.get('/', [
  isAuthenticated,
  isAdmin
], get);

module.exports = router;