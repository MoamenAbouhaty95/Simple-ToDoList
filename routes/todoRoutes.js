// routes/todoRoutes.js

const express = require("express");
const Todo = require("../models/Todo"); // Import the Todo model

const router = express.Router(); // Create a new router object

// --- CRUD Operations ---

// GET /api/todos - Get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Error fetching todos: " + err.message });
  }
});

// POST /api/todos - Create a new todo
router.post("/", async (req, res) => {
  const { task } = req.body;
  const newTodo = new Todo({ task });

  try {
    await newTodo.save();
    // Respond with 201 Created status
    res.status(201).json(newTodo); 
  } catch (err) {
    res.status(400).json({ message: "Error creating todo: " + err.message });
  }
});

// PUT /api/todos/:id - Update an existing todo
router.put("/:id", async (req, res) => {
  const { task } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { task },
      { new: true } // Option to return the updated document
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: "Error updating todo: " + err.message });
  }
});

// DELETE /api/todos/:id - Delete a todo by ID
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting todo: " + err.message });
  }
});

module.exports = router;