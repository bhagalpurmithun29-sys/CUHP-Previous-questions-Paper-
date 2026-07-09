import React from 'react';
import { motion } from 'framer-motion';
import { FiInfo } from 'react-icons/fi';

export const AboutCUHP: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800/50 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl mb-6">
            Central University of Himachal Pradesh
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            Established in 2009, the Central University of Himachal Pradesh (CUHP) is a premier higher education institution committed to excellence in teaching, research, and holistic development. Located in the picturesque landscape of Himachal Pradesh, the university offers a wide range of undergraduate, postgraduate, and doctoral programs across various disciplines.
          </p>
          
          <div className="inline-flex items-start text-left bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800/50">
            <FiInfo className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0 mr-3 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-200">Independent Academic Resource</h3>
              <p className="text-sm text-blue-800 dark:text-blue-300 mt-1">
                <strong>Disclaimer:</strong> This website is an independent student-focused academic resource initiative. It is not officially operated, endorsed, or maintained by the Central University of Himachal Pradesh administration.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
