import React, { useState } from 'react';
import { useLeaderboard } from '../hooks/useCommunity';
import { LeaderboardTable } from '../components/LeaderboardTable';
import { FiTrendingUp } from 'react-icons/fi';

export const LeaderboardPage: React.FC = () => {
  const [filter, setFilter] = useState('overall');
  const { data, isLoading } = useLeaderboard(filter);

  const filters = [
    { id: 'overall', label: 'Overall Top' },
    { id: 'faculty', label: 'Top Faculty' },
    { id: 'moderator', label: 'Top Moderators' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
            <FiTrendingUp className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Contributor Leaderboard</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Recognizing the students and faculty who make the CUHP Question Bank platform possible through their valuable contributions.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${filter === f.id ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-md' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <LeaderboardTable data={data} isLoading={isLoading} />

        {/* Gamification Info Card */}
        <div className="mt-12 bg-primary/5 border border-primary/10 rounded-2xl p-6 text-center">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">How to earn points?</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Earn <strong>100 points</strong> for every approved question paper upload. Help moderate the platform by reporting issues to earn bonus points and unlock exclusive community badges!
          </p>
        </div>

      </div>
    </div>
  );
};
