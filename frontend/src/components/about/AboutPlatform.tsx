import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiShare2, FiTarget } from 'react-icons/fi';

export const AboutPlatform: React.FC = () => {
  const points = [
    {
      title: 'Academic Resource Sharing',
      description: 'A centralized hub for preserving and distributing past question papers, making them easily accessible to all students when they need them the most.',
      icon: FiShare2,
      color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
    },
    {
      title: 'Student Collaboration',
      description: 'Built by students, for students. We encourage active contribution and peer-to-peer sharing to build a robust academic database.',
      icon: FiUsers,
      color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
    },
    {
      title: 'Purpose & Goals',
      description: 'Our goal is to eliminate the stress of tracking down study materials just before exams, providing a structured, searchable, and verified archive.',
      icon: FiTarget,
      color: 'bg-primary/20 text-primary dark:bg-primary/20 dark:text-primary-light'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            About the Platform
          </h2>
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
            The CUHP Question Bank was born out of a simple necessity: a reliable place to find past academic papers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {points.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${point.color}`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{point.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {point.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
