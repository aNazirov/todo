const Todo = require('../models/Todo')
const errorHandler = require('../utils/errorHandler')
const errorMessage = require('../utils/errorMessage')

module.exports.getAll = async (req, res) => {
    let {developer, page, limit, sort_direction, sort_field} = req.query
    if (!developer) return errorHandler(res, {message: 'Не передано имя разработчика'}, 409)
    sort_field = req.query.sort_field ? JSON.parse(req.query.sort_field) : {}
    let [query, count] = [{...sort_field}, 0]
    try {
        if (!Object.keys(query).length) count = await Todo.countDocuments()
        if (Object.keys(query).length) {
            const todo = await Todo.find(query)
            if (todo.length < 3) page = 0
            count = todo.length
        }
        const todos = await Todo
            .find(query)
            .sort({date: +sort_direction})
            .skip(+page * +limit)
            .limit(+limit)
        res.status(200).json({
            status: 'ok',
            message: {
                tasks: todos,
                total_task_count: count ? count : todos.length
            }
        })
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.create = async (req, res) => {
    const {username, email, text} = req.body
    try {
        const count = await Todo.countDocuments()
        const todo = await Todo.create({
            id: count + 1,
            username, email, text
        })
        res.status(201).json({
            status: 'ok',
            message: todo
        })
    } catch (e) {
        let errors = e
        if (e.errors) errors = errorMessage(e.errors)
        errorHandler(res, errors, 409)
    }
}
module.exports.edit = async (req, res) => {
    const update = {
        status: +req.body.status
    }
    if (req.body.text) {
        if (update.status === 0) update.status = 1
        if (update.status === 10) update.status = 11
        update.text = req.body.text
    }
    try {
        const todo = await Todo.findOneAndUpdate(
            {_id: req.params.id},
            {$set: update},
            {new: true, runValidators: true}
        )
        res.status(200).json({
            status: 'ok',
            message: todo
        })
    } catch (e) {
        let errors = e
        if (e.errors) errors = errorMessage(e.errors)
        errorHandler(res, errors, 409)
    }
}