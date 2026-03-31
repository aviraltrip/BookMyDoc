# BookMyDoc

BookMyDoc is a comprehensive MERN stack application designed to streamline the process of finding and booking medical appointments. It consists of three interconnected applications: a user-facing frontend, an admin dashboard, and a robust backend API.

## Features

- **User Portal (Frontend)**
  - Browse available doctors and view their profiles.
  - Book and manage appointments effortlessly.
  - User authentication and profile management.
  
- **Admin & Doctor Dashboard (Admin)**
  - Dedicated login for site administrators and doctors.
  - Manage doctors, users, and appointments.
  
- **Backend API (Backend)**
  - RESTful architecture built with Node.js and Express.
  - Secure data storage with MongoDB.
  - Image handling using Cloudinary.
  - Routes segmented by roles (Admin, Doctor, User).

## Technology Stack

### Frontend & Admin
- **React.js** (via Vite)
- **Tailwind CSS** for responsive styling
- **React Router DOM** for navigation
- **Axios** for API requests
- **React Toastify** for notifications

### Backend
- **Node.js** & **Express.js** 
- **MongoDB** with **Mongoose**
- **Cloudinary** for cloud-based media management
- **JSON Web Tokens (JWT)** for secure authentication
- **Bcrypt** for password hashing
- **Multer** for file uploads

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

You need to have **Node.js** and **npm** installed on your machine. You will also need a **MongoDB** URI and **Cloudinary** credentials.

### Installation

1. **Clone the repository** (or download the source code).
   ```bash
   git clone <repository_url>
   cd BookMyDoc
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   *Create a `.env` file in the `backend` directory based on the following variables:*
   ```env
   PORT=4000
   MONGODB_URI=<Your MongoDB URI>
   CLOUDINARY_NAME=<Your Cloudinary Name>
   CLOUDINARY_API_KEY=<Your Cloudinary API Key>
   CLOUDINARY_SECRET_KEY=<Your Cloudinary Secret>
   JWT_SECRET=<Your JWT Secret>
   ```
   *Start the backend server:*
   ```bash
   npm run server
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```
   *Start the frontend development server:*
   ```bash
   npm run dev
   ```

4. **Admin Setup**
   ```bash
   cd ../admin
   npm install
   ```
   *Start the admin development server:*
   ```bash
   npm run dev
   ```

## Folder Structure

```text
BookMyDoc/
├── admin/          # React Admin & Doctor Dashboard (Vite + TailwindCSS)
├── backend/        # Node/Express API with MongoDB & Cloudinary integrations
└── frontend/       # React User Portal (Vite + TailwindCSS)
```

## Scripts

- **Backend**: 
  - `npm start`: Runs the server normally.
  - `npm run server`: Runs the server with `nodemon` for active development.
- **Frontend / Admin**:
  - `npm run dev`: Starts the Vite development server.
  - `npm run build`: Builds the app for production.

## License

This project is licensed under the ISC License.
