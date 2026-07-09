import React, { useState } from 'react';
import { SettingsEditor } from '../../components/settings/SettingsEditor';
import { FeatureFlagToggle } from '../../components/settings/FeatureFlagToggle';

export const SystemSettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('GENERAL');

  const categories = [
    'GENERAL', 'ACADEMIC', 'UPLOADS', 'DOWNLOADS', 
    'STORAGE', 'NOTIFICATIONS', 'AUTHENTICATION', 
    'SECURITY', 'ANALYTICS', 'BRANDING', 'MAINTENANCE', 'FEATURE FLAGS'
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <header className="flex flex-col md:flex-row md:justify-between md:items-end border-b border-slate-200 pb-4 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System Configuration</h1>
            <p className="text-slate-500 mt-1">Manage platform-wide settings and feature flags.</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
              Import Config
            </button>
            <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
              Export Config
            </button>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <nav className="space-y-1">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === category
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {category.replace('_', ' ')}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-4 mb-6">
                {activeTab.replace('_', ' ')} Settings
              </h2>
              
              {activeTab === 'FEATURE FLAGS' ? (
                <div className="space-y-6">
                  <FeatureFlagToggle 
                    title="Question Paper Uploads" 
                    description="Allow users to upload new question papers to the system."
                    initialState={true}
                  />
                  <FeatureFlagToggle 
                    title="Hybrid Recommendation Engine" 
                    description="Enable the AI/Hybrid recommendation carousels on the homepage."
                    initialState={true}
                  />
                  <FeatureFlagToggle 
                    title="OCR Processing Pipeline" 
                    description="Run uploaded PDFs through the OCR pipeline for text extraction."
                    initialState={false}
                    disabled={true}
                    badge="Coming Soon"
                  />
                </div>
              ) : activeTab === 'MAINTENANCE' ? (
                <div className="space-y-6">
                  <SettingsEditor 
                    label="Enable Maintenance Mode" 
                    settingKey="maintenance_mode" 
                    type="boolean" 
                    initialValue={false} 
                  />
                  <SettingsEditor 
                    label="Maintenance Message" 
                    settingKey="maintenance_message" 
                    type="string" 
                    initialValue="We are currently performing scheduled maintenance. Please check back in a few minutes." 
                  />
                </div>
              ) : activeTab === 'UPLOADS' ? (
                <div className="space-y-6">
                  <SettingsEditor 
                    label="Max Upload Size (MB)" 
                    settingKey="max_upload_size_mb" 
                    type="number" 
                    initialValue={20} 
                  />
                  <SettingsEditor 
                    label="Allowed File Types" 
                    settingKey="allowed_file_types" 
                    type="string" 
                    initialValue="application/pdf" 
                  />
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400">
                  Select a category to view and edit its configuration keys.
                </div>
              )}
              
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
