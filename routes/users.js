var express = require('express');
var router = express.Router();
const isAuthenticated = require('../middlewares/isAuthenticated');
// const { getAllUsers, putUser } = require('../controllers/user_controllers');
const { isOwnership } = require('../controllers/isOwnership');
const { getAllUsers, putUser, deleteUser } = require('../controllers/user_controllers');
const { isAdmin } = require('../middlewares/isAdmin');
const { body } = require('express-validator');
const validarCampos = require('../middlewares/validar_campos');

router.get('/', [
  isAuthenticated,
  isAdmin
], getAllUsers);

router.patch('/:id', [
  isAuthenticated,
  isOwnership,
  body('firstName', 'El nombre no debe contener numeros').isString().optional(),
  body('lastName', 'El apellido no debe contener numeros').isString().optional(),
  body('password', 'El password debe ser de mas de 6 caracteres.').isLength({ min: 6 }).optional(),
  validarCampos
], putUser)

router.delete('/:id', [
  isAuthenticated,
  isOwnership,
], deleteUser)


module.exports = router;
