import React from 'react';
import { DocumentArrowDownIcon, PrinterIcon } from '@heroicons/react/24/outline';

interface BackupCodesProps {
  codes: string[];
}

export const BackupCodes: React.FC<BackupCodesProps> = ({ codes }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const text = `CUHP Question Bank - Recovery Codes\n\n\${codes.join('\n')}\n\nKeep these safe. Each code can only be used once.`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cuhp-qb-recovery-codes.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-muted/10 border border-border rounded-xl overflow-hidden">
      <div className="p-4 border-b border-border flex justify-between items-center bg-white dark:bg-gray-900">
        <h4 className="font-semibold text-sm">Recovery Codes</h4>
        <div className="flex gap-2">
          <button onClick={handlePrint} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors" title="Print Codes">
            <PrinterIcon className="w-5 h-5 text-muted-foreground" />
          </button>
          <button onClick={handleDownload} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors" title="Download Codes">
            <DocumentArrowDownIcon className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 print:grid-cols-2">
          {codes.map((code, index) => (
            <div key={index} className="px-4 py-2 bg-white dark:bg-gray-800 border rounded-lg text-center font-mono text-sm tracking-widest font-semibold text-gray-800 dark:text-gray-200">
              {code}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
