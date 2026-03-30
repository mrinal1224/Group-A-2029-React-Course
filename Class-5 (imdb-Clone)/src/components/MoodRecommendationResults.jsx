import React from "react";
import MovieRecommendationCard from "./MovieRecommendationCard";

function MoodRecommendationResults({
  mood,
  recommendations,
  onTryAnotherMood,
  onRegenerate,
}) {
  return (
    <div className="mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Because you&apos;re feeling <span className="text-indigo-700">{mood}</span>...
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Here are 6 tailored movie picks curated for your vibe.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {onRegenerate ? (
            <button
              type="button"
              onClick={onRegenerate}
              className="rounded-lg px-4 py-2 border border-indigo-200 hover:border-indigo-300 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-semibold transition-colors"
            >
              Regenerate
            </button>
          ) : null}

          <button
            type="button"
            onClick={onTryAnotherMood}
            className="rounded-lg px-4 py-2 border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 text-gray-800 font-semibold transition-colors"
          >
            Try another mood
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((rec) => (
          <MovieRecommendationCard key={rec.id} recommendation={rec} />
        ))}
      </div>
    </div>
  );
}

export default MoodRecommendationResults;

