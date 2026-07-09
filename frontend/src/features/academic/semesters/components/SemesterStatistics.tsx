import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarDays, PlayCircle, Archive, BookOpen } from 'lucide-react';

interface SemesterStatisticsProps {
  data: {
    semesters?: any[];
    pagination?: { total: number };
  };
}

export const SemesterStatistics: React.FC<SemesterStatisticsProps> = ({ data }) => {
  const totalSemesters = data?.pagination?.total || 0;
  const currentSemesters = data?.semesters?.filter(s => s.isCurrentSemester).length || 0;
  const upcomingSemesters = data?.semesters?.filter(s => s.status === 'UPCOMING').length || 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card className="bg-primary/5 border-primary/20 shadow-none">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-full text-primary"><CalendarDays className="w-5 h-5" /></div>
          <div>
            <p className="text-2xl font-bold">{totalSemesters}</p>
            <p className="text-xs text-muted-foreground uppercase font-semibold">Total Semesters</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-green-500/5 border-green-500/20 shadow-none">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="p-3 bg-green-500/10 rounded-full text-green-600"><PlayCircle className="w-5 h-5" /></div>
          <div>
            <p className="text-2xl font-bold">{currentSemesters}</p>
            <p className="text-xs text-muted-foreground uppercase font-semibold">Current Active</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-amber-500/5 border-amber-500/20 shadow-none">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 rounded-full text-amber-600"><Archive className="w-5 h-5" /></div>
          <div>
            <p className="text-2xl font-bold">{upcomingSemesters}</p>
            <p className="text-xs text-muted-foreground uppercase font-semibold">Upcoming</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-500/5 border-blue-500/20 shadow-none">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 rounded-full text-blue-600"><BookOpen className="w-5 h-5" /></div>
          <div>
            <p className="text-2xl font-bold">~</p>
            <p className="text-xs text-muted-foreground uppercase font-semibold">Total Subjects</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
