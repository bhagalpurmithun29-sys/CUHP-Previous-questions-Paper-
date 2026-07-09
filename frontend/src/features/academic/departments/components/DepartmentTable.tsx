import React from 'react';
import { SchoolStatusBadge } from '../../schools/components/SchoolStatusBadge';
import { Button } from '@/components/ui/button';
import { Edit, Eye, Archive, RotateCcw, Trash2, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

interface DepartmentTableProps {
  departments: any[];
  onEdit: (department: any) => void;
  onArchive: (id: string) => void;
  onRestore: (id: string) => void;
  onDelete: (department: any) => void;
}

export const DepartmentTable: React.FC<DepartmentTableProps> = ({ departments, onEdit, onArchive, onRestore, onDelete }) => {
  if (departments.length === 0) {
    return <div className="text-center p-8 text-muted-foreground border rounded-lg bg-card">No departments found matching your criteria.</div>;
  }

  return (
    <div className="rounded-md border bg-card overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
          <tr>
            <th className="px-4 py-3 font-medium">Code</th>
            <th className="px-4 py-3 font-medium">Department Name</th>
            <th className="px-4 py-3 font-medium">School</th>
            <th className="px-4 py-3 font-medium">HOD</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept) => (
            <tr key={dept._id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
              <td className="px-4 py-3 font-mono font-medium text-primary">
                <Link to={`/admin/academic/departments/${dept._id}`} className="hover:underline">{dept.departmentCode}</Link>
              </td>
              <td className="px-4 py-3 font-medium">
                <Link to={`/admin/academic/departments/${dept._id}`} className="hover:underline">{dept.departmentName}</Link>
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                <Link to={`/admin/academic/schools/${dept.schoolId?._id}`} className="hover:underline">
                  {dept.schoolId?.schoolCode || 'Unknown'}
                </Link>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{dept.hodName || '-'}</td>
              <td className="px-4 py-3">
                <SchoolStatusBadge status={dept.status} />
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
                      <Link to={`/admin/academic/departments/${dept._id}`} className="flex items-center cursor-pointer">
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(dept)} className="cursor-pointer">
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator />
                    
                    {dept.status !== 'ARCHIVED' ? (
                      <DropdownMenuItem onClick={() => onArchive(dept._id)} className="cursor-pointer text-amber-600 focus:text-amber-600">
                        <Archive className="mr-2 h-4 w-4" /> Archive
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem onClick={() => onRestore(dept._id)} className="cursor-pointer text-green-600 focus:text-green-600">
                        <RotateCcw className="mr-2 h-4 w-4" /> Restore
                      </DropdownMenuItem>
                    )}
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem onClick={() => onDelete(dept)} className="cursor-pointer text-red-600 focus:text-red-600">
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
