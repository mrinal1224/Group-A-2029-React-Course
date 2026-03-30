import React from "react";

function MovieRecommendationCard({ recommendation, onSave }) {
  const posterPlaceholder = (
    <div className="aspect-[2/3] w-full rounded-lg bg-gradient-to-br from-gray-100 to-gray-300 border border-gray-200 flex items-center justify-center">
      <span className="text-gray-500 text-sm">Poster unavailable</span>
    </div>
  );

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col gap-3">
      <div className="flex gap-4">
        <div className="w-24 shrink-0">{posterPlaceholder}</div>

        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-gray-900 font-bold leading-snug">
                {recommendation.title}
              </div>
              <div className="text-gray-500 text-sm">{recommendation.year}</div>
            </div>

            {typeof recommendation.rating === "number" ? (
              <div className="text-sm text-yellow-600 font-semibold">
                ⭐ {recommendation.rating.toFixed(1)}
              </div>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100">
              {recommendation.genre}
            </span>
          </div>
        </div>
      </div>

      <p className="text-gray-600 text-sm leading-5 max-h-14 overflow-hidden">
        {recommendation.reason}
      </p>

      <div className="mt-auto">
        <button
          type="button"
          disabled={!onSave}
          aria-label="Save recommendation (placeholder)"
          className={[
            "w-full rounded-lg px-3 py-2 text-sm font-semibold border transition-colors",
            onSave
              ? "bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700"
              : "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed",
          ].join(" ")}
          onClick={() => onSave?.(recommendation)}
        >
          Save / Add to Watchlist
        </button>
      </div>
    </div>
  );
}

export default MovieRecommendationCard;

