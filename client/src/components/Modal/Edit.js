import React, {useEffect} from 'react'

import {useForm} from "react-hook-form"
import {useDispatch, useSelector} from "react-redux"
import {toast, updateFields} from "../../services/materialize.service"
import {edit_todo} from "../../redux/actions/todo"

const Edit = ({innerRef, onClose}) => {
    const dispatch = useDispatch()
    const task = useSelector(state => state.todo.task)
    const {register, handleSubmit, formState: {errors}, reset} = useForm()
    const onCancel = () => {
        reset()
        onClose()
    }
    const onSubmit = values => {
        const data = {
            status: values.status
        }
        if (values.text !== task.text) data.text = values.text
        const edit_ = () => dispatch(edit_todo(data, task._id))
        edit_()
            .then(e => {
                if (e) return toast(e.message || 'Истек токен')
                toast('Задача успешно изменена')
                onClose()
            })
    }
    useEffect(() => updateFields())
    return (
        <form
            ref={innerRef}
            className="modal"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="modal-content">
                <h4 className="mb1">Изменить</h4>
                <div className="input-field">
                    <input
                        defaultValue={task.text}
                        type="text"
                        className={`${errors.text ? 'invalid' : ''}`}
                        {
                            ...register('text',
                            {
                                required: 'Поле является обязательным для заполнения'
                            })}
                    />
                    <label> Текст задачи </label>
                    {errors.text ? <span className="helper-text red-text">{errors.text.message}</span> : null}
                </div>
                <div className="input-field">
                    <select
                        defaultValue={task.status === 1 ? 0 : 10}
                        className='browser-default'
                        {...register(
                            'status',
                            {required: 'Поле является обязательным для заполнения'}
                        )}
                    >
                        <option value="0">Задача не выполнена</option>
                        <option value="10">Задача выполнена</option>
                    </select>

                    {errors.status ? <span className="helper-text red-text">{errors.status.message}</span> : null}
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
                    Изменить
                </button>
            </div>
        </form>
    )
}

export default Edit

