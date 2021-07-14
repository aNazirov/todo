import instance from "../../axios/instance";
import {CREATE_TODO_SUCCESS, GET_TODOS_ERROR, GET_TODOS_SUCCESS, SET_TODO, START_LOADING} from "./actionTypes";

export function start_loading() {
    return {
        type: START_LOADING
    }
}

export function set_todo(todo) {
    return {
        type: SET_TODO,
        todo
    }
}

export function get_success(tasks, task_count) {
    return {
        type: GET_TODOS_SUCCESS,
        tasks, task_count
    }
}

export function get_error() {
    return {
        type: GET_TODOS_ERROR
    }
}

export function create_todo_success() {
    return {
        type: CREATE_TODO_SUCCESS
    }
}

export function edit_todo_success() {
    return {
        type: CREATE_TODO_SUCCESS
    }
}

export function get_todos(params) {
    return async dispatch => {
        dispatch(start_loading())
        try {
            const res = await instance.get('/', {params})
            dispatch(get_success(res.data.message.tasks, res.data.message.total_task_count))
        } catch (e) {
            dispatch(get_error())
            return e.response?.data || e
        }
    }
}

export function create_todo(todo) {
    return async dispatch => {
        const fd = new FormData()
        fd.append('username', todo.username)
        fd.append('email', todo.email)
        fd.append('text', todo.text)
        try {
            await instance.post('/create', fd)
            dispatch(create_todo_success())
        } catch (e) {
            return e.response?.data || e
        }
    }
}

export function edit_todo(update, id) {
    return async (dispatch, getState)=> {
        const {token} = getState().auth
        const fd = new FormData()
        fd.append('status', update.status)
        if (update.text) fd.append('text', update.text)
        try {
            await instance.patch(`/edit/${id}`, fd, {
                headers: {
                    Authorization: token
                }
            })
            dispatch(edit_todo_success())
        } catch (e) {
            return e.response?.data || e
        }
    }
}