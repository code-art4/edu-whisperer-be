"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { getAllTasks, getTask, createTask, updateTask } = require('../controllers/taskController');
const router = express_1.default.Router();
router.get("/", getAllTasks);
router.get("/task/:id", getTask);
router.post("/task/create", createTask);
router.put("/task/update/:id", updateTask);
module.exports = router;
