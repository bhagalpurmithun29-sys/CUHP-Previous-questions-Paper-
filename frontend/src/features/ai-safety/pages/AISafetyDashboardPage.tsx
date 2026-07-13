import React from 'react';
import { useAISafety } from '../hooks/useAISafety';
import { PolicyOverview } from '../components/PolicyOverview';
import { GuardrailRules } from '../components/GuardrailRules';
import { ModerationQueue } from '../components/ModerationQueue';
import { SafetyEvents } from '../components/SafetyEvents';
import { CitationCompliance } from '../components/CitationCompliance';

export const AISafetyDashboardPage: React.FC = () => {
  const { policies, events, moderationQueue, isLoadingPolicies } = useAISafety();

  if (isLoadingPolicies) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 md:p-8 overflow-y-auto">
      <div className="max-w-[1400px] mx-auto">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">AI Safety & Guardrails</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Enterprise Access Control, Moderation & Security Policies</p>
          </div>
          <div className="flex gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Gateway Protected
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-160px)]">
          {/* Left Column: Overviews & Policies */}
          <div className="lg:col-span-4 flex flex-col gap-0 overflow-y-hidden">
            <PolicyOverview />
            <CitationCompliance />
            <GuardrailRules policies={policies || []} />
          </div>

          {/* Middle Column: Moderation Action Queue */}
          <div className="lg:col-span-4 flex flex-col overflow-y-auto">
            <ModerationQueue queue={moderationQueue || []} />
          </div>

          {/* Right Column: Audit Logs & Events */}
          <div className="lg:col-span-4 flex flex-col overflow-y-hidden">
            <SafetyEvents events={events || []} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISafetyDashboardPage;
