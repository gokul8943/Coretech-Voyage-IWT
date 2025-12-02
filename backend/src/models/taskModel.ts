import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
    title: string;
    description?: string;
    status: 'pending' | 'in-progress' | 'completed';
    assignedTo: mongoose.Types.ObjectId;
    dueDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
        status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
        assignedTo: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        dueDate: { type: Date },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);
const TaskModel = mongoose.model<ITask>('Task', taskSchema);
export default TaskModel;