const express = require('express');
const router = express.Router();

// Placeholder books data
let books = {
    "1": { "title": "Book One", "author": "Author A", "reviews": {} },
    "2": { "title": "Book Two", "author": "Author B", "reviews": {} }
};

// Task 1: Get all books
router.get("/", (req, res) => {
    return res.send(JSON.stringify(books, null, 4)); // neatly formatted JSON
});

module.exports = router;



