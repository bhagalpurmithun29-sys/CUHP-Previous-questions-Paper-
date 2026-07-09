import React from 'react';

interface SchoolStatusBadgeProps {
  status: string;
}

export const SchoolStatusBadge: React.FC<SchoolStatusBadgeProps> = ({ status }) => {
  let badgeColor = 'bg-gray-100 text-gray-800 border-gray-200';
  
  if (status === 'ACTIVE') {
    badgeColor = 'bg-green-100 text-green-800 border-green-200';
  } else if (status === 'INACTIVE') {
    badgeColor = 'bg-orange-100 text-orange-800 border-orange-200';
  } else if (status === 'ARCHIVED') {
    badgeColor = 'bg-red-100 text-red-800 border-red-200';
  }

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeColor}`}>
      {status}
    </span>
  );
};
