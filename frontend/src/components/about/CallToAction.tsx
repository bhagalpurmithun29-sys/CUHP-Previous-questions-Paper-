import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const CallToAction: React.FC = () => {
  return (
    <section className="py-24 bg-primary dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-40">
        <svg className="absolute right-0 bottom-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon fill="currentColor" className="text-primary-dark dark:text-primary/20" points="100,0 100,100 0,100" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-6">
            Join the Knowledge Network
          </h2>
          <p className="text-xl text-primary-100 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Whether you are looking to prepare for your next exam or want to help your juniors by uploading your past papers, there is a place for you here.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/search"
              className="w-full sm:w-auto px-8 py-4 border-2 border-white text-base font-bold rounded-xl text-white hover:bg-white/10 transition-all text-center"
            >
              Browse Papers
            </Link>
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 border-2 border-transparent text-base font-bold rounded-xl text-primary bg-white hover:bg-gray-50 transition-all shadow-lg text-center"
            >
              Create Account
            </Link>
            <Link
              to="/upload"
              className="w-full sm:w-auto px-8 py-4 border-2 border-primary-dark dark:border-gray-700 text-base font-bold rounded-xl text-white bg-primary-dark dark:bg-gray-800 hover:bg-primary-900 dark:hover:bg-gray-700 transition-all shadow-lg text-center"
            >
              Upload Paper
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
