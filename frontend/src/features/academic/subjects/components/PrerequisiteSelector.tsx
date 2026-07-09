import React, { useState } from 'react';
import { useSubjects } from '../hooks/useSubjects';
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface PrerequisiteSelectorProps {
  value: string[];
  onChange: (val: string[]) => void;
  disabled?: boolean;
}

export const PrerequisiteSelector: React.FC<PrerequisiteSelectorProps> = ({ value = [], onChange, disabled }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  
  const { data, isLoading } = useSubjects({ 
    search, 
    limit: 50,
    status: 'ACTIVE' 
  });

  const subjects = data?.subjects || [];

  const handleSelect = (subjectId: string) => {
    if (value.includes(subjectId)) {
      onChange(value.filter(id => id !== subjectId));
    } else {
      onChange([...value, subjectId]);
    }
  };

  const getSelectedSubjectCodes = () => {
    return value.length > 0 ? `${value.length} subject(s) selected` : "Select prerequisites";
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-background"
          disabled={disabled}
        >
          {getSelectedSubjectCodes()}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search subject..." value={search} onValueChange={setSearch} />
          <CommandList>
            <CommandEmpty>{isLoading ? 'Loading...' : 'No subject found.'}</CommandEmpty>
            <CommandGroup>
              {subjects.map((subject: any) => (
                <CommandItem
                  key={subject._id}
                  value={subject._id}
                  onSelect={() => handleSelect(subject._id)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.includes(subject._id) ? "opacity-100 text-primary" : "opacity-0"
                    )}
                  />
                  {subject.subjectCode} - {subject.subjectName}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
