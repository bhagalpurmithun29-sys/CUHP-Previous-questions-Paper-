import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useSchools } from '../../schools/hooks/useSchools';

interface DepartmentFiltersProps {
  search: string;
  setSearch: (v: string) => void;
  statusFilter: string;
  setStatusFilter: (v: string) => void;
  schoolFilter: string;
  setSchoolFilter: (v: string) => void;
  sortBy: string;
  setSortBy: (v: string) => void;
}

export const DepartmentFilters: React.FC<DepartmentFiltersProps> = ({
  search, setSearch,
  statusFilter, setStatusFilter,
  schoolFilter, setSchoolFilter,
  sortBy, setSortBy
}) => {
  const { data: schoolsData } = useSchools({ limit: 100 });

  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          placeholder="Search by department name or code..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <Select value={schoolFilter} onValueChange={setSchoolFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Schools" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Schools</SelectItem>
            {schoolsData?.schools?.map((s: any) => (
              <SelectItem key={s._id} value={s._id}>{s.schoolCode}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Status</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="INACTIVE">Inactive</SelectItem>
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
            <SelectItem value="departmentName_asc">Name (A-Z)</SelectItem>
            <SelectItem value="departmentName_desc">Name (Z-A)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
