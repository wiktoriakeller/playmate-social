import React, { useState } from 'react';

import {  useAppDispatch } from '../../app/hooks';
import styles from './Todos.module.css';

import {ITodo} from "../../types";
import {updateTodos} from "./todosSlice";

export function Todo({id, content, completed}:ITodo) {
    const dispatch = useAppDispatch();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        dispatch(updateTodos(e.target.value));
    }

    return (

        <div className="todo-container">
            <input type="checkbox" value={id} onChange={e => handleChange(e)}/>
            <label className={`${completed ? styles.complete : styles.uncomplete}`} >{content}</label>
        </div>
    );
}

