import React from 'react';
import { SchoolStatusBadge } from '../../schools/components/SchoolStatusBadge';
import { Button } from '@/components/ui/button';
import { Edit, Eye, Archive, RotateCcw, Trash2, MoreHorizontal, Copy } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';

interface SubjectTableProps {
  subjects: any[];
  onEdit: (subject: any) => void;
  onArchive: (id: string) => void;
  onRestore: (id: string) => void;
  onDelete: (subject: any) => void;
  onDuplicate?: (subject: any) => void;
}

export const SubjectTable: React.FC<SubjectTableProps> = ({ subjects, onEdit, onArchive, onRestore, onDelete, onDuplicate }) => {
  if (subjects.length === 0) {
    return <div className="text-center p-8 text-muted-foreground border rounded-lg bg-card">No subjects found matching your criteria.</div>;
  }

  return (
    <div className="rounded-md border bg-card overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
          <tr>
            <th className="px-4 py-3 font-medium">Code</th>
            <th className="px-4 py-3 font-medium">Subject Name</th>
            <th className="px-4 py-3 font-medium hidden md:table-cell">Course & Semester</th>
            <th className="px-4 py-3 font-medium text-center hidden md:table-cell">Credits</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => (
            <tr key={subject._id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
              <td className="px-4 py-3 font-mono font-medium text-primary">
                <Link to={`/admin/academic/subjects/${subject._id}`} className="hover:underline">{subject.subjectCode}</Link>
              </td>
              <td className="px-4 py-3 font-medium">
                <Link to={`/admin/academic/subjects/${subject._id}`} className="hover:underline">{subject.subjectName}</Link>
                <p className="text-xs text-muted-foreground font-normal">{subject.subjectType}</p>
              </td>
              <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                <span className="block truncate max-w-[200px]" title={subject.semesterId?.courseId?.courseName}>
                  {subject.semesterId?.courseId?.courseCode}
                </span>
                <span className="text-xs">Sem {subject.semesterId?.semesterNumber}</span>
              </td>
              <td className="px-4 py-3 text-center hidden md:table-cell font-medium">
                {subject.credits}
              </td>
              <td className="px-4 py-3">
                <SchoolStatusBadge status={subject.status} />
              </td>
              <td className="px-4 py-3 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to={`/admin/academic/subjects/${subject._id}`} className="flex items-center cursor-pointer">
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(subject)} className="cursor-pointer">
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    {onDuplicate && (
                      <DropdownMenuItem onClick={() => onDuplicate(subject)} className="cursor-pointer">
                        <Copy className="mr-2 h-4 w-4" /> Duplicate
                      </DropdownMenuItem>
                    )}
                    
                    <DropdownMenuSeparator />
                    
                    {subject.status !== 'ARCHIVED' ? (
                      <DropdownMenuItem onClick={() => onArchive(subject._id)} className="cursor-pointer text-amber-600 focus:text-amber-600">
                        <Archive className="mr-2 h-4 w-4" /> Archive
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem onClick={() => onRestore(subject._id)} className="cursor-pointer text-green-600 focus:text-green-600">
                        <RotateCcw className="mr-2 h-4 w-4" /> Restore
                      </DropdownMenuItem>
                    )}
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem onClick={() => onDelete(subject)} className="cursor-pointer text-red-600 focus:text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
