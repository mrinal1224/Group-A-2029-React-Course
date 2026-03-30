const FALLBACK_MOVIES_POOL = [
  {
    title: "The Secret Life of Walter Mitty",
    year: 2013,
    genre: "Adventure/Comedy-Drama",
    reasonSeed: "uplifting momentum and an easy, emotionally warm pace",
  },
  {
    title: "Good Will Hunting",
    year: 1997,
    genre: "Drama",
    reasonSeed: "thoughtful character-driven storytelling that feels grounded",
  },
  {
    title: "The Intern",
    year: 2015,
    genre: "Comedy/Drama",
    reasonSeed: "cozy, feel-good vibes with genuine encouragement",
  },
  {
    title: "The Big Lebowski",
    year: 1998,
    genre: "Comedy/Crime",
    reasonSeed: "laid-back energy and playful storytelling",
  },
  {
    title: "Knives Out",
    year: 2019,
    genre: "Mystery/Comedy",
    reasonSeed: "sharp, fun intrigue with satisfying reveals",
  },
  {
    title: "Inside Out",
    year: 2015,
    genre: "Animation/Comedy-Drama",
    reasonSeed: "emotionally clear storytelling that matches reflective moods",
  },
  {
    title: "La La Land",
    year: 2016,
    genre: "Romance/Musical",
    reasonSeed: "romantic warmth and musical lift",
  },
  {
    title: "The Pursuit of Happyness",
    year: 2006,
    genre: "Drama",
    reasonSeed: "hopeful grit and a steady, inspiring emotional arc",
  },
  {
    title: "Whiplash",
    year: 2014,
    genre: "Drama/Music",
    reasonSeed: "intense drive and high-energy stakes",
  },
  {
    title: "The Grand Budapest Hotel",
    year: 2014,
    genre: "Comedy/Adventure",
    reasonSeed: "stylish whimsy with a comforting sense of wonder",
  },
  {
    title: "Her",
    year: 2013,
    genre: "Romance/Sci-Fi",
    reasonSeed: "tender, intimate storytelling that feels emotionally safe",
  },
  {
    title: "A Beautiful Mind",
    year: 2001,
    genre: "Drama/Biography",
    reasonSeed: "reflective depth with a hopeful emotional resolution",
  },
];

const MOOD_FALLBACK_KEYWORDS = {
  Happy: ["uplifting", "fun", "bright", "feel-good", "comedy", "inspiring"],
  Sad: ["comfort", "healing", "hopeful", "emotional", "heart"],
  Excited: ["fast", "high-energy", "thrilling", "adrenaline", "intense"],
  Relaxed: ["cozy", "calm", "easy", "gentle", "comforting"],
  Romantic: ["love", "romantic", "warm", "tender", "heartfelt"],
  Nostalgic: ["classic", "sentimental", "memory", "timeless", "wholesome"],
  Thrilled: ["suspense", "tense", "action", "intense", "edge-of-seat"],
  Curious: ["mystery", "smart", "thought-provoking", "intrigue", "discover"],
  Motivated: ["drive", "ambition", "inspiring", "persistence", "resolute"],
  Lonely: ["connection", "together", "tender", "found-family", "comfort"],
  Adventurous: ["journey", "explore", "quest", "wonder", "risk"],
  Emotional: ["feelings", "heart", "healing", "vulnerable", "human"],
};

function slugify(input) {
  return String(input)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function stableHash(str) {
  // Small deterministic hash for picking mock recommendations.
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h;
}

function buildMockRecommendations(mood) {
  const pool = [...FALLBACK_MOVIES_POOL];
  const start = stableHash(mood) % pool.length;

  const picked = new Array(6).fill(null).map((_, i) => {
    const item = pool[(start + i) % pool.length];
    return {
      title: item.title,
      year: item.year,
      genre: item.genre,
      reason: `A good match for a ${mood.toLowerCase()} vibe: it delivers ${item.reasonSeed}, helping set the right emotional tone.`,
    };
  });

  // Ensure the “genre variety / emotional match” feel for the mock by optionally swapping reasons.
  const keywords = MOOD_FALLBACK_KEYWORDS[mood] || [];
  return picked.map((rec, idx) => {
    const k = keywords[idx % Math.max(1, keywords.length)] || "the right tone";
    return {
      ...rec,
      reason: rec.reason.replace("the right emotional tone", `a ${k} emotional tone`),
      id: `${slugify(rec.title)}-${rec.year}-${idx}`,
    };
  });
}

function extractJsonObject(text) {
  if (!text) return null;

  const cleaned = text
    .replace(/```(?:json)?/g, "")
    .replace(/```/g, "")
    .trim();

  // Fast path: try parse directly.
  try {
    JSON.parse(cleaned);
    return cleaned;
  } catch {
    // continue
  }

  // Repair path: extract the first JSON object substring.
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) return null;

  return cleaned.slice(firstBrace, lastBrace + 1);
}

