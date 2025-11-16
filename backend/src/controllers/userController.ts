import { Request, Response } from "express";
import userModel from "../models/userModel";


export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
        });
    } catch (error) {
        console.error("Internal server error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}