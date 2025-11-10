// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db"); // Import the database connection utility
const todoRoutes = require("./routes/todoRoutes"); // Import the defined API routes

// Initialize the Express application
const app = express();

// Connect to MongoDB
connectDB();

// --- Middleware Setup ---
// Parse incoming JSON requests
app.use(bodyParser.json());
// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());
// Serve static assets (like a frontend build or images) from the 'assets' folder
app.use(express.static("assets"));

// --- Route Handling ---
// Mount the todo routes under the '/api/todos' path
app.use("/api/todos", todoRoutes);

// --- Server Startup ---
// Use environment PORT or default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🌐`));