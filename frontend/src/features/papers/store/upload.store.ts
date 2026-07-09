import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UploadStateData {
  file: File | null;
  filePreviewUrl: string | null;
  metadata: {
    schoolId: string;
    departmentId: string;
    courseId: string;
    semesterId: string;
    subjectId: string;
    examType: string;
    academicYear: string;
    examMonth: string;
    maximumMarks: string;
    duration: string;
    language: string;
  };
}

interface UploadStore {
  currentStep: number;
  data: UploadStateData;
  isUploading: boolean;
  uploadProgress: number;
  
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setFile: (file: File) => void;
  updateMetadata: (data: Partial<UploadStateData['metadata']>) => void;
  setUploading: (status: boolean, progress?: number) => void;
  reset: () => void;
}

const initialState: UploadStateData = {
  file: null,
  filePreviewUrl: null,
  metadata: {
    schoolId: '',
    departmentId: '',
    courseId: '',
    semesterId: '',
    subjectId: '',
    examType: '',
    academicYear: '',
    examMonth: '',
    maximumMarks: '',
    duration: '',
    language: 'ENGLISH',
  },
};

// We use persist so drafts survive page reloads (excluding the actual File object which we can't serialize easily, but we keep metadata)
export const useUploadStore = create<UploadStore>()(
  persist(
    (set) => ({
      currentStep: 1,
      data: initialState,
      isUploading: false,
      uploadProgress: 0,
      
      setStep: (step) => set({ currentStep: step }),
      nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 5) })),
      prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
      
      setFile: (file) => set((state) => ({
        data: {
          ...state.data,
          file,
          filePreviewUrl: URL.createObjectURL(file)
        }
      })),
      
      updateMetadata: (metadataParams) => set((state) => ({
        data: {
          ...state.data,
          metadata: { ...state.data.metadata, ...metadataParams }
        }
      })),
      
      setUploading: (status, progress = 0) => set({ isUploading: status, uploadProgress: progress }),
      
      reset: () => set({ currentStep: 1, data: initialState, isUploading: false, uploadProgress: 0 })
    }),
    {
      name: 'paper-upload-draft',
      partialize: (state) => ({ 
        currentStep: state.currentStep,
        data: { metadata: state.data.metadata } // Only persist metadata, File objects break JSON
      })
    }
  )
);
