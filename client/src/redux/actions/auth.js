import {LOGIN, LOGOUT} from "./actionTypes";
import instance from "../../axios/instance";

export function login_success(token) {
    return {
        type: LOGIN,
        token
    }
}

export function login(user) {
    return async dispatch => {
        const fd = new FormData()
        fd.append('username', user.username)
        fd.append('password', user.password)
        try {
            const res = await instance.post('/login', fd)
            localStorage.setItem('auth-token', res.data.token)
            dispatch(login_success(res.data.token))
        } catch (e) {
            return e.response?.data || e
        }
    }
}

export function logout() {
    localStorage.removeItem('auth-token')
    localStorage.removeItem('expiresIn')
    return {
        type: LOGOUT
    }
}
