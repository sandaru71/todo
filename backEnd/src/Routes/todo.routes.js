const express = require("express");
const {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
  getTodosByUserId,
} = require("../Controllers/todo.controller.js");
const { verifyJWT } = require("../Middleware/verifyJWT.js");

const router = express.Router();

// Todo routes
router.get("/user", verifyJWT, getTodosByUserId);
router.post("/createTodo", verifyJWT, createTodo);
router.get("/todos", verifyJWT, getTodos);
router.get("/todos/:id", verifyJWT, getTodoById);
router.patch("/updateTodo/:id", verifyJWT, updateTodo);
router.delete("/deleteTodo/:id", verifyJWT, deleteTodo);

module.exports = router;
