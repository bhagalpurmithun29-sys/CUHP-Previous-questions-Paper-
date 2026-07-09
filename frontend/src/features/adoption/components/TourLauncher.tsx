import React from 'react';
import { PlayIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { useAdoptionState, useResetTours, useUpdateAdoptionProgress } from '../hooks/useProductTour';

export const TourLauncher: React.FC<{ tours: { id: string; name: string }[] }> = ({ tours }) => {
  const { data: adoption } = useAdoptionState();
  const { mutate: resetTours } = useResetTours();
  const { mutate: launchTour } = useUpdateAdoptionProgress();

  const handleLaunch = (tourId: string) => {
    // Resetting completion state for this specific tour to trigger it again
    launchTour({ tourId, isCompleted: false });
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Guided Tours</h3>
        <button 
          onClick={() => resetTours()} 
          className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
        >
          <ArrowPathIcon className="w-4 h-4" /> Reset All
        </button>
      </div>
      <div className="space-y-3">
        {tours.map(tour => {
          const isCompleted = adoption?.tours?.[tour.id];
          return (
            <div key={tour.id} className="flex items-center justify-between p-3 rounded-xl border border-border hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full \${isCompleted ? 'bg-success' : 'bg-muted'}`} />
                <span className="font-medium text-sm">{tour.name}</span>
              </div>
              <button 
                onClick={() => handleLaunch(tour.id)}
                className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-lg hover:bg-primary/20 flex items-center gap-1 transition-colors"
              >
                <PlayIcon className="w-3 h-3" /> {isCompleted ? 'Replay' : 'Start'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
