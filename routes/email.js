const express = require('express')
const contactController = require('../controllers/contact_controller')

const router = express.Router()


router.post('/', contactController)





module.exports = router