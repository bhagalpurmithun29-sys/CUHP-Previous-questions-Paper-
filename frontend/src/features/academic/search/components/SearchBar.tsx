import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, Loader2, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAutocomplete } from '../hooks/useAcademicSearch';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '@/hooks/useDebounce'; // Assumes existence, falling back to simple logic if not

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onSearch: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState(value);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Simple debounce
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), 300);
    return () => clearTimeout(timer);
  }, [value]);

  const { data: suggestions, isLoading } = useAutocomplete(debouncedValue);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (suggestion: any) => {
    setIsOpen(false);
    // Navigate directly to the entity
    switch (suggestion.type) {
      case 'SCHOOL': navigate(`/admin/academic/schools/${suggestion.id}`); break;
      case 'DEPARTMENT': navigate(`/admin/academic/departments/${suggestion.id}`); break;
      case 'COURSE': navigate(`/admin/academic/courses/${suggestion.id}`); break;
      case 'SUBJECT': navigate(`/admin/academic/subjects/${suggestion.id}`); break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
    onSearch();
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl z-50">
      <form onSubmit={handleSubmit} className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search for schools, courses, subjects..."
          className="pl-10 pr-10 h-12 text-base rounded-full shadow-sm bg-background/95 backdrop-blur-sm border-primary/20 focus-visible:ring-primary/30 transition-all"
        />
        {value && (
          <button 
            type="button" 
            onClick={() => { onChange(''); setIsOpen(false); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted text-muted-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </form>

      {isOpen && debouncedValue.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border rounded-xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2">
          {isLoading ? (
            <div className="p-4 flex items-center justify-center text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin mr-2" /> Searching...
            </div>
          ) : suggestions && suggestions.length > 0 ? (
            <ul className="max-h-80 overflow-auto py-2">
              {suggestions.map((suggestion: any) => (
                <li 
                  key={suggestion.id}
                  onClick={() => handleSelect(suggestion)}
                  className="px-4 py-2 hover:bg-muted/50 cursor-pointer flex flex-col"
                >
                  <span className="font-medium text-foreground">{suggestion.name}</span>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                    <span className="uppercase tracking-wider font-semibold text-primary/70">{suggestion.type}</span>
                    <span>•</span>
                    <span className="font-mono">{suggestion.code}</span>
                  </div>
                </li>
              ))}
              <li 
                className="px-4 py-3 border-t bg-muted/30 text-sm font-medium text-primary text-center cursor-pointer hover:bg-muted"
                onClick={handleSubmit}
              >
                View all results for "{debouncedValue}"
              </li>
            </ul>
          ) : (
            <div className="p-4 text-center text-muted-foreground text-sm">
              No direct matches found. Press Enter to search all.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
