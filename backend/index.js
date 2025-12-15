import express from "express";
import cors from "cors";
import bookRouter from "./routes/booksRoute.js";
import authRouter from "./routes/authRoute.js";
import "dotenv/config";
import "./models/db.js"; // ✅ FIXED

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS
app.use(cors());

// Test route
app.get("/", (req, res) => {
  res.send("Hello from backend");
});

// Auth routes
app.use("/api/auth", authRouter);

// Book routes
app.use("/api/books", bookRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
