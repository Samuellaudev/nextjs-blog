import React from 'react';

const Loading = () => {
  return (
    <div className="rounded-md w-full mx-auto">
      <div className="animate-pulse flex px-2">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-[200px] w-auto bg-slate-700 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
