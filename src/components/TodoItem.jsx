import React from 'react';
import {useDispatch} from "react-redux";
import {deleteTodo, toggleStatus, toggleTodoComplete} from "../store/todoSlice";

const TodoItem = ({id, title, completed}) => {
  const dispatch = useDispatch();

  return (
      <li>
        <input type="checkbox"
               checked={completed}
               onChange={() => dispatch(toggleStatus(id))}
        />
        <span>{title}</span>
        <span
            style={{color: 'blue', cursor: 'pointer'}}
            onClick={() => dispatch(deleteTodo(id))}>
            &times;
        </span>
      </li>
  );
};

export default TodoItem;
