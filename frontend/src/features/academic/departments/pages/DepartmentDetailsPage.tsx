import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDepartment } from '../hooks/useDepartment';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { SchoolStatusBadge } from '../../schools/components/SchoolStatusBadge';
import { BreadcrumbNavigation } from '../../components/BreadcrumbNavigation';
import { Loader2, Library, Mail, Phone, Globe, User, BookOpen, GraduationCap, Building2, ChevronRight } from 'lucide-react';

export default function DepartmentDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: department, isLoading, isError } = useDepartment(id || '');

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  if (isError || !department) {
    return <div className="container mx-auto p-6"><Card><CardContent className="p-8 text-center text-red-500">Error loading department details or department not found.</CardContent></Card></div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <BreadcrumbNavigation items={[
        { label: 'Administration', href: '/admin' }, 
        { label: 'Academic Master Data', href: '/admin/academic' }, 
        { label: 'Departments', href: '/admin/academic/departments' },
        { label: department.departmentCode }
      ]} />
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column: Details */}
        <div className="flex-1 space-y-6">
          <Card>
            <CardHeader className="border-b pb-4 mb-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Library className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{department.departmentName}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-mono font-bold">{department.departmentCode}</span>
                    </CardDescription>
                  </div>
                </div>
                <SchoolStatusBadge status={department.status} />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="flex items-center p-3 bg-muted/50 rounded-lg border">
                <Building2 className="w-5 h-5 text-muted-foreground mr-3" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Parent School</p>
                  <Link to={`/admin/academic/schools/${department.schoolId?._id}`} className="font-medium text-primary hover:underline flex items-center">
                    {department.schoolId?.schoolName} ({department.schoolId?.schoolCode})
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Description</h3>
                <p className="text-sm">{department.description || 'No description provided.'}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Head of Department (HOD)</p>
                    <p className="font-medium text-sm">{department.hodName || 'Not Assigned'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Contact Email</p>
                    <p className="font-medium text-sm">{department.email || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Contact Phone</p>
                    <p className="font-medium text-sm">{department.phone || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Website</p>
                    <p className="font-medium text-sm text-primary hover:underline cursor-pointer">
                      {department.website ? <a href={department.website} target="_blank" rel="noreferrer">{department.website}</a> : 'N/A'}
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
              <CardTitle className="text-lg">Department Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                  <GraduationCap className="w-4 h-4" /> <span className="font-medium text-sm">Courses</span>
                </div>
                <span className="font-bold text-lg text-green-700 dark:text-green-300">{department.stats?.coursesCount || 0}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
                  <BookOpen className="w-4 h-4" /> <span className="font-medium text-sm">Subjects Map</span>
                </div>
                <span className="font-bold text-lg text-amber-700 dark:text-amber-300">-</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                  <Library className="w-4 h-4" /> <span className="font-medium text-sm">Question Papers</span>
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
