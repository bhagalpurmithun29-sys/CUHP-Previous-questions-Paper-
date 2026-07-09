import React from 'react';
import { motion } from 'framer-motion';

export const TechnologyStack: React.FC = () => {
  const techStack = [
    { name: 'React 19', color: 'text-cyan-500', bg: 'bg-cyan-100 dark:bg-cyan-900/30' },
    { name: 'TypeScript', color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { name: 'Node.js', color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30' },
    { name: 'Express', color: 'text-gray-600 dark:text-gray-300', bg: 'bg-gray-200 dark:bg-gray-700' },
    { name: 'MongoDB', color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
    { name: 'Tailwind CSS v4', color: 'text-teal-500', bg: 'bg-teal-100 dark:bg-teal-900/30' },
    { name: 'Framer Motion', color: 'text-pink-500', bg: 'bg-pink-100 dark:bg-pink-900/30' },
    { name: 'Cloudinary', color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800/50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl mb-12">
          Technology Stack
        </h2>
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`px-6 py-3 rounded-full font-bold text-sm sm:text-base ${tech.bg} ${tech.color} shadow-sm border border-transparent dark:border-gray-700/50 hover:scale-105 transition-transform`}
            >
              {tech.name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
