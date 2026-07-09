import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PaperStatusBadge } from './PaperStatusBadge';
import { Button } from '@/components/ui/button';
import { Download, MoreHorizontal, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export const PaperTable: React.FC<{ papers: any[] }> = ({ papers }) => {
  if (!papers || papers.length === 0) return null;

  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Paper Code</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Session</TableHead>
            <TableHead>Uploaded</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {papers.map((paper) => (
            <TableRow key={paper._id}>
              <TableCell className="font-mono text-xs">{paper.paperCode}</TableCell>
              <TableCell className="font-medium max-w-[200px] truncate" title={paper.title}>{paper.title}</TableCell>
              <TableCell className="text-muted-foreground max-w-[150px] truncate" title={paper.subjectId?.subjectName}>
                {paper.subjectId?.subjectName || 'N/A'}
              </TableCell>
              <TableCell>{paper.academicYear} ({paper.examSession})</TableCell>
              <TableCell>{format(new Date(paper.createdAt), 'dd MMM yyyy')}</TableCell>
              <TableCell><PaperStatusBadge status={paper.status} /></TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to={`/admin/papers/${paper._id}`} className="cursor-pointer flex items-center">
                        <Eye className="w-4 h-4 mr-2" /> View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer flex items-center">
                      <Download className="w-4 h-4 mr-2" /> Download Original
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
