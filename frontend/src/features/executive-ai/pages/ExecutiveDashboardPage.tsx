import React, { useState } from 'react';
import { useGetDashboardData, useGetInsights, useGenerateReport } from '../hooks/useExecutiveAI';
import { ExecutiveOverview } from '../components/ExecutiveOverview';
import { RecommendationPanel } from '../components/RecommendationPanel';
import { Briefcase, Download, FileText, Loader2 } from 'lucide-react';

const ExecutiveDashboardPage: React.FC = () => {
  const { data: dashboardData, isLoading: isDashboardLoading } = useGetDashboardData();
  const { data: insightsData, isLoading: isInsightsLoading } = useGetInsights();
  const { mutate: generateReport, isPending: isReportGenerating } = useGenerateReport();
  const [downloadMsg, setDownloadMsg] = useState('');

  const handleDownload = () => {
    generateReport('PDF', {
      onSuccess: (data) => {
        setDownloadMsg(`Report ready: \${data.reportUrl}`);
        setTimeout(() => setDownloadMsg(''), 5000);
      }
    });
  };

  if (isDashboardLoading || isInsightsLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-muted-foreground animate-pulse">Aggregating platform intelligence...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-primary" />
            University Intelligence
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Executive academic insights, repository health, and strategic AI recommendations.
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <button 
            onClick={handleDownload}
            disabled={isReportGenerating}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
          >
            {isReportGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            Generate Executive Report
          </button>
          {downloadMsg && <span className="text-xs text-success font-medium">{downloadMsg}</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ExecutiveOverview data={dashboardData} insights={insightsData} />
          
          <div className="mt-6 bg-card p-6 rounded-2xl border shadow-sm">
            <h3 className="text-xl font-display font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Department Upload Activity
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/20 border-b">
                  <tr>
                    <th className="px-4 py-3 font-medium">Department</th>
                    <th className="px-4 py-3 font-medium">Uploads</th>
                    <th className="px-4 py-3 font-medium">Active Users</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData?.departmentPerformance?.map((dept: any) => (
                    <tr key={dept.department} className="border-b last:border-0">
                      <td className="px-4 py-3 font-medium">{dept.department}</td>
                      <td className="px-4 py-3">{dept.uploadCount}</td>
                      <td className="px-4 py-3">{dept.activeUsers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <RecommendationPanel insights={insightsData} />
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboardPage;
