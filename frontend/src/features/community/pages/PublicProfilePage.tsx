import React from 'react';
import { useParams } from 'react-router-dom';
import { usePublicProfile } from '../hooks/useCommunity';
import { BadgeIcon } from '../components/BadgeIcon';
import { TimelineFeed } from '../components/TimelineFeed';
import { FiAward, FiCalendar, FiBook } from 'react-icons/fi';

export const PublicProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { data, isLoading, isError } = usePublicProfile(userId as string);

  if (isLoading) {
    return <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50 flex items-center justify-center">Loading profile...</div>;
  }

  if (isError || !data?.user) {
    return <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50 flex items-center justify-center text-red-500">Profile not found.</div>;
  }

  const { user, timeline } = data;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Header Card */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm relative overflow-hidden mb-8">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-primary/20 to-primary/5"></div>
          
          <div className="relative flex flex-col sm:flex-row items-center sm:items-end gap-6 mt-12">
            <div className="w-32 h-32 rounded-full bg-white dark:bg-gray-800 p-2 shadow-lg z-10 shrink-0">
              <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center text-primary text-4xl font-bold overflow-hidden">
                {user.avatarUrl ? <img src={user.avatarUrl} alt={user.firstName} className="w-full h-full object-cover" /> : user.firstName[0]}
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left z-10 pb-2">
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">
                {user.firstName} {user.lastName}
              </h1>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-1"><FiAward /> {user.role}</span>
                {user.department && <span className="flex items-center gap-1"><FiBook /> {user.department.name}</span>}
                <span className="flex items-center gap-1"><FiCalendar /> Joined {new Date(user.createdAt).getFullYear()}</span>
              </div>
            </div>
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 text-center min-w-[120px] shrink-0 z-10">
              <div className="text-sm font-bold text-primary dark:text-primary-light mb-1">Total Score</div>
              <div className="text-3xl font-black text-gray-900 dark:text-white">{user.contributionScore.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
              <TimelineFeed timeline={timeline} />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Badges</h3>
              {user.badges && user.badges.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {user.badges.map((b: string) => <BadgeIcon key={b} badge={b} size={32} />)}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No badges earned yet.</p>
              )}
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Achievements</h3>
              {user.achievements && user.achievements.length > 0 ? (
                <ul className="space-y-3">
                  {user.achievements.map((ach: string) => (
                    <li key={ach} className="text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-100 dark:border-gray-800 flex items-center gap-2">
                      <FiAward className="text-primary" /> {ach}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No specific achievements yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
