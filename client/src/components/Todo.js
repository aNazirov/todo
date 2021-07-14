import React from 'react'
import {useSelector} from "react-redux";
import {withRouter} from 'react-router-dom'

function Todo({task, location, onOpen, setTodo}) {
    const token = useSelector((state => state.auth.token))
    const status = () => {
        if (task.status === 0) return 'задача не выполнена'
        if (task.status === 1) return 'задача не выполнена, отредактирована админом'
        if (task.status === 10) return 'задача выполнена'
        if (task.status === 11) return 'задача отредактирована админом и выполнена'
    }
    const onEdit = () => {
        setTodo(task)
        onOpen()
    }
    const openIn = () => {
        return (
            token
                ? <span className='col s1 right-align right teal-text text-lighten-2' onClick={onEdit} style={{cursor: 'pointer'}}>
                        <i className="material-icons">open_in_new</i>
                    </span>
                : <span className='col s1 right-align right teal-text text-lighten-2'></span>
        )
    }
    return (
        <a
            href={location.href}
            className="collection-item row black-text text-black-50 w-75"
        >
            <span className='col s2 '>
                {task.username}
            </span>
            <span className='col s2'>
                {task.email}
            </span>
            <span className='col s5'>
                {task.text}
            </span>
            <span className='col s2 right-align'>
                {status()}
            </span>
            {openIn()}
        </a>
    )
}

export default withRouter(Todo)
