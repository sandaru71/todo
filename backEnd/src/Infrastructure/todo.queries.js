const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");

const prisma = new PrismaClient();

const createTodoQuery = async (task, userId) => {
  try {
    const newList = await prisma.todolist.create({
      data: {
        id: uuidv4(),
        task,
        status: false,
        userId: userId,
      },
    });
    return newList;
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};

const getTodosByUserIdQuery = async (userId) => {
  try {
    const todos = await prisma.todolist.findMany({
      where: {
        userId: userId,
      },
    });
    return todos;
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};

const getTodosQuery = async () => {
  try {
    const todos = await prisma.todolist.findMany();
    return todos;
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};

const getTodoByIdQuery = async (id) => {
  try {
    const todo = await prisma.todolist.findUnique({
      where: {
        id: id,
      },
    });
    return todo;
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};

const updateTodoQuery = async (id, status) => {
  try {
    const updatedTodo = await prisma.todolist.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });
    return updatedTodo;
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error");
  }
};

const deleteTodoQuery = async (id) => {
  try {
    await prisma.todolist.delete({
      where: {
        id: id,
      },
    });
    return { data: "todo deleted" };
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};

module.exports = {
  createTodoQuery,
  getTodosByUserIdQuery,
  getTodosQuery,
  getTodoByIdQuery,
  updateTodoQuery,
  deleteTodoQuery,
};
