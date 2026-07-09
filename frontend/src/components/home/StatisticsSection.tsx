import React from 'react';
import { motion } from 'framer-motion';

export const StatisticsSection: React.FC = () => {
  const stats = [
    { label: 'Total Papers', value: '5,000+' },
    { label: 'Departments', value: '14' },
    { label: 'Subjects', value: '450+' },
    { label: 'Downloads', value: '100k+' },
    { label: 'Contributors', value: '1,200+' },
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
