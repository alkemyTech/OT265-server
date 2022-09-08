var express = require('express');
var router = express.Router();
const member = require('../controllers/member_controllers');
const { check } = require("express-validator");
const { query } = require('express-validator/check');
const validarCampos = require("../middlewares/validar_campos");
const isAuthenticated = require('../middlewares/isAuthenticated');
const { isAdmin } = require('../middlewares/isAdmin');

router.get('/', [
    isAuthenticated, 
    isAdmin,
    query("page", "The page must be type number and positive").optional().isInt({ min: 1 }),
    validarCampos,
], member.get);

router.post('/', [
    isAuthenticated,
    isAdmin,
    check("name", "The name must not be empty.").not().isEmpty(),
    check("name", "The name must be type string.").isString(),
    validarCampos,
], member.create);

router.delete('/:id', [isAuthenticated, isAdmin], member.delete);

router.put('/:id', [isAuthenticated, isAdmin], member.update);


module.exports = router;
