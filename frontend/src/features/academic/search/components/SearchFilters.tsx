import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SearchFiltersProps {
  type: string;
  setType: (v: string) => void;
  status: string;
  setStatus: (v: string) => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({ type, setType, status, setStatus }) => {
  return (
    <div className="flex flex-wrap gap-3">
      <Select value={type} onValueChange={setType}>
        <SelectTrigger className="w-[180px] bg-background">
          <SelectValue placeholder="Entity Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All Hierarchy</SelectItem>
          <SelectItem value="SCHOOL">Schools Only</SelectItem>
          <SelectItem value="DEPARTMENT">Departments Only</SelectItem>
          <SelectItem value="COURSE">Courses Only</SelectItem>
          <SelectItem value="SEMESTER">Semesters Only</SelectItem>
          <SelectItem value="SUBJECT">Subjects Only</SelectItem>
        </SelectContent>
      </Select>

      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="w-[150px] bg-background">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All Statuses</SelectItem>
          <SelectItem value="ACTIVE">Active / Upcoming</SelectItem>
          <SelectItem value="ARCHIVED">Archived</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
