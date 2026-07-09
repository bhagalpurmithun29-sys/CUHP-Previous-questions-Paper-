import React from 'react';
import { Link } from 'react-router-dom';
import { BadgeIcon } from './BadgeIcon';
import { motion } from 'framer-motion';

interface LeaderboardTableProps {
  data: any[];
  isLoading: boolean;
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return <div className="animate-pulse space-y-4">
      {[1,2,3,4,5].map(i => <div key={i} className="h-16 bg-white dark:bg-gray-800 rounded-xl" />)}
    </div>;
  }

  if (!data?.length) {
    return <div className="text-center py-10 text-gray-500">No contributors found for this category yet.</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-sm border-b border-gray-200 dark:border-gray-800">
            <th className="py-4 px-6 font-semibold w-24 text-center">Rank</th>
            <th className="py-4 px-6 font-semibold">Contributor</th>
            <th className="py-4 px-6 font-semibold hidden md:table-cell">Department</th>
            <th className="py-4 px-6 font-semibold text-center hidden sm:table-cell">Badges</th>
            <th className="py-4 px-6 font-semibold text-right">Points</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, idx) => (
            <motion.tr 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={user._id} 
              className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors group"
            >
              <td className="py-4 px-6 text-center">
                <span className={`font-bold text-lg ${idx === 0 ? 'text-yellow-500' : idx === 1 ? 'text-gray-400' : idx === 2 ? 'text-amber-600' : 'text-gray-500'}`}>
                  #{user.rank}
                </span>
              </td>
              <td className="py-4 px-6">
                <Link to={`/community/profile/${user._id}`} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold overflow-hidden">
                    {user.avatarUrl ? <img src={user.avatarUrl} alt={user.firstName} /> : user.firstName[0]}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                      {user.firstName} {user.lastName}
                    </div>
                  </div>
                </Link>
              </td>
              <td className="py-4 px-6 text-gray-500 dark:text-gray-400 text-sm hidden md:table-cell">
                {user.department?.name || '-'}
              </td>
              <td className="py-4 px-6 hidden sm:table-cell">
                <div className="flex items-center justify-center gap-1">
                  {user.badges?.slice(0, 3).map((b: string) => <BadgeIcon key={b} badge={b} size={16} />)}
                  {user.badges?.length > 3 && <span className="text-xs text-gray-500">+{user.badges.length - 3}</span>}
                </div>
              </td>
              <td className="py-4 px-6 text-right font-bold text-primary dark:text-primary-light">
                {user.contributionScore.toLocaleString()}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
