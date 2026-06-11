# MockMate 🚀

**MockMate** is an AI-powered interview practice platform that simulates real interview experiences and provides intelligent feedback to help candidates improve their interview performance.

The platform generates personalized interview questions based on the candidate's profile and resume, conducts an interactive interview session, and evaluates responses using Google's Gemini API.

---

# 🌟 Features

## 🔐 Authentication

* User Signup & Login
* JWT-based Authentication
* Protected Routes

## 👤 Profile Management

* Target Role Selection
* Target Company Selection
* Experience Level Configuration
* Resume Upload Support

## 🎯 AI-Powered Interviews

* Personalized interview generation
* Resume-aware questioning
* Interactive chat-style interview experience
* Dynamic interview flow

## 🤖 AI Evaluation

* Interview scoring
* Detailed performance feedback
* Strength and improvement analysis
* AI-generated evaluation report

## 📊 Dashboard Analytics

* Total Interviews Completed
* Average Interview Score
* Best Interview Score

## 📚 Interview History

* View previous interview sessions
* Review scores and feedback
* Track progress over time

---

# 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS
* Lucide React

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication

* JWT (JSON Web Tokens)
* bcrypt.js

### AI Integration

* Google Gemini API

---

# 🏗️ System Architecture

```text
User
  │
  ▼
React Frontend
  │
  ▼
Express Backend
  │
  ├── MongoDB
  │
  └── Gemini API
          │
          ▼
  Question Generation
  Interview Evaluation
```

---

# 📂 Project Structure

```text
MockMate
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── models
│   ├── services
│   ├── uploads
│   └── package.json
│
└── README.md
```

---

# 🚀 Installation & Setup

## 1. Clone Repository

```bash
git clone <repository-url>
cd MockMate
```

---

## 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key
```

Start backend:

```bash
npm start
```

---

## 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 🔄 Application Flow

### Step 1

User signs up or logs in.

### Step 2

User completes profile:

* Role
* Company
* Experience
* Resume

### Step 3

User starts a mock interview.

### Step 4

AI generates interview questions.

### Step 5

User answers questions in an interactive chat interface.

### Step 6

Interview is submitted.

### Step 7

Gemini AI evaluates responses and generates:

* Score
* Feedback
* Improvement suggestions

### Step 8

Results are saved and displayed in History and Dashboard.

---


---

# 🔮 Future Enhancements

* Voice-based Interviews
* Text-to-Speech Questions
* Speech-to-Text Answers
* Coding Interview Mode
* Company-Specific Interview Rounds
* Advanced Analytics Dashboard

---

# 🎓 Key Learnings

Through MockMate, I gained practical experience in:

* Full Stack MERN Development
* REST API Design
* Authentication & Authorization
* MongoDB Data Modeling
* AI Integration using Gemini API
* Resume Processing Workflows
* Building SaaS-style Applications
* Modern React Development

---

# 👩‍💻 Author

**Sahithi**

Built using React, Node.js, MongoDB, Express.js, and Google Gemini API.
