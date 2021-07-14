const express = require('express')
const passport = require('passport')
const controller = require('../constrollers/todo')
const router = express.Router()

router.get('/', controller.getAll)
router.post('/create', controller.create)
router.patch('/edit/:id', passport.authenticate('jwt', {session: false}), controller.edit)

module.exports = router