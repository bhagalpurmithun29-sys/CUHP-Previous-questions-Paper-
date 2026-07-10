import React from 'react';
import { FiFile, FiTag, FiClock, FiRotateCcw } from 'react-icons/fi';

export const VersionTimeline: React.FC<{ history: any[], onRestore: (id: string) => void }> = ({ history, onRestore }) => {
  if (!history || history.length === 0) {
    return <div className="text-gray-500 text-sm py-4 text-center">No version history available.</div>;
  }

  return (
    <div className="relative border-l-2 border-gray-200 dark:border-gray-700 ml-4 py-2">
      {history.map((event, index) => (
        <div key={event.id} className="mb-8 ml-8 relative group">
          <span className={`absolute flex items-center justify-center w-9 h-9 rounded-full -left-12 ring-4 ring-white dark:ring-gray-900 
            ${event.type === 'FILE_CHANGE' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400' : 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400'}
          `}>
            {event.type === 'FILE_CHANGE' ? <FiFile size={16} /> : <FiTag size={16} />}
          </span>
          
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md">
            <div className="flex flex-wrap justify-between items-start mb-3 gap-2">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center text-base">
                {event.type === 'FILE_CHANGE' ? `Version ${event.versionNumber}` : 'Metadata Update'}
                {index === 0 && <span className="ml-3 px-2.5 py-0.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold rounded-full tracking-wide">LATEST</span>}
              </h3>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center bg-gray-50 dark:bg-gray-700/50 px-2 py-1 rounded">
                <FiClock className="mr-1.5" /> {new Date(event.timestamp).toLocaleString()}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{event.details}</p>
            
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-4 font-medium">
              By: {event.author?.firstName || 'System'} {event.author?.lastName || ''}
            </div>

            {event.type === 'FILE_CHANGE' && index !== 0 && (
              <button 
                onClick={() => onRestore(event.id)}
                className="text-xs font-semibold bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-3.5 py-2 rounded-lg transition-colors flex items-center shadow-sm"
              >
                <FiRotateCcw className="mr-2" /> Restore This Version
              </button>
            )}
            
            {event.type === 'METADATA_CHANGE' && event.changes && (
              <div className="mt-4 bg-gray-50 dark:bg-gray-900/40 rounded-lg p-3.5 text-xs border border-gray-200 dark:border-gray-700/60 font-mono">
                {event.changes.map((change: any, i: number) => (
                  <div key={i} className="mb-1.5 last:mb-0 flex flex-wrap items-center gap-1.5">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">{change.field}:</span>
                    <span className="text-red-500 dark:text-red-400 line-through bg-red-50 dark:bg-red-900/20 px-1 rounded">{JSON.stringify(change.oldValue)}</span>
                    <span className="text-gray-400">→</span>
                    <span className="text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-1 rounded font-medium">{JSON.stringify(change.newValue)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
