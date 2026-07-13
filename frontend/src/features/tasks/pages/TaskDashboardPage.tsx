import React, { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { KanbanBoard } from '../components/KanbanBoard';

export const TaskDashboardPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'KANBAN' | 'LIST'>('KANBAN');
  const { tasks, isLoading } = useTasks();

  return (
    <div className="h-[calc(100vh-64px)] bg-white dark:bg-gray-950 flex flex-col p-6 overflow-hidden">
      <header className="flex justify-between items-center mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Task & Workflow Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage academic operations and review pipelines.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <button 
              onClick={() => setViewMode('KANBAN')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors \${viewMode === 'KANBAN' ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-gray-600 dark:text-gray-400'}`}
            >
              Kanban
            </button>
            <button 
              onClick={() => setViewMode('LIST')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors \${viewMode === 'LIST' ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-gray-600 dark:text-gray-400'}`}
            >
              List
            </button>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
            + Create Task
          </button>
        </div>
      </header>

      <div className="flex-1 min-h-0">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          viewMode === 'KANBAN' ? (
            <KanbanBoard tasks={tasks} />
          ) : (
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 overflow-y-auto h-full">
              {/* List View Placeholder */}
              <p className="text-gray-500 dark:text-gray-400">List view is selected. (Render TaskList component here)</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TaskDashboardPage;
