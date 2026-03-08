# Task Master - Full-Stack Task Manager

A full-stack task management application built with the MERN stack (MongoDB, Express, React, Node.js). This application provides a seamless and responsive user interface for managing daily tasks and projects.

## Features

- **Task Management**: Create, view, update, and delete tasks with ease.
- **Status Tracking**: Easily toggle tasks between 'Pending' and 'Completed' states.
- **Modern UI/UX**: A clean, responsive, and visually appealing light-mode interface with subtle animations, built using TailwindCSS.
- **RESTful API**: A robust Node.js/Express backend providing reliable data operations.
- **Persistent Storage**: Secure and robust MongoDB database integration.

## Technology Stack

**Frontend:**
- React (via Vite)
- TailwindCSS (Styling)
- Axios (API requests)
- Lucide React (Icons)

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose (Database modeling)
- Dotenv (Environment configuration)
- CORS

---

## Setup Instructions

### Prerequisites
- Node.js v20 or higher
- MongoDB Database (Local or Atlas)
- Git

### Local Setup

**1. Clone the repository**
```bash
git clone <https://github.com/neha645/task-manager-app.git>
cd task-manager-app
```

**2. Setup Backend**
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```
Start the backend server:
```bash
npm run dev
```

**3. Setup Frontend**
```bash
cd frontend
npm install
```
Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:5000
```
Start the frontend development server:
```bash
npm run dev
```

---

## API Documentation

The backend exposes the following RESTful API endpoints at `http://localhost:5000/api`:

### 1. Get All Tasks
- **URL**: `/tasks`
- **Method**: `GET`
- **Description**: Returns a list of all tasks in the database.
- **Success Response**: `200 OK` (Returns an array of task objects)

### 2. Create Task
- **URL**: `/tasks`
- **Method**: `POST`
- **Description**: Creates a new task instance.
- **Body Data**:
  ```json
  {
    "title": "Task title",
    "description": "Task description"
  }
  ```
- **Success Response**: `201 Created`

### 3. Update Task Status
- **URL**: `/tasks/:id`
- **Method**: `PUT`
- **Description**: Updates the fields of an existing task given its ID.
- **Body Data**:
  ```json
  {
    "status": "completed" // or "pending"
  }
  ```
- **Success Response**: `200 OK`

### 4. Delete Task
- **URL**: `/tasks/:id`
- **Method**: `DELETE`
- **Description**: Deletes a task from the database by its ID.
- **Success Response**: `200 OK`

