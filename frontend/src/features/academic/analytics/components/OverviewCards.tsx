import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Layers, GraduationCap, CalendarDays, BookOpen, Loader2 } from 'lucide-react';

export const OverviewCards: React.FC<{ data: any, isLoading: boolean }> = ({ data, isLoading }) => {
  if (isLoading) {
    return <div className="grid grid-cols-1 md:grid-cols-5 gap-4"><Loader2 className="w-6 h-6 animate-spin mx-auto col-span-5 text-muted-foreground" /></div>;
  }
  if (!data) return null;

  const cards = [
    { title: 'Total Schools', value: data.schools.total, active: data.schools.active, icon: Building2, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { title: 'Departments', value: data.departments.total, active: data.departments.active, icon: Layers, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
    { title: 'Courses', value: data.courses.total, active: data.courses.active, icon: GraduationCap, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { title: 'Semesters', value: data.semesters.total, active: data.semesters.active, icon: CalendarDays, color: 'text-pink-500', bg: 'bg-pink-500/10' },
    { title: 'Subjects', value: data.subjects.total, active: data.subjects.active, icon: BookOpen, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {cards.map((card, i) => (
        <Card key={i} className="overflow-hidden hover:shadow-md transition-all border-none shadow-sm bg-card/60 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
            <div className={`p-2 rounded-lg ${card.bg}`}><card.icon className={`w-4 h-4 ${card.color}`} /></div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">{card.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">{card.active} Active</span> • {card.value - card.active} Archived
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
