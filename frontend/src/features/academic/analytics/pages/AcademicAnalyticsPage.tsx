import React from 'react';
import { useAcademicAnalytics } from '../hooks/useAcademicAnalytics';
import { BreadcrumbNavigation } from '../../components/BreadcrumbNavigation';
import { OverviewCards } from '../components/OverviewCards';
import { GrowthTrends } from '../components/GrowthTrends';
import { DataQualityDashboard } from '../components/DataQualityDashboard';
import { Button } from '@/components/ui/button';
import { DownloadCloud, Loader2 } from 'lucide-react';

export default function AcademicAnalyticsPage() {
  const { overview, growth, quality, generateReport, isGenerating } = useAcademicAnalytics();

  const handleGenerateReport = async () => {
    try {
      const report = await generateReport({ type: 'FULL_SUMMARY' });
      // Demo download mechanism
      const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cuhp_academic_report_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <BreadcrumbNavigation items={[{ label: 'Administration', href: '/admin' }, { label: 'Academic Master Data', href: '/admin/academic' }, { label: 'Analytics & Insights' }]} />
          <h1 className="text-3xl font-bold tracking-tight mt-2">Executive Analytics</h1>
          <p className="text-muted-foreground">High-level metrics, growth trends, and data health monitoring.</p>
        </div>
        
        <Button onClick={handleGenerateReport} disabled={isGenerating} className="gap-2 shadow-sm">
          {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <DownloadCloud className="w-4 h-4" />}
          Generate Full Report
        </Button>
      </div>

      <div className="space-y-6">
        <OverviewCards data={overview.data} isLoading={overview.isLoading} />
        
        <DataQualityDashboard data={quality.data} isLoading={quality.isLoading} />

        <GrowthTrends data={growth.data} isLoading={growth.isLoading} />
      </div>
    </div>
  );
}
