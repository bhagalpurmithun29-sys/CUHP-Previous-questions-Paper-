import React, { useState, useEffect } from 'react';

interface PaperCard {
  _id: string;
  title: string;
  subjectId: { name: string };
  semester: number;
  thumbnailUrl?: string;
}

export const RecommendationCarousel: React.FC<{ title: string; endpoint: string }> = ({ title, endpoint }) => {
  const [papers, setPapers] = useState<PaperCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated fetch
    // fetch(`/api/recommendations/${endpoint}`).then(res => res.json()).then(data => setPapers(data));
    setTimeout(() => {
      setPapers([
        { _id: '1', title: 'Data Structures Mid Term 2024', subjectId: { name: 'Computer Science' }, semester: 1 },
        { _id: '2', title: 'Algorithms End Term 2023', subjectId: { name: 'Computer Science' }, semester: 2 },
        { _id: '3', title: 'DBMS Supplementary 2025', subjectId: { name: 'Information Tech' }, semester: 3 },
        { _id: '4', title: 'Operating Systems Mid 2024', subjectId: { name: 'Computer Science' }, semester: 4 },
      ]);
      setLoading(false);
    }, 500);
  }, [endpoint]);

  return (
    <section className="my-8">
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>
        <div className="flex gap-2">
          <button className="p-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button className="p-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
             <div key={i} className="min-w-[250px] w-[250px] h-[350px] bg-slate-100 rounded-xl animate-pulse flex-shrink-0"></div>
          ))
        ) : (
          papers.map(paper => (
            <div key={paper._id} className="min-w-[250px] w-[250px] bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex-shrink-0 snap-start cursor-pointer hover:shadow-md transition-all group">
               <div className="h-[200px] bg-slate-100 flex items-center justify-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                   <button className="w-full py-2 bg-white text-slate-900 rounded font-medium text-sm">View Paper</button>
                 </div>
                 <span className="text-slate-400 font-mono text-sm">PDF Thumbnail</span>
               </div>
               <div className="p-4">
                 <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">{paper.subjectId.name}</span>
                 <h3 className="mt-1 font-semibold text-slate-900 line-clamp-2 leading-tight">{paper.title}</h3>
                 <p className="mt-2 text-sm text-slate-500">Semester {paper.semester}</p>
               </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
