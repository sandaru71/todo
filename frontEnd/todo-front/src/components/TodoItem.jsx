import "./TodoList.css";
import unchecked from "../assets/unchecked.png";
//import checked
import checked from "../assets/checked.png";
import { useState } from "react";

// const API_BASE = "http://localhost:3008";

export default function TodoItem({ todo, updateTodo, setTodos, deleteTodo }) {
  const [isChecked, setIsChecked] = useState(todo.status);

  // toggle the checkbox function
  const toggleCheckbox = async () => {
    setIsChecked((prev) => !prev);
    try {
      await updateTodo(todo.id, !isChecked); // Toggle status
    } catch (error) {
      console.error("Failed to update todo:", error);
      setIsChecked((prev) => !prev); // Rollback state on error
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(todo.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="todo-item">
      <img
        src={isChecked ? checked : unchecked}
        alt=""
        onClick={toggleCheckbox}
      />
      <div className="text">{todo.task}</div>
      <div className="delete-btn" onClick={handleDelete}>
        {"\u00d7"}
      </div>
    </div>
  );
}
