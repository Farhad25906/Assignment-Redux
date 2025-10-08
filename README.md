# 📚 Library Management System

A Full-Stack Library Management System built with React, TypeScript, Express.js, and MongoDB.
This platform enables users to manage books, track borrowed items, and view summaries — all through a clean, modern UI and a secure backend API

## 🌐 Live URLs
- **Frontend:** [Library Management System Frontend](https://bookmanagement-tau.vercel.app)  
- **Backend:** [Library Management System Backend](https://bookmangementbackend.vercel.app)


---
## 🎯 Overview
This project consists of two main parts:

- **Frontend** : Modern React.js application with TypeScript, Tailwind CSS, and Redux
- **Backend** — : RESTful API built with Node.js, Express, TypeScript, and MongoDB

## 🚀 Features

### 📘 Book Management
- **CRUD Operations** — Create, read, update, and delete books.  
- **Advanced Filtering** — Filter books by genre, availability, and search terms.  
- **Smart Sorting** — Sort by title, author, publication date, and more.  
- **Pagination** — Efficiently browse large book collections.

### 📚 Borrowing System
- **Borrow Books** — Easy book borrowing with due date tracking.  
- **Availability Tracking** — Real-time book availability status.  
- **Due Date Management** — Automatic due date calculations and tracking.  
- **Borrowing History** — Complete history of all borrowing operations.

### 🎨 User Experience
- **Responsive Design** — Works perfectly on desktop, tablet, and mobile.  
- **Modern UI** — Clean, intuitive interface built with Tailwind CSS.  
- **Real-time Updates** — Instant feedback and global state management with Redux.  
- **Form Validation** — Robust form handling with React Hook Form.

## 📂 Project Structure
```bash
Assignment-Redux/
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/               # Route-level components (Books, Borrow, etc.)
│   │   ├── store/               # Redux store setup and slices
│   │   ├── hooks/               # Custom React hooks
│   │   ├── types/               # TypeScript type definitions
│   │   ├── utils/               # Utility/helper functions
│   │   ├── lib/                 # External library configurations (API, constants, etc.)
│   │   └── App.tsx              # Root application component
│   ├── public/                  # Static assets (favicon, images, etc.)
│   ├── index.html               # Main HTML file
│   ├── tailwind.config.ts       # TailwindCSS configuration
│   └── package.json             # Frontend dependencies and scripts
│
├── backend/
│   ├── src/
│   │   ├── config/              # Environment and app configuration
│   │   ├── modules/
│   │   │   ├── books/           # Book management module
│   │   │   │   ├── book.model.ts
│   │   │   │   ├── book.controller.ts
│   │   │   │   ├── book.service.ts
│   │   │   │   └── book.interface.ts
│   │   │   └── borrowBooks/     # Borrowing operations module
│   │   │       ├── borrowBooks.model.ts
│   │   │       ├── borrowBooks.controller.ts
│   │   │       ├── borrowBooks.service.ts
│   │   │       └── borrowBooks.interface.ts
│   │   ├── routes/              # API route definitions
│   │   ├── app.ts               # Express application setup
│   │   └── server.ts            # Server entry point
│   ├── .env                     # Environment variables
│   ├── tsconfig.json            # TypeScript configuration
│   └── package.json             # Backend dependencies and scripts
│
└── README.md                    # Project documentation


```

## 🛠️ Tech Stack

### 🖥️ Frontend

| Technology | Purpose |
|-------------|----------|
| **React.js 19** | Frontend framework with latest features |
| **TypeScript** | Type-safe development |
| **Tailwind CSS 4** | Modern utility-first CSS framework |
| **Redux Toolkit** | State management |
| **React Hook Form** | Form handling and validation |
| **Zod** | Schema validation |
| **React Router** | Client-side routing |
| **Vite** | Fast build tool and development server |
| **Radix UI** | Accessible UI components |

---

### ⚙️ Backend

| Technology | Purpose |
|-------------|----------|
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Web application framework |
| **TypeScript** | Type-safe backend development |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB object modeling |
| **MongoDB Aggregation** | Advanced data processing |
| **CORS** | Cross-origin resource sharing |
| **dotenv** | Environment configuration |
