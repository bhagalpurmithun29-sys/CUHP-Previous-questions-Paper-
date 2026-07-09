import React, { useState } from 'react';
import { ChatSidebar } from './ChatSidebar';
import { FiMenu, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

interface ChatLayoutProps {
  children: React.ReactNode;
  currentConversationId?: string;
}

export const ChatLayout: React.FC<ChatLayoutProps> = ({ children, currentConversationId }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-white dark:bg-gray-950 relative">
      
      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 md:relative transform transition-transform duration-300 ease-in-out ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <ChatSidebar 
          currentConversationId={currentConversationId} 
          onNewChat={() => {
            setMobileOpen(false);
            navigate('/ai');
          }}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <button 
            onClick={() => setMobileOpen(true)}
            className="p-2 -ml-2 mr-3 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <FiMenu className="w-6 h-6" />
          </button>
          <h1 className="font-bold text-gray-900 dark:text-white truncate">CUHP AI Assistant</h1>
        </div>

        {children}
      </div>
    </div>
  );
};
