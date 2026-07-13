import React from 'react';

export const MessageBubble: React.FC<{ message: any, isMine: boolean }> = ({ message, isMine }) => {
  return (
    <div className={`flex \${isMine ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] \${isMine ? 'bg-indigo-600 text-white rounded-l-2xl rounded-tr-2xl' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-r-2xl rounded-tl-2xl'} px-4 py-2.5 shadow-sm`}>
        {!isMine && (
          <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1">
            {message.senderId?.firstName} {message.senderId?.lastName}
          </p>
        )}
        <p className="text-sm break-words whitespace-pre-wrap">{message.content}</p>
        
        {message.attachments?.length > 0 && (
          <div className="mt-2 space-y-1">
            {message.attachments.map((att: any, i: number) => (
              <a key={i} href={att.url} target="_blank" rel="noreferrer" className="block text-xs font-medium underline opacity-80 hover:opacity-100">
                📎 {att.name}
              </a>
            ))}
          </div>
        )}
        
        <div className={`text-[10px] text-right mt-1 opacity-70 \${isMine ? 'text-indigo-200' : 'text-gray-500'}`}>
          {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          {isMine && message.readBy?.length > 1 && ' ✓✓'}
        </div>
      </div>
    </div>
  );
};
