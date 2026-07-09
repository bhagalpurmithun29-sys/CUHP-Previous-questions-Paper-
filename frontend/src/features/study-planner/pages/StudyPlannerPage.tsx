import React from 'react';
import { useGetActivePlan } from '../hooks/useStudyPlanner';
import { GoalWizard } from '../components/GoalWizard';
import { DailyTasks } from '../components/DailyTasks';
import { ProgressTracker } from '../components/ProgressTracker';
import { StudyInsights } from '../components/StudyInsights';
import { Calendar, BrainCircuit, Target } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

const StudyPlannerPage: React.FC = () => {
  const { data: activePlan, isLoading } = useGetActivePlan();
  const queryClient = useQueryClient();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-muted-foreground animate-pulse">Loading your personalized study plan...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold flex items-center gap-3">
          <BrainCircuit className="w-8 h-8 text-primary" />
          AI Study Planner
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">Adaptive study schedules generated from previous year paper trends.</p>
      </div>

      {!activePlan ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <GoalWizard onSuccess={() => queryClient.invalidateQueries({ queryKey: ['studyPlan', 'active'] })} />
          <div className="hidden lg:flex flex-col items-center justify-center text-center p-12 bg-primary/5 rounded-3xl border border-primary/10 h-full">
            <Target className="w-24 h-24 text-primary/40 mb-6" />
            <h2 className="text-2xl font-bold mb-4">Set Your Goal, We'll Do the Rest</h2>
            <p className="text-muted-foreground text-lg">
              Our AI analyzes years of question papers, your weak points, and available study time to create an optimized daily path to success.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-r from-primary to-blue-600 text-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold">{activePlan.goal.description}</h2>
                <p className="text-primary-foreground/80 mt-1 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> 
                  {new Date(activePlan.startDate).toLocaleDateString()} - {new Date(activePlan.endDate).toLocaleDateString()}
                </p>
              </div>
              <button 
                onClick={() => {
                  if (confirm('Are you sure you want to create a new plan? This will archive your current progress.')) {
                    // Logic to archive/delete plan could go here, for now we just rely on creating a new one to inactivate this one.
                    // Instead, let's just force a re-fetch or show the wizard by temporarily clearing state.
                    queryClient.setQueryData(['studyPlan', 'active'], null);
                  }
                }}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium backdrop-blur-sm transition-colors"
              >
                Create New Plan
              </button>
            </div>

            <DailyTasks tasks={activePlan.tasks} planId={activePlan._id} />
          </div>

          <div className="space-y-6">
            <ProgressTracker 
              completionPercentage={activePlan.progress.completionPercentage}
              completedTasks={activePlan.progress.completedTasks}
              totalTasks={activePlan.progress.totalTasks}
              streak={activePlan.progress.streak}
            />
            <StudyInsights />
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyPlannerPage;
