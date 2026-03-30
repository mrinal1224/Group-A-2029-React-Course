import React from "react";

function MoodOptionCard({ mood, selected, onSelect, innerRef }) {
  return (
    <button
      ref={innerRef}
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={`Mood: ${mood}`}
      onClick={() => onSelect(mood)}
      className={[
        "rounded-xl px-4 py-3 text-left border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400",
        "hover:-translate-y-0.5 hover:shadow-md",
        selected
          ? "bg-indigo-600 border-indigo-700 text-white ring-1 ring-indigo-200"
          : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50",
      ].join(" ")}
    >
      <div className="font-semibold">{mood}</div>
    </button>
  );
}

export default MoodOptionCard;

