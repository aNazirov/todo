const express = require('express')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')
const morgan = require('morgan')
const multer = require('multer')
const passport = require('passport')
const bodyParser = require('body-parser')
const keys = require('./config/keys')
const authRouter = require('./routes/auth')
const todoRouter = require('./routes/todo')

const app = express()
const forms = multer()

function mongoConnect() {
    mongoose.connect(keys.mongoURI, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false})
        .then(() => console.log(`mongoDB connected`))
        .catch(err => {
            console.log(`Server error ${err.message}`)
            process.exit(1)
        })
}
mongoConnect()

app.use(passport.initialize())
require('./middleware/passport')(passport)
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(forms.array())
app.use(cors())

app.use('/shapoval/test-task-backend/v2', authRouter)
app.use('/shapoval/test-task-backend/v2', todoRouter)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, './client/build')))

    app.get('*', (req, res) => {
        res.sendFile(
            path.join(
                __dirname, 'client', 'build', 'index.html'
            )
        )
    })
}

module.exports = app