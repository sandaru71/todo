import { createTodoQuery, getTodosQuery, getTodoByIdQuery, updateTodoQuery, deleteTodoQuery } from '../Infrastructure/todo.queries.js';

export const createTodoService = async ({ task }) => {
    try {
        const newList = await createTodoQuery({ task });
        return newList;
    } catch (error) {
        throw error;
    }
};

export const getTodosService = async () => {
    try {
        const todos = await getTodosQuery();
        return todos;
    } catch (error) {
        throw error;
    }
};

export const getTodoByIdService = async (id) => {
    try {
        const todo = await getTodoByIdQuery(id);
        return todo;
    } catch (error) {
        throw error;
    }
};

export const updateTodoService = async (id, status) => {
    try {
        const updatedTodo = await updateTodoQuery(id, status);
        return updatedTodo;
    } catch (error) {
        throw error;
    }
};

export const deleteTodoService = async (id) => {
    try {
        await deleteTodoQuery(id);
        return { data: "Todo deleted" };
    } catch (error) {
        throw error;
    }
};