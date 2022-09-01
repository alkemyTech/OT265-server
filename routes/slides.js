const router = require('express').Router();

const { slideDetails } = require('../controllers/slide_controllers');

router.get('/:id', slideDetails);

module.exports = router;