const router = require('express').Router();

const { slideDetails, create_slide } = require('../controllers/slide_controllers');

router.get('/:id', slideDetails);

router.post('/', create_slide);

module.exports = router;