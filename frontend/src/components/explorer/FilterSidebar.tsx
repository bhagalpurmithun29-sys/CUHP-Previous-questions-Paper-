import React from 'react';
import { FiFilter } from 'react-icons/fi';

interface FilterSidebarProps {
  filters: any;
  setFilters: (filters: any) => void;
  className?: string;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, setFilters, className = '' }) => {
  const handleChange = (key: string, value: string) => {
    setFilters((prev: any) => ({ ...prev, [key]: value, page: 1 }));
  };

  const handleReset = () => {
    setFilters({ page: 1, limit: 12, sort: 'newest' });
  };

  return (
    <div className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <FiFilter /> Filters
        </h2>
        <button 
          onClick={handleReset}
          className="text-sm text-primary hover:text-primary-dark transition-colors"
        >
          Reset All
        </button>
      </div>

      <div className="space-y-6">
        {/* Academic Year Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Academic Year</label>
          <select 
            value={filters.academicYear || ''} 
            onChange={(e) => handleChange('academicYear', e.target.value)}
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
          >
            <option value="">All Years</option>
            <option value="2023-2024">2023-2024</option>
            <option value="2022-2023">2022-2023</option>
            <option value="2021-2022">2021-2022</option>
          </select>
        </div>

        {/* Exam Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Exam Type</label>
          <select 
            value={filters.examType || ''} 
            onChange={(e) => handleChange('examType', e.target.value)}
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
          >
            <option value="">All Types</option>
            <option value="MID_TERM">Mid Term</option>
            <option value="END_TERM">End Term</option>
            <option value="PRACTICAL">Practical</option>
          </select>
        </div>

        {/* Semester Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Semester</label>
          <select 
            value={filters.semesterId || ''} 
            onChange={(e) => handleChange('semesterId', e.target.value)}
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
          >
            <option value="">All Semesters</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
              <option key={sem} value={`sem_${sem}`}>Semester {sem}</option>
            ))}
          </select>
        </div>
        
        {/* Note: In a production environment, Schools, Departments, and Courses would be populated dynamically via API hooks */}
      </div>
    </div>
  );
};
