import React, { useState } from 'react';

interface PDFToolbarProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRotate: () => void;
  onPrint: () => void;
  onDownload: () => void;
  onFullscreen: () => void;
  scale: number;
}

export const PDFToolbar: React.FC<PDFToolbarProps> = ({
  onZoomIn,
  onZoomOut,
  onRotate,
  onPrint,
  onDownload,
  onFullscreen,
  scale
}) => {
  return (
    <div className="bg-slate-900 text-white h-14 flex items-center justify-between px-4 shadow-md sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-slate-800 rounded transition-colors" title="Toggle Sidebar">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
        </button>
        <span className="font-semibold hidden sm:block">CUHP Document Viewer</span>
      </div>

      <div className="flex items-center space-x-2">
        <button onClick={onZoomOut} className="p-2 hover:bg-slate-800 rounded transition-colors" title="Zoom Out">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" /></svg>
        </button>
        <span className="text-sm font-mono bg-slate-800 px-3 py-1 rounded select-none">
          {Math.round(scale * 100)}%
        </span>
        <button onClick={onZoomIn} className="p-2 hover:bg-slate-800 rounded transition-colors" title="Zoom In">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
        </button>

        <div className="w-px h-6 bg-slate-700 mx-2 hidden sm:block"></div>

        <button onClick={onRotate} className="p-2 hover:bg-slate-800 rounded transition-colors hidden sm:block" title="Rotate">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        </button>
        
        <button onClick={onFullscreen} className="p-2 hover:bg-slate-800 rounded transition-colors" title="Fullscreen">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <button onClick={onPrint} className="p-2 hover:bg-slate-800 rounded transition-colors hidden sm:block" title="Print">
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
        </button>
        <button onClick={onDownload} className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-medium transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          <span className="hidden sm:inline">Download</span>
        </button>
      </div>
    </div>
  );
};
