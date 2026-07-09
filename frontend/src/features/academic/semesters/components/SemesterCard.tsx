import React from 'react';
import { SchoolStatusBadge } from '../../schools/components/SchoolStatusBadge';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Eye, MoreVertical, CheckCircle2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface SemesterCardProps {
  semester: any;
  onEdit: (semester: any) => void;
  onArchive: (id: string) => void;
  onRestore: (id: string) => void;
  onDelete: (semester: any) => void;
}

export const SemesterCard: React.FC<SemesterCardProps> = ({ semester, onEdit, onArchive, onRestore, onDelete }) => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-mono font-bold rounded">
                SEM-{semester.semesterNumber}
              </span>
              <SchoolStatusBadge status={semester.status} />
            </div>
            <CardTitle className="text-xl leading-tight flex items-center gap-2">
              <Link to={`/admin/academic/semesters/${semester._id}`} className="hover:underline">
                Semester {semester.semesterNumber}
              </Link>
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1 font-medium">
              <Link to={`/admin/academic/courses/${semester.courseId?._id}`} className="hover:underline">
                {semester.courseId?.courseCode} - {semester.courseId?.courseName}
              </Link>
            </p>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {semester.status !== 'ARCHIVED' ? (
                <DropdownMenuItem onClick={() => onArchive(semester._id)}>Archive</DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={() => onRestore(semester._id)}>Restore</DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => onDelete(semester)} className="text-red-600 focus:text-red-600">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1">
        <div className="grid grid-cols-2 gap-2 text-sm bg-muted/30 p-3 rounded-lg mb-2">
          {semester.isCurrentSemester && (
            <div className="col-span-2 mb-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800 flex items-center gap-1 py-1 w-full justify-center">
                <CheckCircle2 className="w-3 h-3" /> Current Active Semester
              </Badge>
            </div>
          )}
          <div>
            <p className="text-xs text-muted-foreground uppercase">Session</p>
            <p className="font-medium">{semester.academicSession || 'N/A'}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase">Year</p>
            <p className="font-medium">{semester.academicYear || 'N/A'}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-muted-foreground uppercase">Type</p>
            <p className="font-medium">{semester.semesterType} • {semester.isOdd ? 'Odd' : 'Even'}</p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-4 border-t flex gap-2">
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link to={`/admin/academic/semesters/${semester._id}`}>
            <Eye className="w-4 h-4 mr-2" /> View
          </Link>
        </Button>
        <Button variant="outline" size="sm" className="w-full" onClick={() => onEdit(semester)}>
          <Edit className="w-4 h-4 mr-2" /> Edit
        </Button>
      </CardFooter>
    </Card>
  );
};
