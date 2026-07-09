import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiDownload, FiFileText } from 'react-icons/fi';

export const LatestPapersSection: React.FC = () => {
  const latestPapers = [
    { id: '1', title: 'Data Structures and Algorithms - Final', subject: 'Computer Science', semester: 3, year: '2023-24', downloads: 145 },
    { id: '2', title: 'Macroeconomics Mid-Term', subject: 'Economics', semester: 2, year: '2023-24', downloads: 89 },
    { id: '3', title: 'Quantum Mechanics II', subject: 'Physics', semester: 4, year: '2022-23', downloads: 210 },
    { id: '4', title: 'Organic Chemistry Lab Viva', subject: 'Chemistry', semester: 1, year: '2024-25', downloads: 56 },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800/50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Recently Added Papers
            </h2>
            <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
              Check out the latest question papers uploaded by the community.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              to="/search"
              className="text-primary hover:text-primary-dark dark:text-primary-light font-medium flex items-center gap-1 group"
            >
              Browse all papers 
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {latestPapers.map((paper, index) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <FiFileText className="w-5 h-5" />
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                  <FiDownload className="w-3 h-3" />
                  {paper.downloads}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                <Link to={`/papers/${paper.id}`} className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  {paper.title}
                </Link>
              </h3>
              
              <div className="mt-auto space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p><span className="font-medium text-gray-900 dark:text-gray-300">Subject:</span> {paper.subject}</p>
                <div className="flex justify-between">
                  <p><span className="font-medium text-gray-900 dark:text-gray-300">Semester:</span> {paper.semester}</p>
                  <p><span className="font-medium text-gray-900 dark:text-gray-300">Year:</span> {paper.year}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
