# Student Records API

A RESTful API built with Node.js and Express.js for managing student records.

## Features

- Retrieve all students
- Retrieve a student by ID
- Create a student
- Update a student
- Delete a student

## Technologies

- Node.js
- Express.js
- JavaScript

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check API status |
| GET | `/api/students` | Get all students |
| GET | `/api/students/:id` | Get a student by ID |
| POST | `/api/students` | Create a student |
| PUT | `/api/students/:id` | Update a student |
| DELETE | `/api/students/:id` | Delete a student |

## Run Locally

1. Install dependencies using `npm install`.
2. Start the server using `node server.js`.
3. Open `http://localhost:3000`.

## Data Storage

Student records are stored in memory and reset when the server restarts.
