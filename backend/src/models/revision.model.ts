import mongoose, { Document, Schema } from 'mongoose';

export interface ITopicProgress {
  topic: string;
  confidenceScore: number; // 0 to 100
  lastRevisedAt?: Date;
  isCompleted: boolean;
  notes?: string;
  priorityScore: number; // dynamically calculated
}

export interface ISubjectRevision extends Document {
  userId: mongoose.Types.ObjectId;
  subjectId: mongoose.Types.ObjectId;
  readinessScore: number; // 0 to 100
  lastReadinessCalculation: Date;
  topics: ITopicProgress[];
  targetExamDate?: Date;
  mode: 'NORMAL' | 'LAST_MINUTE_7_DAY' | 'LAST_MINUTE_3_DAY' | 'LAST_MINUTE_24_HR';
  checklist: {
    item: string;
    isDone: boolean;
  }[];
}

const TopicProgressSchema = new Schema<ITopicProgress>({
  topic: { type: String, required: true },
  confidenceScore: { type: Number, default: 0, min: 0, max: 100 },
  lastRevisedAt: { type: Date },
  isCompleted: { type: Boolean, default: false },
  notes: { type: String },
  priorityScore: { type: Number, default: 0 }
});

const SubjectRevisionSchema = new Schema<ISubjectRevision>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true, index: true },
    readinessScore: { type: Number, default: 0, min: 0, max: 100 },
    lastReadinessCalculation: { type: Date, default: Date.now },
    topics: [TopicProgressSchema],
    targetExamDate: { type: Date },
    mode: { 
      type: String, 
      enum: ['NORMAL', 'LAST_MINUTE_7_DAY', 'LAST_MINUTE_3_DAY', 'LAST_MINUTE_24_HR'],
      default: 'NORMAL'
    },
    checklist: [
      {
        item: String,
        isDone: { type: Boolean, default: false }
      }
    ]
  },
  { timestamps: true }
);

SubjectRevisionSchema.index({ userId: 1, subjectId: 1 }, { unique: true });

export const SubjectRevision = mongoose.model<ISubjectRevision>('SubjectRevision', SubjectRevisionSchema);
