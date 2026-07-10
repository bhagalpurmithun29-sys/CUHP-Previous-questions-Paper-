import React from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

interface SmartFolderBuilderProps {
  rules: any[];
  onChange: (rules: any[]) => void;
}

export const SmartFolderBuilder: React.FC<SmartFolderBuilderProps> = ({ rules, onChange }) => {
  const addRule = () => {
    onChange([...rules, { field: 'subjectId', operator: 'equals', value: '' }]);
  };

  const removeRule = (index: number) => {
    onChange(rules.filter((_, i) => i !== index));
  };

  const updateRule = (index: number, key: string, value: any) => {
    const newRules = [...rules];
    newRules[index][key] = value;
    onChange(newRules);
  };

  return (
    <div className="space-y-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Smart Rules</h4>
        <button type="button" onClick={addRule} className="text-xs flex items-center text-blue-600 hover:text-blue-700 font-medium bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">
          <FiPlus className="mr-1" /> Add Rule
        </button>
      </div>
      
      {rules.length === 0 ? (
        <p className="text-xs text-gray-500 text-center py-4 bg-white dark:bg-gray-800 rounded border border-dashed border-gray-300 dark:border-gray-600">No rules configured. This folder will be empty.</p>
      ) : (
        <div className="space-y-2">
        {rules.map((rule, index) => (
          <div key={index} className="flex space-x-2 items-center bg-white dark:bg-gray-800 p-2.5 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <select 
              value={rule.field} 
              onChange={e => updateRule(index, 'field', e.target.value)}
              className="flex-1 text-xs py-1.5 bg-transparent border-gray-200 dark:border-gray-700 rounded text-gray-700 dark:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="subjectId">Subject ID</option>
              <option value="departmentId">Department ID</option>
              <option value="semester">Semester</option>
              <option value="academicYear">Academic Year</option>
            </select>
            
            <select 
              value={rule.operator} 
              onChange={e => updateRule(index, 'operator', e.target.value)}
              className="w-24 text-xs py-1.5 bg-transparent border-gray-200 dark:border-gray-700 rounded text-gray-700 dark:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="equals">Equals</option>
              <option value="contains">Contains</option>
              <option value="gt">Greater (&gt;)</option>
              <option value="lt">Less (&lt;)</option>
            </select>
            
            <input 
              type="text" 
              value={rule.value} 
              onChange={e => updateRule(index, 'value', e.target.value)}
              placeholder="Value..."
              className="flex-1 text-xs py-1.5 bg-transparent border-gray-200 dark:border-gray-700 rounded text-gray-700 dark:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
            
            <button type="button" onClick={() => removeRule(index)} className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors">
              <FiTrash2 size={14} />
            </button>
          </div>
        ))}
        </div>
      )}
    </div>
  );
};
