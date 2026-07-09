import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChatLayout } from '../components/ChatLayout';
import { ChatMessage } from '../components/ChatMessage';
import { ChatInput } from '../components/ChatInput';
import { useConversation } from '../hooks/useConversation';
import { useAIChat } from '../hooks/useAIChat';
import { FiCpu } from 'react-icons/fi';

export const AIAssistantPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: conversation, isLoading: isConvLoading } = useConversation(id || '');
  const chatMutation = useAIChat();

  const [localMessages, setLocalMessages] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (conversation) {
      setLocalMessages(conversation.messages || []);
    } else if (!id) {
      setLocalMessages([]); // New chat
    }
  }, [conversation, id]);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [localMessages, chatMutation.isPending]);

  const handleSend = (message: string) => {
    // Optimistic UI update
    const userMsg = { role: 'user', content: message, timestamp: new Date() };
    setLocalMessages(prev => [...prev, userMsg]);

    chatMutation.mutate({ message, conversationId: id }, {
      onSuccess: (data) => {
        if (!id && data.conversationId) {
          // If this was a new chat, redirect to the newly created conversation ID
          navigate(`/ai/${data.conversationId}`, { replace: true });
        } else {
          // Append assistant message
          setLocalMessages(prev => [...prev, { role: 'assistant', content: data.reply, timestamp: new Date() }]);
        }
      },
      onError: () => {
        // Rollback on error or show error bubble
        setLocalMessages(prev => [...prev, { role: 'system', content: 'An error occurred while connecting to AI Gateway. Please try again.', timestamp: new Date() }]);
      }
    });
  };

  return (
    <ChatLayout currentConversationId={id}>
      <div className="flex-1 overflow-y-auto relative scroll-smooth" ref={scrollRef}>
        
        {isConvLoading && id ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : localMessages.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center h-full px-4 text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-6 text-primary">
              <FiCpu className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">CUHP AI Assistant</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
              Your intelligent companion for academic research. I can help you find past papers, understand complex concepts, and analyze academic trends.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl w-full">
              {['Find question papers for BCA 3rd Sem', 'Summarize the syllabus for M.Sc Physics', 'What are the frequently asked questions in AI?', 'Create a study plan for Data Structures'].map((q, i) => (
                <button 
                  key={i}
                  onClick={() => handleSend(q)}
                  className="p-4 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800/50 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-medium text-left text-gray-700 dark:text-gray-300 transition-colors"
                >
                  "{q}"
                </button>
              ))}
            </div>
          </div>
        ) : (
          // Chat Messages
          <div className="pb-8">
            {localMessages.map((msg, idx) => (
              <ChatMessage key={idx} role={msg.role} content={msg.content} />
            ))}
            
            {chatMutation.isPending && (
              <div className="flex w-full justify-start py-4 px-4 sm:px-8">
                <div className="flex max-w-4xl gap-4 flex-row w-full">
                  <div className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-sm">
                    <FiCpu className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="px-5 py-3.5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <ChatInput 
        conversationId={id} 
        onSend={handleSend} 
        isLoading={chatMutation.isPending} 
      />
    </ChatLayout>
  );
};
