import React from 'react';
import { useStudyPlanner } from '../hooks/useStudyPlanner';
import { StudyDashboard } from '../components/StudyDashboard';
import { WeeklyPlan } from '../components/WeeklyPlan';
import { MonthlyPlan } from '../components/MonthlyPlan';
import { RevisionTimeline } from '../components/RevisionTimeline';
import { GoalManager } from '../components/GoalManager';
import { RecommendedResources } from '../components/RecommendedResources';
import { StudyInsights } from '../components/StudyInsights';
import { motion } from 'framer-motion';

export const StudyPlannerPage: React.FC = () => {
  const { dashboardData, weeklyPlan, monthlyPlan, revisionPlan, recommendations, isLoadingDashboard } = useStudyPlanner();

  if (isLoadingDashboard) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 md:p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Study Planner</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">AI-powered personalized learning assistant.</p>
          </div>
        </header>

        {dashboardData?.plan ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <StudyDashboard data={dashboardData} />
            
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 space-y-6">
                <WeeklyPlan tasks={weeklyPlan || []} />
                <MonthlyPlan tasks={monthlyPlan || []} />
                <StudyInsights />
              </div>
              <div className="xl:col-span-1 space-y-6">
                <GoalManager />
                <RevisionTimeline revisionPlan={revisionPlan} />
                <RecommendedResources resources={recommendations} />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center min-h-[60vh]"
          >
            <div className="max-w-md w-full">
              <GoalManager />
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default StudyPlannerPage;
