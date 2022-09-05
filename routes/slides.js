const router = require('express').Router();

//-------------------Middlewares----------------------//

const { isAdmin } = require('../middlewares/isAdmin');
const isAuthenticated = require('../middlewares/isAuthenticated');

//-------------------Controllers----------------------//
const { editSlide } = require('../controllers/slides_controllers');

router.put('/:id', [
    isAuthenticated,
    isAdmin
], editSlide);




module.exports = router;