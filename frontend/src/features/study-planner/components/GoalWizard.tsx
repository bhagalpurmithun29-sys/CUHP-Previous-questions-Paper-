import React, { useState } from 'react';
import { useGeneratePlan } from '../hooks/useStudyPlanner';

export const GoalWizard: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [goalType, setGoalType] = useState('EXAM');
  const [description, setDescription] = useState('');
  const [durationDays, setDurationDays] = useState(7);
  const [dailyMinutes, setDailyMinutes] = useState(120);

  const { mutate: generatePlan, isPending } = useGeneratePlan();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generatePlan(
      { type: goalType, description, durationDays, dailyMinutes },
      { onSuccess }
    );
  };

  return (
    <div className="bg-card text-card-foreground p-6 rounded-2xl border shadow-sm">
      <h3 className="text-xl font-display font-semibold mb-4">Create New AI Study Plan</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Goal Type</label>
          <select 
            className="w-full bg-background border rounded-lg px-4 py-2"
            value={goalType}
            onChange={(e) => setGoalType(e.target.value)}
          >
            <option value="EXAM">Upcoming Exam</option>
            <option value="SEMESTER">Semester Preparation</option>
            <option value="REVISION">Revision Plan</option>
            <option value="MASTERY">Subject Mastery</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">What are you studying for?</label>
          <input 
            type="text" 
            required
            className="w-full bg-background border rounded-lg px-4 py-2"
            placeholder="e.g. End semester exam for Data Structures"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Duration (Days)</label>
            <input 
              type="number" 
              min="1" max="90" required
              className="w-full bg-background border rounded-lg px-4 py-2"
              value={durationDays}
              onChange={(e) => setDurationDays(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Daily Prep (Mins)</label>
            <input 
              type="number" 
              min="15" max="600" required
              className="w-full bg-background border rounded-lg px-4 py-2"
              value={dailyMinutes}
              onChange={(e) => setDailyMinutes(parseInt(e.target.value))}
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isPending}
          className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
        >
          {isPending ? 'AI is generating your plan...' : 'Generate AI Study Plan'}
        </button>
      </form>
    </div>
  );
};
