import React, { useState } from 'react';
import { useAIChat } from '../hooks/useAIChat';
import { FiSend } from 'react-icons/fi';

interface ChatInputProps {
  conversationId?: string;
  onSend: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ conversationId, onSend, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    onSend(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto relative flex items-center">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={isLoading}
          placeholder={isLoading ? "AI is thinking..." : "Ask me about CUHP question papers, syllabus, or exam patterns..."}
          className="w-full pl-6 pr-14 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="absolute right-2 p-2.5 bg-primary text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-dark transition-colors"
        >
          <FiSend className="w-5 h-5" />
        </button>
      </div>
      <div className="text-center mt-2">
        <span className="text-xs text-gray-400">AI can make mistakes. Consider verifying important academic information.</span>
      </div>
    </form>
  );
};
