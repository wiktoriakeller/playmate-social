import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import styles from './Todos.module.css';
import {AddTodoForm} from "./AddTodoForm";
import {TodosList} from "./TodosList";


export function Todos() {
  const dispatch = useAppDispatch();
    const [hidden, setHidden] = useState('Hide completed')

    function handleChange() {
        setHidden((hidden === "Hide completed" ? "Unhidden completed": "Hide completed"));
    }

    return (
    <div style={{border: "2px solid black", padding: "10px"}}>
      <h1>To do list</h1>
        <form>
            <label>
                <input type="checkbox"  onChange={handleChange}/>
                Hide completed
            </label>
        </form>
        <hr/>
        <TodosList ifFilter={hidden === "Hide completed" ? true: false}/>
        <hr/>
      <AddTodoForm/>
    </div>
  );
}
