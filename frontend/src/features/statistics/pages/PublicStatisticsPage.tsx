import React from 'react';
import { usePublicStatistics, usePublicActivity } from '../hooks/useStatistics';
import { StatCard } from '../components/StatCard';
import { TimelineFeed } from '../../community/components/TimelineFeed';
import { FiDatabase, FiUsers, FiFileText, FiDownload, FiCheckCircle, FiBook, FiTrendingUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export const PublicStatisticsPage: React.FC = () => {
  const { data: stats, isLoading: statsLoading } = usePublicStatistics();
  const { data: activity, isLoading: activityLoading } = usePublicActivity();

  if (statsLoading || activityLoading) {
    return <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50 flex items-center justify-center">Loading statistics...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Platform Statistics</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Transparent insights into the growth and coverage of the CUHP Question Bank repository.
          </p>
        </div>

        {/* Primary Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <StatCard title="Total Papers" value={stats?.totalQuestionPapers || 0} icon={FiDatabase} color="text-blue-500" delay={0.1} />
          <StatCard title="Approved Papers" value={stats?.approvedPapers || 0} icon={FiCheckCircle} color="text-green-500" delay={0.2} />
          <StatCard title="Total Downloads" value={stats?.downloads || 0} icon={FiDownload} color="text-purple-500" delay={0.3} />
          <StatCard title="Contributors" value={stats?.contributors || 0} icon={FiUsers} color="text-amber-500" delay={0.4} />
        </div>

        {/* Secondary Stats */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Academic Coverage</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <StatCard title="Departments" value={stats?.departments || 0} icon={FiBook} color="text-gray-700 dark:text-gray-300" delay={0.5} />
          <StatCard title="Courses" value={stats?.courses || 0} icon={FiFileText} color="text-gray-700 dark:text-gray-300" delay={0.6} />
          <StatCard title="Subjects" value={stats?.subjects || 0} icon={FiTrendingUp} color="text-gray-700 dark:text-gray-300" delay={0.7} />
          <StatCard title="Registered Users" value={stats?.registeredUsers || 0} icon={FiUsers} color="text-gray-700 dark:text-gray-300" delay={0.8} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Approved Papers */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Recently Added Papers</h3>
            {activity?.recentApprovedPapers?.length > 0 ? (
              <ul className="space-y-4">
                {activity.recentApprovedPapers.map((paper: any) => (
                  <li key={paper._id} className="flex justify-between items-start border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0 last:pb-0">
                    <div>
                      <Link to={`/papers/${paper._id}`} className="font-medium text-gray-900 dark:text-white hover:text-primary transition-colors">
                        {paper.title}
                      </Link>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{paper.subjectId?.name} • {paper.subjectId?.code}</p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap">{new Date(paper.createdAt).toLocaleDateString()}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No recent papers available.</p>
            )}
          </div>

          {/* Public Activity Feed */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Live Community Activity</h3>
            <TimelineFeed timeline={activity?.recentActivity || []} />
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link to="/statistics/coverage" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-colors shadow-sm">
            View Detailed Coverage Dashboard <FiTrendingUp />
          </Link>
        </div>

      </div>
    </div>
  );
};
