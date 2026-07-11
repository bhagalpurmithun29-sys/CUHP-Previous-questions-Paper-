import React, { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon, StopIcon } from '@heroicons/react/24/solid';
import { SparklesIcon } from '@heroicons/react/24/outline';
import TextareaAutosize from 'react-textarea-autosize';

interface ChatInputProps {
  onSend: (message: string) => void;
  isStreaming: boolean;
  statusMessage?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, isStreaming, statusMessage }) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isStreaming) {
      inputRef.current?.focus();
    }
  }, [isStreaming]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isStreaming) {
      onSend(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="relative max-w-4xl mx-auto w-full px-4 pb-6">
      <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
        
        {isStreaming && statusMessage && (
          <div className="absolute -top-8 left-4 flex items-center gap-2 text-xs font-medium text-gray-500 animate-pulse">
            <SparklesIcon className="w-4 h-4 text-primary" />
            {statusMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex items-end gap-2 p-3">
          <TextareaAutosize
            ref={inputRef}
            minRows={1}
            maxRows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isStreaming}
            placeholder="Ask about academic papers, patterns, or topics..."
            className="flex-1 resize-none bg-transparent border-0 focus:ring-0 text-gray-900 dark:text-gray-100 placeholder-gray-400 py-2.5 px-2"
          />
          
          <button
            type="submit"
            disabled={!message.trim() || isStreaming}
            className={`p-3 rounded-xl shrink-0 flex items-center justify-center transition-all ${
              message.trim() && !isStreaming
                ? 'bg-primary text-white hover:bg-primary-dark hover:shadow-md'
                : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600 cursor-not-allowed'
            }`}
          >
            {isStreaming ? (
              <StopIcon className="w-5 h-5 animate-pulse" />
            ) : (
              <PaperAirplaneIcon className="w-5 h-5" />
            )}
          </button>
        </form>
      </div>
      
      <div className="text-center mt-3 text-xs text-gray-400 dark:text-gray-500">
        AI Chat may produce inaccurate information about academics. Verify with official CUHP resources.
      </div>
    </div>
  );
};
