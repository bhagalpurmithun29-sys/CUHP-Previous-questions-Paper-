import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSemesters } from '../../semesters/hooks/useSemesters';
import { Loader2, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SemesterSelectorProps {
  value: string;
  onValueChange: (val: string) => void;
  disabled?: boolean;
}

export const SemesterSelector: React.FC<SemesterSelectorProps> = ({ value, onValueChange, disabled }) => {
  const [search, setSearch] = useState('');
  const { data, isLoading } = useSemesters({ limit: 100, status: 'UPCOMING', search }); // Include Current too ideally, assuming backend filters gracefully

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search course or semester..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8"
          disabled={disabled}
        />
      </div>
      <Select value={value} onValueChange={onValueChange} disabled={disabled || isLoading}>
        <SelectTrigger className="w-full bg-background border">
          {isLoading ? (
            <div className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Loading semesters...</div>
          ) : (
            <SelectValue placeholder="Select a Semester" />
          )}
        </SelectTrigger>
        <SelectContent>
          {data?.semesters?.map((sem: any) => (
            <SelectItem key={sem._id} value={sem._id}>
              {sem.courseId?.courseCode} - Sem {sem.semesterNumber} {sem.academicSession ? `(${sem.academicSession})` : ''}
            </SelectItem>
          ))}
          {data?.semesters?.length === 0 && <div className="p-2 text-sm text-muted-foreground text-center">No semesters found</div>}
        </SelectContent>
      </Select>
    </div>
  );
};
