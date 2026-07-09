import React, { useState, useRef, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { useSearchSuggestions } from '../hooks/useSearch';
import { useNavigate } from 'react-router-dom';

interface SearchInputProps {
  initialValue: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ initialValue, onChange, onSubmit }) => {
  const [value, setValue] = useState(initialValue);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { data: suggestions = [] } = useSearchSuggestions(value);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // Keyboard Shortcuts (Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        inputRef.current?.blur();
        setShowSuggestions(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange(e.target.value);
    setShowSuggestions(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    onSubmit(value);
  };

  const handleSuggestionClick = (suggestion: any) => {
    setValue(suggestion.title);
    setShowSuggestions(false);
    navigate(suggestion.url);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto z-40">
      <form onSubmit={handleSubmit} className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <FiSearch className="text-gray-400 w-6 h-6" />
        </div>
        <input
          ref={inputRef}
          type="text"
          className="block w-full pl-12 pr-12 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl leading-5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-primary sm:text-lg transition-colors shadow-sm"
          placeholder="Search for subjects, courses, paper codes..."
          value={value}
          onChange={handleChange}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        {value && (
          <button
            type="button"
            onClick={() => {
              setValue('');
              onChange('');
              inputRef.current?.focus();
            }}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <FiX className="w-6 h-6" />
          </button>
        )}
      </form>

      {/* Autocomplete Suggestions Overlay */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden max-h-96 overflow-y-auto">
          <ul>
            {suggestions.map((item: any, index: number) => (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => handleSuggestionClick(item)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex flex-col border-b border-gray-100 dark:border-gray-800 last:border-0"
                >
                  <span className="font-medium text-gray-900 dark:text-white">{item.title}</span>
                  {item.subtitle && (
                    <span className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{item.subtitle} • {item.entityType}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
