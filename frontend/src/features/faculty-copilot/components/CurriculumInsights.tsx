import React from 'react';
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts';

interface CurriculumInsightsProps {
  coverageScore: number;
  strongTopics: string[];
  weakTopics: string[];
}

export const CurriculumInsights: React.FC<CurriculumInsightsProps> = ({ coverageScore, strongTopics, weakTopics }) => {
  const data = [
    { subject: 'Syllabus Alignment', A: 85, fullMark: 100 },
    { subject: 'Topic Balance', A: 70, fullMark: 100 },
    { subject: 'Difficulty Spread', A: 90, fullMark: 100 },
    { subject: 'Bloom\'s Spread', A: 60, fullMark: 100 },
    { subject: 'Historical Variance', A: 75, fullMark: 100 },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Curriculum Intelligence</h3>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="text-4xl font-black text-indigo-600 dark:text-indigo-400">{coverageScore}%</div>
        <div className="text-sm text-gray-500 dark:text-gray-400 leading-snug">
          Overall health score based on historical repository alignment and assessment standards.
        </div>
      </div>

      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 10 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
            <Radar name="Score" dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.4} />
            <Tooltip contentStyle={{ borderRadius: '8px' }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-green-600 mb-2">Strengths</h4>
          <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
            {strongTopics.map((t, i) => <li key={i} className="truncate">• {t}</li>)}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-red-600 mb-2">Weaknesses</h4>
          <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
            {weakTopics.map((t, i) => <li key={i} className="truncate">• {t}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};
