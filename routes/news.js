var express = require("express");
var router = express.Router();
const { check } = require("express-validator");

const { isAdmin } = require("../middlewares/isAdmin");
const isAuthenticated = require("../middlewares/isAuthenticated");
const validarCampos = require("../middlewares/validar_campos");
const { getNewById, postNews, putNews, deleteNews } = require("../controllers/newsControllers");
const { checkImage } = require("../middlewares/checkImage");

router.get("/:id", [
    isAuthenticated,
    isAdmin
], getNewById)

router.post("/", [
    isAuthenticated,
    isAdmin,
    check("name", "The name must not be empty.").not().isEmpty(),
    check("name", "The name must be type string.").isString(),
    check("content", "The content must not be empty.").not().isEmpty(),
    check("content", "The content must be type string.").isString(),
    check("categoryId", "The category id is required.").not().isEmpty(),
    validarCampos,
    checkImage,
], postNews)

router.put("/:id", [
    isAuthenticated,
    isAdmin
], putNews)

router.delete("/:id", [
    isAuthenticated,
    isAdmin
], deleteNews)

module.exports = router;