function normalizeRecommendationsResponse({ rawText, requestedMood }) {
  const jsonStr = extractJsonObject(rawText);
  if (!jsonStr) {
    throw new Error("Invalid AI response: no JSON object found.");
  }

  let parsed;
  try {
    parsed = JSON.parse(jsonStr);
  } catch {
    throw new Error("Invalid AI response: JSON parsing failed.");
  }

  const mood = typeof parsed?.mood === "string" ? parsed.mood : requestedMood;
  const recommendations = Array.isArray(parsed?.recommendations)
    ? parsed.recommendations
    : null;

  if (!recommendations) {
    throw new Error("Invalid AI response: missing `recommendations` array.");
  }

  const normalized = [];
  const seen = new Set();

  for (const [idx, rec] of recommendations.entries()) {
    const title = typeof rec?.title === "string" ? rec.title.trim() : "";
    const yearRaw = rec?.year;
    const year =
      typeof yearRaw === "number"
        ? yearRaw
        : typeof yearRaw === "string"
          ? Number.parseInt(yearRaw, 10)
          : NaN;
    const genre = typeof rec?.genre === "string" ? rec.genre.trim() : "";
    const reason = typeof rec?.reason === "string" ? rec.reason.trim() : "";

    if (!title || Number.isNaN(year) || !genre || !reason) {
      // If any item is malformed, fail safely.
      throw new Error("Invalid AI response: a recommendation is missing required fields.");
    }

    const key = `${slugify(title)}-${year}`;
    if (seen.has(key)) continue;
    seen.add(key);

    normalized.push({
      id: `${key}-${idx}`,
      title,
      year,
      genre,
      reason,
    });
  }

  if (normalized.length < 6) {
    throw new Error(
      `Invalid AI response: expected at least 6 recommendations, got ${normalized.length}.`,
    );
  }

  // If the model returned more than 6, take the first 6 unique ones.
  const finalRecommendations = normalized.slice(0, 6);
  if (finalRecommendations.length !== 6) {
    throw new Error("Invalid AI response: could not normalize to exactly 6 recommendations.");
  }

  return { mood, recommendations: finalRecommendations };
}

async function fetchWithTimeout(url, { timeoutMs = 15000, signal, ...options } = {}) {
  if (signal) {
    // Caller provided a signal; we still apply our own timeout by aborting a
    // combined controller.
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const onAbort = () => controller.abort();
    if (signal.aborted) controller.abort();
    else signal.addEventListener("abort", onAbort);

    try {
      return await fetch(url, { ...options, signal: controller.signal });
    } catch (e) {
      if (controller.signal.aborted) {
        throw new Error("Gemini request timed out.");
      }
      throw e;
    } finally {
      clearTimeout(timeoutId);
      signal.removeEventListener("abort", onAbort);
    }
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Direct-from-frontend Gemini call (client-side). For production, consider proxying.
 * In this project we follow your requirement to call from the frontend.
 */
export async function getMoodMovieRecommendations({
  mood,
  timeoutMs = 15000,
  signal,
} = {}) {
  if (!mood || typeof mood !== "string") {
    throw new Error("Missing mood.");
  }

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const model = import.meta.env.VITE_GEMINI_MODEL || "gemini-1.5-flash";

  if (!apiKey) {
    // Mock fallback when Gemini isn't configured.
    return {
      mood,
      recommendations: buildMockRecommendations(mood),
    };
  }

  const prompt = `You are an expert movie recommendation assistant.
The user has selected the mood: "${mood}".

Recommend exactly 6 movies that best fit this mood. Base your suggestions on emotional tone, pacing, atmosphere, and viewer intent.
Ensure the recommendations match the selected mood (not just “popular” titles). Include variety in genre when appropriate.
Avoid repeating very similar films.

Return ONLY valid JSON in this exact format (no markdown, no extra keys, no extra text):
{
  "mood": "${mood}",
  "recommendations": [
    {
      "title": "Movie Title",
      "year": 2020,
      "genre": "Genre",
      "reason": "Why this film matches the selected mood"
    }
  ]
}
Do not include markdown or any explanation outside the JSON.
`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    model,
  )}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const response = await fetchWithTimeout(url, {
    timeoutMs,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal,
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.8,
        // Hint the model towards JSON output.
        responseMimeType: "application/json",
        maxOutputTokens: 800,
      },
    }),
  });

  if (!response.ok) {
    const maybeText = await response.text().catch(() => "");
    throw new Error(
      `Gemini API error (${response.status}). ${maybeText ? "Details: " + maybeText : ""}`.trim(),
    );
  }

  const data = await response.json();
  const rawText =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ??
    // Some responses may use a different shape; fail safely.
    null;

  if (!rawText) {
    throw new Error("Invalid AI response: missing model text.");
  }

  return normalizeRecommendationsResponse({ rawText, requestedMood: mood });
}

// ---- Examples (for dev/debug) ----
export const SAMPLE_MOCK_RECOMMENDATIONS = buildMockRecommendations("Relaxed");

export const SAMPLE_GEMINI_RESPONSE_TEXT = `{
  "mood": "Relaxed",
  "recommendations": [
    { "title": "The Secret Life of Walter Mitty", "year": 2013, "genre": "Adventure/Comedy-Drama", "reason": "A soothing, uplifting tone with gentle momentum that fits a relaxed mood." },
    { "title": "The Intern", "year": 2015, "genre": "Comedy/Drama", "reason": "Cozy, comforting energy and an easy-watch pace that feels calming." },
    { "title": "Her", "year": 2013, "genre": "Romance/Sci-Fi", "reason": "Tender, low-stress atmosphere with emotional warmth—ideal for unwinding." },
    { "title": "The Big Lebowski", "year": 1998, "genre": "Comedy/Crime", "reason": "Laid-back humor and a mellow flow that matches relaxed downtime." },
    { "title": "La La Land", "year": 2016, "genre": "Romance/Musical", "reason": "Warm, romantic ambiance with a comforting sense of ease." },
    { "title": "Inside Out", "year": 2015, "genre": "Animation/Comedy-Drama", "reason": "Emotionally clear but soothing storytelling that helps you exhale." }
  ]
}`;

