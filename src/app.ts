import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db";

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });
connectDB();

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require("./routes/authRoutes")
const taskRoutes = require("./routes/taskRoutes")
const studyPlanRoutes = require("./routes/studyPlanRoutes")

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/studyPlans", studyPlanRoutes);

// Error Handling
// import { errorHandler } from "./middlewares/errorMiddleware";
// app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    try {
        console.log(`Server running on port ${PORT}`)
    } catch (error) {
        console.log(`Could not start server on port ${PORT}`)
    }
});

