import {
    CREATE_TODO_SUCCESS, EDIT_TODO_SUCCESS,
    GET_TODOS_ERROR,
    GET_TODOS_SUCCESS, SET_TODO,
    START_LOADING
} from "../actions/actionTypes";

const initialState = {
    update: false,
    loading: true,
    tasks: [],
    task_count: 0,
    task: {}
}
export default function todoReducer(state = initialState, action) {
    switch (action.type) {
        case START_LOADING:
            return {
                ...state,
                loading: true
            }
        case SET_TODO:
            return {
                ...state,
                task: action.todo
            }
        case GET_TODOS_SUCCESS:
            return {
                ...state,
                tasks: action.tasks,
                task_count: action.task_count,
                loading: false,
                update: false
            }
        case GET_TODOS_ERROR:
            return {
                ...state,
                loading: false
            }
        case CREATE_TODO_SUCCESS:
            return {
                ...state,
                tasks: [],
                task_count: state.task_count + 1,
                loading: false,
                update: true
            }
            case EDIT_TODO_SUCCESS:
            return {
                ...state,
                tasks: [],
                loading: false,
                update: true
            }
        default:
            return state
    }
}