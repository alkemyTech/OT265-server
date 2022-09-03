var express = require("express");
var router = express.Router();
const Comment = require('../controllers/comment_controllers');
const { isAdmin } = require("../middlewares/isAdmin");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/", [
    isAuthenticated,
    isAdmin
], Comment.get);

module.exports = router;
