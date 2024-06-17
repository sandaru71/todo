import { createTodoQuery, getTodosQuery, getTodoByIdQuery, updateTodoQuery, deleteTodoQuery } from '../Infrastructure/todo.queries.js';
import { createTodoService, getTodoByIdService, getTodosService, updateTodoService, deleteTodoService } from '../Services/todo.services.js';

//CREATE LIST
export const createTodo = async (req, res) => {
    const { task } = req.body;

    try {
        const newList = await createTodoService({ task });
        return res.status(201).json(newList);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

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
}

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
}

//DELETE SINGLE TODO
export const deleteTodo = async (req, res) => {
    const id = req.params.id;

    try {
        await deleteTodoService(id);
        return res.status(200).json({ data: "Todo deleted" });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
