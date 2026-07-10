import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { usePDFViewerStore } from '../store/pdfViewerStore';
import { useEffect, useRef } from 'react';

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const usePDFViewer = (paperId: string) => {
  const { setPageNumber, pageNumber, numPages } = usePDFViewerStore();
  const timeSpentRef = useRef(0);
  const intervalRef = useRef<number | null>(null);

  const { data: viewerData, isLoading } = useQuery({
    queryKey: ['pdf-viewer', paperId],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/pdf/${paperId}`, { withCredentials: true });
      return res.data.data;
    },
    enabled: !!paperId
  });

  const { mutate: updateProgress } = useMutation({
    mutationFn: async (progressData: { lastPageRead: number; progressPercentage: number; timeSpent: number }) => {
      const res = await axios.put(`${API_URL}/pdf/progress/${paperId}`, progressData, { withCredentials: true });
      return res.data.data;
    }
  });

  // Track time spent
  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      timeSpentRef.current += 1;
    }, 1000);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, []);

  // Sync initial progress
  useEffect(() => {
    if (viewerData?.progress?.lastPageRead && !numPages) {
      setPageNumber(viewerData.progress.lastPageRead);
    }
  }, [viewerData, setPageNumber, numPages]);

  // Auto save progress every 30 seconds
  useEffect(() => {
    const saveInterval = setInterval(() => {
      if (numPages && pageNumber) {
        const percentage = Math.round((pageNumber / numPages) * 100);
        updateProgress({
          lastPageRead: pageNumber,
          progressPercentage: percentage,
          timeSpent: timeSpentRef.current,
        });
        timeSpentRef.current = 0; // Reset after saving
      }
    }, 30000);

    return () => clearInterval(saveInterval);
  }, [pageNumber, numPages, updateProgress]);

  return {
    paper: viewerData?.paper,
    progress: viewerData?.progress,
    isLoading,
    updateProgress,
  };
};
