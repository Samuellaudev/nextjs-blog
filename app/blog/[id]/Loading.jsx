import React from 'react';

const Loading = () => {
  return (
    <div className="rounded-md w-full mx-auto">
      <div className="animate-pulse flex px-2">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-[200px] w-auto bg-slate-700 rounded"></div>
          <div className="h-10 w-[300px] bg-slate-700 rounded-full"></div>
          <div className="h-5 w-[150px] bg-slate-700 rounded-full"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-700 rounded col-span-2"></div>
              <div className="h-2 bg-slate-700 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-700 rounded"></div>
            <div className="h-2 bg-slate-700 rounded"></div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-700 rounded col-span-1"></div>
              <div className="h-2 bg-slate-700 rounded col-span-2"></div>
            </div>
          </div>
          <div className="h-5 w-[150px] bg-slate-700 rounded-full"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-700 rounded col-span-1"></div>
              <div className="h-2 bg-slate-700 rounded col-span-2"></div>
            </div>
            <div className="h-2 bg-slate-700 rounded"></div>
            <div className="h-2 bg-slate-700 rounded"></div>
            <div className="h-2 bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
