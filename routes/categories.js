const router = require('express').Router();
const { check } = require('express-validator');

//import Controllers:
const validarCampos = require('../middlewares/validar_campos');

//Import middlewares:
const  CategoryController  = require("../controllers/category_controllers")


/* Get all categories endpoint */
router.get('/', CategoryController.get);



module.exports = router 