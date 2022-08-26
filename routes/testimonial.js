var express = require('express');
var router = express.Router();
const { check } = require("express-validator");
const validarCampos = require("../middlewares/validar_campos");
const {
    getAllTestimonials,
    getTestimonialById,
    postTestimonial,
    putTestimonial,
    deleteTestimonial
} = require('../controllers/testimonial_controllers');
/* GET home page. */
router.get('/', getAllTestimonials);

router.post('/', [
    check("name", "The name field must not be empty.").not().isEmpty(),
    check("name", "The name field must be type string.").isString(),
    check("content", "The content field must not be empty.").not().isEmpty(),
    check("content", "The content field must be type string.").isString(),
    validarCampos,
], postTestimonial);

router.put('/:id', putTestimonial);

router.delete('/:id',);

module.exports = router;