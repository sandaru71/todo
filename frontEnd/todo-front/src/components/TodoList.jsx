import { useEffect, useState } from 'react'
import unchecked from "../assets/unchecked.png"
import "./TodoList.css"
import TodoItem from './TodoItem';

const API_BASE = "http://localhost:3008";

export default function TodoList() {

    const todoList = [{
        id: 1,
        task: "Learn React",
        complete: false
    }, {
        id: 2,
        task: "Learn Node",
        complete: false
    }, {
        id: 3,
        task: "Learn MongoDB",
        complete: false
    }]

    const [todos, setTodos] = useState(todoList);
    const [popupActive, setPopupActive] = useState(false);
    const [newTodo, setNewTodo] = useState("");

    console.log(todos)

    // useEffect(() => {
    //     GetTodos();

    //     console.log(todos);
    // }, [])

    const GetTodos =() => {
        fetch(API_BASE + "/api/todos")
            .then(res => res.json())
            .then(data => setTodos(data))
            .catch(err => console.error("Error: ", err));
    }

    const completeTodo = async id => {
            const data = await fetch(API_BASE + "/api/updateTodo/" + id)
            .then(res => res.json());

            setTodos(todos => todos.map(todo => {
                if (todo.id === data.id) {
                    todo.complete = data.complete;
                }

                return todo;
            }))
    }

    const deleteTodo = async id => {
		const data = await fetch(API_BASE + '/api/deleteTodo/' + id, { method: "DELETE" }).then(res => res.json());

		setTodos(todos => todos.filter(todo => todo.id !== data.result.id));
	}

  return (
    <div className='todos'>
        {todos.map(todo => (
            <TodoItem todo={todo}/>
           
            // <div className=
            // {"todo-item" + (todo.complete ? " is-complete" : "")
            // } onClick={() => completeTodo(todo.id)}>
            //     <img src={unchecked} alt="" />
            //     <div className="text">{todo.task}</div>
            //     <div className="delete-btn" onClick={() => deleteTodo(todo.id)}>{'\u00d7'}</div>
            // </div>
        ))}
    </div>
  )
}
