import "./TodoList.css"
import unchecked from "../assets/unchecked.png"

import React from 'react'

export default function TodoItem({todo}) {
  return (
    <div className="todo-item">
        <img src={unchecked} alt="" />
        <div className="text">{todo.task}</div>
        <div className="delete-btn" onClick={() => deleteTodo(todo.id)}>{'\u00d7'}</div>
    </div>
  )
}
