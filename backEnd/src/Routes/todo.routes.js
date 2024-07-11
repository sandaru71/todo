import express from "express";
import {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
  getTodosByUserId,
} from "../Controllers/todo.controller.js";
import { verifyJWT } from "../Middleware/verifyJWT.js";

const router = express.Router();

// Database routes
// router.get('/create-database', createDatabase);
// router.get('/create-table', createTable);

// Todo routes
router.get("/user", verifyJWT, getTodosByUserId);
router.post("/createTodo", verifyJWT, createTodo);
router.get("/todos", verifyJWT, getTodos);
router.get("/todos/:id", verifyJWT, getTodoById);
router.patch("/updateTodo/:id", verifyJWT, updateTodo);
router.delete("/deleteTodo/:id", verifyJWT, deleteTodo);

export default router;
