import React from 'react';
import { SchoolStatusBadge } from './SchoolStatusBadge';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Eye, MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';

interface SchoolCardProps {
  school: any;
  onEdit: (school: any) => void;
  onArchive: (id: string) => void;
  onRestore: (id: string) => void;
  onDelete: (school: any) => void;
}

export const SchoolCard: React.FC<SchoolCardProps> = ({ school, onEdit, onArchive, onRestore, onDelete }) => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-mono font-bold rounded">
                {school.schoolCode}
              </span>
              <SchoolStatusBadge status={school.status} />
            </div>
            <CardTitle className="text-xl leading-tight">
              <Link to={`/admin/academic/schools/${school._id}`} className="hover:underline">
                {school.schoolName}
              </Link>
            </CardTitle>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {school.status !== 'ARCHIVED' ? (
                <DropdownMenuItem onClick={() => onArchive(school._id)}>Archive</DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={() => onRestore(school._id)}>Restore</DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => onDelete(school)} className="text-red-600 focus:text-red-600">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {school.description || 'No description provided.'}
        </p>
        
        <div className="space-y-1 text-sm">
          <p><span className="text-muted-foreground">Dean:</span> {school.deanName || '-'}</p>
          <p><span className="text-muted-foreground">Email:</span> {school.email || '-'}</p>
        </div>
      </CardContent>
      
      <CardFooter className="pt-4 border-t flex gap-2">
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link to={`/admin/academic/schools/${school._id}`}>
            <Eye className="w-4 h-4 mr-2" /> View
          </Link>
        </Button>
        <Button variant="outline" size="sm" className="w-full" onClick={() => onEdit(school)}>
          <Edit className="w-4 h-4 mr-2" /> Edit
        </Button>
      </CardFooter>
    </Card>
  );
};
