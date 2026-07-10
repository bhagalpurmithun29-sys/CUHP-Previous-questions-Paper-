import React, { useState } from 'react';
import { FiDatabase, FiAlertTriangle, FiPlay } from 'react-icons/fi';

export const MigrationPlanner: React.FC<{ onMigrate: (data: any, dryRun: boolean) => void, isLoading: boolean }> = ({ onMigrate, isLoading }) => {
    const [targetVersion, setTargetVersion] = useState('v2.1.0');
    
    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col justify-between">
            <div>
                <div className="flex items-center mb-6">
                    <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-xl text-amber-600 dark:text-amber-400 mr-4">
                        <FiDatabase size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Migration Planner</h3>
                        <p className="text-sm text-gray-500">Schema migrations and data transformations.</p>
                    </div>
                </div>
                
                <div className="space-y-5 mb-8">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Target Schema Version</label>
                        <select 
                            value={targetVersion}
                            onChange={(e) => setTargetVersion(e.target.value)}
                            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-3.5 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm outline-none"
                        >
                            <option value="v2.0.0">v2.0.0 (Legacy Metadata)</option>
                            <option value="v2.1.0">v2.1.0 (AI Metadata Support)</option>
                            <option value="v3.0.0">v3.0.0 (Enterprise Storage Layer)</option>
                        </select>
                    </div>
                    
                    <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl flex items-start">
                        <FiAlertTriangle className="text-amber-600 dark:text-amber-400 mt-0.5 mr-3 flex-shrink-0" size={20} />
                        <p className="text-sm text-amber-800 dark:text-amber-300 font-medium">
                            Always perform a Dry Run before executing a migration to validate dependencies and check for broken references.
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <button 
                    onClick={() => onMigrate({ version: targetVersion }, true)}
                    disabled={isLoading}
                    className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-bold rounded-xl shadow-sm transition-colors disabled:opacity-50"
                >
                    Dry Run Preview
                </button>
                <button 
                    onClick={() => {
                        if (window.confirm('WARNING: Are you sure you want to modify repository data? This cannot be undone.')) {
                            onMigrate({ version: targetVersion }, false);
                        }
                    }}
                    disabled={isLoading}
                    className="flex-1 py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-sm transition-colors disabled:opacity-50 flex justify-center items-center"
                >
                    <FiPlay className="mr-2" /> Execute Migration
                </button>
            </div>
        </div>
    );
};
