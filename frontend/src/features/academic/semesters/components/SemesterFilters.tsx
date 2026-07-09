import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SemesterFiltersProps {
  search: string;
  setSearch: (v: string) => void;
  statusFilter: string;
  setStatusFilter: (v: string) => void;
  currentFilter: string;
  setCurrentFilter: (v: string) => void;
  sortBy: string;
  setSortBy: (v: string) => void;
}

export const SemesterFilters: React.FC<SemesterFiltersProps> = ({
  search, setSearch,
  statusFilter, setStatusFilter,
  currentFilter, setCurrentFilter,
  sortBy, setSortBy
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          placeholder="Search by semester number, name, or session..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>
      <div className="flex flex-wrap gap-2">

        <Select value={currentFilter} onValueChange={setCurrentFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Current Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Semesters</SelectItem>
            <SelectItem value="CURRENT">Current Only</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Status</SelectItem>
            <SelectItem value="UPCOMING">Upcoming</SelectItem>
            <SelectItem value="CURRENT">Current</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="ARCHIVED">Archived</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt_desc">Newest First</SelectItem>
            <SelectItem value="createdAt_asc">Oldest First</SelectItem>
            <SelectItem value="semesterNumber_asc">Semester (Low-High)</SelectItem>
            <SelectItem value="semesterNumber_desc">Semester (High-Low)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
