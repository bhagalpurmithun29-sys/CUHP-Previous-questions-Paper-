import React from 'react';
import { SemanticSearchFilters } from '../hooks/useSemanticSearch';

interface SearchFiltersProps {
  filters: SemanticSearchFilters;
  onChange: (key: keyof SemanticSearchFilters, value: any) => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({ filters, onChange }) => {
  return (
    <div className="space-y-6">
      {/* Search Mode */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm">
        <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Search Mode</h4>
        <div className="space-y-2">
          {['keyword', 'semantic', 'hybrid'].map((mode) => (
            <label key={mode} className="flex items-center gap-3 cursor-pointer">
              <input 
                type="radio" 
                name="mode" 
                checked={filters.mode === mode || (!filters.mode && mode === 'hybrid')}
                onChange={() => onChange('mode', mode)}
                className="text-primary focus:ring-primary w-4 h-4"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{mode} Search</span>
            </label>
          ))}
        </div>
      </div>

      {/* Entity Filters */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm">
        <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Entity Type</h4>
        <div className="space-y-2">
          {['', 'school', 'department', 'course', 'subject', 'paper'].map((type) => (
            <label key={type} className="flex items-center gap-3 cursor-pointer">
              <input 
                type="radio" 
                name="type" 
                checked={filters.type === type || (!filters.type && type === '')}
                onChange={() => onChange('type', type)}
                className="text-primary focus:ring-primary w-4 h-4"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{type || 'All Entities'}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Academic Filters */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm">
        <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Academic Details</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Academic Year</label>
            <select 
              value={filters.academicYear || ''} 
              onChange={(e) => onChange('academicYear', e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm p-2 text-gray-900 dark:text-white focus:ring-primary focus:border-primary"
            >
              <option value="">All Years</option>
              <option value="2023-2024">2023-2024</option>
              <option value="2022-2023">2022-2023</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Difficulty</label>
            <select 
              value={filters.difficulty || ''} 
              onChange={(e) => onChange('difficulty', e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm p-2 text-gray-900 dark:text-white focus:ring-primary focus:border-primary"
            >
              <option value="">All Levels</option>
              <option value="EASY">Easy</option>
              <option value="MEDIUM">Medium</option>
              <option value="HARD">Hard</option>
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Bloom Taxonomy</label>
            <select 
              value={filters.bloomLevel || ''} 
              onChange={(e) => onChange('bloomLevel', e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm p-2 text-gray-900 dark:text-white focus:ring-primary focus:border-primary"
            >
              <option value="">All Levels</option>
              <option value="REMEMBER">Remember</option>
              <option value="UNDERSTAND">Understand</option>
              <option value="APPLY">Apply</option>
              <option value="ANALYZE">Analyze</option>
              <option value="EVALUATE">Evaluate</option>
              <option value="CREATE">Create</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
