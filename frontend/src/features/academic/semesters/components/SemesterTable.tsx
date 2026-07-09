import React from 'react';
import { SchoolStatusBadge } from '../../schools/components/SchoolStatusBadge';
import { Button } from '@/components/ui/button';
import { Edit, Eye, Archive, RotateCcw, Trash2, MoreHorizontal, CheckCircle2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface SemesterTableProps {
  semesters: any[];
  onEdit: (semester: any) => void;
  onArchive: (id: string) => void;
  onRestore: (id: string) => void;
  onDelete: (semester: any) => void;
}

export const SemesterTable: React.FC<SemesterTableProps> = ({ semesters, onEdit, onArchive, onRestore, onDelete }) => {
  if (semesters.length === 0) {
    return <div className="text-center p-8 text-muted-foreground border rounded-lg bg-card">No semesters found matching your criteria.</div>;
  }

  return (
    <div className="rounded-md border bg-card overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
          <tr>
            <th className="px-4 py-3 font-medium">Semester</th>
            <th className="px-4 py-3 font-medium">Course</th>
            <th className="px-4 py-3 font-medium hidden md:table-cell">Academic Session</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {semesters.map((semester) => (
            <tr key={semester._id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
              <td className="px-4 py-3 font-medium">
                <div className="flex items-center gap-2">
                  <Link to={`/admin/academic/semesters/${semester._id}`} className="hover:underline text-primary">
                    Semester {semester.semesterNumber}
                  </Link>
                  {semester.isCurrentSemester && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800 flex items-center gap-1 py-0 px-1.5 text-[10px]">
                      <CheckCircle2 className="w-3 h-3" /> Current
                    </Badge>
                  )}
                </div>
                {semester.semesterName && <p className="text-xs text-muted-foreground font-normal">{semester.semesterName}</p>}
              </td>
              <td className="px-4 py-3 font-medium">
                <Link to={`/admin/academic/courses/${semester.courseId?._id}`} className="hover:underline">
                  {semester.courseId?.courseCode || 'Unknown Course'}
                </Link>
              </td>
              <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                {semester.academicSession || '-'} {semester.academicYear && `(${semester.academicYear})`}
              </td>
              <td className="px-4 py-3">
                <SchoolStatusBadge status={semester.status} />
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
                      <Link to={`/admin/academic/semesters/${semester._id}`} className="flex items-center cursor-pointer">
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(semester)} className="cursor-pointer">
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator />
                    
                    {semester.status !== 'ARCHIVED' ? (
                      <DropdownMenuItem onClick={() => onArchive(semester._id)} className="cursor-pointer text-amber-600 focus:text-amber-600">
                        <Archive className="mr-2 h-4 w-4" /> Archive
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem onClick={() => onRestore(semester._id)} className="cursor-pointer text-green-600 focus:text-green-600">
                        <RotateCcw className="mr-2 h-4 w-4" /> Restore
                      </DropdownMenuItem>
                    )}
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem onClick={() => onDelete(semester)} className="cursor-pointer text-red-600 focus:text-red-600">
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
