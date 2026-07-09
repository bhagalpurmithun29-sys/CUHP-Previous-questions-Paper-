import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheckIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline';

interface SecurityScoreProps {
  score: number;
  checks: {
    emailVerified: boolean;
    mfaEnabled: boolean;
    hasBackupCodes: boolean;
    recentPasswordUpdate: boolean;
    strongPassword: boolean;
  };
}

export const SecurityScore: React.FC<SecurityScoreProps> = ({ score, checks }) => {
  const isGood = score >= 80;
  const isMedium = score >= 50 && score < 80;

  const colorClass = isGood ? 'text-success' : isMedium ? 'text-warning' : 'text-destructive';

  const items = [
    { label: 'Email Verified', passed: checks.emailVerified, points: 20 },
    { label: 'Two-Factor Authentication', passed: checks.mfaEnabled, points: 40 },
    { label: 'Backup Codes Generated', passed: checks.hasBackupCodes, points: 10 },
    { label: 'Recent Password Update', passed: checks.recentPasswordUpdate, points: 10 },
    { label: 'Strong Password', passed: checks.strongPassword, points: 20 },
  ];

  return (
    <div className="bg-card rounded-2xl border shadow-sm p-6">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="relative w-32 h-32 flex items-center justify-center flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" className="stroke-muted/30" strokeWidth="10" fill="none" />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              className={`stroke-current ${colorClass}`}
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDasharray: '0 283' }}
              animate={{ strokeDasharray: `${(score / 100) * 283} 283` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className={`text-3xl font-bold ${colorClass}`}>{score}</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Score</span>
          </div>
        </div>

        <div className="flex-1 w-full">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            {isGood ? <ShieldCheckIcon className="w-6 h-6 text-success" /> : <ShieldExclamationIcon className="w-6 h-6 text-warning" />}
            Account Security Status
          </h3>
          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${item.passed ? 'bg-success text-white' : 'bg-muted text-muted-foreground'}`}>
                    {item.passed ? (
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="block w-1.5 h-1.5 bg-current rounded-full" />
                    )}
                  </div>
                  <span className={`text-sm ${item.passed ? 'text-foreground' : 'text-muted-foreground line-through opacity-70'}`}>
                    {item.label}
                  </span>
                </div>
                <span className="text-xs font-mono text-muted-foreground">+{item.points} pts</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
