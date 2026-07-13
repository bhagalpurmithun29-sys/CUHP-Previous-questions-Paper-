import mongoose, { Schema, Document } from 'mongoose';

export enum EventType {
  UNIVERSITY_EVENT = 'UNIVERSITY_EVENT',
  DEPARTMENT_EVENT = 'DEPARTMENT_EVENT',
  COURSE_EVENT = 'COURSE_EVENT',
  EXAMINATION = 'EXAMINATION',
  ASSIGNMENT_DEADLINE = 'ASSIGNMENT_DEADLINE',
  WORKSHOP = 'WORKSHOP',
  SEMINAR = 'SEMINAR',
  HOLIDAY = 'HOLIDAY',
  PERSONAL = 'PERSONAL'
}

export interface ICalendarEvent extends Document {
  title: string;
  description: string;
  eventType: EventType;
  
  startDate: Date;
  endDate: Date;
  isAllDay: boolean;
  timezone: string;
  
  location?: string;
  meetingLink?: string;
  
  isRecurring: boolean;
  recurrenceRule?: string; // RRULE format
  
  creatorId: mongoose.Types.ObjectId;
  targetDepartments?: mongoose.Types.ObjectId[];
  targetCourses?: mongoose.Types.ObjectId[];
  
  reminders: { minutesBefore: number; type: 'EMAIL' | 'IN_APP' | 'PUSH' }[];
  
  createdAt: Date;
  updatedAt: Date;
}

const CalendarEventSchema = new Schema<ICalendarEvent>({
  title: { type: String, required: true },
  description: { type: String },
  eventType: { type: String, enum: Object.values(EventType), required: true },
  
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isAllDay: { type: Boolean, default: false },
  timezone: { type: String, default: 'Asia/Kolkata' },
  
  location: String,
  meetingLink: String,
  
  isRecurring: { type: Boolean, default: false },
  recurrenceRule: String,
  
  creatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  targetDepartments: [{ type: Schema.Types.ObjectId, ref: 'Department' }],
  targetCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  
  reminders: [{
    minutesBefore: Number,
    type: { type: String, enum: ['EMAIL', 'IN_APP', 'PUSH'] }
  }]
}, { timestamps: true });

CalendarEventSchema.index({ startDate: 1, endDate: 1 });
CalendarEventSchema.index({ targetDepartments: 1 });

export const CalendarEvent = mongoose.model<ICalendarEvent>('CalendarEvent', CalendarEventSchema);
