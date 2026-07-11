import React from 'react';
import { ConversationList } from './ConversationList';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { useAIChat } from '../hooks/useAIChat';

export const ChatLayout: React.FC = () => {
  const {
    conversationId,
    setConversationId,
    messages,
    isStreaming,
    statusMessage,
    sendMessageStream,
    clearConversation
  } = useAIChat();

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-white dark:bg-gray-950 overflow-hidden">
      {/* Sidebar */}
      <ConversationList 
        currentId={conversationId} 
        onSelect={setConversationId}
        onNew={clearConversation}
      />
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative h-full">
        {/* Messages */}
        <MessageList messages={messages} isStreaming={isStreaming} />
        
        {/* Input Area */}
        <div className="shrink-0 bg-gradient-to-t from-white via-white to-transparent dark:from-gray-950 dark:via-gray-950 pt-8 pb-4">
          <ChatInput 
            onSend={sendMessageStream} 
            isStreaming={isStreaming} 
            statusMessage={statusMessage} 
          />
        </div>
      </div>
    </div>
  );
};
