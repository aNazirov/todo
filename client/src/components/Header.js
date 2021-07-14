import React, {useEffect, useRef, useState} from 'react'
import {withRouter} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import Login from "./Modal/Login";
import {modalInit} from "../services/materialize.service";
import {logout} from "../redux/actions/auth";
import Create from "./Modal/Create";

function Header(props) {
    const loginRef = useRef(null)
    const createRef = useRef(null)
    const [login_modal, set_login_modal] = useState()
    const [create_modal, set_create_modal] = useState()
    const onClose = (modal) => () => modal?.close()
    const onOpen = (modal) => () => modal?.open()
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)

    useEffect(() => {
        if((!login_modal && !create_modal) && (loginRef.current && createRef.current)){
            const [login, create] = [modalInit(loginRef.current), modalInit(createRef.current)]
            set_login_modal(login)
            set_create_modal(create)
        }
        return () => {
            login_modal?.destroy()
            create_modal?.destroy()
        }
    }, [login_modal, create_modal])
    const Log = () => (
        token
            ? <li><a href={props.location.href} onClick={() => dispatch(logout())}>Выйти</a></li>
            : <li><a href={props.location.href} onClick={onOpen(login_modal)}>Войти</a></li>)
    return (
        <header>
            <nav>
                <div className="nav-wrapper teal lighten-2">
                    <a href={props.location.href} className="brand-logo">Todo List</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href={props.location.href} onClick={onOpen(create_modal)}>Создать</a></li>
                        {Log()}
                    </ul>
                </div>
            </nav>
            <Login
                innerRef={loginRef}
                onClose={onClose(login_modal)}
            />
            <Create
                innerRef={createRef}
                onClose={onClose(create_modal)}
            />
        </header>
    )
}

export default withRouter(Header)
