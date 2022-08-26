const router = require('express').Router();
const { check } = require('express-validator');

//import Controllers:
const {
	register
} = require('../controllers/auth_controllers');
//Import middlewares:
const validarCampos = require('../middlewares/validar_campos');
const { emailExists } = require('../helpers/email_exist_validator');

/* Register new user endpoint */
router.post('/register', [
	check('firstName', 'El nombre es obligatorio y debe ser un string.').not().isEmpty().isString(),
	check('lastName', 'El apellido es obligatorio.').not().isEmpty(),
	check('email', 'El correo no es valido.').isEmail().custom(emailExists),
	check('password', 'El password debe ser de mas de 6 caracteres.').isLength({ min: 6 }),
	validarCampos
], register);

//Endpoint Login
router.post('/login', login)

module.exports = router;