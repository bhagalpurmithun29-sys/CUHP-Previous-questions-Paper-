import React from 'react';
import { useUploadStore } from '../store/upload.store';

export const MetadataForm: React.FC = () => {
  const { data, updateMetadata } = useUploadStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    updateMetadata({ [e.target.name]: e.target.value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Academic Year *</label>
        <input 
          type="text" 
          name="academicYear"
          placeholder="e.g. 2023-2024"
          value={data.metadata.academicYear}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        />
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
          <option value="MID_SEMESTER">Mid Semester</option>
          <option value="END_SEMESTER">End Semester</option>
          <option value="SUPPLEMENTARY">Supplementary</option>
          <option value="ENTRANCE">Entrance</option>
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

      <div className="space-y-2">
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
