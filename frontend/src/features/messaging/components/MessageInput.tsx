import React, { useState } from 'react';

export const MessageInput: React.FC<{ onSend: (content: string) => void }> = ({ onSend }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSend(content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex items-center gap-3">
      <button type="button" className="p-2 text-gray-500 hover:text-indigo-600 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
      </button>
      <input 
        type="text" 
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 bg-gray-100 dark:bg-gray-800 border-transparent rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white"
      />
      <button 
        type="submit" 
        disabled={!content.trim()}
        className="p-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full transition-colors flex items-center justify-center"
      >
        <svg className="w-4 h-4 translate-x-[1px] translate-y-[1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
      </button>
    </form>
  );
};
