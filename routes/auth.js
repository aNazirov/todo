const express = require('express')
const controller = require('../constrollers/auth')
const router = express.Router()


router.post('/login', controller.login)
router.post('/register', controller.register)

module.exports = router