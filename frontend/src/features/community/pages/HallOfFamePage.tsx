import React from 'react';
import { useHallOfFame } from '../hooks/useCommunity';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiStar, FiShield, FiBookOpen } from 'react-icons/fi';

export const HallOfFamePage: React.FC = () => {
  const { data, isLoading } = useHallOfFame();

  if (isLoading) return <div className="text-center py-20">Loading Hall of Fame...</div>;

  const renderTop3 = (users: any[], title: string, icon: React.ReactNode, bgColor: string) => (
    <div className="mb-16">
      <div className="flex items-center justify-center gap-3 mb-10">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${bgColor}`}>
          {icon}
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">{title}</h2>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-end gap-6 max-w-4xl mx-auto">
        {users.slice(0, 3).map((user, idx) => {
          // Reorder for podium: 2nd, 1st, 3rd
          const podiumOrder = [1, 0, 2];
          const actualIdx = podiumOrder.indexOf(idx);
          if (actualIdx === -1 || !user) return null;

          const isFirst = idx === 0;
          return (
            <motion.div 
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: actualIdx * 0.2 }}
              key={user._id}
              className={`relative bg-white dark:bg-gray-900 rounded-3xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow-xl flex-1 transform transition-transform hover:-translate-y-2 ${isFirst ? 'md:-translate-y-8 z-10 scale-105' : 'opacity-90'}`}
            >
              {isFirst && (
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-yellow-400 text-yellow-900 text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg border-2 border-white dark:border-gray-900">
                    #1 Overall
                  </div>
                </div>
              )}
              
              <Link to={`/community/profile/${user._id}`}>
                <div className={`mx-auto rounded-full p-1.5 shadow-md mb-4 bg-gradient-to-tr ${isFirst ? 'from-yellow-400 to-yellow-600 w-24 h-24' : idx === 1 ? 'from-gray-300 to-gray-500 w-20 h-20' : 'from-amber-600 to-amber-800 w-20 h-20'}`}>
                  <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden font-bold text-2xl text-gray-700 dark:text-gray-300">
                    {user.avatarUrl ? <img src={user.avatarUrl} alt="" /> : user.firstName[0]}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">{user.firstName} {user.lastName}</h3>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">{user.department?.name || 'Contributor'}</p>
                <div className={`inline-flex items-center justify-center font-black px-4 py-1.5 rounded-xl ${isFirst ? 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 text-lg' : 'text-gray-600 bg-gray-100 dark:bg-gray-800'}`}>
                  {user.contributionScore.toLocaleString()} pts
                </div>
              </Link>
            </motion.div>
          );
        }).sort((a, b) => {
          // Sort to match visual podium: 2nd, 1st, 3rd in DOM order for flex layout
          const keyA = parseInt((a?.key as string) || '0', 10);
          const keyB = parseInt((b?.key as string) || '0', 10);
          return keyA - keyB;
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-20">
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600 mb-6 drop-shadow-sm">
            Hall of Fame
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
            Immortalizing the elite contributors who have shaped the academic legacy of the university through outstanding dedication.
          </p>
        </div>

        {data?.topContributors && renderTop3(data.topContributors, 'Top Contributors', <FiStar size={24} />, 'bg-gradient-to-br from-blue-500 to-indigo-600')}
        {data?.topModerators && renderTop3(data.topModerators, 'Top Moderators', <FiShield size={24} />, 'bg-gradient-to-br from-emerald-400 to-teal-600')}
        {data?.topFaculty && renderTop3(data.topFaculty, 'Top Faculty', <FiBookOpen size={24} />, 'bg-gradient-to-br from-purple-500 to-pink-600')}

      </div>
    </div>
  );
};
