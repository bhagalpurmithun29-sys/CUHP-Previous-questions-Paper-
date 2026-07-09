import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

export const CTASection: React.FC = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-primary dark:bg-gray-900">
      {/* Decorative patterns */}
      <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-40">
        <svg className="absolute left-0 top-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon fill="currentColor" className="text-primary-dark dark:text-primary/20" points="0,100 100,0 100,100" />
        </svg>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-6">
            Ready to ace your next exam?
          </h2>
          <p className="text-xl text-primary-50 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of CUHP students who use our platform daily. Create an account to bookmark, organize, and contribute papers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-4 border border-transparent text-base font-bold rounded-xl text-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-primary transition-all shadow-lg hover:scale-105"
            >
              Create Free Account
            </Link>
            <Link
              to="/upload"
              className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-4 border-2 border-white text-base font-bold rounded-xl text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-primary transition-all gap-2"
            >
              Contribute a Paper <FiArrowRight />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
