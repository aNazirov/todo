const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: 'Поле является обязательным для заполнения',
        unique: 'Такое имя пользователя уже существует'
    },
    password: {
        type: String,
        required: 'Поле является обязательным для заполнения'
    },
    admin: {
        type: Boolean,
        default: false
    }
})
module.exports = mongoose.model('users', userSchema)