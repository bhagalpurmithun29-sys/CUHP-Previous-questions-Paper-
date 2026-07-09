import React from 'react';
import { StatCard } from '../../components/analytics/StatCard';
import { TrendChartPlaceholder } from '../../components/analytics/TrendChartPlaceholder';

export const AnalyticsDashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & Export Actions */}
        <header className="flex flex-col md:flex-row md:justify-between md:items-end border-b border-slate-200 pb-4 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Analytics & Insights</h1>
            <p className="text-slate-500 mt-1">Platform-wide performance, engagement, and operational metrics.</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center">
              <svg className="w-4 h-4 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Export CSV
            </button>
            <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
              Generate Report
            </button>
          </div>
        </header>

        {/* Global KPIs */}
        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Platform Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              title="Total Papers" 
              value="1,248" 
              trend="+12%" 
              isPositive={true} 
            />
            <StatCard 
              title="Pending Review" 
              value="42" 
              trend="-5%" 
              isPositive={true} 
            />
            <StatCard 
              title="Active Students" 
              value="8,590" 
              trend="+24%" 
              isPositive={true} 
            />
            <StatCard 
              title="Total Downloads" 
              value="45.2k" 
              trend="+18%" 
              isPositive={true} 
            />
          </div>
        </section>

        {/* Charts Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TrendChartPlaceholder title="Upload vs Approval Velocity" type="area" />
          <TrendChartPlaceholder title="Downloads by Department" type="bar" />
        </section>

        {/* Lower Dashboards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Trending Subjects */}
          <section className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Most Downloaded Subjects</h3>
            <div className="space-y-4">
              {[
                { name: 'Data Structures', downloads: '3,402', bar: '95%' },
                { name: 'Operating Systems', downloads: '2,891', bar: '80%' },
                { name: 'Computer Networks', downloads: '2,105', bar: '65%' },
                { name: 'Database Management', downloads: '1,950', bar: '55%' },
                { name: 'Software Engineering', downloads: '1,200', bar: '35%' },
              ].map((subject, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-1/3 text-sm font-medium text-slate-700 truncate pr-4">{subject.name}</div>
                  <div className="w-1/2">
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: subject.bar }}></div>
                    </div>
                  </div>
                  <div className="w-1/6 text-right text-sm font-semibold text-slate-600">{subject.downloads}</div>
                </div>
              ))}
            </div>
          </section>

          {/* QA & Moderation Snippet */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-800 mb-4">QA & Moderation</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-end mb-1">
                  <span className="text-sm font-medium text-slate-600">Avg Review Time</span>
                  <span className="text-lg font-bold text-slate-900">4.2 hrs</span>
                </div>
                <p className="text-xs text-slate-400">Target is under 24 hrs</p>
              </div>
              <hr className="border-slate-100" />
              <div>
                <div className="flex justify-between items-end mb-1">
                  <span className="text-sm font-medium text-slate-600">Open User Reports</span>
                  <span className="text-lg font-bold text-amber-600">18</span>
                </div>
                <p className="text-xs text-slate-400">Up from 12 yesterday</p>
              </div>
              <hr className="border-slate-100" />
              <button className="w-full py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors">
                View Full QA Report
              </button>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
};
