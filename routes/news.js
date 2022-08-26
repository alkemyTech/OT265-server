var express = require("express");
var router = express.Router();
const { check } = require("express-validator");

const { isAdmin } = require("../middlewares/isAdmin");
const isAuthenticated = require("../middlewares/isAuthenticated");
const validarCampos = require("../middlewares/validar_campos");
const { getNewById } = require("../controllers/news_controllers");

router.get('/:id', [
    isAuthenticated,
    isAdmin
], getNewById)

module.exports = router;