const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async (req, res) => {
    const {username, password} = req.body
    const candidate = await User.findOne({username})
    if (!candidate) return errorHandler(res, {message: 'Пользователя с таким именем не существует'}, 401)
    const passwordResult = bcryptjs.compareSync(password, candidate.password)
    if (!passwordResult) return errorHandler(res, {message: 'Пароли не совпадают. Попробуйте снова.'}, 401)
    const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id
    }, keys.jwt, {expiresIn: keys.expiresIn})

    res.status(200).json({
        token: `Bearer ${token}`
    })
}
module.exports.register = async (req, res) => {
    const {username, password} = req.body
    const candidate = await User.findOne({username})

    if (candidate) return errorHandler(res, {message: 'Пользователь с таким именем уже существует'}, 409)
    const salt = bcryptjs.genSaltSync(10)
    try {
        const user = await User.create({
            username,
            password: bcryptjs.hashSync(password, salt)
        })
        res.status(201).json({
            status: 'ok',
            message: { username: user.username, admin: user.admin}
        })
    } catch (e) {
        errorHandler(res, e)
    }


}