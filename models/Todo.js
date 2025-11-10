// models/Todo.js

const mongoose = require("mongoose");

// Define the schema for a Todo item
const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
    trim: true, // Remove whitespace from both ends of a string
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Mongoose Model based on the schema
const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;