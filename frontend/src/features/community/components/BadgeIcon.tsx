import React from 'react';
import { FiAward, FiStar, FiShield } from 'react-icons/fi';

export const BadgeIcon: React.FC<{ badge: string, size?: number }> = ({ badge, size = 24 }) => {
  const getBadgeConfig = () => {
    switch (badge.toLowerCase()) {
      case 'bronze': return { color: 'text-amber-600', bg: 'bg-amber-100', icon: FiAward };
      case 'silver': return { color: 'text-gray-400', bg: 'bg-gray-100', icon: FiAward };
      case 'gold': return { color: 'text-yellow-500', bg: 'bg-yellow-100', icon: FiAward };
      case 'platinum': return { color: 'text-cyan-500', bg: 'bg-cyan-100', icon: FiStar };
      case 'diamond': return { color: 'text-blue-500', bg: 'bg-blue-100', icon: FiStar };
      case 'legend': return { color: 'text-purple-500', bg: 'bg-purple-100', icon: FiShield };
      default: return { color: 'text-gray-500', bg: 'bg-gray-100', icon: FiAward };
    }
  };

  const config = getBadgeConfig();
  const Icon = config.icon;

  return (
    <div title={`${badge} Badge`} className={`inline-flex items-center justify-center rounded-full ${config.bg} ${config.color} p-1.5`} style={{ width: size + 12, height: size + 12 }}>
      <Icon size={size} />
    </div>
  );
};
