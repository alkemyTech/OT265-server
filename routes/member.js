var express = require('express');
var router = express.Router();
const member = require('../controllers/member_controllers');
const { check } = require("express-validator");
const validarCampos = require("../middlewares/validar_campos");

router.get('/', member.get);

router.post('/', [
    check("name", "The name must not be empty.").not().isEmpty(),
    check("name", "The name must be type string.").isString(),
    validarCampos,
], member.create);

router.delete('/:id',

    member.delete);

module.exports = router;


