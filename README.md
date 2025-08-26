# 🎓 AGH Placement Readiness Predictor - Backend

This is the **backend service** for the AGH Placement Readiness Predictor web application.  
It provides REST APIs to calculate a student’s **Placement Readiness %**, manage category-wise scores (Aptitude, Coding, Resume, Mock Interviews), and generate a **personalized improvement plan**.

---

## 🚀 Tech Stack
- **Node.js** + **Express.js** (REST API framework)  
- **MongoDB Atlas** (Database for storing student data & results)  
- **Mongoose** (ODM for MongoDB)  
- **CORS** (to connect with frontend hosted separately)  
- **dotenv** (for environment variables)

---

## 📂 Project Structure
backend/
│-- server.js # Entry point
│-- routes/ # API routes
│-- controllers/ # Business logic
│-- models/ # MongoDB models
│-- config/ # DB connection, env configs
│-- .env.example # Sample env variables
│-- package.json
