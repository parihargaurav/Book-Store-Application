import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import  bookRouter  from "./routes/booksRoute.js";

const app = express();
// express js is used for creating https routes




// Middleware for parsing request body
app.use(express.json());



// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:5000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );


// calback function
app.get("/", (req, res) => {
  res.send("Hello from backend");
});

// books api middleware
app.use("/api/books", bookRouter);


mongoose
  .connect("mongodb://127.0.0.1:27017/bookstore")
  .then(() => {
    console.log("Connected to database");
    app.listen(5000, () => {
      console.log("Server is running on http://localhost:5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
