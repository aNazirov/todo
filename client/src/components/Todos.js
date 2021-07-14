import React, {useCallback, useEffect, useRef, useState} from 'react'
import Todo from "./Todo";
import Pagination from '@material-ui/lab/Pagination'
import Loader from '@material-ui/core/CircularProgress'
import {useDispatch, useSelector} from "react-redux";
import {get_todos, set_todo} from "../redux/actions/todo";
import {modalInit, toast} from "../services/materialize.service";
import Edit from "./Modal/Edit";
import Filter from "./Filter";

function Todos() {
    const editRef = useRef()
    const [edit_modal, set_edit_modal] = useState(null)
    const params = useRef({
        developer: 'aNazirov',
        limit: 3,
        page: 0
    })
    const onClose = (modal) => () => modal?.close()
    const onOpen = (modal) => () => modal?.open()
    const dispatch = useDispatch()
    const setTodo = useCallback((todo) => dispatch(set_todo(todo)),[dispatch])
    const getAll = useCallback((params) => {
        return dispatch(get_todos(params))
            .then(e => {
                if (e) return toast(e.message)
            })
    }, [dispatch])
    const tasks = useSelector((state) => state.todo.tasks)
    const loading = useSelector((state) => state.todo.loading)
    const update = useSelector((state) => state.todo.update)
    const task_count = useSelector(state => state.todo.task_count)
    const onChangePage = (e, page) => {
        params.current.page = page - 1
        getAll(params.current)
    }
    useEffect(() => {
        if (!edit_modal && editRef.current) {
            const edit = modalInit(editRef.current, {onCloseEnd: () => setTodo({})})
            set_edit_modal(edit)
        }
    }, [setTodo, edit_modal])
    useEffect(() => getAll(params.current), [params, update, getAll])

    const Tasks = () => {
            return (
                loading
                    ? <Loader color="secondary"/>
                    : tasks.length && !loading
                        ? tasks.map(task => {
                            return <Todo task={task} key={task._id} onOpen={onOpen(edit_modal)} setTodo={setTodo}/>
                        })
                        : <span className="center-align">Позиции категории пусты.</span>
    )
        }
    return (
            <div className='row'>
                <div className='col s8' style={{float: 'none', margin: '0.5rem auto'}}>
                    <Filter
                        params={params}
                        getAll={getAll}
                    />
                </div>
                <div className='col s8 collection center-align' style={{float: 'none', margin: '0.5rem auto'}}>
                    <Tasks />
                </div>
                <div className='col s4' style={{float: 'none', margin: '0.5rem auto'}}>
                    <Pagination
                        onChange={onChangePage}
                        count={Math.ceil(task_count / 3)}
                        defaultPage={1}
                        color="primary"
                    />
                </div>
                <Edit innerRef={editRef} onClose={onClose(edit_modal)}/>
            </div>
    )
}

export default Todos
