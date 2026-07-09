import React, { useState } from 'react';

export const PrivacyControls: React.FC = () => {
  const [profileVisibility, setProfileVisibility] = useState('private');
  const [activityVisibility, setActivityVisibility] = useState(false);
  const [leaderboard, setLeaderboard] = useState(true);

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Privacy & Visibility</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Profile Visibility</label>
          <select 
            value={profileVisibility}
            onChange={(e) => setProfileVisibility(e.target.value)}
            className="w-full max-w-sm px-3 py-2 bg-muted/20 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
          >
            <option value="public">Public</option>
            <option value="connections">Connections Only</option>
            <option value="private">Private</option>
          </select>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div>
            <label className="font-medium">Activity Visibility</label>
            <p className="text-sm text-muted-foreground">Show when you are currently active.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
            <input type="checkbox" className="sr-only peer" checked={activityVisibility} onChange={e => setActivityVisibility(e.target.checked)} />
            <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div>
            <label className="font-medium">Leaderboard</label>
            <p className="text-sm text-muted-foreground">Include your profile in public rankings.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
            <input type="checkbox" className="sr-only peer" checked={leaderboard} onChange={e => setLeaderboard(e.target.checked)} />
            <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>
    </div>
  );
};
