import React, { useState } from 'react';
import { ConversationSidebar } from '../components/ConversationSidebar';
import { ChatWindow } from '../components/ChatWindow';
import { useMessaging } from '../hooks/useMessaging';

export const MessagingPage: React.FC = () => {
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const { conversations, isLoadingConvs } = useMessaging();

  return (
    <div className="h-[calc(100vh-64px)] flex bg-white dark:bg-gray-900 overflow-hidden">
      {/* Sidebar */}
      <div className={`w-full md:w-[350px] lg:w-[400px] flex-shrink-0 \${activeConversationId ? 'hidden md:block' : 'block'}`}>
        {isLoadingConvs ? (
          <div className="p-6 flex justify-center"><div className="animate-spin h-6 w-6 border-b-2 border-indigo-600 rounded-full"></div></div>
        ) : (
          <ConversationSidebar 
            conversations={conversations} 
            activeId={activeConversationId || ''} 
            setActive={setActiveConversationId} 
          />
        )}
      </div>

      {/* Main Chat Area */}
      <div className={`flex-1 \${!activeConversationId ? 'hidden md:flex' : 'flex'}`}>
        {activeConversationId ? (
          <ChatWindow conversationId={activeConversationId} />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 text-gray-500 dark:text-gray-400">
            <svg className="w-16 h-16 mb-4 text-gray-300 dark:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            <p className="text-lg font-medium text-gray-900 dark:text-white">Your Messages</p>
            <p className="text-sm">Select a conversation or start a new one</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagingPage;
