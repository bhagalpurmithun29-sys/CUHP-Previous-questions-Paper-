import React from 'react';
import { motion } from 'framer-motion';

export const RoadmapSection: React.FC = () => {
  const milestones = [
    {
      status: 'completed',
      title: 'Current Features',
      items: ['Core Architecture', 'Authentication Suite', 'File Upload Pipeline', 'Basic Analytics'],
      date: 'Q3 2024'
    },
    {
      status: 'in-progress',
      title: 'Upcoming Features',
      items: ['Advanced Department Analytics', 'Moderation Queue', 'Public Leaderboards'],
      date: 'Q4 2024'
    },
    {
      status: 'planned',
      title: 'Future AI Integration',
      items: ['Automated OCR Tagging', 'Smart Content Summaries', 'Duplicate Detection'],
      date: 'Q1 2025'
    },
    {
      status: 'planned',
      title: 'Mobile App',
      items: ['React Native iOS/Android App', 'Offline Paper Viewing', 'Push Notifications'],
      date: 'Q3 2025'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Project Roadmap
          </h2>
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
            Where we are and where we are heading.
          </p>
        </div>

        <div className="relative border-l-2 border-gray-200 dark:border-gray-700 ml-3 md:ml-6 space-y-12">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              <span className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full ring-4 ring-white dark:ring-gray-900 ${
                milestone.status === 'completed' ? 'bg-primary' : 
                milestone.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-300 dark:bg-gray-600'
              }`} />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{milestone.title}</h3>
                <span className="text-sm font-medium text-primary dark:text-primary-light bg-primary/10 px-3 py-1 rounded-full mt-2 sm:mt-0 w-fit">
                  {milestone.date}
                </span>
              </div>
              
              <ul className="mt-4 space-y-2">
                {milestone.items.map((item, i) => (
                  <li key={i} className="text-gray-600 dark:text-gray-400 flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
