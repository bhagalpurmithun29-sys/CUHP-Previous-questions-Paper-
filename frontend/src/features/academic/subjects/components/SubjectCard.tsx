import React from 'react';
import { SchoolStatusBadge } from '../../schools/components/SchoolStatusBadge';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Eye, MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';

interface SubjectCardProps {
  subject: any;
  onEdit: (subject: any) => void;
  onArchive: (id: string) => void;
  onRestore: (id: string) => void;
  onDelete: (subject: any) => void;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({ subject, onEdit, onArchive, onRestore, onDelete }) => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-mono font-bold rounded">
                {subject.subjectCode}
              </span>
              <SchoolStatusBadge status={subject.status} />
            </div>
            <CardTitle className="text-xl leading-tight">
              <Link to={`/admin/academic/subjects/${subject._id}`} className="hover:underline">
                {subject.subjectName}
              </Link>
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1 truncate" title={subject.semesterId?.courseId?.courseName}>
              {subject.semesterId?.courseId?.courseCode} - Sem {subject.semesterId?.semesterNumber}
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
              {subject.status !== 'ARCHIVED' ? (
                <DropdownMenuItem onClick={() => onArchive(subject._id)}>Archive</DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={() => onRestore(subject._id)}>Restore</DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => onDelete(subject)} className="text-red-600 focus:text-red-600">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1">
        <div className="grid grid-cols-2 gap-2 text-sm bg-muted/30 p-3 rounded-lg mb-2 text-center">
          <div>
            <p className="text-xs text-muted-foreground uppercase">Credits</p>
            <p className="font-bold text-lg text-primary">{subject.credits}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase">Type</p>
            <p className="font-medium mt-1">{subject.subjectType}</p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-4 border-t flex gap-2">
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link to={`/admin/academic/subjects/${subject._id}`}>
            <Eye className="w-4 h-4 mr-2" /> View
          </Link>
        </Button>
        <Button variant="outline" size="sm" className="w-full" onClick={() => onEdit(subject)}>
          <Edit className="w-4 h-4 mr-2" /> Edit
        </Button>
      </CardFooter>
    </Card>
  );
};
