import React, { useState } from 'react';
import { CreateTicketForm } from '../components/CreateTicketForm';
import { TicketList } from '../components/TicketList';
import { FiMessageCircle, FiPlus } from 'react-icons/fi';

export const SupportCenterPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'my_tickets' | 'new_ticket'>('my_tickets');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
            <FiMessageCircle className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Support Center</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Need help with your account, uploading papers, or reporting an issue? Submit a ticket and our team will get back to you.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('my_tickets')}
            className={`px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'my_tickets' ? 'bg-primary text-white shadow-md' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            My Tickets
          </button>
          <button 
            onClick={() => setActiveTab('new_ticket')}
            className={`px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === 'new_ticket' ? 'bg-primary text-white shadow-md' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            <FiPlus /> New Ticket
          </button>
        </div>

        <div className="max-w-4xl mx-auto">
          {activeTab === 'my_tickets' ? (
            <TicketList />
          ) : (
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create Support Ticket</h2>
              <CreateTicketForm onSuccess={() => setActiveTab('my_tickets')} />
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
