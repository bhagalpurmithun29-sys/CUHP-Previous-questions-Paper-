import React, { useState } from 'react';
import { useTickets } from '../hooks/useSupport';
import { TicketStatusBadge } from './TicketStatusBadge';
import { Link } from 'react-router-dom';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { Pagination } from '../../../components/explorer/Pagination';

export const TicketList: React.FC = () => {
  const [query, setQuery] = useState({ page: 1, limit: 10, status: '', q: '' });
  const { data, isLoading } = useTickets(query);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const searchVal = (form.elements.namedItem('search') as HTMLInputElement).value;
    setQuery(prev => ({ ...prev, q: searchVal, page: 1 }));
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
      
      {/* Toolbar */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50 dark:bg-gray-800/20">
        <form onSubmit={handleSearch} className="relative w-full sm:w-96">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            name="search"
            type="text" 
            placeholder="Search tickets..."
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm"
          />
        </form>
        <select 
          value={query.status}
          onChange={(e) => setQuery(prev => ({ ...prev, status: e.target.value, page: 1 }))}
          className="w-full sm:w-auto px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm"
        >
          <option value="">All Statuses</option>
          <option value="Open">Open</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      {/* List */}
      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Loading tickets...</div>
        ) : data?.results?.length > 0 ? (
          data.results.map((ticket: any) => (
            <Link key={ticket._id} to={`/support/ticket/${ticket._id}`} className="block p-5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono text-gray-500">#{ticket.ticketNumber}</span>
                  <TicketStatusBadge status={ticket.status} />
                </div>
                <span className="text-xs text-gray-400">{new Date(ticket.createdAt).toLocaleDateString()}</span>
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">{ticket.subject}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{ticket.category} • {ticket.priority} Priority</p>
            </Link>
          ))
        ) : (
          <div className="p-8 text-center text-gray-500">No tickets found.</div>
        )}
      </div>

      {/* Pagination */}
      {data?.meta?.totalPages > 1 && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <Pagination 
            currentPage={query.page} 
            totalPages={data.meta.totalPages} 
            onPageChange={(page) => setQuery(prev => ({ ...prev, page }))} 
          />
        </div>
      )}

    </div>
  );
};
