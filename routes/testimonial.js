var express = require('express');
var router = express.Router();
const { check } = require("express-validator");
const { query } = require('express-validator/check')
const validarCampos = require("../middlewares/validar_campos");
const {
    getAllTestimonials,
    getTestimonialById,
    postTestimonial,
    putTestimonial,
    deleteTestimonial
} = require('../controllers/testimonial_controllers');
const isAuthenticated = require('../middlewares/isAuthenticated');
const { isAdmin } = require('../middlewares/isAdmin');
/* GET home page. */
router.get('/', [
    query("page", "The page must be type number and positive").optional().isInt({ min: 1 }),
    validarCampos,
], getAllTestimonials);

router.post('/', [
    isAuthenticated,
    isAdmin,
    check("name", "The name field must not be empty.").not().isEmpty(),
    check("name", "The name field must be type string.").isString(),
    check("content", "The content field must not be empty.").not().isEmpty(),
    check("content", "The content field must be type string.").isString(),
    validarCampos,
], postTestimonial);

router.put('/:id', [isAuthenticated, isAdmin], putTestimonial);

router.delete('/:id', [isAuthenticated, isAdmin], deleteTestimonial);

module.exports = router;