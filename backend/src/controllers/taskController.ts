import { Request, Response } from 'express';
import TaskModel from '../models/taskModel';
import UserModel from '../models/userModel';

export const createTask = async (req: Request, res: Response) => {
    try {
        const { title, description, assignedTo, dueDate } = req.body;
        if (!title || !assignedTo) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const user = await UserModel.findById(assignedTo);
        if (!user) {
            return res.status(404).json({ message: "Assigned user not found" });
        }
        const newTask = await TaskModel.create({
            title,
            description,
            assignedTo,
            dueDate,
        });
        return res.status(201).json({ message: "Task created successfully", data: newTask });
    } catch (error) {
        console.error("Internal server error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await TaskModel.find().populate('assignedTo', 'name email');
        return res.status(200).json({ message: "Tasks fetched successfully", data: tasks });
    } catch (error) {
        console.error("Internal server error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};