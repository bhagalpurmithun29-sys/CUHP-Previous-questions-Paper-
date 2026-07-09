import React from 'react';
import { motion } from 'framer-motion';

export const ContributorsSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800/50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl mb-6">
          Contributors & Community
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400 mb-12">
          This platform is heavily reliant on the incredible contributions from students and faculty who upload resources and verify content.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm max-w-3xl mx-auto"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Contribution Guidelines</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-left">
            Anyone with a verified CUHP academic account can contribute. We kindly ask that you:
          </p>
          <ul className="text-left space-y-3 text-gray-600 dark:text-gray-400 list-disc pl-5">
            <li>Ensure scans are legible and oriented correctly.</li>
            <li>Double-check the course code and semester before uploading.</li>
            <li>Do not upload copyrighted textbooks or publisher materials without authorization.</li>
            <li>Report inaccuracies through the platform's moderation system rather than re-uploading duplicate files.</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};
