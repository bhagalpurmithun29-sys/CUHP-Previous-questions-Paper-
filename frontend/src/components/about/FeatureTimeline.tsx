import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';

export const FeatureTimeline: React.FC = () => {
  const features = [
    'Secure Role-Based Authentication',
    'Question Paper Search & Filtering',
    'Personal Bookmarks & Collections',
    'Intelligent Recommendations',
    'Advanced Platform Analytics',
    'Faculty Moderator System',
    'Comprehensive Admin Panel',
    'Future AI PDF Parsing (Upcoming)'
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Core Features
          </h2>
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
            A comprehensive suite of tools designed for the modern academic experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700"
            >
              <FiCheckCircle className="w-6 h-6 text-green-500 mr-4 shrink-0" />
              <span className="text-gray-800 dark:text-gray-200 font-medium">{feature}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
