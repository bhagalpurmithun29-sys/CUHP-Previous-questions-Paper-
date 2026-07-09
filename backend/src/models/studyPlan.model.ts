import mongoose, { Document, Schema } from 'mongoose';

export interface IStudyTask {
  _id: string;
  title: string;
  description?: string;
  topic: string;
  date: Date;
  durationMinutes: number;
  type: 'READING' | 'PRACTICE' | 'REVISION' | 'MOCK_TEST';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'MISSED';
  resourceId?: mongoose.Types.ObjectId; // QuestionPaper ID
}

export interface IStudyGoal {
  type: 'EXAM' | 'SEMESTER' | 'REVISION' | 'MASTERY' | 'CUSTOM';
  targetDate?: Date;
  subjectId?: mongoose.Types.ObjectId;
  description: string;
}

export interface IStudyPlan extends Document {
  userId: mongoose.Types.ObjectId;
  goal: IStudyGoal;
  startDate: Date;
  endDate: Date;
  dailyCommitmentMinutes: number;
  tasks: IStudyTask[];
  progress: {
    completedTasks: number;
    totalTasks: number;
    studyTimeMinutes: number;
    completionPercentage: number;
    streak: number;
    lastActiveDate?: Date;
  };
  isActive: boolean;
  generatedByAI: boolean;
}

const StudyTaskSchema = new Schema<IStudyTask>({
  title: { type: String, required: true },
  description: { type: String },
  topic: { type: String, required: true },
  date: { type: Date, required: true },
  durationMinutes: { type: Number, required: true, min: 10 },
  type: { type: String, enum: ['READING', 'PRACTICE', 'REVISION', 'MOCK_TEST'], required: true },
  status: { type: String, enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'MISSED'], default: 'PENDING' },
  resourceId: { type: Schema.Types.ObjectId, ref: 'QuestionPaper' }
});

const StudyGoalSchema = new Schema<IStudyGoal>({
  type: { type: String, enum: ['EXAM', 'SEMESTER', 'REVISION', 'MASTERY', 'CUSTOM'], required: true },
  targetDate: { type: Date },
  subjectId: { type: Schema.Types.ObjectId, ref: 'Subject' },
  description: { type: String, required: true }
});

const StudyPlanSchema = new Schema<IStudyPlan>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    goal: { type: StudyGoalSchema, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    dailyCommitmentMinutes: { type: Number, required: true, min: 15 },
    tasks: [StudyTaskSchema],
    progress: {
      completedTasks: { type: Number, default: 0 },
      totalTasks: { type: Number, default: 0 },
      studyTimeMinutes: { type: Number, default: 0 },
      completionPercentage: { type: Number, default: 0 },
      streak: { type: Number, default: 0 },
      lastActiveDate: { type: Date }
    },
    isActive: { type: Boolean, default: true, index: true },
    generatedByAI: { type: Boolean, default: true }
  },
  { timestamps: true }
);

// Pre-save to auto calculate progress
StudyPlanSchema.pre('save', function(next) {
  if (this.tasks && this.tasks.length > 0) {
    this.progress.totalTasks = this.tasks.length;
    this.progress.completedTasks = this.tasks.filter(t => t.status === 'COMPLETED').length;
    this.progress.completionPercentage = Math.round((this.progress.completedTasks / this.progress.totalTasks) * 100);
    
    // Calculate total study time
    this.progress.studyTimeMinutes = this.tasks
      .filter(t => t.status === 'COMPLETED')
      .reduce((acc, task) => acc + task.durationMinutes, 0);
  }
  next();
});

export const StudyPlan = mongoose.model<IStudyPlan>('StudyPlan', StudyPlanSchema);
