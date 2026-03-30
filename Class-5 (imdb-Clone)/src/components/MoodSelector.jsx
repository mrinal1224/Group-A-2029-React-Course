import React, { useMemo, useRef } from "react";
import MoodOptionCard from "./MoodOptionCard";

function MoodSelector({
  moods,
  selectedMood,
  onSelectMood,
  onGetRecommendations,
  canSubmit,
  loading,
}) {
  const buttonRefs = useRef([]);

  const selectedIndex = useMemo(() => {
    if (!selectedMood) return -1;
    return moods.indexOf(selectedMood);
  }, [moods, selectedMood]);

  function focusMoodByIndex(nextIndex) {
    const el = buttonRefs.current[nextIndex];
    if (el && typeof el.focus === "function") el.focus();
  }

  function handleKeyDown(e) {
    const keys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"];
    if (!keys.includes(e.key)) return;

    e.preventDefault();

    const current = selectedIndex >= 0 ? selectedIndex : 0;
    let next = current;

    if (e.key === "Home") next = 0;
    else if (e.key === "End") next = moods.length - 1;
    else {
      const delta = e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 1;
      next = (current + delta + moods.length) % moods.length;
    }

    const nextMood = moods[next];
    onSelectMood(nextMood);
    // Focus after state update tick.
    setTimeout(() => focusMoodByIndex(next), 0);
  }

  return (
    <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-gray-900">Pick Your Mood</h2>
        <p className="text-gray-600 text-sm">
          Tell us how you feel and we’ll suggest movies that match your vibe.
        </p>
      </div>

      <div
        className="mt-5"
        role="radiogroup"
        aria-label="Mood options"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {moods.map((mood, idx) => {
            const selected = selectedMood === mood;
            return (
              <MoodOptionCard
                key={mood}
                mood={mood}
                selected={selected}
                onSelect={onSelectMood}
                innerRef={(el) => {
                  buttonRefs.current[idx] = el;
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onGetRecommendations}
          disabled={!canSubmit || loading}
          aria-disabled={!canSubmit || loading}
          aria-busy={loading}
          aria-label="Get mood-based movie recommendations"
          className={[
            "rounded-xl px-5 py-3 font-bold transition-colors border",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2",
            canSubmit && !loading
              ? "bg-indigo-600 border-indigo-700 text-white hover:bg-indigo-700"
              : "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed",
          ].join(" ")}
        >
          {loading ? "Getting Recommendations..." : "Get Recommendations"}
        </button>

        <div className="text-gray-500 text-xs">
          Gemini analyzes your mood and returns exactly 6 tailored picks.
        </div>
      </div>
    </section>
  );
}

export default MoodSelector;
