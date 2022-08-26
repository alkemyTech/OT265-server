const router = require('express').Router();

//import Controllers:
const { getAllOrganizations, postOrganization } = require("../controllers/organization_controllers")

/* Get all categories endpoint */
router.get('/public', getAllOrganizations);




module.exports = router