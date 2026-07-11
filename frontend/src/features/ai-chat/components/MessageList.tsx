import React, { useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import { SparklesIcon } from '@heroicons/react/24/outline';

interface MessageListProps {
  messages: any[];
  isStreaming: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, isStreaming }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <SparklesIcon className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Enterprise Academic AI Assistant
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
          Ask me anything about the CUHP Question Bank repository. I can summarize topics, analyze trends, or help you find specific papers.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl w-full">
          {[
            "Summarize the recent patterns in DBMS exams",
            "What are the most difficult topics in Operating Systems?",
            "Find papers related to Artificial Intelligence from 2023",
            "Explain Bloom's Taxonomy distribution in Physics papers"
          ].map((suggestion, idx) => (
            <div key={idx} className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm text-gray-600 dark:text-gray-300 text-left">
              "{suggestion}"
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 scroll-smooth">
      <div className="max-w-4xl mx-auto">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={bottomRef} className="h-4" />
      </div>
    </div>
  );
};
