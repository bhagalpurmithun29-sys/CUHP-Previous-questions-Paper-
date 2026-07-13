import React from 'react';
import { motion } from 'framer-motion';
import { ProgressOverview } from './ProgressOverview';
import { TopicPriorities } from './TopicPriorities';

interface StudyDashboardProps {
  data: any;
}

export const StudyDashboard: React.FC<StudyDashboardProps> = ({ data }) => {
  if (!data || !data.plan) return <div className="p-4 text-center text-gray-500">No active plan found. Please set a goal.</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="col-span-1 lg:col-span-2 space-y-6"
      >
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Current Goal: {data.plan.goal.type}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{data.plan.goal.description}</p>
          
          <ProgressOverview 
            weeklyCompleted={data.weeklyProgress.completed} 
            weeklyTotal={data.weeklyProgress.total} 
            monthlyCompleted={data.monthlyProgress.completed}
            monthlyTotal={data.monthlyProgress.total}
            overallCompletion={data.plan.progress.completionPercentage}
          />
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
        className="col-span-1 space-y-6"
      >
        <TopicPriorities />
      </motion.div>
    </div>
  );
};
