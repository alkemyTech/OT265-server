const router = require('express').Router();


//import Controllers:
const contactController = require('../controllers/contact_controller');

//Import middlewares:
const {isAdmin} = require("../middlewares/isAdmin")
const isAuthenticated = require("../middlewares/isAuthenticated");


/* GET all contacts table*/
router.get("/contacts", [isAuthenticated, isAdmin], contactController.getTable)

module.exports = router;