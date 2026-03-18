# Class 5: IMDB-Style Movie App — Detailed Step-by-Step Notes

This document walks through building the **IMDB-style project** (CinePulse) step by step, as done in Class 5. The app shows movies from an API, uses routing, and has a watchlist and mood selector section.

---

## Table of Contents

1. [Project Setup](#step-1-project-setup)
2. [Install Dependencies (Router, Axios, Tailwind)](#step-2-install-dependencies-router-axios-tailwind)
3. [Configure Tailwind CSS](#step-3-configure-tailwind-css)
4. [Set Up Routing in App](#step-4-set-up-routing-in-app)
5. [Build the NavBar](#step-5-build-the-navbar)
6. [Create the Banner Component](#step-6-create-the-banner-component)
7. [Movies Page: Fetch Data with Axios](#step-7-movies-page-fetch-data-with-axios)
8. [MovieCard Component](#step-8-moviecard-component)
9. [WatchList and MoodSelector Pages](#step-9-watchlist-and-moodselector-pages)
10. [Project Structure & Concepts Summary](#step-10-project-structure--concepts-summary)

---

## Step 1: Project Setup

### 1.1 Create a new Vite + React project

```bash
npm create vite@latest imdb -- --template react
cd imdb
npm install
```

- **imdb** = project folder name (you can use another name).
- This gives you the standard Vite + React structure: `index.html`, `src/main.jsx`, `src/App.jsx`, etc.

### 1.2 Verify it runs

```bash
npm run dev
```

Open the URL (e.g. http://localhost:5173). You should see the default Vite + React page.

**What you have so far:** A blank React app ready for routing, API calls, and styling.

---

## Step 2: Install Dependencies (Router, Axios, Tailwind)

We need:

- **react-router-dom** — Client-side routing (multiple “pages”).
- **axios** — HTTP client to call the movie API.
- **tailwindcss** and **@tailwindcss/vite** — Utility-first CSS (Tailwind v4 with Vite plugin).

### 2.1 Install all at once

```bash
npm install react-router-dom axios tailwindcss @tailwindcss/vite
```

### 2.2 What each does

| Package | Purpose |
|--------|--------|
| **react-router-dom** | `<BrowserRouter>`, `<Routes>`, `<Route>`, `<Link>` for navigation without full page reload. |
| **axios** | `axios.get(url)` to fetch data from the TMDB API. |
| **tailwindcss** + **@tailwindcss/vite** | Use Tailwind classes (e.g. `flex`, `rounded-lg`, `bg-blue-600`) in JSX. |

---

## Step 3: Configure Tailwind CSS

### 3.1 Add Tailwind to Vite

In **vite.config.js**, import the Tailwind plugin and add it to `plugins`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### 3.2 Use Tailwind in your CSS

In **src/index.css**, add:

```css
@import "tailwindcss";
```

- This pulls in Tailwind’s utilities. You can now use classes like `flex`, `p-4`, `text-blue-600` in any component.

**Check:** Save, run `npm run dev`, and add a class like `className="text-red-500"` in `App.jsx` to confirm Tailwind is working.

---

## Step 4: Set Up Routing in App

We want three “pages”:

- **/** — Movies (home).
- **/watchlist** — Watchlist.
- **/mood** — Mood selector.

### 4.1 Wrap the app in BrowserRouter

- **BrowserRouter** enables routing using the browser URL (e.g. `/`, `/watchlist`).
- Put it once at the top (usually in `App.jsx`).

### 4.2 Define routes

- **Routes** holds all **Route** definitions.
- Each **Route** has:
  - **path** — URL path (e.g. `"/"`, `"/watchlist"`).
  - **element** — The React component to render when the URL matches.

### 4.3 App.jsx (routing only)

Create placeholder components first (empty or with a heading), then wire them in:

```jsx
import Movies from "./components/Movies";
import WatchList from "./components/WatchList";
import MoodSelector from "./components/MoodSelector";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/mood" element={<MoodSelector />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
```

**Notes:**

- **NavBar** is outside **Routes** so it shows on every page.
- **path="/"** is the home route; **element={<Movies />}** is the Movies page.
- Create the four component files under `src/components/` (NavBar, Movies, WatchList, MoodSelector) so the imports work. You can start with each returning a simple `<h1>`.

**What you have:** Clicking links that point to `/`, `/watchlist`, or `/mood` will show the right component (once we add **Link** in the NavBar).

---

## Step 5: Build the NavBar

The NavBar shows the app name and links to Movies, Watchlist, and Mood Selector.

### 5.1 Use Link instead of &lt;a&gt;

- For in-app navigation, use **Link** from `react-router-dom`.
- **Link to="/path"** switches the route without a full page reload; **&lt;a href="..."&gt;** would reload the whole app.

### 5.2 Create src/components/NavBar.jsx

```jsx
import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-bold text-blue-600 tracking-tight cursor-pointer">
          CinePulse
        </span>
      </div>
      <div className="flex items-center space-x-8 font-medium text-gray-700">
        <Link to="/" className="hover:text-blue-600 transition-colors duration-200">
          Movies
        </Link>
        <Link to="/watchlist" className="hover:text-blue-600 transition-colors duration-200">
          Watchlist
        </Link>
        <Link to="/mood" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all shadow-sm">
          Mood Selector
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
```

**Tailwind used:** `flex`, `justify-between`, `items-center`, `px-8`, `py-4`, `bg-white`, `shadow-md`, `text-blue-600`, `hover:text-blue-600`, `rounded-lg`, etc.

**What you have:** A navbar that navigates between the three routes without reloading the page.

---

## Step 6: Create the Banner Component

A full-width banner at the top of the Movies page, with a background image.

### 6.1 Create src/components/Banner.jsx

```jsx
import React from "react";

function Banner() {
  return (
    <div
      className="h-[70vh] bg-cover"
      style={{
        backgroundImage: `url(https://webneel.com/wnet/file/images/11-16/8-xmen-movie-poster-design.jpg)`,
      }}
    >
    </div>
  );
}

export default Banner;
```

**Notes:**

- **h-[70vh]** — Height 70% of the viewport (Tailwind arbitrary value).
- **bg-cover** — Background image covers the div while keeping aspect ratio.
- **style={{ backgroundImage: \`url(...)\` }}** — Inline style for a dynamic or external image URL.

**What you have:** A large hero-style banner. We’ll use it inside the Movies page in the next step.

---

## Step 7: Movies Page — Fetch Data with Axios

The Movies page should:

1. Show the **Banner** at the top.
2. **Fetch** “now playing” movies from an API.
3. Store them in **state** and **render** a list of **MovieCard** components.

### 7.1 The API: The Movie Database (TMDB)

- **Endpoint used in class:**  
  `https://api.themoviedb.org/3/movie/now_playing?api_key=YOUR_API_KEY`
- **Response:** JSON with a **results** array; each item has fields like **original_title**, **poster_path**, **id**, etc.
- **API key:** You need a free key from [themoviedb.org](https://www.themoviedb.org/settings/api). Replace `YOUR_API_KEY` in the URL. (In the class project it’s in the URL; for real apps you’d put it in env variables.)

### 7.2 Why useEffect + useState?

- **useState** — Hold the list of movies so we can re-render when data arrives.
- **useEffect** — Run the fetch **once** after the component mounts (empty dependency array `[]`). We don’t fetch in the render function itself (that would run on every render and cause infinite requests).

### 7.3 Create src/components/Movies.jsx

```jsx
import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import MovieCard from "./MovieCard.jsx";
import axios from "axios";

function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=0b5415eb9bf023d556ef265b425e0e4a"
      );
      setMovies(response.data.results);
    }
    getData();
  }, []);

  return (
    <div>
      <Banner />
      <div className="flex flex-wrap justify-around mt-8 gap-8">
        {movies.map(function (movieObj) {
          return (
            <MovieCard
              key={movieObj.id}
              title={movieObj.original_title}
              posterUrl={movieObj.poster_path}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Movies;
```

**Step by step:**

1. **useState([])** — `movies` starts as an empty array; after the API call we call **setMovies(response.data.results)**.
2. **useEffect(..., [])** — Runs once after mount. Inside we define an **async** function **getData**, call **axios.get(url)**, then **setMovies** with **response.data.results**.
3. **movies.map(...)** — For each movie we render a **MovieCard**, passing **title** and **posterUrl** (and **key={movieObj.id}** for React’s list reconciliation).
4. **Banner** is rendered above the grid.

**Important:** Use **key={movieObj.id}** (or a unique id) when rendering lists so React can track items correctly.

**What you have:** A Movies page that loads “now playing” movies from TMDB and shows them in a grid (once MovieCard is built).

---

## Step 8: MovieCard Component

Each movie is shown as a card: poster image and title.

### 8.1 TMDB image URL

- **poster_path** from the API is something like `/abc123.jpg`.
- Full image URL: **https://image.tmdb.org/t/p/w500/** + poster_path  
  Example: `https://image.tmdb.org/t/p/w500/abc123.jpg`  
  **w500** is the image width (500px); you can use **w185**, **w342**, etc.

### 8.2 Create src/components/MovieCard.jsx

```jsx
import React from 'react';

function MovieCard({ posterUrl, title }) {
  return (
    <div
      className="w-62.5 h-100 bg-cover rounded-2xl"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500/${posterUrl})`,
      }}
    >
      <h4>{title}</h4>
    </div>
  );
}

export default MovieCard;
```

**Notes:**

- **Props:** **posterUrl** and **title** come from the parent (Movies) for each movie.
- **backgroundImage** — We need a dynamic URL, so we use **style** and template literal: `` `url(https://image.tmdb.org/t/p/w500/${posterUrl})` ``.
- **bg-cover** and **rounded-2xl** style the poster; **h4** shows the title. You can adjust width/height classes (e.g. fixed width/height) and layout so the title doesn’t overlap the poster badly.

**What you have:** A working Movies page with a banner and a grid of movie cards (poster + title).

---

## Step 9: WatchList and MoodSelector Pages

These are placeholder pages for later features (saving movies to a watchlist, filtering by mood).

### 9.1 WatchList — src/components/WatchList.jsx

```jsx
import React from 'react';

function WatchList() {
  return (
    <h1 className="text-yellow-500">WatchList</h1>
  );
}

export default WatchList;
```

### 9.2 MoodSelector — src/components/MoodSelector.jsx

```jsx
import React from 'react';

function MoodSelector() {
  return (
    <h1 className="text-red-400">Mood Selector</h1>
  );
}

export default MoodSelector;
```

Later you can:

- **WatchList:** Keep an array of movie IDs (or objects) in state or context, and render a list of MovieCards.
- **Mood selector:** Filter or fetch movies by genre/mood and display them similarly to Movies.

**What you have:** All three routes working; NavBar takes you to Movies, Watchlist, and Mood Selector.

---

## Step 10: Project Structure & Concepts Summary

### 10.1 Final folder structure (source)

```
imdb/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css          # @import "tailwindcss"
│   └── components/
│       ├── NavBar.jsx
│       ├── Banner.jsx
│       ├── Movies.jsx
│       ├── MovieCard.jsx
│       ├── WatchList.jsx
│       └── MoodSelector.jsx
```

### 10.2 Data flow (short)

1. **App** — Renders **BrowserRouter** → **NavBar** + **Routes**.
2. **NavBar** — **Link** to `/`, `/watchlist`, `/mood`; no full page reload.
3. **Route "/"** → **Movies**.
4. **Movies** — **useEffect** runs once, **axios.get** TMDB now_playing → **setMovies** → re-render.
5. **Movies** — **movies.map** → for each movie, **MovieCard** with **title** and **posterUrl**.
6. **MovieCard** — Shows poster (TMDB image URL) and title.

### 10.3 Concepts used

| Concept | Where |
|--------|--------|
| **React Router** | BrowserRouter, Routes, Route, Link in App and NavBar. |
| **useState** | Movies: `movies` state for the list. |
| **useEffect** | Movies: fetch on mount with `[]` dependency. |
| **Async API call** | axios.get in useEffect; setState with response.data.results. |
| **List rendering** | movies.map with key={movieObj.id}. |
| **Props** | MovieCard receives posterUrl and title. |
| **Tailwind** | NavBar, Banner, Movies grid, MovieCard, placeholders. |

### 10.4 Optional next steps

- **Environment variable** for API key: create `.env` with `VITE_API_KEY=...` and use `import.meta.env.VITE_API_KEY` in the axios URL.
- **Loading and error state:** useState for `loading` and `error`; show spinner or message while loading or on error.
- **Watchlist:** Add “Add to watchlist” on MovieCard; store IDs in state or context; render them on WatchList page.
- **Mood/Genre:** Use TMDB genre or discover endpoints and filter or fetch by mood/genre on the Mood page.

---

## Quick reference: key code snippets

**Routing (App):**
```jsx
<BrowserRouter>
  <NavBar />
  <Routes>
    <Route path="/" element={<Movies />} />
    <Route path="/watchlist" element={<WatchList />} />
    <Route path="/mood" element={<MoodSelector />} />
  </Routes>
</BrowserRouter>
```

**Link (NavBar):**
```jsx
<Link to="/">Movies</Link>
```

**Fetch in Movies:**
```jsx
const [movies, setMovies] = useState([]);
useEffect(() => {
  async function getData() {
    const response = await axios.get(API_URL);
    setMovies(response.data.results);
  }
  getData();
}, []);
```

**TMDB poster URL:**
```text
https://image.tmdb.org/t/p/w500/${poster_path}
```

---

## Latest Updates (Post–Class 5 Commits)

The project has been extended with features added in later commits. **Detailed step-by-step notes for these updates are in a separate file:**

- **Class-5-IMDB-Project-Notes-Part2.md** — Continues from this document and covers the latest commits in detail.

### Summary of what’s in Part 2

| Feature | Brief description |
|--------|---------------------|
| **Lifting state** | Watchlist state moved to **App**; passed to **Movies** (add) and **WatchList** (display). |
| **Pagination** | **pageNo** state in Movies; API `&page=${pageNo}`; **Pagination** component with prev/next; Font Awesome icons in **index.html**. |
| **Add to watchlist** | **MovieCard** “+” button; **movieObject** and **handleAddToWatchList** passed from Movies; persistence via **localStorage**. |
| **WatchList page** | Load watchlist from **localStorage** on mount; **table** (poster, name, ratings, popularity, genre); **genre filter** using **genres.js** (genre id → name). |
| **Genre filter** | **genreList** derived from watchlist; **currentGenre** state; filter buttons; table filtered by selected genre. |

### Commit timeline (reference)

- `32ea040` — pagination done  
- `64b9095` — set Active Genre  
- `a733842` — make the filter work  
- `afaeef2` — genre filter done  

For full code snippets, data flow, and recommended fixes (e.g. immutability in addToWatchList, wiring Remove), see **Class-5-IMDB-Project-Notes-Part2.md**.

---

*Part 1: These notes follow the Class 5 IMDB (CinePulse) project. Use them alongside the code in `imdb/` to build the app step by step. For later features, use Part 2.*
