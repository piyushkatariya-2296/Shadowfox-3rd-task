import React from 'react';

export default function SkeletonLoader({ count = 3 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="glass-panel rounded-2xl p-6 space-y-4 animate-pulse"
        >
          <div className="h-44 rounded-xl bg-slate-800/80 w-full" />
          <div className="h-6 rounded bg-slate-800 w-3/4" />
          <div className="h-4 rounded bg-slate-800/60 w-full" />
          <div className="h-4 rounded bg-slate-800/60 w-5/6" />
          <div className="flex justify-between items-center pt-4 border-t border-slate-800">
            <div className="h-8 rounded bg-slate-800 w-20" />
            <div className="h-10 rounded-xl bg-slate-800 w-28" />
          </div>
        </div>
      ))}
    </div>
  );
}
