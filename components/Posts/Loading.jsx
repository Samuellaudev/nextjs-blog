import React from 'react';

const Loading = ({ pageHeading }) => {
  const numberOfRows = [{}, {}, {}, {}, {}, {}, {}, {}];
  return (
    <div className="animate-pulse py-4 w-full mx-auto">
      {numberOfRows.map((row, index) => (
        <div
          className="flex space-x-4 mb-4 border border-b-[#4d4d4d] border-t-transparent border-l-transparent border-r-transparent"
          key={index}
        >
          <div className="flex flex-col space-y-6 py-1">
            <div className="flex flex-col md:grid md:grid-cols-4 pb-3">
              <div className="h-8 w-[300px] bg-slate-700 rounded-full col-start-1"></div>
              <div className="h-4 w-[235px] bg-slate-700 rounded-full col-start-4 mt-4 md:mt-0"></div>
              <div className="h-4 w-[235px] bg-slate-700 rounded-full col-start-4 hidden md:block"></div>
            </div>
            {pageHeading === 'Dashboard' && (
              <div className="grid grid-cols-12 place-items-end pb-3">
                <div className="h-[30px] w-[50px] bg-slate-700 rounded col-start-11"></div>
                <div className="h-[30px] w-[70px] bg-slate-700 rounded col-start-12"></div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;
