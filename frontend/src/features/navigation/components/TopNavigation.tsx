import React from 'react';
import { Bars3Icon, BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useNavigation } from '../hooks/useNavigation';
import { useUser } from '../../auth/hooks/useAuth';

export const TopNavigation: React.FC = () => {
  const { dispatch } = useNavigation();
  const user = useUser();

  return (
    <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-10 flex items-center justify-between px-4 shadow-sm/50">
      <div className="flex items-center gap-4">
        <button
          onClick={() => dispatch({ type: 'TOGGLE_MOBILE_DRAWER' })}
          className="lg:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <Bars3Icon className="w-6 h-6" />
        </button>
        
        <div className="hidden md:flex relative max-w-md w-full ml-4">
           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
             <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
           </div>
           <input
             type="text"
             className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white sm:text-sm transition duration-150 ease-in-out"
             placeholder="Search question papers, courses..."
           />
           <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
             <kbd className="inline-flex items-center border border-gray-200 rounded px-2 text-sm font-sans font-medium text-gray-400 bg-white">
               ⌘K
             </kbd>
           </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-400 hover:text-gray-500 relative focus:outline-none">
          <span className="sr-only">View notifications</span>
          <BellIcon className="h-6 w-6" aria-hidden="true" />
          <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
        </button>
        
        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200 shadow-sm overflow-hidden cursor-pointer">
          {user?.firstName?.[0]}{user?.lastName?.[0]}
        </div>
      </div>
    </header>
  );
};
