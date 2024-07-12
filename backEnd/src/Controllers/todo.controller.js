import { getUserByUserIdService } from "../Services/user.services.js";
import {
  createTodoService,
  getTodoByIdService,
  getTodosService,
  updateTodoService,
  deleteTodoService,
  getTodosByUserIdService,
} from "../Services/todo.services.js";

//CREATE LIST
export const createTodo = async (req, res) => {
  const { task } = req.body;
  const userId = req.userId;
  try {
    if (!(await getUserByUserIdService(userId))) {
      return res.status(401).json({ error: "User not found" });
    }

    const newList = await createTodoService(task, userId);
    return res.status(201).json(newList);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//SHOW TODOS
export const getTodos = async (req, res) => {
  try {
    const todos = await getTodosService();
    return res.status(200).json(todos);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//SHOW SINGLE TODO
export const getTodoById = async (req, res) => {
  const id = req.params.id;

  try {
    const todo = await getTodoByIdService(id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    return res.status(200).json(todo);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// SHOW TODOS FOR A SINGLE USER
export const getTodosByUserId = async (req, res) => {
  const userId = req.userId;
  // console.log(userId);
  try {
    const todos = await getTodosByUserIdService(userId);
    return res.status(200).json({ data: todos });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

//UPDATE TODO
export const updateTodo = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const { status } = req.body;
  console.log(status);

  try {
    const updatedTodo = await updateTodoService(id, status);
    return res.status(200).json(updatedTodo);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//DELETE SINGLE TODO
export const deleteTodo = async (req, res) => {
  const id = req.params.id;

  try {
    await deleteTodoService(id);
    return res.status(200).json({ data: "Todo deleted" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
