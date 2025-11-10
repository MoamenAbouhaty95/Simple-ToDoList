// config/db.js

const mongoose = require("mongoose");

// The MongoDB connection string (URI)
const mongoURI = "mongodb://127.0.0.1:27017/todo_app";

/**
 * Establishes and manages the connection to MongoDB.
 */
const connectDB = async () => {
  try {
    // Attempt to connect using modern options
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully ✅");
  } catch (err) {
    console.error("MongoDB connection error: ❌", err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;