import React, { useState} from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    selectTodosList
} from './todosSlice';
import {Todo} from "./Todo";
interface Props {
    ifFilter: boolean;
}
export function TodosList({ifFilter}: Props ) {
    const allTodosList = useAppSelector(selectTodosList);

    const todosList = !ifFilter ? allTodosList.filter(todo => !todo.completed) : allTodosList;
    return (
        <>
            {
                todosList.length > 0 && todosList.map(todo => <Todo {...todo} key={todo.id} />)
            }
            {
                todosList.length == 0 && <p>Nothing to do</p>
            }
        </>
    );


}
