import React from 'react';
import { FiUser, FiCpu } from 'react-icons/fi';

interface ChatMessageProps {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ role, content }) => {
  if (role === 'system') return null;

  const isUser = role === 'user';

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} py-4 px-4 sm:px-8`}>
      <div className={`flex max-w-4xl gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'} w-full`}>
        
        {/* Avatar */}
        <div className={`shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white shadow-sm ${isUser ? 'bg-primary' : 'bg-gradient-to-br from-indigo-500 to-purple-600'}`}>
          {isUser ? <FiUser className="w-5 h-5" /> : <FiCpu className="w-5 h-5" />}
        </div>
        
        {/* Message Bubble */}
        <div className={`px-5 py-3.5 rounded-2xl shadow-sm overflow-hidden ${
          isUser 
            ? 'bg-primary text-white rounded-tr-sm' 
            : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 rounded-tl-sm'
        }`}>
          {/* Very basic markdown support placeholder (Replace with react-markdown in production) */}
          <div className="whitespace-pre-wrap leading-relaxed text-sm sm:text-base">
            {content}
          </div>
        </div>
        
      </div>
    </div>
  );
};
