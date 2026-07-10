import React from 'react';
import { useRepositoryMigration } from '../hooks/useRepositoryMigration';
import { BulkImportWizard } from '../components/BulkImportWizard';
import { MigrationPlanner } from '../components/MigrationPlanner';
import { MigrationHistory } from '../components/MigrationHistory';
import { FiSettings, FiDownloadCloud, FiRefreshCw } from 'react-icons/fi';

export const MigrationDashboardPage: React.FC = () => {
    const { getHistory, importData, executeMigration, exportData, syncRepo } = useRepositoryMigration();

    const handleImport = async (data: any) => {
        try {
            await importData.mutateAsync(data);
            alert('Import job queued successfully. Background processing initiated.');
        } catch (e) {
            alert('Failed to queue import.');
        }
    };

    const handleMigration = async (data: any, dryRun: boolean) => {
        try {
            await executeMigration.mutateAsync({ data, dryRun });
            alert(dryRun ? 'Dry run completed. Check history log for preview.' : 'Migration executed successfully.');
        } catch (e) {
            alert('Migration failed.');
        }
    };
    
    const handleExport = async () => {
        try {
            await exportData.mutateAsync({ format: 'ZIP', includeMetadata: true });
            alert('Export job queued successfully. You will be notified when the package is ready.');
        } catch (e) {
            alert('Failed to queue export.');
        }
    };
    
    const handleSync = async () => {
        try {
            await syncRepo.mutateAsync({ detectMissingFiles: true });
            alert('Repository sync initiated to resolve missing files and duplicate references.');
        } catch (e) {
            alert('Sync failed.');
        }
    };

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto min-h-screen">
            <div className="mb-10">
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center">
                    <span className="p-2.5 bg-gray-900 dark:bg-white rounded-xl mr-3.5 shadow-md">
                        <FiSettings className="text-white dark:text-gray-900" size={26} />
                    </span>
                    Toolkit & Admin Console
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-3 text-lg max-w-3xl leading-relaxed">
                    Enterprise tools for bulk operations, schema migrations, backups, and repository health synchronization.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 items-stretch">
                <BulkImportWizard onImport={handleImport} isLoading={importData.isPending} />
                <MigrationPlanner onMigrate={handleMigration} isLoading={executeMigration.isPending} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <button 
                    onClick={handleExport}
                    disabled={exportData.isPending}
                    className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/40 dark:hover:to-indigo-900/40 border border-blue-200 dark:border-blue-800/50 rounded-3xl flex items-center justify-between transition-colors shadow-sm text-left group"
                >
                    <div>
                        <h4 className="text-xl font-extrabold text-blue-900 dark:text-blue-100 group-hover:text-blue-700">Bulk Export Repository</h4>
                        <p className="text-sm font-medium text-blue-700/80 dark:text-blue-300/80 mt-2">Generate a full ZIP package with metadata.</p>
                    </div>
                    <div className="p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-sm text-blue-600 transform group-hover:scale-110 transition-transform">
                        <FiDownloadCloud size={28} />
                    </div>
                </button>
                
                <button 
                    onClick={handleSync}
                    disabled={syncRepo.isPending}
                    className="p-8 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 hover:from-emerald-100 hover:to-teal-100 dark:hover:from-emerald-900/40 dark:hover:to-teal-900/40 border border-emerald-200 dark:border-emerald-800/50 rounded-3xl flex items-center justify-between transition-colors shadow-sm text-left group"
                >
                    <div>
                        <h4 className="text-xl font-extrabold text-emerald-900 dark:text-emerald-100 group-hover:text-emerald-700">Run Health Sync</h4>
                        <p className="text-sm font-medium text-emerald-700/80 dark:text-emerald-300/80 mt-2">Detect missing files and fix broken DB references.</p>
                    </div>
                    <div className="p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-sm text-emerald-600 transform group-hover:rotate-180 transition-transform duration-500">
                        <FiRefreshCw size={28} />
                    </div>
                </button>
            </div>

            <div className="mb-10">
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6">Operation History</h2>
                {getHistory.isLoading ? (
                    <div className="animate-pulse h-96 bg-gray-200 dark:bg-gray-800 rounded-3xl"></div>
                ) : (
                    <MigrationHistory history={getHistory.data} />
                )}
            </div>
        </div>
    );
};
