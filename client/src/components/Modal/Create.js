import React from 'react';

import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {toast} from "../../services/materialize.service";
import {create_todo} from "../../redux/actions/todo";

const Create = ({innerRef, onClose}) => {
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const onCancel = () => {
        reset()
        onClose()
    }
    const onSubmit = data => {
        const create_ = () => dispatch(create_todo(data))
        create_()
            .then(e => {
                if (e) return toast(e.message || 'Что то пошло не так')
                toast('Задача успешно создана')
                reset()
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
                <h4 className="mb1">Создать</h4>
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
                        className={`${errors.email ? 'invalid' : ''}`}
                        {
                            ...register(
                                'email',
                                {
                                    required: 'Поле является обязательным для заполнения',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Неправильный адрес электронной почты'
                                    }
                                }
                            )
                        }
                    />
                    <label htmlFor="cost" > Email </label>
                    { errors.email ? <span className="helper-text red-text">{errors.email.message}</span> : null}
                </div>
                <div className="input-field">
                    <input
                        type="text"
                        className={`${errors.text ? 'invalid' : ''}`}
                        {
                            ...register(
                                'text',
                                { required: 'Поле является обязательным для заполнения' }
                            )
                        }
                    />
                    <label htmlFor="cost" > Текст задачи </label>
                    { errors.text ? <span className="helper-text red-text">{errors.text.message}</span> : null}
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
                    Создать
                </button>
            </div>
        </form>
    )
}

export default Create

