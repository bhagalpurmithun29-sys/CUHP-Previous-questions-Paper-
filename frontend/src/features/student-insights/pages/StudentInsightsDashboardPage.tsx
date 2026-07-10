import React from 'react';
import { useStudentInsights } from '../hooks/useStudentInsights';
import { StudyOverview } from '../components/StudyOverview';
import { TopicPreparation } from '../components/TopicPreparation';
import { RevisionPlanner } from '../components/RevisionPlanner';
import { BloomLearningProfile } from '../components/BloomLearningProfile';
import { RecommendedResources } from '../components/RecommendedResources';
import { ReadingProgress } from '../components/ReadingProgress';
import { WeakTopicAnalysis } from '../components/WeakTopicAnalysis';
import { DifficultyProgress } from '../components/DifficultyProgress';
import { StudyTimeline } from '../components/StudyTimeline';
import { FiCompass } from 'react-icons/fi';

export const StudentInsightsDashboardPage: React.FC = () => {
    const { getDashboard, getTopics, getRevision, getProfile, getRecommendations } = useStudentInsights();

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto min-h-screen">
            <div className="mb-12">
                <h1 className="text-4xl font-black text-gray-900 dark:text-white flex items-center mb-2">
                    <span className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mr-4 shadow-lg text-white">
                        <FiCompass size={32} />
                    </span>
                    My Study Insights
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
                    Personalized AI recommendations based on your reading history and the syllabus layout.
                </p>
            </div>

            {getDashboard.isLoading ? (
                <div className="text-center py-24 text-gray-500 font-medium">Generating Personalized Insights...</div>
            ) : (
                <>
                    <StudyOverview data={getDashboard.data} />
                    
                    <TopicPreparation data={getTopics.data} />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <RevisionPlanner data={getRevision.data} />
                        </div>
                        <div className="lg:col-span-1">
                            <BloomLearningProfile data={getProfile.data} />
                        </div>
                    </div>

                    <RecommendedResources data={getRecommendations.data} />

                    <div className="hidden">
                        <ReadingProgress />
                        <WeakTopicAnalysis />
                        <DifficultyProgress />
                        <StudyTimeline />
                    </div>
                </>
            )}
        </div>
    );
};
