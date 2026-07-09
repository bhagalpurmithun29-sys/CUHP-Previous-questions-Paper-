import React from 'react';
import { motion } from 'framer-motion';
import { SparklesIcon, AcademicCapIcon, DocumentTextIcon, UserGroupIcon } from '@heroicons/react/24/outline';

interface WelcomeHeroProps {
  onStart: () => void;
  isLoading: boolean;
}

export const WelcomeHero: React.FC<WelcomeHeroProps> = ({ onStart, isLoading }) => {
  const features = [
    { icon: <DocumentTextIcon className="w-6 h-6" />, title: 'Smart Search', desc: 'Find question papers instantly' },
    { icon: <AcademicCapIcon className="w-6 h-6" />, title: 'Study Planner', desc: 'Organize your revision' },
    { icon: <SparklesIcon className="w-6 h-6" />, title: 'AI Assistant', desc: 'Get intelligent insights' },
    { icon: <UserGroupIcon className="w-6 h-6" />, title: 'Community', desc: 'Collaborate with peers' },
  ];

  return (
    <div className="flex flex-col items-center text-center max-w-3xl mx-auto py-12 px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mb-8 rotate-3 shadow-sm border border-primary/20"
      >
        <AcademicCapIcon className="w-12 h-12 text-primary -rotate-3" />
      </motion.div>

      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-4xl md:text-5xl font-display font-bold mb-6 text-foreground"
      >
        Welcome to CUHP Question Bank!
      </motion.h1>

      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-lg md:text-xl text-muted-foreground mb-12"
      >
        Your all-in-one academic companion. Let's get your profile set up so you can start preparing for success.
      </motion.p>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 w-full"
      >
        {features.map((feature, idx) => (
          <div key={idx} className="bg-card border rounded-2xl p-4 flex flex-col items-center text-center shadow-sm">
            <div className="w-12 h-12 bg-muted/50 rounded-xl flex items-center justify-center text-primary mb-3">
              {feature.icon}
            </div>
            <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
            <p className="text-xs text-muted-foreground">{feature.desc}</p>
          </div>
        ))}
      </motion.div>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        onClick={onStart}
        disabled={isLoading}
        className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 disabled:opacity-50"
      >
        {isLoading ? 'Setting up...' : 'Get Started'}
      </motion.button>
    </div>
  );
};
