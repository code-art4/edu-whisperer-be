# Edu Whisperer Backend API 🚀

## Project Overview

This is the backend service for the **AI-Based Study Assistant**, providing:

- User authentication & authorization 🔐
- AI-powered study tools (summaries, quizzes)
- Data persistence for study materials 📂
- API endpoints for frontend integration

**Frontend Repository**: [AI-Study-Assistant](https://github.com/code-art4/AI-Study-Assistant)  
**Live Demo**: [Edu Whisperer](https://edu-whisperer.vercel.app/)

---

## Tech Stack

### Core Technologies

- **Node.js** (v18+) - Runtime environment
- **Express** - Web framework
- **MongoDB** (with Mongoose) - Database
- **JWT** - Authentication
- **TypeScript** - Type safety

### AI Integration

- **OpenAI API** - For text summarization & quiz generation
- **OCR Service** - Document text extraction

---

## Key Features

### 1. Authentication System

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh-token
```
