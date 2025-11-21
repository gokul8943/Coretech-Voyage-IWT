import { Request, Response } from "express";
import UserModel from "../models/userModel";
import TimeModel from "../models/timeModel";

export const logWorkTime = async (req: Request, res: Response) => {
    try {
        const userId = req.body.userId;
        const startTime = req.body.startTime;

        if (!userId || !startTime) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const workTimeEntry = await TimeModel.create({
            userId,
            startTime,
        });

        return res.status(200).json({ message: "Work time logged successfully", data: workTimeEntry });
    } catch (error) {
        console.error("Internal server error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const endWorkTime = async (req: Request, res: Response) => {
    try {
        const timeId = req.body.timeId;
        const endTime = req.body.endTime;
        if (!timeId || !endTime) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const workTimeEntry = await TimeModel.findById(timeId);
        if (!workTimeEntry) {
            return res.status(404).json({ message: "Work time entry not found" });
        }
    } catch (error) {
        console.error("Internal server error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getWorkTimes = async (req: Request, res: Response) => {
    try {
        const workTimes = await TimeModel.find();
        return res.status(200).json({ message: "working times fetch successfully", workTimes });
    } catch (error) {
        console.error("Internal server error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getWorkTime = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const workTimes = await TimeModel.find({ userId });
        return res.status(200).json({ message: "working time fetch successfully", workTimes });
    } catch (error) {
        console.error("Internal server error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};