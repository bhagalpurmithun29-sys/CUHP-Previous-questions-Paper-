import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PaperStatusBadge } from './PaperStatusBadge';
import { FileText, Download, Eye, Clock, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';

export const PaperCard: React.FC<{ paper: any }> = ({ paper }) => {
  return (
    <Card className="hover:shadow-md transition-shadow group flex flex-col h-full overflow-hidden">
      <div className="relative h-40 bg-muted flex items-center justify-center border-b group-hover:bg-primary/5 transition-colors">
        {paper.thumbnailUrl ? (
          <img src={paper.thumbnailUrl} alt="Thumbnail" className="w-full h-full object-cover" />
        ) : (
          <FileText className="w-16 h-16 text-muted-foreground/30" />
        )}
        <div className="absolute top-2 right-2">
          <PaperStatusBadge status={paper.status} />
        </div>
      </div>
      
      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="mb-2">
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{paper.paperCode}</span>
          <Link to={`/admin/papers/${paper._id}`}>
            <h3 className="font-semibold text-lg leading-tight mt-1 group-hover:text-primary transition-colors line-clamp-2">
              {paper.title}
            </h3>
          </Link>
        </div>

        <div className="space-y-1.5 mt-auto mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 shrink-0" />
            <span className="truncate">{paper.academicYear} • {paper.examSession} • {paper.examType.replace('_', ' ')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 shrink-0" />
            <span>Uploaded {formatDistanceToNow(new Date(paper.createdAt), { addSuffix: true })}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-auto pt-4 border-t">
          <Button variant="outline" size="sm" className="flex-1 gap-2" asChild>
            <Link to={`/admin/papers/${paper._id}`}><Eye className="w-4 h-4" /> View Details</Link>
          </Button>
          <Button variant="secondary" size="icon" className="shrink-0" title="Download Original">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
