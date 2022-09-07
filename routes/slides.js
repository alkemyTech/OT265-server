const router = require('express').Router();

const { slideDetails, create_slide } = require('../controllers/slide_controllers');
const { decodeBase64Image } = require('../helpers/image-helpers');

router.get('/:id', slideDetails);

router.post('/', decodeBase64Image, create_slide);

module.exports = router;