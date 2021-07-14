const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    id: {
      type: Number,
      required: true
    },
    username: {
        type: String,
        required: 'Поле является обязательным для заполнения'
    },
    email: {
        type: String,
        required: 'Поле является обязательным для заполнения',
        validate: [
            {
                validator(value) {
                    return /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value);
                },
                message: 'Неверный email'
            }
        ]
    },
    text: {
        type: String,
        required: 'Поле является обязательным для заполнения'
    },
    status: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('todos', todoSchema)