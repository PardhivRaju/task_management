# Task Management System

## Overview

This project is a simple Task Management System that allows users to create, read, update, and delete tasks through a RESTful API. The application features a backend built with Node.js and Express, connected to a MongoDB database, and a frontend built using HTML, CSS, and JavaScript.

## Features

- **Create Task**: Add a new task with a title, description, and status.
- **View Tasks**: Fetch and display all tasks.
- **Update Task**: Edit the details of an existing task.
- **Delete Task**: Remove a task from the system.

## Project Structure

```
project/
|
├── backend/
│   ├── controllers/
│   │   └── taskController.js
│   ├── routes/
│   │   └── tasks.js
│   ├── server.js
|
├── frontend/
│   ├── index.html
│   ├── script.js
│   ├── styles.css
|
├── package.json
└── package-lock.json
```

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your system.
- [MongoDB](https://www.mongodb.com/) server running locally or accessible via a connection string.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd project
   ```

2. Install dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Configure MongoDB:

   - Create a `.env` file in the `backend` directory.
   - Add the following content:
     ```env
     MONGO_URI=mongodb://localhost:27017/taskdb
     PORT=5000
     ```

   Replace `mongodb://localhost:27017/taskdb` with your MongoDB connection string if needed.

4. Start the backend server:

   ```bash
   node server.js
   ```

5. Open the frontend:

   - Open the `index.html` file in your browser (use Live Server for a better development experience).

## Usage

### Backend API Endpoints

#### Base URL: `/api/tasks`

1. **Get All Tasks**

   - `GET /api/tasks`
   - Response:
     ```json
     [
       {
         "id": 1,
         "title": "Sample Task",
         "description": "This is a sample task",
         "status": "Pending",
         "created_at": "2023-01-01T00:00:00Z",
         "updated_at": "2023-01-01T00:00:00Z"
       }
     ]
     ```

2. **Get Task by ID**

   - `GET /api/tasks/:id`
   - Response:
     ```json
     {
       "id": 1,
       "title": "Sample Task",
       "description": "This is a sample task",
       "status": "Pending",
       "created_at": "2023-01-01T00:00:00Z",
       "updated_at": "2023-01-01T00:00:00Z"
     }
     ```

3. **Create Task**

   - `POST /api/tasks`
   - Request Body:
     ```json
     {
       "title": "New Task",
       "description": "Details about the new task",
       "status": "Pending"
     }
     ```

4. **Update Task**

   - `PUT /api/tasks/:id`
   - Request Body:
     ```json
     {
       "title": "Updated Task",
       "description": "Updated details",
       "status": "In Progress"
     }
     ```

5. **Delete Task**

   - `DELETE /api/tasks/:id`

### Frontend

1. Open `index.html` in a browser.
2. Use the provided buttons to add, edit, or delete tasks.

## Technologies Used

- **Backend**: Node.js, Express, MongoDB
- **Frontend**: HTML, CSS, JavaScript

## Future Enhancements

- Add authentication using JWT.
- Implement pagination for task listing.
- Enhance the UI with a modern framework like React or Vue.js.

## License

This project is licensed under the MIT License. Feel free to use and modify it for your own purposes.

---

Enjoy building and managing tasks!

