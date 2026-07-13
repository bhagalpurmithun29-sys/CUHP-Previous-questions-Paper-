import React from 'react';

interface EvaluationQueueProps {
  queue: any[];
  onSelect: (item: any) => void;
  selectedId?: string;
}

export const EvaluationQueue: React.FC<EvaluationQueueProps> = ({ queue, onSelect, selectedId }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800">
        <h3 className="font-bold text-gray-900 dark:text-white">Human Eval Queue</h3>
        <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-xs font-bold">{queue?.length || 0} Pending</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {!queue || queue.length === 0 ? (
          <div className="text-sm text-gray-500 text-center py-8">Queue is empty.</div>
        ) : (
          queue.map(item => (
            <div 
              key={item.id} 
              onClick={() => onSelect(item)}
              className={`p-3 border rounded-lg cursor-pointer transition-colors \${selectedId === item.id ? 'bg-indigo-50 border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800' : 'bg-white border-gray-100 hover:border-indigo-100 dark:bg-gray-950 dark:border-gray-800 dark:hover:border-gray-700'}`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded \${item.type === 'THUMBS_DOWN' || item.type === 'REPORT' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                  {item.type.replace('_', ' ')}
                </span>
                <span className="text-[10px] text-gray-500">{new Date(item.timestamp).toLocaleDateString()}</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mt-2">{item.writtenFeedback || 'No written feedback provided.'}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
