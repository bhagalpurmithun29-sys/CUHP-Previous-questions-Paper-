import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { apiClient } from '../../lib/axios';

interface StatsResponse {
  totalQuestionPapers: number;
  approvedPapers: number;
  departments: number;
  courses: number;
  semesters: number;
  subjects: number;
  registeredUsers: number;
  contributors: number;
  downloads: number;
  bookmarks: number;
}

export const StatisticsSection: React.FC = () => {
  const [statsData, setStatsData] = useState<StatsResponse | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiClient.get('/public/statistics');
        setStatsData(response.data.data);
      } catch (error) {
        console.error('Failed to fetch statistics:', error);
      }
    };
    
    fetchStats();
  }, []);

  const formatNumber = (num: number, usePlus: boolean = true) => {
    let formatted = num.toString();
    if (num >= 1000000) {
      formatted = (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (num >= 1000) {
      formatted = (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return usePlus ? formatted + '+' : formatted;
  };

  const stats = [
    { label: 'Total Papers', value: statsData ? formatNumber(statsData.approvedPapers) : '0' },
    { label: 'Departments', value: statsData ? statsData.departments.toString() : '0' },
    { label: 'Subjects', value: statsData ? formatNumber(statsData.subjects) : '0' },
    { label: 'Downloads', value: statsData ? formatNumber(statsData.downloads) : '0' },
    { label: 'Contributors', value: statsData ? formatNumber(statsData.contributors) : '0' },
  ];

  return (
    <section className="py-16 bg-primary dark:bg-primary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center divide-x-0 lg:divide-x divide-white/20 dark:divide-gray-600/50">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="px-4 py-2"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-white mb-2">{stat.value}</div>
              <div className="text-sm font-medium text-primary-light dark:text-gray-300 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
