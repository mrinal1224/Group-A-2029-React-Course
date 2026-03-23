Build a complete “Mood Selector to AI Movie Recommendations” feature for my Movies App.

Tech expectations:
- Frontend: React
- Styling: Tailwind CSS
- The LLM call should happen directly from the frontend
- Keep the implementation clean, modular, and production-friendly
- Write code in a scalable way so this feature can later be extended with more moods, more filters, and different LLM providers

Feature goal:
Create a UI component where users can select their current mood from a set of mood options. Once a mood is selected, that mood should be sent directly from the frontend to an LLM (assume Gemini for now). Gemini should analyze the selected mood and return exactly 6 movie recommendations in one response. These recommendations should then be parsed and displayed nicely in the UI.

Core feature flow:
1. Show a “Mood Selector” section in the movies app
2. Display multiple moods as selectable cards/chips/buttons
3. Allow only one mood to be selected at a time
4. Add a CTA button like “Get Recommendations”
5. When clicked, send the selected mood directly from the frontend to Gemini
6. Gemini should return 6 movie suggestions tailored to the selected mood
7. Display the 6 recommendations in a polished movie recommendation section
8. Handle loading, error, empty, retry, and invalid-response states properly

Mood options:
Use an initial list like:
- Happy
- Sad
- Excited
- Relaxed
- Romantic
- Nostalgic
- Thrilled
- Curious
- Motivated
- Lonely
- Adventurous
- Emotional

UI requirements:
Create a visually polished Mood Selector component with:
- Section heading: “Pick Your Mood”
- Small helper text: “Tell us how you feel and we’ll suggest movies that match your vibe.”
- Mood options displayed as responsive selectable pills/cards
- Selected mood should be clearly highlighted
- Add hover states, active states, and keyboard accessibility
- Disable recommendation button until a mood is selected
- Show loading state while recommendations are being fetched
- Show skeleton cards or shimmer placeholders while loading
- After success, show 6 recommended movie cards in a responsive grid

Movie card design:
Each recommendation card should display:
- Movie title
- Release year
- Genre
- Short 2–3 line explanation of why it matches the selected mood
- Optional poster placeholder if real poster data is unavailable
- Rating if available
- A “Save” or “Add to Watchlist” button placeholder for future extensibility

Expected AI behavior:
The LLM should not just return random popular movies. It should actually interpret the selected mood and recommend movies that fit emotionally, tonally, and thematically.

Examples:
- Happy → uplifting, feel-good, fun, energetic movies
- Sad → comforting, healing, emotional, hopeful movies
- Excited → high-energy, fast-paced, thrilling movies
- Relaxed → calm, cozy, easy-watch movies
- Romantic → love stories, warm emotional films
- Nostalgic → classic, sentimental, memory-evoking films
- Thrilled → suspense, action, intense storytelling
- Curious → thought-provoking, mystery, smart films

Implementation architecture:
Build this feature with clean separation of concerns:
- UI component for mood selection
- Recommendation trigger button
- Frontend API utility/service layer to call Gemini
- Response parser/formatter
- Recommendation results component
- Loading and error components

Recommended file structure:
- components/
  - MoodSelector.jsx
  - MoodOptionCard.jsx
  - MoodRecommendationResults.jsx
  - MovieRecommendationCard.jsx
  - MoodSelectorSkeleton.jsx
- services/
  - moodRecommendationService.js
- pages or features/
  - MoodMovieFeature.jsx

Frontend behavior details:
- Use React state for:
  - selectedMood
  - recommendations
  - loading
  - error
- Clicking a mood updates selectedMood
- Clicking “Get Recommendations” triggers Gemini API call
- Prevent duplicate requests while loading
- Clear previous errors before new request
- Preserve selected mood during loading
- On success, render exactly 6 recommendations
- On malformed response, show fallback error message
- Add a retry button if the API call fails

Gemini integration requirements:
The frontend should directly call Gemini.
- Keep Gemini configuration isolated in a service file
- Build a strong prompt before sending the request
- Expect a structured JSON response
- Parse and normalize the response before rendering
- Handle API failures gracefully
- Make it easy to swap Gemini later with another LLM provider

Gemini prompt engineering requirements:
Write a strong prompt that instructs Gemini to:
- Act like a movie recommendation assistant
- Analyze the selected mood deeply
- Recommend exactly 6 movies
- Ensure recommendations match the emotional tone of the selected mood
- Include variety in genre when appropriate
- Avoid repeating very similar films
- Return data in strict JSON format only
- Include title, year, genre, and reason for recommendation

Example Gemini prompt:
“You are an expert movie recommendation assistant.
The user has selected the mood: ‘Relaxed’.
Recommend exactly 6 movies that best fit this mood.
Base your suggestions on emotional tone, pacing, atmosphere, and viewer intent.
Return ONLY valid JSON in this exact format:
{
  "mood": "Relaxed",
  "recommendations": [
    {
      "title": "Movie Title",
      "year": 2020,
      "genre": "Drama/Comedy",
      "reason": "Why this movie matches the selected mood"
    }
  ]
}
Do not include markdown, explanation, or extra text outside the JSON.”

Response contract:
The UI layer should work with normalized data in this format:
{
  "mood": "Relaxed",
  "recommendations": [
    {
      "id": "generated-or-slug",
      "title": "The Secret Life of Walter Mitty",
      "year": 2013,
      "genre": "Adventure/Drama",
      "reason": "This film has a soothing yet inspiring energy that fits a relaxed mood."
    }
  ]
}

Validation rules:
- Mood must be selected before submission
- Response must contain exactly 6 movies
- Each movie must have:
  - title
  - year
  - genre
  - reason
- If Gemini returns invalid JSON, repair if possible or fail safely
- If fewer than 6 movies are returned, show graceful fallback error

Edge cases to handle:
- No mood selected
- Network failure
- Gemini timeout
- Invalid/malformed AI response
- Duplicate recommendations
- API limit exceeded
- Empty recommendation list
- User clicks button multiple times quickly

UX enhancements:
- Smooth transition when recommendation section appears
- Scroll into view after results load
- Show selected mood above results, e.g. “Because you’re feeling Relaxed...”
- Add a “Try another mood” interaction
- Optionally allow reshuffling/regenerating recommendations for same mood later

Accessibility requirements:
- Mood options should be keyboard accessible
- Clear focus states
- Buttons must have aria labels
- Screen-reader-friendly loading and error messages
- Ensure sufficient contrast in selected/unselected states

Code quality expectations:
- Use reusable components
- Keep code easy to read
- Add meaningful comments only where needed
- Avoid hardcoded messy logic inside JSX
- Use async/await with proper try/catch
- Keep API service and UI logic separated
- Make the solution easy to plug into an existing movies app

Optional enhancements if time allows:
- Cache recommendations per mood in local state
- Add emojis/icons for each mood
- Add movie posters later through TMDB integration
- Save mood history
- Save recommendations to watchlist
- Add animated selection states
- Add a “surprise me” mood option

Acceptance criteria:
- User sees multiple mood options
- User can select exactly one mood
- Clicking “Get Recommendations” sends selected mood directly to Gemini
- Gemini returns exactly 6 mood-based movie recommendations
- Recommendations are displayed in a clean responsive layout
- Loading, error, and retry states work properly
- Feature is modular and ready for future extension

Now implement this feature end-to-end with:
1. React components
2. Tailwind styling
3. Frontend Gemini integration
4. Mock fallback support if Gemini configuration is unavailable
5. Proper error handling
6. Clean folder structure
7. Example usage inside an existing movies app page

Also include:
- sample mock data
- sample Gemini response
- comments showing where to plug in Gemini configuration