import React, { useState } from 'react';
import { useStudyPlanner } from '../hooks/useStudyPlanner';

export const GoalManager: React.FC = () => {
  const { createGoal } = useStudyPlanner();
  const [goalType, setGoalType] = useState('EXAM');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    await createGoal.mutateAsync({ type: goalType, description, durationDays: 30, dailyMinutes: 60 });
    setDescription('');
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Set a New Learning Goal</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Goal Type</label>
          <select 
            value={goalType} 
            onChange={(e) => setGoalType(e.target.value)}
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
          >
            <option value="EXAM">Prepare for Exam</option>
            <option value="SEMESTER">Semester Coverage</option>
            <option value="REVISION">Revision</option>
            <option value="MASTERY">Topic Mastery</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
          <input 
            type="text" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="E.g., Complete OS and DBMS"
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
          />
        </div>
        <button 
          type="submit"
          disabled={createGoal.isPending || !description.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
        >
          {createGoal.isPending ? 'Generating Plan...' : 'Generate AI Plan'}
        </button>
      </form>
    </div>
  );
};
