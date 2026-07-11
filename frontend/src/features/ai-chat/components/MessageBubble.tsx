import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { CitationPanel } from './CitationPanel';

interface MessageBubbleProps {
  message: {
    role: 'user' | 'assistant' | 'system';
    content: string;
    citations?: any[];
  };
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <div className={`flex gap-4 max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <div className="shrink-0 pt-1">
          {isUser ? (
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <UserCircleIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <SparklesIcon className="w-5 h-5 text-primary" />
            </div>
          )}
        </div>

        {/* Message Content */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`px-5 py-3.5 rounded-2xl ${
            isUser 
              ? 'bg-primary text-white rounded-tr-sm' 
              : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-tl-sm text-gray-900 dark:text-gray-100 shadow-sm'
          }`}>
            <div className={`prose prose-sm max-w-none ${isUser ? 'prose-invert' : 'dark:prose-invert'} prose-p:leading-relaxed prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-a:text-primary dark:prose-a:text-primary-light hover:prose-a:text-primary-dark`}>
              <ReactMarkdown 
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                  a: ({node, ...props}) => <a {...props} target="_blank" rel="noopener noreferrer" />
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
          
          {/* Citations Panel */}
          {!isUser && message.citations && message.citations.length > 0 && (
            <div className="mt-2 w-full">
               <CitationPanel citations={message.citations} />
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
