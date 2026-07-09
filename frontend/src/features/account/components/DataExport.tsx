import React, { useState } from 'react';
import { useExportData } from '../hooks/useAccount';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';

export const DataExport: React.FC = () => {
  const { mutate: exportData, isPending } = useExportData();
  const [format, setFormat] = useState('json');

  const handleExport = () => {
    exportData(undefined, {
      onSuccess: (data) => {
        // Mock download
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `export.\${format}`;
        a.click();
      }
    });
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Export Account Data</h3>
      <p className="text-sm text-muted-foreground mb-6">Download a copy of your profile, bookmarks, and history.</p>

      <div className="flex gap-4 mb-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" value="json" checked={format === 'json'} onChange={e => setFormat(e.target.value)} className="text-primary focus:ring-primary" />
          JSON format
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" value="csv" checked={format === 'csv'} onChange={e => setFormat(e.target.value)} className="text-primary focus:ring-primary" />
          CSV format
        </label>
      </div>

      <button 
        onClick={handleExport}
        disabled={isPending}
        className="px-4 py-2 bg-primary/10 text-primary font-medium rounded-lg hover:bg-primary/20 flex items-center gap-2 disabled:opacity-50"
      >
        <DocumentArrowDownIcon className="w-5 h-5" />
        {isPending ? 'Generating...' : 'Request Export'}
      </button>
    </div>
  );
};
