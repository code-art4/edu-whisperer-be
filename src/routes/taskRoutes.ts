import express from "express";
const { getAllTasks, getTask, createTask, updateTask } = require('../controllers/taskController');

const router = express.Router();

router.get("/", getAllTasks);
router.get("/task/:id", getTask);
router.post("/task/create", createTask);
router.put("/task/update/:id", updateTask);

module.exports = router
