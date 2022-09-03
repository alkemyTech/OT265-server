var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const Comment = require("../controllers/comment_controllers");
const { isAdmin } = require("../middlewares/isAdmin");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/", [
    isAuthenticated,
    isAdmin
], Comment.get);

router.post("/", [
    isAuthenticated,
    check('body', 'You cannot post an empty comment.').not().isEmpty(),
    check('post_id', 'You must send a post ID.').not().isEmpty,
    check('user_id', 'You must send a user ID.').not().isEmpty,
], Comment.create)

router.put("/:comment_id", [
    isAuthenticated
], Comment.update)

router.delete("/:comment_id", [
    isAuthenticated
], Comment.delete)

module.exports = router;
