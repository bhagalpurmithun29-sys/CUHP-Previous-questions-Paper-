import React from 'react';

export const ViewerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-black">
      {children}
    </div>
  );
};
