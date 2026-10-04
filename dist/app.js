"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const db_1 = __importDefault(require("./config/db"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env.local") });
(0, db_1.default)();
const app = (0, express_1.default)();
const corsOption = {
    origin: ['http://localhost:8080'],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
};
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOption));
// Routes
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const studyPlanRoutes = require("./routes/studyPlanRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/studyPlans", studyPlanRoutes);
// Error Handling
// import { errorHandler } from "./middlewares/errorMiddleware";
// app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    try {
        console.log(`Server running on port ${PORT}`);
    }
    catch (error) {
        console.log(`Could not start server on port ${PORT}`);
    }
});
