import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Layers, GraduationCap, CalendarDays, BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { SchoolStatusBadge } from '../../schools/components/SchoolStatusBadge';
import { cn } from '@/lib/utils';

interface ResultCardProps {
  result: any;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  
  const getIcon = (type: string) => {
    switch (type) {
      case 'SCHOOL': return <Building2 className="w-5 h-5" />;
      case 'DEPARTMENT': return <Layers className="w-5 h-5" />;
      case 'COURSE': return <GraduationCap className="w-5 h-5" />;
      case 'SEMESTER': return <CalendarDays className="w-5 h-5" />;
      case 'SUBJECT': return <BookOpen className="w-5 h-5" />;
      default: return null;
    }
  };

  const getLink = (type: string, id: string) => {
    switch (type) {
      case 'SCHOOL': return `/admin/academic/schools/${id}`;
      case 'DEPARTMENT': return `/admin/academic/departments/${id}`;
      case 'COURSE': return `/admin/academic/courses/${id}`;
      case 'SEMESTER': return `/admin/academic/semesters/${id}`;
      case 'SUBJECT': return `/admin/academic/subjects/${id}`;
      default: return '#';
    }
  };

  const typeColorMap: Record<string, string> = {
    'SCHOOL': 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
    'DEPARTMENT': 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/20',
    'COURSE': 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20',
    'SEMESTER': 'bg-pink-500/10 text-pink-700 dark:text-pink-400 border-pink-500/20',
    'SUBJECT': 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge variant="outline" className={cn("flex items-center gap-1 uppercase tracking-wider text-[10px]", typeColorMap[result.type])}>
                {getIcon(result.type)} {result.type}
              </Badge>
              <Badge variant="secondary" className="font-mono text-[10px]">{result.code}</Badge>
              <SchoolStatusBadge status={result.status} />
            </div>
            
            <Link to={getLink(result.type, result.id)} className="block group">
              <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-2 truncate">
                {result.name}
                <ArrowRight className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
              </h3>
            </Link>

            {result.path && (
              <p className="text-sm text-muted-foreground mt-2 truncate flex items-center gap-1.5" title={result.path}>
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 shrink-0" />
                {result.path}
              </p>
            )}

            {result.metadata && (
              <div className="flex gap-4 mt-3 pt-3 border-t text-sm">
                {result.metadata.credits && (
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground uppercase">Credits</span>
                    <span className="font-medium">{result.metadata.credits}</span>
                  </div>
                )}
                {result.metadata.type && (
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground uppercase">Type</span>
                    <span className="font-medium">{result.metadata.type}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
