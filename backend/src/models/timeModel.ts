import mongoose, { Schema } from "mongoose";

export interface ITime extends Document {
    userId: mongoose.Types.ObjectId;
    startTime: string;
    endTime?: string;
    date?: Date;
    totalHours?: number;
    createdAt: Date;
    updatedAt: Date;
}

const timeSchema = new Schema<ITime>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        startTime: { type: String, required: true },
        endTime: { type: String },
        date: { type: Date, default: Date.now },
        totalHours: { type: Number },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },

    }
)

const timeMdodel = mongoose.model("Time", timeSchema);

export default timeMdodel;