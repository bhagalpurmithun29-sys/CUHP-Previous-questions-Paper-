import React from 'react';
import { useAIChatHistory, useDeleteConversation } from '../hooks/useAIChat';
import { ChatBubbleLeftRightIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

interface ConversationListProps {
  currentId?: string;
  onSelect: (id: string) => void;
  onNew: () => void;
}

export const ConversationList: React.FC<ConversationListProps> = ({ currentId, onSelect, onNew }) => {
  const { data: history, isLoading } = useAIChatHistory();
  const deleteMutation = useDeleteConversation();

  return (
    <div className="w-72 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <button
          onClick={onNew}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors font-medium shadow-sm"
        >
          <PlusIcon className="w-5 h-5" />
          New Chat
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {isLoading ? (
          <div className="text-sm text-center text-gray-500 py-4">Loading history...</div>
        ) : !history || history.length === 0 ? (
          <div className="text-sm text-center text-gray-500 py-4">No recent chats</div>
        ) : (
          history.map((conv: any) => (
            <div
              key={conv.conversationId}
              className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                currentId === conv.conversationId
                  ? 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white'
                  : 'hover:bg-gray-200/50 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => onSelect(conv.conversationId)}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <ChatBubbleLeftRightIcon className="w-4 h-4 shrink-0 text-gray-400" />
                <span className="text-sm font-medium truncate">{conv.title}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteMutation.mutate(conv.conversationId);
                }}
                className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-opacity"
                title="Delete Chat"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
