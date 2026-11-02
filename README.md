##FSD-MID-TERM 1_CSE-11_2503201000231

## Overview

The Library Management System is a RESTful API developed using **Node.js and Express.js**. It allows users to manage books in a library by performing CRUD operations, searching books, and managing book issue and return operations.

The application uses an **in-memory JavaScript array** to store book records. No external database or file-based storage is used. Data does not persist after the server restarts.

## Technologies Used

- Node.js – JavaScript runtime environment
- Express.js – Backend web application framework
- JavaScript – Programming language
- Postman – API testing tool

## Project Structure

```text
LibraryManagement/
│
├── node_modules/
├── package.json
├── package-lock.json
└── server.js
```

## Book Attributes

Each book contains the following attributes:

| Attribute | Description |
|---|---|
| id | Unique book ID |
| title | Name of the book |
| author | Name of the author |
| category | Book category |
| quantity | Total number of copies |
| available | Number of available copies |

## Installation and Setup

**Step 1: Initialize the project**

```bash
npm init -y
```

**Step 2: Install Express.js**

```bash
npm install express
```

**Step 3: Start the server**

```bash
node server.js
```

The application runs at:

```text
http://localhost:3000
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/books` | Add a new book |
| GET | `/api/books` | Retrieve all books |
| GET | `/api/books/:id` | Retrieve a book by ID |
| PUT | `/api/books/:id` | Update book details |
| DELETE | `/api/books/:id` | Delete a book |
| GET | `/api/books/search` | Search books |
| POST | `/api/books/:id/issue` | Issue a book copy |
| POST | `/api/books/:id/return` | Return a book copy |

## Functionalities

### 1. Add a New Book
- Accepts book details through a POST request.
- Validates required fields and quantity values.
- Assigns a unique ID to the book.
- Prevents duplicate book IDs.
- Stores the book in the in-memory array.

### 2. Retrieve Books
- Retrieves all books using GET `/api/books`.
- Retrieves a specific book using its ID.
- Handles empty collections and books that do not exist.

### 3. Update Book Details
- Uses the PUT method to update book information.
- Finds the book using its ID.
- Updates permitted attributes.
- Does not allow modification of the book ID.
- Handles invalid IDs and input values.

### 4. Delete a Book
- Deletes a book using its unique ID.
- Returns an appropriate response if the book does not exist.
- Prevents deletion when copies are currently issued.

### 5. Search Books
- Searches books by title, author, or category.
- Supports partial and case-insensitive matching.
- Returns matching book records.

### 6. Issue a Book
- Checks whether copies are available.
- Decreases the available quantity by one.
- Prevents issuing when no copies are available.

### 7. Return a Book
- Increases the available quantity by one.
- Prevents returning copies beyond the total quantity.

## Sample Book JSON

```json
{
  "id": 1,
  "title": "Java Programming",
  "author": "Herbert Schildt",
  "category": "Programming",
  "quantity": 5,
  "available": 5
}
```

## Error Handling

The API handles common errors using appropriate HTTP status codes:

| Status Code | Meaning |
|---|---|
| 200 | Successful request |
| 201 | Resource created successfully |
| 400 | Invalid request or validation error |
| 404 | Book or API route not found |

## Testing

All API endpoints can be tested using **Postman** by sending GET, POST, PUT, and DELETE requests.

For POST and PUT requests, select:

- Body
- Raw
- JSON

## Important Note

This project uses only an in-memory JavaScript array for storing book records. MongoDB, MySQL, other databases, and file-based storage are not used. All data is reset when the server is restarted.

## Conclusion

The Library Management System demonstrates the practical implementation of REST API development using Node.js and Express.js. It covers CRUD operations, routing, middleware, request handling, input validation, error handling, searching, and book issue/return functionality.

**Project Type:** Individual Practical Assignment  
**Subject:** Full Stack Development (FSD)  
**Port:** 3000
