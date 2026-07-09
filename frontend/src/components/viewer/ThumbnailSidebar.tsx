import React from 'react';

interface ThumbnailSidebarProps {
  pageCount: number;
  currentPage: number;
  onPageSelect: (page: number) => void;
  thumbnails?: string[];
}

export const ThumbnailSidebar: React.FC<ThumbnailSidebarProps> = ({
  pageCount,
  currentPage,
  onPageSelect,
  thumbnails = []
}) => {
  return (
    <div className="w-64 bg-slate-100 border-r border-slate-200 overflow-y-auto hidden md:flex flex-col">
      <div className="p-4 bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Pages ({pageCount})</h3>
      </div>
      
      <div className="p-4 space-y-4">
        {Array.from({ length: pageCount }).map((_, index) => {
          const pageNum = index + 1;
          const isActive = currentPage === pageNum;
          
          return (
            <button
              key={pageNum}
              onClick={() => onPageSelect(pageNum)}
              className={`w-full flex flex-col items-center p-2 rounded-lg transition-all ${
                isActive 
                  ? 'bg-blue-100 ring-2 ring-blue-500' 
                  : 'hover:bg-slate-200'
              }`}
            >
              <div className="w-full aspect-[1/1.4] bg-white border border-slate-300 shadow-sm flex items-center justify-center overflow-hidden">
                {thumbnails[index] ? (
                  <img src={thumbnails[index]} alt={`Page ${pageNum}`} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-slate-400 text-xs">P. {pageNum}</span>
                )}
              </div>
              <span className={`text-xs mt-2 ${isActive ? 'text-blue-700 font-semibold' : 'text-slate-500'}`}>
                {pageNum}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
