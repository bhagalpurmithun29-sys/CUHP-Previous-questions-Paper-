import React, { useState } from 'react';
import { useAcademicCalendar } from '../hooks/useAcademicCalendar';
import { CalendarFilters } from '../components/CalendarFilters';
import { MonthView } from '../components/MonthView';

export const AcademicCalendarPage: React.FC = () => {
  const [filter, setFilter] = useState('ALL');
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const queryParams = filter === 'ALL' ? {} : { eventType: filter };
  
  const { events, isLoading } = useAcademicCalendar(queryParams);

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 flex flex-col">
      <div className="max-w-[1200px] w-full mx-auto flex-1 flex flex-col">
        <header className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Academic Calendar</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">University schedule, events, and academic deadlines.</p>
          </div>
          
          <div className="flex gap-3">
            <button className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
              Export ICS
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
              + New Event
            </button>
          </div>
        </header>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 flex-1 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white w-48">
                {currentDate.toLocaleDateString('default', { month: 'long', year: 'numeric' })}
              </h2>
              <div className="flex bg-white dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-700">
                <button onClick={prevMonth} className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 border-r border-gray-300 dark:border-gray-700">
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <button onClick={nextMonth} className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
              </div>
            </div>
            
            <CalendarFilters filter={filter} setFilter={setFilter} />
          </div>

          {isLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <MonthView events={events} currentDate={currentDate} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AcademicCalendarPage;
