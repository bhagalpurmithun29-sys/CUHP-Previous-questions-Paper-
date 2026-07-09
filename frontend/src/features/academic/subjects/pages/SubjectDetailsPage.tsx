import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSubject } from '../hooks/useSubject';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { SchoolStatusBadge } from '../../schools/components/SchoolStatusBadge';
import { BreadcrumbNavigation } from '../../components/BreadcrumbNavigation';
import { Loader2, BookOpen, ChevronRight, GraduationCap, CalendarDays, Library, CheckCircle2, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function SubjectDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: subject, isLoading, isError } = useSubject(id || '');

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  if (isError || !subject) {
    return <div className="container mx-auto p-6"><Card><CardContent className="p-8 text-center text-red-500">Error loading subject details or subject not found.</CardContent></Card></div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <BreadcrumbNavigation items={[
        { label: 'Administration', href: '/admin' }, 
        { label: 'Academic Master Data', href: '/admin/academic' }, 
        { label: 'Subjects', href: '/admin/academic/subjects' },
        { label: subject.subjectCode }
      ]} />
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column: Details */}
        <div className="flex-1 space-y-6">
          <Card>
            <CardHeader className="border-b pb-4 mb-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="font-mono bg-primary/5 border-primary/20 text-primary">{subject.subjectCode}</Badge>
                      <CardTitle className="text-2xl">{subject.subjectName}</CardTitle>
                    </div>
                    <CardDescription className="flex items-center gap-2 mt-1 font-medium">
                      {subject.subjectType}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <SchoolStatusBadge status={subject.status} />
                  <div className="text-sm font-bold text-primary px-3 py-1 bg-primary/10 rounded-md">
                    {subject.credits} Credits
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center p-3 bg-muted/50 rounded-lg border">
                  <CalendarDays className="w-5 h-5 text-muted-foreground mr-3" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Semester Mapping</p>
                    <Link to={`/admin/academic/semesters/${subject.semesterId?._id}`} className="font-medium text-primary hover:underline flex items-center">
                      Semester {subject.semesterId?.semesterNumber}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-muted/50 rounded-lg border">
                  <GraduationCap className="w-5 h-5 text-muted-foreground mr-3" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Course Mapping</p>
                    <Link to={`/admin/academic/courses/${subject.semesterId?.courseId?._id}`} className="font-medium text-primary hover:underline flex items-center">
                      {subject.semesterId?.courseId?.courseCode}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Hours Distribution */}
              <div className="pt-4 border-t">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Hours Distribution (L-T-P)
                </h3>
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-card border rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground uppercase font-bold">Lecture</p>
                    <p className="text-xl font-bold mt-1">{subject.lectureHours || 0}</p>
                  </div>
                  <div className="bg-card border rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground uppercase font-bold">Tutorial</p>
                    <p className="text-xl font-bold mt-1">{subject.tutorialHours || 0}</p>
                  </div>
                  <div className="bg-card border rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground uppercase font-bold">Practical</p>
                    <p className="text-xl font-bold mt-1">{subject.practicalHours || 0}</p>
                  </div>
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 text-center">
                    <p className="text-xs text-primary uppercase font-bold">Total</p>
                    <p className="text-xl font-bold text-primary mt-1">{subject.totalHours || 0}</p>
                  </div>
                </div>
              </div>

              {/* Prerequisites */}
              {subject.prerequisiteSubjects && subject.prerequisiteSubjects.length > 0 && (
                <div className="pt-4 border-t">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-3">Prerequisites</h3>
                  <div className="flex flex-wrap gap-2">
                    {subject.prerequisiteSubjects.map((preq: any) => (
                      <Link key={preq._id} to={`/admin/academic/subjects/${preq._id}`}>
                        <Badge variant="secondary" className="hover:bg-primary/20 cursor-pointer">
                          {preq.subjectCode} - {preq.subjectName}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Statistics & Activity */}
        <div className="w-full md:w-80 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Content Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
                  <Library className="w-4 h-4" /> <span className="font-medium text-sm">Question Papers</span>
                </div>
                <span className="font-bold text-lg text-indigo-700 dark:text-indigo-300">
                  {subject.stats?.questionPapersCount || 0}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
