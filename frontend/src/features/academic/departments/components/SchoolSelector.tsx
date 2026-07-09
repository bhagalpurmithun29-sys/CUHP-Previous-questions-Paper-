import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSchools } from '../../schools/hooks/useSchools';
import { Loader2 } from 'lucide-react';

interface SchoolSelectorProps {
  value: string;
  onValueChange: (val: string) => void;
  disabled?: boolean;
}

export const SchoolSelector: React.FC<SchoolSelectorProps> = ({ value, onValueChange, disabled }) => {
  const { data, isLoading } = useSchools({ limit: 100, status: 'ACTIVE' }); // fetch all active schools

  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled || isLoading}>
      <SelectTrigger className="w-full">
        {isLoading ? (
          <div className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Loading schools...</div>
        ) : (
          <SelectValue placeholder="Select a School" />
        )}
      </SelectTrigger>
      <SelectContent>
        {data?.schools?.map((school: any) => (
          <SelectItem key={school._id} value={school._id}>
            {school.schoolName} ({school.schoolCode})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
