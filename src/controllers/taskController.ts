import { Response, Request } from 'express';
import TaskSchema from '../models/task';

export const getAllTasks = async (req: Request, res: Response) => {
    try {
        const Tasks = await TaskSchema.find();

        if (!Tasks || Tasks.length === 0) {
            return res.status(204).json({
                message: "No records found",
                data: Tasks,
                status: "success"
            })
        }

        res.status(200).json({
            message: "Tasks returned successfully",
            data: Tasks,
            status: "success"
        })


    } catch (error) {

        res.status(500).json({
            message: "An error occurred while fetching tasks",
            error: error,
            status: "failed"
        })
    }
}

export const getTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const Task = await TaskSchema.findById(id);

        if (!Task) {
            return res.status(204).json({
                message: "No records found",
                data: Task,
                status: "success"
            })
        }

        res.status(200).json({
            message: "Tasks returned successfully",
            data: Task,
            status: "success"
        })


    } catch (error) {

        res.status(500).json({
            message: "An error occurred while fetching tasks",
            error: error,
            status: "failed"
        })
    }
}

export const createTask = async (req: Request, res: Response) => {
    const { title, description, subject, categories, dueDate, timeToFinish } = req.body;
    try {
        const Task = await TaskSchema.create({
            title, description, subject, categories, dueDate, timeToFinish
        });

        if (!Task) {
            return res.status(500).json({
                message: "Failed to create Task",
                status: "failed"
            })
        }

        res.status(201).json({
            message: `Successfully created ${Task.title}`,
            status: "success"
        })


    } catch (error) {

        res.status(500).json({
            message: "An error occurred while creating task",
            error: error,
            status: "failed"
        })
    }
}

export const updateTask = async (req: Request, res: Response) => {
    const Task = req.body;
    const { id } = req.params;

    try {
        const updateTask = await TaskSchema.findByIdAndUpdate(id, Task);

        if (!updateTask) {
            return res.status(500).json({
                message: "Failed to update Task",
                status: "failed"
            })
        }

        res.status(200).json({
            message: `Successfully updated ${id}`,
            status: "success"
        })


    } catch (error) {
        res.status(500).json({
            message: "An error occurred while updating task",
            error: error,
            status: "failed"
        })
    }
}