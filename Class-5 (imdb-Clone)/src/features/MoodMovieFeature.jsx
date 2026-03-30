import React, { useEffect, useMemo, useRef, useState } from "react";
import MoodSelector from "../components/MoodSelector";
import MoodSelectorSkeleton from "../components/MoodSelectorSkeleton";
import MoodRecommendationResults from "../components/MoodRecommendationResults";
import { getMoodMovieRecommendations } from "../services/moodRecommendationService";

const MOOD_OPTIONS = [
  "Happy",
  "Sad",
  "Excited",
  "Relaxed",
  "Romantic",
  "Nostalgic",
  "Thrilled",
  "Curious",
  "Motivated",
  "Lonely",
  "Adventurous",
  "Emotional",
];

function MoodMovieFeature({ className = "" }) {
  const selectorTopRef = useRef(null);
  const resultsRef = useRef(null);

  const [selectedMood, setSelectedMood] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const canSubmit = useMemo(() => {
    return Boolean(selectedMood);
  }, [selectedMood]);

  async function handleGetRecommendations() {
    if (!selectedMood) return;
    if (loading) return;

    setError(null);
    setRecommendations([]);
    setLoading(true);

    // Prevent race conditions if user clicks quickly.
    if (abortRef.current) abortRef.current.abort();
    const nextController = new AbortController();
    abortRef.current = nextController;

    try {
      const data = await getMoodMovieRecommendations({
        mood: selectedMood,
        signal: nextController.signal,
      });

      setRecommendations(data.recommendations);

      // Smooth scroll into view after success.
      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to get recommendations.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  function handleTryAnotherMood() {
    setSelectedMood(null);
    setRecommendations([]);
    setError(null);

    requestAnimationFrame(() => {
      selectorTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // Avoid setting an abort controller that re-renders frequently.
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  return (
    <div className={className}>
      <div ref={selectorTopRef}>
        <MoodSelector
          moods={MOOD_OPTIONS}
          selectedMood={selectedMood}
          onSelectMood={setSelectedMood}
          onGetRecommendations={handleGetRecommendations}
          canSubmit={canSubmit}
          loading={loading}
        />
      </div>

      <div
        ref={resultsRef}
        className={[
          "transition-all duration-300",
          loading || error || recommendations.length
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 pointer-events-none",
        ].join(" ")}
      >
        {/* Screen reader friendly status */}
        <div className="sr-only" aria-live="polite">
          {loading ? "Loading recommendations..." : error ? "Error loading recommendations." : ""}
        </div>

        {loading ? (
          <MoodSelectorSkeleton />
        ) : error ? (
          <div className="mt-8 bg-white border border-red-200 rounded-2xl p-5">
            <div className="text-red-700 font-semibold">Couldn’t generate recommendations.</div>
            <div className="text-red-600 text-sm mt-1">{error}</div>
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleGetRecommendations}
                disabled={!selectedMood || loading}
                className="rounded-lg px-4 py-2 bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Retry
              </button>

              <button
                type="button"
                onClick={handleTryAnotherMood}
                className="rounded-lg px-4 py-2 border border-gray-200 bg-white hover:bg-gray-50 font-semibold text-gray-800"
              >
                Try another mood
              </button>
            </div>
          </div>
        ) : recommendations.length ? (
          <MoodRecommendationResults
            mood={selectedMood}
            recommendations={recommendations}
            onTryAnotherMood={handleTryAnotherMood}
            onRegenerate={handleGetRecommendations}
          />
        ) : null}
      </div>
    </div>
  );
}

export default MoodMovieFeature;

