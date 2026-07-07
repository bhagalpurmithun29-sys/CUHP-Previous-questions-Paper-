import React from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { SchoolStatus } from '../types/school.types';

interface SchoolFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: SchoolStatus | '';
  onStatusChange: (status: SchoolStatus | '') => void;
}

export const SchoolFilters: React.FC<SchoolFiltersProps> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
}) => {
  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <div className="relative flex-1">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <FiSearch className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search schools by name or code..."
          className="block w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>
      <div className="relative w-full sm:w-48 shrink-0">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <FiFilter className="h-4 w-4 text-gray-400" />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value as SchoolStatus | '')}
          className="block w-full appearance-none rounded-lg border border-gray-300 py-2.5 pl-10 pr-8 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="">All Statuses</option>
          <option value={SchoolStatus.ACTIVE}>Active</option>
          <option value={SchoolStatus.INACTIVE}>Inactive</option>
          <option value={SchoolStatus.ARCHIVED}>Archived</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
          <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
