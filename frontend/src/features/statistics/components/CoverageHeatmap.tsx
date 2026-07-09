import React from 'react';
import { motion } from 'framer-motion';

interface CoverageHeatmapProps {
  data: { name: string; count: number }[];
  title: string;
}

export const CoverageHeatmap: React.FC<CoverageHeatmapProps> = ({ data, title }) => {
  // Find max for relative width scaling
  const maxCount = Math.max(...(data.map(d => d.count) || [1]));

  if (!data || data.length === 0) {
    return <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 text-center text-gray-500">No coverage data available.</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">{title}</h3>
      <div className="space-y-4">
        {data.map((item, index) => {
          const width = Math.max((item.count / maxCount) * 100, 2); // At least 2% to be visible
          return (
            <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 group">
              <div className="w-full sm:w-48 shrink-0 text-sm font-medium text-gray-700 dark:text-gray-300 truncate" title={item.name}>
                {item.name}
              </div>
              <div className="flex-1 flex items-center gap-3">
                <div className="flex-1 h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${width}%` }}
                    transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                    className="h-full bg-primary rounded-full group-hover:bg-primary-dark transition-colors"
                  />
                </div>
                <span className="text-sm font-bold text-gray-900 dark:text-white w-12 text-right">{item.count}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
