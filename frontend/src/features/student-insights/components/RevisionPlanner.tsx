import React from 'react';
import { FiCalendar, FiClock } from 'react-icons/fi';

export const RevisionPlanner: React.FC<{ data: any }> = ({ data }) => {
    if (!data) return null;

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm h-full">
            <h4 className="text-lg font-black text-gray-900 dark:text-white mb-6 flex items-center">
                <FiCalendar className="mr-2 text-indigo-500" /> Upcoming Revision
            </h4>
            <div className="space-y-4">
                {data.map((item: any) => (
                    <div key={item.id} className="p-4 border border-gray-100 dark:border-gray-700 rounded-2xl hover:border-indigo-500 transition-colors cursor-pointer flex justify-between items-center">
                        <div>
                            <p className="font-bold text-gray-800 dark:text-gray-200 mb-1">{item.title}</p>
                            <p className="text-sm font-medium flex items-center text-gray-500">
                                <FiClock className="mr-1" /> Due {item.due}
                            </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-black ${item.priority === 'HIGH' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'}`}>
                            {item.priority}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
