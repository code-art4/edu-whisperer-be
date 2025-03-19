import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db.ts";

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });
connectDB();

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
import authRoutes from "./routes/authRoutes";

app.use("/api/auth", authRoutes);

// Error Handling
// import { errorHandler } from "./middlewares/errorMiddleware";
// app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
