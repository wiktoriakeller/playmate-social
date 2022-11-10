import React, { useState } from 'react';
import {Formik, useFormik} from 'formik';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  addTodos,
} from './todosSlice';
import styles from './Todos.module.css';

export function AddTodoForm() {
  const dispatch = useAppDispatch();
  // const [todoContent, setTodoContent] = useState('');
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: (values, {resetForm}) => {
      dispatch(addTodos({content:values.email, completed: false}));
      resetForm();
    },
  });
  return (
      <form onSubmit={formik.handleSubmit}>
        <input
            id="email"
            name="email"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.email}
        />

        <button type="submit">Add</button>
      </form>
  );
}
