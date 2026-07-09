import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthAdmin } from '../hooks/useAuthAdmin';
import { LoginAnalytics } from '../components/LoginAnalytics';
import { MFAAnalytics } from '../components/MFAAnalytics';
import { SecurityEvents } from '../components/SecurityEvents';
import { AuditLogViewer } from '../components/AuditLogViewer';
import { SessionAnalytics } from '../components/SessionAnalytics';
import { IdentityProviders } from '../components/IdentityProviders';
import { PasswordPolicy } from '../components/PasswordPolicy';
import { RiskOverview } from '../components/RiskOverview';
import { Button } from '@/components/ui/button';
import { Download, FileText, Shield } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function AuthAdminDashboard() {
  const { toast } = useToast();
  const { useDashboardAnalytics, useReportGeneration } = useAuthAdmin();
  const { data: dashboardData, isLoading: isDashboardLoading } = useDashboardAnalytics();
  const reportMutation = useReportGeneration();

  const handleDownloadReport = (type: string, format: string) => {
    reportMutation.mutate({ type, format }, {
      onSuccess: (data) => {
        if (format === 'csv') {
          const url = window.URL.createObjectURL(new Blob([data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${type}-report.csv`);
          document.body.appendChild(link);
          link.click();
          link.remove();
        }
        toast({ title: 'Success', description: 'Report generated successfully.' });
      },
      onError: () => {
        toast({ title: 'Error', description: 'Failed to generate report.', variant: 'destructive' });
      }
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Shield className="w-8 h-8 text-primary" /> Identity & Security Center
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage authentication policies, monitor security events, and audit access logs.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleDownloadReport('security', 'csv')} disabled={reportMutation.isPending}>
            <FileText className="w-4 h-4 mr-2" /> Export Security Report
          </Button>
          <Button onClick={() => handleDownloadReport('compliance', 'csv')} disabled={reportMutation.isPending}>
            <Download className="w-4 h-4 mr-2" /> Compliance Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-muted p-1">
          <TabsTrigger value="overview">Overview & Analytics</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          <TabsTrigger value="policies">Policies & Identity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <LoginAnalytics data={dashboardData} isLoading={isDashboardLoading} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SecurityEvents />
            <div className="space-y-6">
              <RiskOverview data={dashboardData} isLoading={isDashboardLoading} />
              <MFAAnalytics data={dashboardData} isLoading={isDashboardLoading} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <AuditLogViewer />
        </TabsContent>

        <TabsContent value="policies" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <PasswordPolicy />
              <SessionAnalytics data={dashboardData} isLoading={isDashboardLoading} />
            </div>
            <div>
              <IdentityProviders />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
