import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { AIAssistantPanel } from './AIAssistantPanel';
import { motion } from 'framer-motion';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 font-sans overflow-hidden selection:bg-primary/30">
      <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
      
      <div className="flex-1 flex flex-col overflow-hidden min-w-0 relative">
        <TopNavbar 
          onMobileMenuClick={() => setIsSidebarCollapsed(false)} 
          isAiPanelOpen={isAiPanelOpen}
          setIsAiPanelOpen={setIsAiPanelOpen}
        />
        
        <main className="flex-1 overflow-y-auto bg-gray-50/50 dark:bg-gray-950 p-4 lg:p-8 scroll-smooth scrollbar-hide relative z-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-7xl mx-auto w-full pb-20"
          >
            {children}
          </motion.div>
        </main>
        
        {/* Status Bar */}
        <div className="absolute bottom-0 inset-x-0 h-8 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 text-xs text-gray-500 z-10 shrink-0">
          <div className="flex gap-4">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500"></span> System Online</span>
            <span className="hidden sm:inline">Version 2.4.0</span>
          </div>
          <div className="flex gap-4">
            <span className="hidden sm:inline">Syncing completed just now</span>
          </div>
        </div>
      </div>

      <AIAssistantPanel isOpen={isAiPanelOpen} onClose={() => setIsAiPanelOpen(false)} />
    </div>
  );
};
