import React from 'react';
import { useParams } from 'react-router-dom';
import { useSchool } from '../hooks/useSchool';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { SchoolStatusBadge } from '../components/SchoolStatusBadge';
import { BreadcrumbNavigation } from '../../components/BreadcrumbNavigation';
import { Loader2, Building, Mail, Phone, Globe, User, BookOpen, Library, GraduationCap } from 'lucide-react';

export default function SchoolDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: school, isLoading, isError } = useSchool(id || '');

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  if (isError || !school) {
    return <div className="container mx-auto p-6"><Card><CardContent className="p-8 text-center text-red-500">Error loading school details or school not found.</CardContent></Card></div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <BreadcrumbNavigation items={[
        { label: 'Administration', href: '/admin' }, 
        { label: 'Academic Master Data', href: '/admin/academic' }, 
        { label: 'Schools', href: '/admin/academic/schools' },
        { label: school.schoolCode }
      ]} />
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column: Details */}
        <div className="flex-1 space-y-6">
          <Card>
            <CardHeader className="border-b pb-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Building className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{school.schoolName}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-mono font-bold">{school.schoolCode}</span>
                      {school.shortName && <span>({school.shortName})</span>}
                    </CardDescription>
                  </div>
                </div>
                <SchoolStatusBadge status={school.status} />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Description</h3>
                <p className="text-sm">{school.description || 'No description provided.'}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Dean / Head</p>
                    <p className="font-medium text-sm">{school.deanName || 'Not Assigned'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Contact Email</p>
                    <p className="font-medium text-sm">{school.email || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Contact Phone</p>
                    <p className="font-medium text-sm">{school.phone || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Website</p>
                    <p className="font-medium text-sm text-primary hover:underline cursor-pointer">
                      {school.website ? <a href={school.website} target="_blank" rel="noreferrer">{school.website}</a> : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Statistics & Activity */}
        <div className="w-full md:w-80 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Academic Structure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
                  <Library className="w-4 h-4" /> <span className="font-medium text-sm">Departments</span>
                </div>
                <span className="font-bold text-lg text-purple-700 dark:text-purple-300">{school.stats?.departmentsCount || 0}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                  <GraduationCap className="w-4 h-4" /> <span className="font-medium text-sm">Courses</span>
                </div>
                <span className="font-bold text-lg text-green-700 dark:text-green-300">-</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                  <BookOpen className="w-4 h-4" /> <span className="font-medium text-sm">Subjects</span>
                </div>
                <span className="font-bold text-lg text-blue-700 dark:text-blue-300">-</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground text-center p-4">
                Activity feed placeholder. Integration with AuthAuditLog required to show recent changes.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
