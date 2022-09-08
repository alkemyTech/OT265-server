const router = require('express').Router();

//-------------------Middlewares----------------------//

const { isAdmin } = require('../middlewares/isAdmin');
const isAuthenticated = require('../middlewares/isAuthenticated');

//-------------------Controllers----------------------//
const { listarSlides, deleteSlide, slideDetails } = require('../controllers/slides_controllers');



router.delete('/:id', [
    isAuthenticated,
    isAdmin
], deleteSlide);




router.get('/', [
    isAuthenticated,
    isAdmin
], listarSlides);


router.get('/:id', slideDetails);



module.exports = router;