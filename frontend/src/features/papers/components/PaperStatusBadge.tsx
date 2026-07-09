import React from 'react';
import { Badge } from '@/components/ui/badge';

interface Props {
  status: 'DRAFT' | 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED' | 'ARCHIVED';
  className?: string;
}

export const PaperStatusBadge: React.FC<Props> = ({ status, className }) => {
  const map: Record<string, { label: string, color: string }> = {
    'DRAFT': { label: 'Draft', color: 'bg-muted text-muted-foreground' },
    'PENDING_REVIEW': { label: 'Under Review', color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' },
    'APPROVED': { label: 'Approved', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
    'REJECTED': { label: 'Rejected', color: 'bg-destructive/10 text-destructive border-destructive/20' },
    'ARCHIVED': { label: 'Archived', color: 'bg-slate-500/10 text-slate-600 border-slate-500/20' }
  };

  const config = map[status] || map['DRAFT'];

  return (
    <Badge variant="outline" className={`font-semibold tracking-wide uppercase text-[10px] ${config.color} ${className}`}>
      {config.label}
    </Badge>
  );
};
