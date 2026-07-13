import React from 'react';

export const TypingIndicator: React.FC<{ usersTyping: string[] }> = ({ usersTyping }) => {
  if (usersTyping.length === 0) return null;
  
  return (
    <div className="flex items-center gap-2 p-2 text-xs text-gray-500 dark:text-gray-400 italic">
      <div className="flex gap-1">
        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
      <span>{usersTyping.join(', ')} {usersTyping.length > 1 ? 'are' : 'is'} typing...</span>
    </div>
  );
};
