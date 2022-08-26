var express = require('express');
var router = express.Router();
const isAuthenticated = require('../middlewares/isAuthenticated');
const { getAllUsers } = require('../controllers/user_controllers');
const { isAdmin } = require('../middlewares/isAdmin');

router.get('/', [
  isAuthenticated,
  isAdmin
], getAllUsers);

module.exports = router;
