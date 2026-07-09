import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiCode } from 'react-icons/fi';

export const OpenSourceSection: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary/5 dark:bg-primary/10 rounded-3xl p-8 md:p-16 border border-primary/10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <FiCode className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
              Open Source Philosophy
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              We believe that software built for education should be transparent and collaborative. While the core platform is maintained centrally to ensure code quality and security, we are preparing to open-source specific modules to allow Computer Science students at CUHP to contribute to the codebase.
            </p>
            
            <a 
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-sm cursor-not-allowed opacity-80"
              onClick={(e) => e.preventDefault()}
            >
              <FiGithub className="w-5 h-5" />
              GitHub Repository (Coming Soon)
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
