import express from "express";
import Book from "../models/bookModel.js";
import ensureAuthenticated from "../middlewares/auth.js";

const router = express.Router();
// Create an instance of the express.Router class which is used to define routes
// for the application.

// Route for Save a new Book
// using async as we are dealing with database
router.post("/", ensureAuthenticated, async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.price ||
      !req.body.publishYear
    ) {
      return res.status(400).send({ message: "Please fill all the fields" });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      publishYear: req.body.publishYear,
      createdBy: req.user._id, 
    };

    // Using the create method provided by Mongoose, we create a new document (i.e. a new book) in the database.
    // The create method returns a promise which resolves to the newly created document.
    // We await this promise to ensure that the document is created before we send a response to the client.
    // We then send the newly created document back to the client with a status code of 201 (Created).
    const book = await Book.create(newBook);
    res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// route or get all books from database
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).send({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// route for getting a single book from database
router.get("/:id", async (req, res) => {
  try {
    // In Express, params means route parameters — the values you define in the URL path with a :.
    // So basically: It fetches a single book document from MongoDB using the id from the request URL.
    const book = await Book.findById(req.params.id);
    res.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// router for update a book
router.put("/:id", ensureAuthenticated, async (req, res) => {
  try {
    // 1️⃣ Validate request body
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.price ||
      !req.body.publishYear
    ) {
      return res.status(400).send({ message: "Please fill all the fields" });
    }

    const { id } = req.params;

    // 2️⃣ Find the book first
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }

    // 3️⃣ 🔒 Ownership check
    if (book.createdBy.toString() !== req.user._id) {
      return res
        .status(403)
        .send({ message: "You are not allowed to update this book" });
    }

    // 4️⃣ Update book
    await Book.findByIdAndUpdate(id, req.body);

    return res.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});


// router for delete a book
router.delete("/:id", ensureAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;

    // 1️⃣ Find the book first
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }

    // 2️⃣ 🔒 Ownership check
    if (book.createdBy.toString() !== req.user._id) {
      return res
        .status(403)
        .send({ message: "You are not allowed to delete this book" });
    }

    // 3️⃣ Delete book
    await Book.findByIdAndDelete(id);

    return res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});


export default router;
