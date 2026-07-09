import React from 'react';
import { useFeatureDiscovery } from '../hooks/useFeatureDiscovery';
import { SparklesIcon } from '@heroicons/react/24/solid';

export const WhatsNewPage: React.FC = () => {
  const { data: whatsNew, isLoading } = useFeatureDiscovery();

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3">
          <SparklesIcon className="w-8 h-8 -rotate-3" />
        </div>
        <h1 className="text-4xl font-display font-bold mb-4">What's New</h1>
        <p className="text-xl text-muted-foreground">Discover the latest features and updates in CUHP Question Bank.</p>
      </div>

      <div className="space-y-12">
        {whatsNew?.map((release: any, idx: number) => (
          <div key={idx} className="relative pl-8 md:pl-0">
            <div className="md:grid md:grid-cols-4 md:gap-8">
              <div className="md:col-span-1 mb-4 md:mb-0 relative">
                <div className="hidden md:block absolute right-0 top-2 w-3 h-3 bg-primary rounded-full translate-x-1.5" />
                <h3 className="text-xl font-bold md:text-right">{release.version}</h3>
                <p className="text-sm text-muted-foreground md:text-right">{new Date(release.date).toLocaleDateString()}</p>
              </div>
              <div className="md:col-span-3 pb-8 md:border-l md:border-border md:pl-8">
                <div className="space-y-8">
                  {release.features.map((feature: any, fIdx: number) => (
                    <div key={fIdx} className="bg-card border rounded-2xl p-6 shadow-sm">
                      <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatsNewPage;
