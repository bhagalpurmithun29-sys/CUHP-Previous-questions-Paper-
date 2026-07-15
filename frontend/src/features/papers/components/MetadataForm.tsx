import React, { useState, useRef, useEffect } from 'react';
import { useUploadStore } from '../store/upload.store';
import { FiChevronDown } from 'react-icons/fi';

export const MetadataForm: React.FC = () => {
  const { data, updateMetadata } = useUploadStore();
  const [isYearDropdownOpen, setYearDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setYearDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    updateMetadata({ [e.target.name]: e.target.value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="space-y-2 md:col-span-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Paper Title *</label>
        <input 
          type="text" 
          name="title"
          placeholder="e.g. Data Structures and Algorithms Mid Term 2023"
          value={data.metadata.title}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>

      <div className="space-y-2 relative" ref={dropdownRef}>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Academic Year *</label>
        <div 
          onClick={() => setYearDropdownOpen(!isYearDropdownOpen)}
          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer flex justify-between items-center focus:ring-2 focus:ring-primary"
        >
          <span className={data.metadata.academicYear ? "text-gray-900 dark:text-white" : "text-gray-500"}>
            {data.metadata.academicYear || "Select Academic Year"}
          </span>
          <FiChevronDown className={`transition-transform duration-200 ${isYearDropdownOpen ? 'rotate-180' : ''}`} />
        </div>

        {isYearDropdownOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {Array.from({ length: 34 }, (_, i) => 2050 - i).map(year => {
              const value = `${year}-${year + 1}`;
              return (
                <div 
                  key={value}
                  onClick={() => {
                    updateMetadata({ academicYear: value });
                    setYearDropdownOpen(false);
                  }}
                  className={`px-4 py-2 cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors
                    ${data.metadata.academicYear === value ? 'bg-primary/10 text-primary font-medium' : 'text-gray-700 dark:text-gray-300'}`}
                >
                  {value}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Exam Type *</label>
        <select 
          name="examType"
          value={data.metadata.examType}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary"
        >
          <option value="">Select Exam Type</option>
          <option value="MID_TERM">Mid Term</option>
          <option value="END_TERM">End Term</option>
          <option value="SUPPLEMENTARY">Supplementary</option>
          <option value="PRACTICAL">Practical</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Exam Session *</label>
        <select 
          name="examSession"
          value={data.metadata.examSession}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary"
        >
          <option value="">Select Session</option>
          <option value="AUTUMN">Autumn</option>
          <option value="SPRING">Spring</option>
          <option value="SUMMER">Summer</option>
          <option value="WINTER">Winter</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Subject ID (Mock) *</label>
        <input 
          type="text" 
          name="subjectId"
          placeholder="Select Subject..."
          value={data.metadata.subjectId}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Exam Month *</label>
        <input 
          type="month" 
          name="examMonth"
          value={data.metadata.examMonth}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Duration (Minutes)</label>
        <input 
          type="number" 
          name="durationMinutes"
          placeholder="e.g. 120"
          value={data.metadata.durationMinutes}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Maximum Marks</label>
        <input 
          type="number" 
          name="maximumMarks"
          placeholder="e.g. 100"
          value={data.metadata.maximumMarks}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>

      <div className="space-y-2 md:col-span-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Language</label>
        <select 
          name="language"
          value={data.metadata.language}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary"
        >
          <option value="ENGLISH">English</option>
          <option value="HINDI">Hindi</option>
          <option value="BILINGUAL">Bilingual</option>
        </select>
      </div>
    </div>
  );
};
