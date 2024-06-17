import express from 'express';
import { createTodo, getTodos, getTodoById, updateTodo, deleteTodo } from '../Controllers/todo.controller.js';

const router = express.Router();

// Database routes
// router.get('/create-database', createDatabase);
// router.get('/create-table', createTable);

// Todo routes
router.post('/createTodo', createTodo);
router.get('/todos', getTodos);
router.get('/todos/:id', getTodoById);
router.patch('/updateTodo/:id', updateTodo);
router.delete('/deleteTodo/:id', deleteTodo);

export default router;
