const router = require('express').Router();
const { check } = require("express-validator");

//import Controllers:
const { getAllOrganizations, putOrganization, } = require("../controllers/organization_controllers")

//import Middlewares:
const isAuthenticated = require("../middlewares/isAuthenticated")
const { isAdmin } = require("../middlewares/isAdmin");
const validarCampos = require('../middlewares/validar_campos');

/* Get all categories endpoint */
router.get('/public', getAllOrganizations);

router.put("/public", [isAuthenticated, isAdmin,
    check("name", "name must be a string.").optional().isString(),
    check("image", "image must be a valid URL.").optional().isURL(),
    check("address", "address must be a string.").optional().isString(),
    check("phone", "phone must be a string.").optional().isString(),
    check("email", "email must be a valid email.").optional().isEmail(),
    check("welcomeText", "welcomText must be a string.").optional().isString(),
    check("aboutUsText", "aboutUsText must be a string.").optional().isString(),
    check("facebook", "facebook must be a valid URL.").optional().isURL(),
    check("linkedin", "linkedin must be a valid URL.").optional().isURL(),
    check("instagram", "instagram must be a valid URL.").optional().isURL(),
    validarCampos,
], putOrganization);


module.exports = router