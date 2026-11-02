
const express = require('express');

const app = express();
const PORT = 3000;
app.use(express.json());
let books = [
    {
        id: 1,
        title: "Java Programming",
        author: "James Gosling",
        category: "Programming",
        quantity: 5,
        available: 5
    },
    {
        id: 2,
        title: "Python Basics",
        author: "Guido van Rossum",
        category: "Programming",
        quantity: 4,
        available: 4
    },
    {
        id: 3,
        title: "The Alchemist",
        author: "Paulo Coelho",
        category: "Fiction",
        quantity: 3,
        available: 3
    }
];

app.post('/api/books', (req, res) => {

    const { id, title, author, category, quantity } = req.body;
    if (
        !Number.isInteger(id) || id <= 0 ||
        !title || !author || !category ||
        quantity === undefined ||
        !Number.isInteger(quantity) || quantity < 0
    ) {
        return res.status(400).json({
            message: "Please provide valid ID, title, author, category and quantity"
        });
    }
    const existingBook = books.find(book => book.id === id);

    if (existingBook) {
        return res.status(400).json({
            message: "Book ID already exists"
        });
    }
    const newBook = {
        id,
        title,
        author,
        category,
        quantity,
        available: quantity
    };

    books.push(newBook);

    res.status(201).json({
        message: "Book added successfully",
        book: newBook
    });
});
app.get('/api/books', (req, res) => {
    res.status(200).json({
        totalBooks: books.length,
        books
    });
});


app.get('/api/books/:id', (req, res) => {
    const id = Number(req.params.id);

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    res.json(book);
});

app.put('/api/books/:id', (req, res) => {
    const id = Number(req.params.id);

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    const { title, author, category, quantity } = req.body;

    if (
        (title !== undefined && (typeof title !== 'string' || !title.trim())) ||
        (author !== undefined && (typeof author !== 'string' || !author.trim())) ||
        (category !== undefined && (typeof category !== 'string' || !category.trim())) ||
        (quantity !== undefined && (!Number.isInteger(quantity) || quantity < 0))
    ) {
        return res.status(400).json({
            message: "Invalid book details"
        });
    }

    const issued = book.quantity - book.available;

    if (quantity !== undefined && quantity < issued) {
        return res.status(400).json({
            message: "Quantity cannot be less than currently issued copies"
        });
    }

    if (title !== undefined) book.title = title.trim();
    if (author !== undefined) book.author = author.trim();
    if (category !== undefined) book.category = category.trim();

    if (quantity !== undefined) {
        book.quantity = quantity;
        book.available = quantity - issued;
    }

    res.json({
        message: "Book updated successfully",
        book
    });
});

// 5. DELETE BOOK - DELETE
app.delete('/api/books/:id', (req, res) => {
    const id = Number(req.params.id);

    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    if (books[index].available !== books[index].quantity) {
        return res.status(400).json({
            message: "Cannot delete book while copies are issued"
        });
    }

    const deletedBook = books.splice(index, 1);

    res.json({
        message: "Book deleted successfully",
        book: deletedBook[0]
    });
});

app.get('/api/books/search', (req, res) => {
    const { title, author, category } = req.query;

    const result = books.filter(book =>
        (!title || book.title.toLowerCase().includes(title.toLowerCase())) &&
        (!author || book.author.toLowerCase().includes(author.toLowerCase())) &&
        (!category || book.category.toLowerCase().includes(category.toLowerCase()))
    );

    res.json({
        count: result.length,
        books: result
    });
});
app.post('/api/books/:id/issue', (req, res) => {
    const id = Number(req.params.id);

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    if (book.available <= 0) {
        return res.status(400).json({
            message: "No copies available for issuing"
        });
    }

    book.available--;

    res.json({
        message: "Book issued successfully",
        book
    });
});
app.post('/api/books/:id/return', (req, res) => {
    const id = Number(req.params.id);

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    if (book.available >= book.quantity) {
        return res.status(400).json({
            message: "All copies have already been returned"
        });
    }

    book.available++;

    res.json({
        message: "Book returned successfully",
        book
    });
});
app.use((req, res) => {
    res.status(404).json({
        message: "API route not found"
    });
});
app.listen(PORT, () => {
    console.log(`Library Management API running at http://localhost:${PORT}`);
});
