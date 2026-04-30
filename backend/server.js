const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// 1. Load Environment Variables at the very top
dotenv.config();

// 2. Initialize Database
connectDB();

const app = express();

// 3. Global Middleware
app.use(cors());
app.use(express.json()); // Essential for parsing JSON bodies in POST requests

// 4. API Routes
app.use("/api/chat", require("./routes/chatRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));

// 5. Basic Health Check (Useful for testing)
app.get("/", (req, res) => {
  res.send("Placifying Backend API is running...");
});

// 6. Global Error Handler (Optional but professional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// 7. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});