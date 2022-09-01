var express = require('express');
var router = express.Router();
const isAuthenticated = require('../middlewares/isAuthenticated');
const { getAllUsers, deleteUser } = require('../controllers/user_controllers');
const { isOwnership } = require('../controllers/isOwnership')
const { isAdmin } = require('../middlewares/isAdmin');

router.get('/', [
  isAuthenticated,
  isAdmin
], getAllUsers);

router.delete('/:id', [
  isAuthenticated,
  isOwnership,
], deleteUser)

module.exports = router;
