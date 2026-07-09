import React from 'react';
import { motion } from 'framer-motion';

export const AboutHero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-primary dark:bg-gray-900">
      {/* Decorative background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-40">
        <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon fill="currentColor" className="text-primary-dark dark:text-primary/20" points="0,100 100,0 100,100" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            Empowering the <br className="hidden sm:block" />
            <span className="text-primary-100 dark:text-primary-light">CUHP Community</span>
          </h1>
          <p className="text-lg sm:text-xl text-primary-50 dark:text-gray-300 leading-relaxed">
            We are building a centralized, open, and reliable platform to access previous year question papers and academic resources for the Central University of Himachal Pradesh.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
