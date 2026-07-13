import React, { useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { TypingIndicator } from './TypingIndicator';
import { useMessaging } from '../hooks/useMessaging';

export const ChatWindow: React.FC<{ conversationId: string }> = ({ conversationId }) => {
  const { messages, isLoadingMessages, sendMessage } = useMessaging(conversationId);
  const bottomRef = useRef<HTMLDivElement>(null);

  // We mock the user ID here for demonstration
  const myUserId = 'MOCK_USER_ID';

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (content: string) => {
    sendMessage.mutate({ conversationId, content, type: 'TEXT' });
  };

  if (isLoadingMessages) {
    return <div className="flex-1 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>;
  }

  // Ensure messages array exists and reverse for correct display order if API returns newest first
  const displayMessages = [...(messages || [])].reverse();

  return (
    <div className="flex-1 flex flex-col h-full bg-[#f8f9fb] dark:bg-[#0f1115]">
      {/* Header */}
      <div className="px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600">#</div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Active Conversation</h3>
            <p className="text-xs text-green-500 font-medium">Online</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
        {displayMessages.map((msg: any) => (
          <MessageBubble key={msg._id} message={msg} isMine={msg.senderId?._id === myUserId} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Typing Indicator */}
      <div className="px-6 pb-2">
        <TypingIndicator usersTyping={[]} />
      </div>

      {/* Input */}
      <MessageInput onSend={handleSend} />
    </div>
  );
};
