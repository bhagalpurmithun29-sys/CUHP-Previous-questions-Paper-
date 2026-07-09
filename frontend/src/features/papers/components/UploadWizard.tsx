import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiChevronRight, FiChevronLeft, FiSave, FiUpload } from 'react-icons/fi';
import { DropZone } from './DropZone';
import { MetadataForm } from './MetadataForm';
import { useUploadStore } from '../store/upload.store';
import { useUploadPaper } from '../hooks/usePapers';

const steps = [
  { id: 1, title: 'Upload File' },
  { id: 2, title: 'Academic Details' },
  { id: 3, title: 'Review & Submit' }
];

export const UploadWizard: React.FC = () => {
  const { 
    currentStep, 
    data, 
    setStep, 
    nextStep, 
    prevStep, 
    isUploading, 
    uploadProgress, 
    setUploading,
    reset 
  } = useUploadStore();
  const { submitPaper, saveDraft } = useUploadPaper();

  const handleNext = () => {
    if (currentStep === 1 && !data.file) {
      alert('Please upload a file first');
      return;
    }
    if (currentStep === 2) {
      if (!data.metadata.academicYear || !data.metadata.examType) {
        alert('Please fill all required fields');
        return;
      }
    }
    nextStep();
  };

  const constructFormData = () => {
    const formData = new FormData();
    if (data.file) {
      formData.append('file', data.file);
    }
    Object.entries(data.metadata).forEach(([key, value]) => {
      formData.append(key, value);
    });
    return formData;
  };

  const handleDraft = async () => {
    try {
      setUploading(true, 10);
      await saveDraft({
        formData: constructFormData(),
        onProgress: (p) => setUploading(true, Math.round((p.loaded * 100) / p.total))
      });
      reset();
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setUploading(true, 10);
      await submitPaper({
        formData: constructFormData(),
        onProgress: (p) => setUploading(true, Math.round((p.loaded * 100) / p.total))
      });
      setStep(4); // Success Step
    } catch (e) {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8">
      {/* Stepper */}
      {currentStep < 4 && (
        <div className="flex items-center justify-between mb-8 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 dark:bg-gray-700 rounded-full" />
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full transition-all duration-500" 
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
          
          {steps.map((step, idx) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors duration-300
                ${currentStep > step.id ? 'bg-primary text-white' : currentStep === step.id ? 'bg-primary ring-4 ring-primary/20 text-white' : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-gray-400'}`}>
                {currentStep > step.id ? <FiCheck className="w-5 h-5" /> : step.id}
              </div>
              <span className={`absolute -bottom-6 text-xs font-medium whitespace-nowrap
                ${currentStep >= step.id ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Content Area */}
      <div className="min-h-[300px] mt-12">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <DropZone />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <MetadataForm />
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Review Your Upload</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-gray-500">File:</span> <span className="font-medium dark:text-gray-200">{data.file?.name}</span></div>
                  <div><span className="text-gray-500">Size:</span> <span className="font-medium dark:text-gray-200">{data.file ? (data.file.size / 1024 / 1024).toFixed(2) : 0} MB</span></div>
                  <div><span className="text-gray-500">Academic Year:</span> <span className="font-medium dark:text-gray-200">{data.metadata.academicYear}</span></div>
                  <div><span className="text-gray-500">Exam Type:</span> <span className="font-medium dark:text-gray-200">{data.metadata.examType}</span></div>
                  <div><span className="text-gray-500">Language:</span> <span className="font-medium dark:text-gray-200">{data.metadata.language}</span></div>
                </div>
              </div>
              
              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-primary">Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center py-12">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                <FiCheck className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Upload Successful!</h2>
              <p className="text-gray-500 max-w-md">Your question paper has been submitted and is currently pending moderator review. You can track its status in your dashboard.</p>
              <button onClick={reset} className="mt-8 px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors">
                Upload Another Paper
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      {currentStep < 4 && (
        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <button 
            onClick={prevStep}
            disabled={currentStep === 1 || isUploading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50"
          >
            <FiChevronLeft /> Back
          </button>
          
          <div className="flex items-center gap-3">
            {currentStep > 1 && (
              <button 
                onClick={handleDraft}
                disabled={isUploading}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
              >
                <FiSave /> Save Draft
              </button>
            )}
            
            {currentStep < 3 ? (
              <button 
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark shadow-sm transition-colors"
              >
                Continue <FiChevronRight />
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                disabled={isUploading}
                className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 shadow-sm transition-colors disabled:opacity-70"
              >
                {isUploading ? (
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</>
                ) : (
                  <><FiUpload /> Submit Paper</>
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
