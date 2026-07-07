import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useSession } from '../../auth/hooks/useSession';
import { DASHBOARD_CONSTANTS } from '../constants/dashboard.constants';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export const ProfileCompletion: React.FC = () => {
  const { user } = useSession();

  const { completionPercentage, missingFields } = useMemo(() => {
    if (!user) return { completionPercentage: 0, missingFields: [] };

    const fields = [
      { key: 'firstName', label: 'First Name', weight: 15 },
      { key: 'lastName', label: 'Last Name', weight: 15 },
      { key: 'department', label: 'Department', weight: 20 },
      { key: 'course', label: 'Course', weight: 20 },
      { key: 'semester', label: 'Semester', weight: 15 },
      { key: 'profileImage', label: 'Profile Picture', weight: 15 },
    ];

    let score = 0;
    const missing: string[] = [];

    fields.forEach((field) => {
      // @ts-ignore
      if (user[field.key]) {
        score += field.weight;
      } else {
        missing.push(field.label);
      }
    });

    return { completionPercentage: score, missingFields: missing };
  }, [user]);

  if (completionPercentage === 100) return null;

  return (
    <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-indigo-50 to-blue-50 p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{DASHBOARD_CONSTANTS.TITLES.PROFILE_COMPLETION}</h3>
        <span className="text-sm font-bold text-indigo-700">{completionPercentage}%</span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-indigo-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${completionPercentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full bg-indigo-600 rounded-full"
        />
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-600">
          Complete your profile to unlock all features. Missing information:
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {missingFields.map((field) => (
            <span key={field} className="inline-flex rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-indigo-600 border border-indigo-100 shadow-sm">
              {field}
            </span>
          ))}
        </div>
      </div>
      
      <Link to="/settings/profile" className="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
        Complete Profile <FiChevronRight className="ml-1 h-4 w-4" />
      </Link>
    </div>
  );
};
