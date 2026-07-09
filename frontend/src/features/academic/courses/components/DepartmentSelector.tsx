import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDepartments } from '../../departments/hooks/useDepartments';
import { Loader2 } from 'lucide-react';

interface DepartmentSelectorProps {
  value: string;
  onValueChange: (val: string) => void;
  disabled?: boolean;
}

export const DepartmentSelector: React.FC<DepartmentSelectorProps> = ({ value, onValueChange, disabled }) => {
  const { data, isLoading } = useDepartments({ limit: 500, status: 'ACTIVE' }); // fetch active departments

  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled || isLoading}>
      <SelectTrigger className="w-full">
        {isLoading ? (
          <div className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Loading departments...</div>
        ) : (
          <SelectValue placeholder="Select a Department" />
        )}
      </SelectTrigger>
      <SelectContent>
        {data?.departments?.map((dept: any) => (
          <SelectItem key={dept._id} value={dept._id}>
            {dept.departmentName} ({dept.departmentCode})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
