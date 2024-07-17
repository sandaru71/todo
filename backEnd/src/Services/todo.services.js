const {
  createTodoQuery,
  getTodosQuery,
  getTodosByUserIdQuery,
  getTodoByIdQuery,
  updateTodoQuery,
  deleteTodoQuery,
} = require("../Infrastructure/todo.queries.js");

const createTodoService = async (task, userId) => {
  try {
    const newList = await createTodoQuery(task, userId);
    return newList;
  } catch (error) {
    throw error;
  }
};

const getTodosService = async () => {
  try {
    const todos = await getTodosQuery();
    return todos;
  } catch (error) {
    throw error;
  }
};

const getTodoByIdService = async (id) => {
  try {
    const todo = await getTodoByIdQuery(id);
    return todo;
  } catch (error) {
    throw error;
  }
};

const getTodosByUserIdService = async (userId) => {
  try {
    const todos = await getTodosByUserIdQuery(userId);
    return todos;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateTodoService = async (id, status) => {
  try {
    const updatedTodo = await updateTodoQuery(id, status);
    return updatedTodo;
  } catch (error) {
    throw error;
  }
};

const deleteTodoService = async (id) => {
  try {
    await deleteTodoQuery(id);
    return { data: "Todo deleted" };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createTodoService,
  getTodosService,
  getTodoByIdService,
  getTodosByUserIdService,
  updateTodoService,
  deleteTodoService,
};
