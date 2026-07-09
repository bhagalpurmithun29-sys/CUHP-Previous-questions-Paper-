import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SparklesIcon, DocumentTextIcon, BookmarkIcon, DocumentMagnifyingGlassIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const features = [
  { icon: <ChartBarIcon className="w-12 h-12" />, title: 'Dashboard', desc: 'Get a bird\'s eye view of your academic progress.' },
  { icon: <DocumentMagnifyingGlassIcon className="w-12 h-12" />, title: 'Smart Search', desc: 'Search semantically through thousands of papers.' },
  { icon: <DocumentTextIcon className="w-12 h-12" />, title: 'Question Papers', desc: 'Browse the repository by department and course.' },
  { icon: <BookmarkIcon className="w-12 h-12" />, title: 'Bookmarks & Study Planner', desc: 'Save important questions and organize revision.' },
  { icon: <SparklesIcon className="w-12 h-12" />, title: 'AI Assistant', desc: 'Get intelligent insights and summaries.' }
];

export const FeatureTour: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    if (current < features.length - 1) {
      setCurrent(current + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="space-y-8 flex flex-col items-center justify-center text-center py-8">
      <div className="h-48 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col items-center"
          >
            <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-6">
              {features[current].icon}
            </div>
            <h3 className="text-2xl font-bold mb-2">{features[current].title}</h3>
            <p className="text-muted-foreground">{features[current].desc}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-2 mb-8">
        {features.map((_, idx) => (
          <div key={idx} className={`w-2 h-2 rounded-full transition-colors \${idx === current ? 'bg-primary' : 'bg-muted'}`} />
        ))}
      </div>

      <button onClick={next} className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-xl">
        {current < features.length - 1 ? 'Next' : 'Finish Tour'}
      </button>
    </div>
  );
};
