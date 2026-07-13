import React from 'react';
import { useTasks } from '../hooks/useTasks';

export const KanbanBoard: React.FC<{ tasks: any[] }> = ({ tasks }) => {
  const columns = ['PENDING', 'ASSIGNED', 'IN_PROGRESS', 'WAITING_REVIEW', 'COMPLETED'];
  
  const { updateStatus } = useTasks();

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDrop = (e: React.DragEvent, status: string) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      updateStatus.mutate({ id: taskId, status });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex h-full gap-4 overflow-x-auto pb-4 pt-2">
      {columns.map(col => (
        <div 
          key={col}
          onDrop={(e) => handleDrop(e, col)}
          onDragOver={handleDragOver}
          className="bg-gray-100 dark:bg-gray-800/50 rounded-xl w-[320px] flex-shrink-0 flex flex-col p-4 border border-gray-200 dark:border-gray-800"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
              {col.replace('_', ' ')}
            </h3>
            <span className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-0.5 rounded-full font-medium">
              {tasks.filter(t => t.status === col).length}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3">
            {tasks.filter(t => t.status === col).map(task => (
              <div 
                key={task._id}
                draggable
                onDragStart={(e) => handleDragStart(e, task._id)}
                className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 cursor-grab active:cursor-grabbing hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase \${
                    task.priority === 'CRITICAL' ? 'bg-red-100 text-red-700' :
                    task.priority === 'HIGH' ? 'bg-orange-100 text-orange-700' :
                    task.priority === 'MEDIUM' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {task.priority}
                  </span>
                  <span className="text-xs text-gray-500">{new Date(task.createdAt).toLocaleDateString()}</span>
                </div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">{task.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{task.description}</p>
                
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-[10px] font-medium text-gray-500 uppercase">{task.type.replace('_', ' ')}</span>
                  {task.assignedTo ? (
                    <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold" title={`\${task.assignedTo.firstName} \${task.assignedTo.lastName}`}>
                      {task.assignedTo.firstName[0]}
                    </div>
                  ) : (
                    <span className="text-[10px] text-gray-400 italic">Unassigned</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
