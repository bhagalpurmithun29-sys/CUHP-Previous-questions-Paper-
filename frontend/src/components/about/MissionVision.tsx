import React from 'react';
import { motion } from 'framer-motion';
import { FiEye, FiCompass } from 'react-icons/fi';

export const MissionVision: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800/50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6">
              <FiCompass className="w-7 h-7" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">Our Mission</h2>
            <ul className="space-y-4 text-gray-600 dark:text-gray-400 text-lg">
              <li className="flex items-start">
                <span className="text-primary mr-3 text-xl">•</span>
                Improve open access to previous year question papers.
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3 text-xl">•</span>
                Support students comprehensively in their exam preparation.
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3 text-xl">•</span>
                Encourage a culture of academic collaboration and resource sharing.
              </li>
            </ul>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mb-6">
              <FiEye className="w-7 h-7" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">Our Vision</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              We envision growing into the most comprehensive, reliable academic document repository for the university. 
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Long-term, we aim to continually innovate, deeply support faculty and students, and establish a framework that could be considered for future official adoption by the university administration.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
