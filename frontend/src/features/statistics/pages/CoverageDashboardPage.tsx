import React from 'react';
import { usePublicCoverage } from '../hooks/useStatistics';
import { CoverageHeatmap } from '../components/CoverageHeatmap';
import { MissingPapersList } from '../components/MissingPapersList';
import { FiPieChart } from 'react-icons/fi';

export const CoverageDashboardPage: React.FC = () => {
  const { data: coverage, isLoading } = usePublicCoverage();

  if (isLoading) {
    return <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50 flex items-center justify-center">Loading coverage data...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Coverage Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Deep dive into the academic coverage of the platform.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <FiPieChart className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Subject Coverage</p>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white">{coverage?.coveragePercentage || 0}%</h2>
            </div>
          </div>
        </div>

        {/* Heatmaps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <CoverageHeatmap data={coverage?.coverageByDepartment || []} title="Uploads by Department" />
          <CoverageHeatmap data={coverage?.coverageByCourse || []} title="Uploads by Course (Top 10)" />
        </div>

        {/* Missing Areas */}
        <MissingPapersList subjects={coverage?.missingPapers?.subjectsWithNoPapers || []} />

      </div>
    </div>
  );
};
