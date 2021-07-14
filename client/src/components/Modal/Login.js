import React from 'react';

import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {login} from "../../redux/actions/auth";
import {toast} from "../../services/materialize.service";

const Login = ({innerRef, onClose}) => {
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const onCancel = () => {
        reset()
        onClose()
    }
    const onSubmit = data => {
        const login_ = () => dispatch(login(data))
        login_()
            .then(e => {
                if (e) return toast(e.message)
                toast('Вы успешно авторизовались')
                onClose()
            })
    }
    return (
            <form
                ref={innerRef}
                className="modal"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="modal-content">
                    <h4 className="mb1">Войти</h4>
                    <div className="input-field">
                        <input
                            type="text"
                            className={`${errors.username ? 'invalid' : ''}`}
                            {
                                ...register(
                                    'username',
                                    {required: 'Поле является обязательным для заполнения'}
                                )
                            }
                        />
                        <label htmlFor="name"> Имя пользователя </label>
                        { errors.username ? <span className="helper-text red-text">{errors.username.message}</span> : null}
                    </div>
                    <div className="input-field">
                        <input
                            type="text"
                            className={`${errors.password ? 'invalid' : ''}`}
                            {
                                ...register(
                                    'password',
                                    {required: 'Поле является обязательным для заполнения'}
                                )
                            }
                        />
                        <label htmlFor="cost" > Пароль </label>
                        { errors.password ? <span className="helper-text red-text">{errors.password.message}</span> : null}
                    </div>
                </div>
                <div className="modal-footer">
                    <button
                        type="button"
                        className="modal-action waves-effect waves-black btn-flat"
                        onClick={onCancel}
                    >
                        Отмена
                    </button>
                    <button
                        type="submit"
                        className="modal-action btn waves-effect"
                    >
                        Войти
                    </button>
                </div>
            </form>
    )
}

export default Login

