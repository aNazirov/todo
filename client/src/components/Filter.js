import React from 'react'

import {useForm} from "react-hook-form"

const Filter = ({params, getAll}) => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm()
    const onReset = () => reset()
    const onSubmit = ({id, username, email, status, asc}) => {
        params.current.sort_field = {}
        if (id) params.current.sort_field.id = id
        if (username) params.current.sort_field.username = username
        if (email) params.current.sort_field.email = email
        if (status) params.current.sort_field.status = status
        params.current.sort_direction = asc
        getAll(params.current)
    }
    return (
        <form
            className='row'
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="input-field col s1">
                <input
                    type="text"
                    className={`${errors.text ? 'invalid' : ''}`}
                    {
                        ...register('id')
                    }
                />
                <label>Id</label>
            </div>
            <div className="input-field col s3">
                <input
                    type="text"
                    className={`${errors.text ? 'invalid' : ''}`}
                    {
                        ...register('username')
                    }
                />
                <label>Имя пользователя</label>
            </div>
            <div className="input-field col s3">
                <input
                    type="text"
                    className={`${errors.email ? 'invalid' : ''}`}
                    {
                        ...register('email',
                            {
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Неправильный адрес электронной почты'
                                }
                            })}
                />
                <label>Email</label>
                {errors.email ? <span className="helper-text red-text">{errors.email.message}</span> : null}
            </div>
            <div className="input-field col s3">
                <select
                    defaultValue=''
                    className='browser-default'
                    {...register(
                        'status',
                    )}
                >
                    <option value=""></option>
                    <option value="0">Задача не выполнена</option>
                    <option value="1">задача не выполнена, отредактирована админом</option>
                    <option value="10">Задача выполнена</option>
                    <option value="11">задача отредактирована админом и выполнена</option>
                </select>
            </div>
            <div className="input-field col s2">
                <select
                    defaultValue='0'
                    className='browser-default'
                    {...register(
                        'asc',
                    )}
                >
                    <option value="1">По возростанию</option>
                    <option value="-1">По убыванию</option>
                </select>
            </div>
            <button
                type="submit"
                className="modal-action btn waves-effect right-align right"
            >
                Сортировать
            </button>
            <button
                type="button"
                className="modal-action waves-effect waves-black btn-flat right-align right"
                onClick={onReset}
            >
                Очистить
            </button>
        </form>
    )
}

export default Filter

