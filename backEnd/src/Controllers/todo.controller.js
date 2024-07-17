const { getUserByUserIdService } = require("../Services/user.services.js");
const {
  createTodoService,
  getTodoByIdService,
  getTodosService,
  updateTodoService,
  deleteTodoService,
  getTodosByUserIdService,
} = require("../Services/todo.services.js");

// CREATE LIST
const createTodo = async (req, res) => {
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

// SHOW TODOS
const getTodos = async (req, res) => {
  try {
    const todos = await getTodosService();
    return res.status(200).json(todos);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// SHOW SINGLE TODO
const getTodoById = async (req, res) => {
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
const getTodosByUserId = async (req, res) => {
  const userId = req.userId;
  try {
    const todos = await getTodosByUserIdService(userId);
    return res.status(200).json({ data: todos });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// UPDATE TODO
const updateTodo = async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;

  try {
    const updatedTodo = await updateTodoService(id, status);
    return res.status(200).json(updatedTodo);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// DELETE SINGLE TODO
const deleteTodo = async (req, res) => {
  const id = req.params.id;

  try {
    await deleteTodoService(id);
    return res.status(200).json({ data: "Todo deleted" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  getTodosByUserId,
  updateTodo,
  deleteTodo,
};
