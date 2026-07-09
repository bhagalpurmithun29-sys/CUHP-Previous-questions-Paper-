import React from 'react';
import { StudyTask, useUpdateTaskProgress } from '../hooks/useStudyPlanner';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

export const DailyTasks: React.FC<{ tasks: StudyTask[], planId: string }> = ({ tasks, planId }) => {
  const { mutate: updateStatus } = useUpdateTaskProgress();

  const today = new Date().toDateString();
  const todaysTasks = tasks.filter(t => new Date(t.date).toDateString() === today);

  const toggleStatus = (task: StudyTask) => {
    const newStatus = task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
    updateStatus({ planId, taskId: task._id, status: newStatus });
  };

  return (
    <div className="bg-card text-card-foreground p-6 rounded-2xl border shadow-sm">
      <h3 className="text-xl font-display font-semibold mb-4">Today's Study Plan</h3>
      
      {todaysTasks.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">No tasks scheduled for today. Take a break!</p>
      ) : (
        <div className="space-y-3">
          {todaysTasks.map(task => (
            <div 
              key={task._id} 
              className={`p-4 rounded-xl border flex items-start gap-4 transition-colors \${task.status === 'COMPLETED' ? 'bg-success/5 border-success/20' : 'bg-background hover:border-primary/50'}`}
            >
              <button onClick={() => toggleStatus(task)} className="mt-1 flex-shrink-0">
                {task.status === 'COMPLETED' ? (
                  <CheckCircle2 className="w-6 h-6 text-success" />
                ) : (
                  <Circle className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
                )}
              </button>
              
              <div className="flex-1">
                <h4 className={`font-medium \${task.status === 'COMPLETED' ? 'line-through text-muted-foreground' : ''}`}>
                  {task.title}
                </h4>
                <div className="flex items-center gap-3 mt-2 text-xs font-medium text-muted-foreground">
                  <span className="px-2 py-1 bg-secondary/10 text-secondary rounded-md">{task.type}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {task.durationMinutes} min
                  </span>
                  <span className="truncate max-w-[150px]">{task.topic}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
