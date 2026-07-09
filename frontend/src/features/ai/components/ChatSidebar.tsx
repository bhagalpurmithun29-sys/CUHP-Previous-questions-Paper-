import React from 'react';
import { useConversations, useDeleteConversation } from '../hooks/useConversation';
import { FiMessageSquare, FiPlus, FiTrash2, FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

interface ChatSidebarProps {
  currentConversationId?: string;
  onNewChat: () => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({ currentConversationId, onNewChat }) => {
  const { data: conversations, isLoading } = useConversations();
  const deleteMutation = useDeleteConversation();
  const navigate = useNavigate();

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteMutation.mutate(id, {
      onSuccess: () => {
        if (currentConversationId === id) {
          navigate('/ai');
        }
      }
    });
  };

  return (
    <div className="w-64 sm:w-72 md:w-80 h-full bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col shrink-0">
      
      <div className="p-4">
        <button 
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-sm"
        >
          <FiPlus className="w-5 h-5" />
          <span>New Chat</span>
        </button>
      </div>

      <div className="px-4 pb-2 relative">
        <FiSearch className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-400" />
        <input 
          type="text" 
          placeholder="Search history..." 
          className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider px-3 py-2">Recent</div>
        
        {isLoading ? (
          <div className="p-4 text-center text-sm text-gray-500">Loading history...</div>
        ) : conversations?.length === 0 ? (
          <div className="p-4 text-center text-sm text-gray-500">No recent conversations</div>
        ) : (
          conversations?.map((conv: any) => (
            <div 
              key={conv.conversationId}
              onClick={() => navigate(`/ai/${conv.conversationId}`)}
              className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                currentConversationId === conv.conversationId 
                  ? 'bg-primary/10 text-primary dark:bg-primary/20' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <FiMessageSquare className="shrink-0 text-gray-400 group-hover:text-primary transition-colors" />
                <span className="truncate text-sm font-medium">{conv.title}</span>
              </div>
              <button 
                onClick={(e) => handleDelete(e, conv.conversationId)}
                className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-all"
                title="Delete Conversation"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
