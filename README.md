# 📝 QuickNote

A modern Full Stack Note Management application built with **React, TypeScript, FastAPI, and PostgreSQL**. QuickNote allows users to securely register, authenticate using JWT, create personal notes, search notes instantly, edit existing notes, delete notes, and upload profile images.

🌐 **Live Demo:** https://quicknote-rosy.vercel.app


---

# ✨ Features

### 🔐 Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Password Hashing using bcrypt
- Secure API Authorization

---

### 📝 Notes Management

- Create Notes
- View Notes
- Update Notes
- Delete Notes
- Instant Search Notes
- User-specific Notes

---

### 👤 User Profile

- View Profile Information
- Upload Profile Image
- Image Validation (JPG, PNG, WEBP)
- Dynamic Welcome Message

---

### ✅ Validation

Frontend Validation

- Required Fields
- Email Format Validation
- Password Length Validation

Backend Validation

- Email Validation
- Password Validation
- Duplicate Email Prevention
- Request Validation using Pydantic

---

### ☁️ Deployment

Frontend

- Vercel

Backend

- Render

Database

- Neon PostgreSQL

---

# 🛠 Tech Stack

## Frontend

- React
- TypeScript
- Vite
- React Router
- Axios
- Lucide React
- CSS

---

## Backend

- FastAPI
- SQLAlchemy
- Alembic
- Pydantic
- JWT Authentication
- Passlib (bcrypt)
- Python

---

## Database

- PostgreSQL
- Neon Database

---

## Deployment

- Vercel
- Render

---

# 📂 Project Structure

```
quicknote
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── app
│   ├── alembic
│   ├── uploads
│   └── pyproject.toml
│
├── docs
│
└── README.md
```

---

# 🚀 Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/Biozidtonoy/quicknote.git
```

```
cd quicknote
```

---

# Frontend Setup

```
cd frontend
```

Install dependencies

```
npm install
```

Create

```
.env.local
```

```
VITE_API_URL=http://127.0.0.1:8000
```

Run

```
npm run dev
```

---

# Backend Setup

```
cd backend
```

Install dependencies

```
uv sync
```

Create

```
.env
```

```
DATABASE_URL=YOUR_DATABASE_URL

SECRET_KEY=YOUR_SECRET_KEY

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=30
```

Run migrations

```
uv run alembic upgrade head
```

Run backend

```
uv run uvicorn app.main:app --reload
```

---

# 🔒 Authentication Flow

```
User

↓

Register

↓

Password Hashing

↓

Store in PostgreSQL

↓

Login

↓

Verify Password

↓

Generate JWT

↓

React Stores Token

↓

Protected Routes

↓

Authorized Requests
```

---

# 🗄 Database Schema

## Users

| Field | Type |
|---------|------|
| id | Integer |
| name | String |
| email | String |
| hashed_password | String |
| profile_image | String |

---

## Notes

| Field | Type |
|---------|------|
| id | Integer |
| title | String |
| content | Text |
| created_at | DateTime |
| owner_id | Integer |

---

# 🔌 API Endpoints

## Authentication

```
POST /auth/register

POST /auth/login
```

---

## Users

```
GET /users/me

POST /users/profile-image
```

---

## Notes

```
POST /notes

GET /notes

PUT /notes/{id}

DELETE /notes/{id}
```

---

# 📸 Screenshots

## Login Page

(Add Screenshot)

---

## Register Page

(Add Screenshot)

---

## Dashboard

(Add Screenshot)

---

## Notes

(Add Screenshot)

---

# 🔐 Security

- JWT Authentication
- Password Hashing
- Protected API Routes
- SQLAlchemy ORM
- Request Validation
- Secure Environment Variables
- CORS Configuration

---

# 📈 Future Improvements

- Password Reset
- Email Verification
- Rich Text Editor
- Note Categories
- Dark Mode
- Pagination
- Tags
- Note Sharing
- Refresh Tokens
- Docker Deployment
- Unit Testing
- CI/CD Pipeline

---

# 📚 What I Learned

During this project I learned:

- Building REST APIs with FastAPI
- React + TypeScript Development
- JWT Authentication
- PostgreSQL Database Design
- SQLAlchemy ORM
- Alembic Database Migrations
- File Upload Handling
- API Integration using Axios
- Route Protection
- Deployment with Render
- Deployment with Vercel
- Cloud PostgreSQL using Neon
- GitHub Project Management
- Git Branching Workflow
- Pull Requests
- Merge Conflict Resolution

---

# 👨‍💻 Author

**Biozid Bhuoiyan Tonoy**

Computer Science & Engineering Student

Independent University, Bangladesh (IUB)

GitHub

https://github.com/Biozidtonoy

LinkedIn

(www.linkedin.com/in/biozidbhuiyantonoy)

---

# ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.