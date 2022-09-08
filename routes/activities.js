var express = require("express");
var router = express.Router();
const { check } = require("express-validator");

const { isAdmin } = require("../middlewares/isAdmin");
const isAuthenticated = require("../middlewares/isAuthenticated");
const validarCampos = require("../middlewares/validar_campos");
const ActivityControllers = require("../controllers/activity_controllers");

router.post(
  "/",
  [
    isAuthenticated,
    isAdmin,
    check("name", "The name must not be empty.").not().isEmpty(),
    check("name", "The name must be type string.").isString(),
    check("content", "The content must not be empty.").not().isEmpty(),
    check("content", "The content must be type string.").isString(),
    validarCampos,
  ],
  ActivityControllers.create
);

router.put("/:id", [isAuthenticated, isAdmin], ActivityControllers.update);

module.exports = router;
