import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkflow extends Document {
  name: string;
  description: string;
  triggerEvent: string; // e.g., PAPER_UPLOADED
  steps: {
    order: number;
    taskType: string;
    assignToRole: string;
    autoApproveConditions?: any;
  }[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const WorkflowSchema = new Schema<IWorkflow>({
  name: { type: String, required: true },
  description: String,
  triggerEvent: { type: String, required: true, index: true },
  steps: [{
    order: Number,
    taskType: String,
    assignToRole: String,
    autoApproveConditions: Schema.Types.Mixed
  }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export const Workflow = mongoose.model<IWorkflow>('Workflow', WorkflowSchema);
