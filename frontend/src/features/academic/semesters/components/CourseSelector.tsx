import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCourses } from '../../courses/hooks/useCourses';
import { Loader2, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface CourseSelectorProps {
  value: string;
  onValueChange: (val: string) => void;
  disabled?: boolean;
}

export const CourseSelector: React.FC<CourseSelectorProps> = ({ value, onValueChange, disabled }) => {
  const [search, setSearch] = useState('');
  // Use a debounced search in a real app, keeping it simple for the selector
  const { data, isLoading } = useCourses({ limit: 50, status: 'ACTIVE', search });

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search course..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8"
          disabled={disabled}
        />
      </div>
      <Select value={value} onValueChange={onValueChange} disabled={disabled || isLoading}>
        <SelectTrigger className="w-full bg-background border">
          {isLoading ? (
            <div className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Loading courses...</div>
          ) : (
            <SelectValue placeholder="Select a Course" />
          )}
        </SelectTrigger>
        <SelectContent>
          {data?.courses?.map((course: any) => (
            <SelectItem key={course._id} value={course._id}>
              {course.courseCode} - {course.courseName}
            </SelectItem>
          ))}
          {data?.courses?.length === 0 && <div className="p-2 text-sm text-muted-foreground text-center">No courses found</div>}
        </SelectContent>
      </Select>
    </div>
  );
};
