import React from 'react';
import { useAISafety } from '../hooks/useAISafety';

interface ModerationQueueProps {
  queue: any[];
}

export const ModerationQueue: React.FC<ModerationQueueProps> = ({ queue }) => {
  const { moderateItem } = useAISafety();

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          Moderation Queue 
          {queue?.length > 0 && (
            <span className="bg-red-100 text-red-700 text-[10px] px-2 py-0.5 rounded-full font-bold">{queue.length}</span>
          )}
        </h3>
      </div>

      {!queue || queue.length === 0 ? (
        <div className="text-center py-8 text-gray-500 text-sm">
          No items pending moderation.
        </div>
      ) : (
        <div className="space-y-4">
          {queue.map(item => (
            <div key={item.id} className="p-4 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800/30 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-100 dark:bg-orange-900/40 dark:text-orange-400 px-2 py-0.5 rounded">
                  {item.type} Flag
                </span>
                <span className="text-[10px] text-gray-500">{new Date(item.timestamp).toLocaleTimeString()}</span>
              </div>
              <p className="text-xs font-semibold text-gray-900 dark:text-white mb-2">Reason: {item.reason}</p>
              <div className="text-xs font-mono text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-950 p-2 rounded border border-gray-100 dark:border-gray-800 line-clamp-3 mb-4">
                {item.content}
              </div>
              <div className="flex gap-2 justify-end">
                <button 
                  onClick={() => moderateItem.mutate({ itemId: item.id, resolution: 'REJECTED' })}
                  disabled={moderateItem.isPending}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded transition-colors"
                >
                  Reject & Block
                </button>
                <button 
                  onClick={() => moderateItem.mutate({ itemId: item.id, resolution: 'APPROVED' })}
                  disabled={moderateItem.isPending}
                  className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded transition-colors"
                >
                  Approve Output
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
