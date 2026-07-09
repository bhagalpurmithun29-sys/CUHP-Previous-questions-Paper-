import React from 'react';
import { useFeatureDiscovery } from '../hooks/useFeatureDiscovery';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export const FeatureDiscovery: React.FC = () => {
  const { data: whatsNew } = useFeatureDiscovery();

  if (!whatsNew || whatsNew.length === 0) return null;

  const latest = whatsNew[0];

  return (
    <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 shadow-sm relative overflow-hidden">
      <div className="flex gap-4">
        <div className="w-12 h-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
          <SparklesIcon className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs font-bold text-primary uppercase tracking-wider mb-1 block">What's New in {latest.version}</span>
          <h3 className="font-bold text-lg mb-2">{latest.features[0].title}</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {latest.features[0].description}
          </p>
          <Link to="/whats-new" className="text-sm font-semibold text-primary hover:underline">
            View release notes &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};
