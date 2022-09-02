const router = require('express').Router();
const { check } = require('express-validator');

//import Controllers:
const contactController = require('../controllers/contact_controller');

//Import middlewares:
const validarCampos = require("../middlewares/validar_campos");

/* Post new contact */
router.post('/',
    [
        check("name", "El nombre es obligatorio y debe ser un string.")
            .not()
            .isEmpty()
            .isString(),
        check("email", "El email es obligatorio.").not().isEmpty().isEmail(),
        check('phone', 'El teléfono debe ser un string.')
            .optional()
            .isString(),
        check('message', 'El mensaje debe ser un string.')
            .optional()
            .isString(),
        validarCampos,
    ], contactController.new);

module.exports = router;