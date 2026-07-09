import React from 'react';
import { SchoolStatusBadge } from '../../schools/components/SchoolStatusBadge';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Eye, MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';

interface CourseCardProps {
  course: any;
  onEdit: (course: any) => void;
  onArchive: (id: string) => void;
  onRestore: (id: string) => void;
  onDelete: (course: any) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onEdit, onArchive, onRestore, onDelete }) => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-mono font-bold rounded">
                {course.courseCode}
              </span>
              <SchoolStatusBadge status={course.status} />
            </div>
            <CardTitle className="text-xl leading-tight">
              <Link to={`/admin/academic/courses/${course._id}`} className="hover:underline">
                {course.courseName}
              </Link>
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {course.departmentId?.departmentName}
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
              {course.status !== 'ARCHIVED' ? (
                <DropdownMenuItem onClick={() => onArchive(course._id)}>Archive</DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={() => onRestore(course._id)}>Restore</DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => onDelete(course)} className="text-red-600 focus:text-red-600">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1">
        <div className="grid grid-cols-2 gap-2 text-sm bg-muted/30 p-3 rounded-lg mb-2">
          <div>
            <p className="text-xs text-muted-foreground uppercase">Duration</p>
            <p className="font-medium">{course.duration} {course.durationUnit}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase">Semesters</p>
            <p className="font-medium">{course.totalSemesters}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-muted-foreground uppercase">Program</p>
            <p className="font-medium">{course.programType} • {course.degree || 'Degree N/A'}</p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-4 border-t flex gap-2">
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link to={`/admin/academic/courses/${course._id}`}>
            <Eye className="w-4 h-4 mr-2" /> View
          </Link>
        </Button>
        <Button variant="outline" size="sm" className="w-full" onClick={() => onEdit(course)}>
          <Edit className="w-4 h-4 mr-2" /> Edit
        </Button>
      </CardFooter>
    </Card>
  );
};
