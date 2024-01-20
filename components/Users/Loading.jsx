const Loading = () => {
  const numberOfRows = [{}, {}, {}, {}, {}];
  return (
    <div className="p-4 mt-4 border dark:border-white shadow rounded-md w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="grid grid-cols-5 gap-2 border-b-2 pb-4">
            <div className="h-4 w-24 bg-slate-700 rounded"></div>
            <div className="h-4 w-40 bg-slate-700 rounded"></div>
            <div className="h-4 w-24 bg-slate-700 rounded"></div>
            <div className="h-4 w-24 bg-slate-700 rounded"></div>
            <div className="h-4 w-24 bg-slate-700 rounded"></div>
          </div>
          {numberOfRows.map((row, index) => (
            <div className="space-y-3" key={index}>
              <div className="grid grid-cols-5 gap-2">
                <div className="h-2 w-24 bg-slate-700 rounded"></div>
                <div className="h-2 w-40 bg-slate-700 rounded"></div>
                <div className="h-2 w-24 bg-slate-700 rounded"></div>
                <div className="h-2 w-24 bg-slate-700 rounded"></div>
                <div className="h-2 w-24 bg-slate-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
