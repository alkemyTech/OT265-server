var express = require('express');
var router = express.Router();

const { isAdmin } = require('../middlewares/isAdmin');
const isAuthenticated = require('../middlewares/isAuthenticated');
const ActivityControllers = require('../controllers/activity_controllers');

router.put('/:id', [
    isAuthenticated,
    isAdmin
], ActivityControllers.update);

module.exports = router;
