import React from "react";

function MoodSelectorSkeleton() {
  return (
    <div className="mt-8">
      <div className="h-10 bg-gray-100 rounded-lg animate-pulse w-full sm:w-2/3 mb-5" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {new Array(6).fill(null).map((_, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-3 animate-pulse"
          >
            <div className="flex gap-4">
              <div className="w-24 h-32 rounded-lg bg-gray-100" />
              <div className="flex-1">
                <div className="h-4 bg-gray-100 rounded w-4/5 mb-3" />
                <div className="h-3 bg-gray-100 rounded w-1/3 mb-4" />
                <div className="h-6 bg-gray-100 rounded w-2/3" />
              </div>
            </div>
            <div className="h-10 bg-gray-100 rounded" />
            <div className="h-10 bg-gray-100 rounded mt-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoodSelectorSkeleton;

