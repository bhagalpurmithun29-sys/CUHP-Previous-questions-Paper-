import React, { useState, useEffect } from 'react';
import { usePromptManagement } from '../hooks/usePromptManagement';

interface PromptEditorProps {
  prompt: any | null;
  onSave: (data: any) => void;
}

export const PromptEditor: React.FC<PromptEditorProps> = ({ prompt, onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('SYSTEM');
  
  const { extractVariables } = usePromptManagement();
  const [variables, setVariables] = useState<string[]>([]);

  useEffect(() => {
    if (prompt) {
      setName(prompt.name || '');
      setDescription(prompt.description || '');
      setContent(prompt.content || '');
      setType(prompt.type || 'SYSTEM');
    } else {
      setName('');
      setDescription('');
      setContent('');
      setType('SYSTEM');
    }
  }, [prompt]);
  
  useEffect(() => {
    if (content) {
      const timer = setTimeout(() => {
        extractVariables.mutate({ content }, {
          onSuccess: (vars) => setVariables(vars)
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [content]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, description, content, type });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {prompt ? 'Edit Prompt' : 'Create New Prompt'}
        </h3>
        <button onClick={handleSubmit} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
          Save Draft
        </button>
      </div>

      <div className="space-y-4 flex-1 flex flex-col">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
            <input 
              type="text" value={name} onChange={e => setName(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white"
              placeholder="e.g. Question Extractor"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
            <select 
              value={type} onChange={e => setType(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white"
            >
              <option value="SYSTEM">System Prompt</option>
              <option value="TASK">Task Prompt</option>
              <option value="RAG">RAG Context</option>
              <option value="TEMPLATE">Reusable Template</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
          <input 
            type="text" value={description} onChange={e => setDescription(e.target.value)}
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white"
          />
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-1">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">Prompt Template</label>
            <span className="text-[10px] text-gray-500">Use {'{{variable}}'} for dynamic insertion</span>
          </div>
          <textarea 
            value={content} onChange={e => setContent(e.target.value)}
            className="w-full flex-1 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-3 text-sm text-gray-900 dark:text-gray-100 font-mono resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="You are an expert AI..."
          />
        </div>

        {variables.length > 0 && (
          <div className="p-3 bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/30 rounded-lg">
            <h4 className="text-xs font-semibold text-indigo-800 dark:text-indigo-300 mb-2">Detected Variables</h4>
            <div className="flex flex-wrap gap-2">
              {variables.map(v => (
                <span key={v} className="px-2 py-1 bg-white dark:bg-gray-800 border border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-400 text-[10px] font-mono rounded">
                  {v}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
