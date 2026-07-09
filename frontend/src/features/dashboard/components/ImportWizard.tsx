import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUploadCloud, FiFileText, FiCheckCircle, FiAlertTriangle, FiX } from 'react-icons/fi';

interface ImportWizardProps {
  entityName: string;
  isOpen: boolean;
  onClose: () => void;
  onImport: (file: File) => Promise<any>;
}

export const ImportWizard: React.FC<ImportWizardProps> = ({ entityName, isOpen, onClose, onImport }) => {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [report, setReport] = useState<any>(null);

  if (!isOpen) return null;

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files?.length) {
      setFile(e.dataTransfer.files[0]);
      setStep(2);
    }
  };

  const handleProcess = async () => {
    if (!file) return;
    setIsImporting(true);
    try {
      const result = await onImport(file);
      setReport(result);
      setStep(3);
    } catch (err) {
      console.error(err);
      // handle error
      setReport({ error: 'Import failed due to invalid data format.' });
      setStep(3);
    } finally {
      setIsImporting(false);
    }
  };

  const reset = () => {
    setStep(1);
    setFile(null);
    setReport(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Bulk Import {entityName}
            </h3>
            <button onClick={() => { reset(); onClose(); }} className="text-gray-400 hover:text-gray-600">
              <FiX className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            {/* Step 1: Upload */}
            {step === 1 && (
              <div 
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-10 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <FiUploadCloud className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-700 dark:text-gray-300 font-medium text-center">
                  Drag and drop your CSV or Excel file here
                </p>
                <p className="text-sm text-gray-500 mt-2">or click to browse from your computer</p>
                <input 
                  type="file" 
                  id="file-upload" 
                  className="hidden" 
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  onChange={(e) => {
                    if (e.target.files?.length) {
                      setFile(e.target.files[0]);
                      setStep(2);
                    }
                  }}
                />
              </div>
            )}

            {/* Step 2: Preview & Validate */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-xl">
                  <FiFileText className="w-8 h-8 text-blue-500" />
                  <div className="flex-1">
                    <p className="font-semibold text-blue-900 dark:text-blue-100">{file?.name}</p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">{(file!.size / 1024).toFixed(2)} KB • Ready for processing</p>
                  </div>
                  <button onClick={() => setStep(1)} className="text-sm text-blue-600 font-medium hover:underline">Change File</button>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Import Options</h4>
                  <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                    <input type="checkbox" className="rounded text-primary border-gray-300 focus:ring-primary" defaultChecked />
                    Skip existing duplicates (Update strategy)
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer mt-2">
                    <input type="checkbox" className="rounded text-primary border-gray-300 focus:ring-primary" />
                    Simulate run (Validation only, no DB changes)
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button onClick={() => { reset(); onClose(); }} className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800">
                    Cancel
                  </button>
                  <button 
                    onClick={handleProcess}
                    disabled={isImporting}
                    className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-medium flex items-center gap-2 disabled:opacity-50"
                  >
                    {isImporting ? (
                      <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Processing...</>
                    ) : 'Start Import'}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Result Report */}
            {step === 3 && (
              <div className="space-y-6 text-center">
                {report?.error ? (
                  <>
                    <FiAlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Import Failed</h3>
                    <p className="text-red-600 dark:text-red-400 mt-2">{report.error}</p>
                  </>
                ) : (
                  <>
                    <FiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Import Successful</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      Successfully processed {report?.successCount || 0} records.
                    </p>
                    
                    {report?.duplicates > 0 && (
                      <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300 rounded-lg text-sm flex items-start gap-2 text-left mx-auto max-w-sm">
                        <FiAlertTriangle className="mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold">Duplicates Detected</p>
                          <p>{report.duplicates} records were skipped as they already exist.</p>
                        </div>
                      </div>
                    )}
                  </>
                )}
                
                <div className="flex justify-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700 mt-6">
                  <button onClick={() => { reset(); onClose(); }} className="px-6 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700">
                    Done
                  </button>
                  {report?.error && (
                    <button onClick={() => setStep(1)} className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark">
                      Try Again
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
