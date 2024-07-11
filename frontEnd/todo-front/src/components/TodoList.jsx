import { useEffect, useState } from "react";
import "./TodoList.css";
import TodoItem from "./TodoItem";
import SnackBar from "./SnackBar";
import { useSortTodos } from "../hooks/SortTodos.jsx";
import { axiosPrivate } from "../../api/axios.js";
import useTodoContext from "../hooks/useTodoContext.jsx";

const API_BASE = "http://localhost:3008";

export default function TodoList() {
  const { sortTodos } = useSortTodos();

  // const [todos, setTodos] = useState([]);
  const { todos, setTodos } = useTodoContext();
  const [newTodo, setNewTodo] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarSeverity, setSnackBarSeverity] = useState("success");
  const [snackBarMessage, setSnackBarMessage] = useState("");

  useEffect(() => {
    GetTodos();
  }, []);

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  // const GetTodos = () => {
  //   fetch(API_BASE + "/api/todos")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const sortedTodos = sortTodos(data); // Sort todos
  //       setTodos(sortedTodos);
  //       console.log(data);
  //     })
  //     .catch((err) => console.error("Error: ", err));
  // };

  const GetTodos = async () => {
    try {
      const response = await axiosPrivate.get("/api/todos");
      const data = await response.data;
      const sortedTodos = sortTodos(data); // Sort todos
      setTodos(sortedTodos);
      console.log(data);
    } catch (error) {
      console.error("Error fetching todos: ", error);
    }
  };

  // const addTodo = async () => {
  //   try {
  //     const response = await fetch(`${API_BASE}/api/createTodo`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         task: newTodo,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to add todo");
  //     }

  //     const data = await response.json();
  //     const updatedTodos = sortTodos([...todos, data]); // Sort and update todos
  //     setTodos(updatedTodos);
  //     setNewTodo("");
  //     setOpenSnackBar(true);
  //     setSnackBarSeverity("success");
  //     setSnackBarMessage("New Todo Item added successfully!");
  //   } catch (error) {
  //     console.error("Error adding todo:", error);
  //   }
  // };

  const addTodo = async () => {
    try {
      const response = await axiosPrivate.post("/api/createTodo", newTodo);

      const data = await response.data;
      const updatedTodos = sortTodos([...todos, data]); // Sort and update todos
      setTodos(updatedTodos);
      setNewTodo("");
      setOpenSnackBar(true);
      setSnackBarSeverity("success");
      setSnackBarMessage("New Todo Item added successfully!");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axiosPrivate.delete("/api/deleteTodo/" + id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      setSnackBarSeverity("error");
      setSnackBarMessage("Todo Item deleted!");
      setOpenSnackBar(true);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // const updateTodo = async (id, status) => {
  //   try {
  //     const url = `${API_BASE}/api/updateTodo/${id}`;
  //     const response = await fetch(url, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ status }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to update todo");
  //     }

  //     const updatedTodo = await response.json();
  //     setTodos((prev) => {
  //       const filteredTodos = prev.filter((t) => t.id !== id);
  //       const updatedTodos = [...filteredTodos, updatedTodo];
  //       const sortedTodos = sortTodos(updatedTodos);
  //       return sortedTodos;
  //     });
  //   } catch (error) {
  //     console.error("Error updating todo:", error);
  //   }
  // };

  const updateTodo = async (id, status) => {
    try {
      const url = "/api/updateTodo/" + id;
      const response = await axiosPrivate.patch(url, { status });

      const updatedTodo = response.data;
      setTodos((prev) => {
        const filteredTodos = prev.filter((t) => t.id !== id);
        const updatedTodos = [...filteredTodos, updatedTodo];
        const sortedTodos = sortTodos(updatedTodos);
        return sortedTodos;
      });
    } catch (error) {
      console.error("Error updating Todo: " + error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTodo();
    }
  };

  return (
    <>
      <div className="row">
        <input
          className="task-entry-bar"
          type="text"
          id="input-box"
          placeholder="Add your text"
          onChange={(e) => setNewTodo(e.target.value)}
          value={newTodo}
          onKeyPress={handleKeyPress} // Handle "Enter" key press
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <div className="todos">
        {todos.map((todo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
            setTodos={setTodos}
          />
        ))}
      </div>
      <SnackBar
        open={openSnackBar}
        handleClose={handleCloseSnackBar}
        severity={snackBarSeverity}
        message={snackBarMessage}
      />
    </>
  );
}
