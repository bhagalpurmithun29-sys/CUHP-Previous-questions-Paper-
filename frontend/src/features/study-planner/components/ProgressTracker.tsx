import React from 'react';

export const ProgressTracker: React.FC<{ 
  completionPercentage: number; 
  completedTasks: number; 
  totalTasks: number;
  streak: number;
}> = ({ completionPercentage, completedTasks, totalTasks, streak }) => {
  return (
    <div className="bg-card text-card-foreground p-6 rounded-2xl border shadow-sm">
      <h3 className="text-xl font-display font-semibold mb-4">Plan Progress</h3>
      
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium text-muted-foreground">Overall Completion</span>
          <span className="font-bold">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <div 
            className="bg-primary h-3 rounded-full transition-all duration-500" 
            style={{ width: `\${completionPercentage}%` }}
          ></div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {completedTasks} of {totalTasks} tasks completed
        </p>
      </div>

      <div className="flex items-center gap-4 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
        <div className="text-3xl">🔥</div>
        <div>
          <h4 className="font-bold text-orange-600 dark:text-orange-400">Current Streak</h4>
          <p className="text-sm font-medium text-orange-700/80 dark:text-orange-300/80">{streak} tasks in a row!</p>
        </div>
      </div>
    </div>
  );
};
