const router = require('express').Router();

//-------------------Middlewares----------------------//

const { isAdmin } = require('../middlewares/isAdmin');
const isAuthenticated = require('../middlewares/isAuthenticated');

//-------------------Controllers----------------------//
const { deleteSlide } = require('../controllers/slides_controllers');

router.delete('/:id', [
    isAuthenticated,
    isAdmin
], deleteSlide);




module.exports = router;