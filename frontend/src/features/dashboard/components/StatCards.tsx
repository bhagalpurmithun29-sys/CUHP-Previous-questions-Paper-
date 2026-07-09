import React from 'react';
import { motion } from 'framer-motion';
import { FiLayers, FiGrid, FiBook, FiClock, FiFileText } from 'react-icons/fi';
import { useAdminStatistics } from '../hooks/useAdmin';

export const StatCards: React.FC = () => {
  const { data: stats, isLoading } = useAdminStatistics();

  if (isLoading || !stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 animate-pulse h-32"></div>
        ))}
      </div>
    );
  }

  const cards = [
    { title: 'Schools', icon: <FiLayers />, data: stats.schools, color: 'blue' },
    { title: 'Departments', icon: <FiGrid />, data: stats.departments, color: 'purple' },
    { title: 'Courses', icon: <FiBook />, data: stats.courses, color: 'green' },
    { title: 'Semesters', icon: <FiClock />, data: stats.semesters, color: 'orange' },
    { title: 'Subjects', icon: <FiFileText />, data: stats.subjects, color: 'red' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card, idx) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 bg-${card.color}-50 dark:bg-${card.color}-900/20 text-${card.color}-600 dark:text-${card.color}-400 rounded-xl group-hover:scale-110 transition-transform`}>
              {React.cloneElement(card.icon as React.ReactElement, { className: 'w-6 h-6' })}
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {card.data.total}
            </span>
          </div>
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">{card.title}</h3>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-green-600 font-medium bg-green-50 dark:bg-green-900/30 px-1.5 py-0.5 rounded">
              {card.data.active} Active
            </span>
            <span className="text-gray-500 font-medium bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
              {card.data.archived} Archived
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
