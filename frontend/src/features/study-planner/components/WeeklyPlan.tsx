import React from 'react';
import { motion } from 'framer-motion';

interface WeeklyPlanProps {
  tasks: any[];
}

export const WeeklyPlan: React.FC<WeeklyPlanProps> = ({ tasks }) => {
  if (!tasks || tasks.length === 0) return <div>No tasks scheduled for this week.</div>;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">This Week's Schedule</h3>
      <div className="space-y-3">
        {tasks.map((task, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }}
            className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
          >
            <div>
              <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{task.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{new Date(task.date).toLocaleDateString()} • {task.durationMinutes} mins • {task.type}</p>
            </div>
            <div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${task.status === 'COMPLETED' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                {task.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
