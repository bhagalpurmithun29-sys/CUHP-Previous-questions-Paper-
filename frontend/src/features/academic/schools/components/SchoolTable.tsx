import React from 'react';
import { SchoolStatusBadge } from './SchoolStatusBadge';
import { Button } from '@/components/ui/button';
import { Edit, Eye, Archive, RotateCcw, Trash2, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

interface SchoolTableProps {
  schools: any[];
  onEdit: (school: any) => void;
  onArchive: (id: string) => void;
  onRestore: (id: string) => void;
  onDelete: (school: any) => void;
}

export const SchoolTable: React.FC<SchoolTableProps> = ({ schools, onEdit, onArchive, onRestore, onDelete }) => {
  if (schools.length === 0) {
    return <div className="text-center p-8 text-muted-foreground border rounded-lg bg-card">No schools found matching your criteria.</div>;
  }

  return (
    <div className="rounded-md border bg-card overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
          <tr>
            <th className="px-4 py-3 font-medium">School Code</th>
            <th className="px-4 py-3 font-medium">School Name</th>
            <th className="px-4 py-3 font-medium">Dean</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium hidden md:table-cell">Created</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {schools.map((school) => (
            <tr key={school._id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
              <td className="px-4 py-3 font-mono font-medium text-primary">
                <Link to={`/admin/academic/schools/${school._id}`} className="hover:underline">{school.schoolCode}</Link>
              </td>
              <td className="px-4 py-3 font-medium">
                <Link to={`/admin/academic/schools/${school._id}`} className="hover:underline">{school.schoolName}</Link>
                {school.shortName && <p className="text-xs text-muted-foreground font-normal">{school.shortName}</p>}
              </td>
              <td className="px-4 py-3 text-muted-foreground">{school.deanName || '-'}</td>
              <td className="px-4 py-3">
                <SchoolStatusBadge status={school.status} />
              </td>
              <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                {format(new Date(school.createdAt), 'MMM dd, yyyy')}
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
                      <Link to={`/admin/academic/schools/${school._id}`} className="flex items-center cursor-pointer">
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(school)} className="cursor-pointer">
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator />
                    
                    {school.status !== 'ARCHIVED' ? (
                      <DropdownMenuItem onClick={() => onArchive(school._id)} className="cursor-pointer text-amber-600 focus:text-amber-600">
                        <Archive className="mr-2 h-4 w-4" /> Archive
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem onClick={() => onRestore(school._id)} className="cursor-pointer text-green-600 focus:text-green-600">
                        <RotateCcw className="mr-2 h-4 w-4" /> Restore
                      </DropdownMenuItem>
                    )}
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem onClick={() => onDelete(school)} className="cursor-pointer text-red-600 focus:text-red-600">
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
