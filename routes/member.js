var express = require('express');
var router = express.Router();
const member = require('../controllers/member_controllers');
const { check } = require("express-validator");
const { query } = require('express-validator/check');
const validarCampos = require("../middlewares/validar_campos");

router.get('/', [
    query("page", "The page must be type number and positive").optional().isInt({ min: 1 }),
    validarCampos,
], member.get);

router.post('/', [
    check("name", "The name must not be empty.").not().isEmpty(),
    check("name", "The name must be type string.").isString(),
    validarCampos,
], member.create);

router.delete('/:id', member.delete);

router.put('/:id', member.update);
module.exports = router;


