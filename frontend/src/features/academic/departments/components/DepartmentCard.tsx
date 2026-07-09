import React from 'react';
import { SchoolStatusBadge } from '../../schools/components/SchoolStatusBadge';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Eye, MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';

interface DepartmentCardProps {
  department: any;
  onEdit: (department: any) => void;
  onArchive: (id: string) => void;
  onRestore: (id: string) => void;
  onDelete: (department: any) => void;
}

export const DepartmentCard: React.FC<DepartmentCardProps> = ({ department, onEdit, onArchive, onRestore, onDelete }) => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-mono font-bold rounded">
                {department.departmentCode}
              </span>
              <SchoolStatusBadge status={department.status} />
            </div>
            <CardTitle className="text-xl leading-tight">
              <Link to={`/admin/academic/departments/${department._id}`} className="hover:underline">
                {department.departmentName}
              </Link>
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {department.schoolId?.schoolName}
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
              {department.status !== 'ARCHIVED' ? (
                <DropdownMenuItem onClick={() => onArchive(department._id)}>Archive</DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={() => onRestore(department._id)}>Restore</DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => onDelete(department)} className="text-red-600 focus:text-red-600">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1">
        <div className="space-y-1 text-sm bg-muted/30 p-3 rounded-lg">
          <p><span className="text-muted-foreground">HOD:</span> {department.hodName || 'Not Assigned'}</p>
          <p><span className="text-muted-foreground">Email:</span> {department.email || 'N/A'}</p>
        </div>
      </CardContent>
      
      <CardFooter className="pt-4 border-t flex gap-2">
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link to={`/admin/academic/departments/${department._id}`}>
            <Eye className="w-4 h-4 mr-2" /> View
          </Link>
        </Button>
        <Button variant="outline" size="sm" className="w-full" onClick={() => onEdit(department)}>
          <Edit className="w-4 h-4 mr-2" /> Edit
        </Button>
      </CardFooter>
    </Card>
  );
};
