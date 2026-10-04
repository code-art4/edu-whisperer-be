"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = exports.createTask = exports.getTask = exports.getAllTasks = void 0;
const Task_1 = __importDefault(require("../models/Task"));
const getAllTasks = async (req, res) => {
    try {
        const Tasks = await Task_1.default.find();
        if (!Tasks || Tasks.length === 0) {
            return res.status(204).json({
                message: "No records found",
                data: Tasks,
                status: "success"
            });
        }
        res.status(200).json({
            message: "Tasks returned successfully",
            data: Tasks,
            status: "success"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching tasks",
            error: error,
            status: "failed"
        });
    }
};
exports.getAllTasks = getAllTasks;
const getTask = async (req, res) => {
    const { id } = req.params;
    try {
        const Task = await Task_1.default.findById(id);
        if (!Task) {
            return res.status(204).json({
                message: "No records found",
                data: Task,
                status: "success"
            });
        }
        res.status(200).json({
            message: "Tasks returned successfully",
            data: Task,
            status: "success"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching tasks",
            error: error,
            status: "failed"
        });
    }
};
exports.getTask = getTask;
const createTask = async (req, res) => {
    const { title, description, subject, categories, dueDate, timeToFinish, priority } = req.body;
    try {
        const Task = await Task_1.default.create({
            title, description, subject, categories, dueDate, timeToFinish, priority
        });
        if (!Task) {
            return res.status(500).json({
                message: "Failed to create Task",
                status: "failed"
            });
        }
        res.status(201).json({
            message: `Successfully created ${Task.title}`,
            status: "success"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred while creating task",
            error: error,
            status: "failed"
        });
    }
};
exports.createTask = createTask;
const updateTask = async (req, res) => {
    const Task = req.body;
    const { id } = req.params;
    try {
        const updateTask = await Task_1.default.findByIdAndUpdate(id, Task);
        if (!updateTask) {
            return res.status(500).json({
                message: "Failed to update Task",
                status: "failed"
            });
        }
        res.status(200).json({
            message: `Successfully updated ${id}`,
            status: "success"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred while updating task",
            error: error,
            status: "failed"
        });
    }
};
exports.updateTask = updateTask;
