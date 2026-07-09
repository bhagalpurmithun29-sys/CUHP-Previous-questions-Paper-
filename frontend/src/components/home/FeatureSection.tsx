import React from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiCheckCircle, FiBookmark, FiFolder, FiPieChart, FiDownloadCloud } from 'react-icons/fi';

export const FeatureSection: React.FC = () => {
  const features = [
    {
      title: 'Previous Year Papers',
      description: 'Instant access to a vast repository of previous mid-term and end-term examination papers.',
      icon: FiDownloadCloud,
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
    },
    {
      title: 'Lightning Fast Search',
      description: 'Find exactly what you need in milliseconds with our optimized, course-code aware search engine.',
      icon: FiSearch,
      color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
    },
    {
      title: 'Verified Uploads',
      description: 'Every paper goes through a strict moderation process by faculty to ensure authenticity and quality.',
      icon: FiCheckCircle,
      color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
    },
    {
      title: 'Smart Bookmarks',
      description: 'Save papers for offline viewing and organize them by semester for quick revision before exams.',
      icon: FiBookmark,
      color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
    },
    {
      title: 'Personal Library',
      description: 'Maintain your own collection of downloaded and uploaded papers securely in one place.',
      icon: FiFolder,
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
    },
    {
      title: 'Advanced Analytics',
      description: 'Track paper popularity, download trends, and see the most active contributors in your department.',
      icon: FiPieChart,
      color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold text-primary dark:text-primary-light tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Everything you need to ace your exams
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
            Our platform is purpose-built for CUHP students to streamline their academic preparation with modern, intuitive tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 group"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300 ${feature.color}`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
