import React from 'react';
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts';

interface QualityScorecardProps {
  metrics: any;
}

export const QualityScorecard: React.FC<QualityScorecardProps> = ({ metrics }) => {
  if (!metrics) return null;

  const data = [
    { subject: 'Groundedness', A: metrics.metrics.groundedness * 10, fullMark: 100 },
    { subject: 'Citation Quality', A: metrics.metrics.citationQuality * 10, fullMark: 100 },
    { subject: 'Completeness', A: metrics.metrics.completeness * 10, fullMark: 100 },
    { subject: 'Relevance', A: metrics.metrics.relevance * 10, fullMark: 100 },
    { subject: 'Clarity', A: metrics.metrics.clarity * 10, fullMark: 100 },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 flex-1 flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">AI Quality Scorecard</h3>
        <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{metrics.overallScore}</span>
      </div>

      <div className="flex-1 min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 11 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
            <Radar name="Score" dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.4} />
            <Tooltip contentStyle={{ borderRadius: '8px' }} formatter={(value: number) => [(value / 10).toFixed(1), 'Score']} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
