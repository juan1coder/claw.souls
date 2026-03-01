import React from 'react';

export const LoadingScreen: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] animate-in fade-in duration-500">
      <div className="relative w-32 h-32 mb-8">
        <div className="absolute inset-0 border-4 border-violet-500/30 rounded-full animate-[spin_8s_linear_infinite]"></div>
        <div className="absolute inset-2 border-4 border-t-fuchsia-500 border-r-transparent border-b-purple-500 border-l-transparent rounded-full animate-[spin_3s_linear_infinite]"></div>
        <div className="absolute inset-0 flex items-center justify-center">
           {/* Abstract "Crab" Claw Icon */}
           <svg className="w-16 h-16 text-violet-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0a2 2 0 002 2v0a2 2 0 002-2v0a2 2 0 00-2-2v0a2 2 0 00-2 2zm-6 12v-2m0 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2zM6 12H4m2 0a2 2 0 012 2v0a2 2 0 01-2 2 0 2 2 0 01-2-2 0 2 2 0 012-2zm12 0a2 2 0 002 2v0a2 2 0 00-2 2 0 2 2 0 00-2-2 0 2 2 0 002-2z" />
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
           </svg>
        </div>
      </div>
      <h3 className="text-xl font-bold text-violet-200 animate-pulse">{message}</h3>
      <p className="text-slate-500 mt-2 text-sm font-mono">Process.ID: {Math.floor(Math.random() * 99999)}</p>
    </div>
  );
};
