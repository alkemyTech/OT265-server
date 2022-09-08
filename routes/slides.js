const router = require('express').Router();

//-------------------Middlewares----------------------//
const { isAdmin } = require('../middlewares/isAdmin');
const isAuthenticated = require('../middlewares/isAuthenticated');

//-------------------Controllers----------------------//
const { listarSlides } = require('../controllers/slides_controllers');

router.get('/', [
    isAuthenticated,
    isAdmin
], listarSlides);


const { slideDetails } = require('../controllers/slide_controllers');

router.get('/:id', slideDetails);


module.exports = router;