const express = require('express');
const axios = require('axios'); // ✅ Axios for Tasks 10–13
let books = require("./booksdb.js");
let { isValid, users } = require("./auth_users.js");
const public_users = express.Router();

// Task 6: Register a new user
public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (!isValid(username)) {
    return res.status(409).json({ message: "Username already exists" });
  }

  users.push({ username, password });
  return res.status(200).json({ message: "User registered successfully" });
});

// Task 1–5: Public book routes
public_users.get('/', (req, res) => {
  return res.status(200).send(JSON.stringify(books, null, 4));
});

public_users.get('/isbn/:isbn', (req, res) => {
  const book = books[req.params.isbn];
  return book
    ? res.status(200).json(book)
    : res.status(404).json({ message: "Book not found" });
});

public_users.get('/author/:author', (req, res) => {
  const author = req.params.author;
  const matchingBooks = Object.values(books).filter(book => book.author === author);
  return matchingBooks.length
    ? res.status(200).json(matchingBooks)
    : res.status(404).json({ message: "No books found by this author" });
});

public_users.get('/title/:title', (req, res) => {
  const title = req.params.title;
  const matchingBooks = Object.values(books).filter(book => book.title === title);
  return matchingBooks.length
    ? res.status(200).json(matchingBooks)
    : res.status(404).json({ message: "No books found with this title" });
});

public_users.get('/review/:isbn', (req, res) => {
  const book = books[req.params.isbn];
  return book && book.reviews
    ? res.status(200).json(book.reviews)
    : res.status(404).json({ message: "No reviews found for this book" });
});

// ✅ Task 10: Get all books using async/await
const getAllBooks = async () => {
  try {
    const response = await axios.get('http://localhost:5000/');
    console.log("📚 All Books:", response.data);
  } catch (error) {
    console.error("❌ Error fetching books:", error.message);
  }
};
getAllBooks(); // Call for screenshot

// ✅ Task 11: Get book by ISBN using Promises
const getBookByISBN = (isbn) => {
  axios.get(`http://localhost:5000/isbn/${isbn}`)
    .then(response => {
      console.log(`📖 Book with ISBN ${isbn}:`, response.data);
    })
    .catch(error => {
      console.error("❌ Error fetching book by ISBN:", error.message);
    });
};
getBookByISBN("978-3-16-148410-0"); // Call for screenshot

// ✅ Task 12: Get books by author using async/await
const getBooksByAuthor = async (author) => {
  try {
    const response = await axios.get(`http://localhost:5000/author/${author}`);
    console.log(`🖋️ Books by ${author}:`, response.data);
  } catch (error) {
    console.error("❌ Error fetching books by author:", error.message);
  }
};
getBooksByAuthor("Chinua Achebe"); // Call for screenshot

// ✅ Task 13: Get books by title using Promises
const getBooksByTitle = (title) => {
  axios.get(`http://localhost:5000/title/${title}`)
    .then(response => {
      console.log(`📘 Books titled "${title}":`, response.data);
    })
    .catch(error => {
      console.error("❌ Error fetching books by title:", error.message);
    });
};
getBooksByTitle("Things Fall Apart"); // Call for screenshot

module.exports.general = public_users;