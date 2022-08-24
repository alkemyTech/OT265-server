const express = require('express')
const router = express.Router()

const {registerLogin, registerCtrl} = require('../controllers/auth')

//login de usuario
router.post('/login', registerLogin)

//Registrar un usuario
router.post('/register', registerCtrl)


module.exports = router 