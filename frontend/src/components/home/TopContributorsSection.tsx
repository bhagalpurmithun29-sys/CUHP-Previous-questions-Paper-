import React from 'react';
import { motion } from 'framer-motion';
import { FiAward } from 'react-icons/fi';

export const TopContributorsSection: React.FC = () => {
  const contributors = [
    { id: '1', name: 'Dr. Amit Sharma', role: 'Faculty', uploads: 124, avatar: 'AS' },
    { id: '2', name: 'Neha Gupta', role: 'Student', uploads: 89, avatar: 'NG' },
    { id: '3', name: 'Rahul Verma', role: 'Student', uploads: 67, avatar: 'RV' },
    { id: '4', name: 'Priya Singh', role: 'Moderator', uploads: 54, avatar: 'PS' },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Top Contributors
          </h2>
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
            A huge thank you to the students and faculty who make this platform possible.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {contributors.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 text-center border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all"
            >
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-primary-light text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-md mb-4 border-4 border-white dark:border-gray-900 relative">
                {user.avatar}
                {index === 0 && (
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 p-1 rounded-full shadow-sm">
                    <FiAward className="w-4 h-4" />
                  </div>
                )}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{user.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{user.role}</p>
              <div className="inline-block bg-white dark:bg-gray-900 px-4 py-1.5 rounded-full text-sm font-semibold text-primary dark:text-primary-light border border-gray-200 dark:border-gray-700 shadow-sm">
                {user.uploads} Papers Uploaded
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
