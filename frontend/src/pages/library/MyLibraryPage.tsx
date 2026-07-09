import React from 'react';

export const MyLibraryPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <header className="flex justify-between items-end border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">My Library</h1>
            <p className="text-slate-500 mt-1">Manage your bookmarks, collections, and reading history.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
              New Collection
            </button>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Continue Reading Section */}
            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                Continue Reading
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* ContinueReadingWidget Placeholder */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex gap-4">
                    <div className="w-16 h-20 bg-slate-200 rounded object-cover flex-shrink-0"></div>
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-900 line-clamp-1">Data Structures - MCA Sem 1</h3>
                      <p className="text-sm text-slate-500 mt-1">Page 12 of 45</p>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Pinned Collections */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-slate-800">Pinned Collections</h2>
                <a href="/library/collections" className="text-sm font-medium text-blue-600 hover:text-blue-800">View all &rarr;</a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100 cursor-pointer hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
                      </div>
                      <span className="text-xs font-semibold px-2 py-1 bg-white rounded-full text-slate-600 shadow-sm">12 Papers</span>
                    </div>
                    <h3 className="mt-4 font-semibold text-lg text-slate-900">Exam Preparation 2026</h3>
                    <p className="text-sm text-slate-500 mt-1">Mid-term and end-term questions.</p>
                 </div>
              </div>
            </section>

          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-800 mb-4">Library Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Bookmarks</span>
                  <span className="font-semibold text-slate-900">42</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Collections</span>
                  <span className="font-semibold text-slate-900">5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Papers Read</span>
                  <span className="font-semibold text-slate-900">128</span>
                </div>
              </div>
            </div>

            {/* Favorites Widget */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-slate-800 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  Favorites
                </h3>
                <a href="/library/bookmarks" className="text-xs font-medium text-blue-600">View all</a>
              </div>
              <ul className="space-y-3">
                <li className="text-sm text-slate-700 hover:text-blue-600 cursor-pointer line-clamp-1">Operating Systems - Mid Term 2024</li>
                <li className="text-sm text-slate-700 hover:text-blue-600 cursor-pointer line-clamp-1">Computer Networks - End Term 2025</li>
                <li className="text-sm text-slate-700 hover:text-blue-600 cursor-pointer line-clamp-1">Database Management Systems</li>
              </ul>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
