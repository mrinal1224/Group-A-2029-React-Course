# Class 5: IMDB Project — Part 2 (Latest Commits & Features)

This document continues from **Class-5-IMDB-Project-Notes.md**. It covers the features added in the **latest commits**: pagination, watchlist (with state lifting and localStorage), WatchList page with genre filter, and related UI updates.

---

## Commit Timeline (Recent)

| Commit     | Description |
|-----------|-------------|
| `afaeef2` | genre filter done |
| `a733842` | make the filter work |
| `64b9095` | set Active Genre |
| `32ea040` | pagination done |
| `dfd2fc4` | pagination not working (WIP) |
| *(earlier)* | P1, banner/movie card design, router, fetch with effect, Tailwind |

These notes explain the **current codebase** that includes pagination, watchlist, and genre filtering.

---

## 1. Lifting State: Watchlist in App

### What changed

- **Watchlist** is no longer local to one page. It lives in **App** so both the **Movies** page (add to watchlist) and the **WatchList** page (show and filter list) can use it.
- App holds **watchlist** state and passes **watchlist** and **handleAddToWatchList** down to **Movies**; it passes **watchlist** and **setWatchList** to **WatchList**.

### Why “lifting state up”

- When **two or more components** need the same data (or need to change it), that data is moved to a **common parent** and passed down via **props**. That’s “lifting state up.”

### Code: App.jsx

```jsx
function App() {
  const [watchlist, setWatchList] = useState([]);

  function addToWatchList(movieObj) {
    watchlist.push(movieObj);
    localStorage.setItem("movies", JSON.stringify(watchlist));
    // Note: setWatchList not called here — state not updated; UI may not refresh.
    // Better: setWatchList([...watchlist, movieObj]); then save to localStorage.
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={
          <Movies
            watchlist={watchlist}
            handleAddToWatchList={addToWatchList}
          />
        } />
        <Route path="/watchlist" element={
          <WatchList watchList={watchlist} setWatchList={setWatchList} />
        } />
        <Route path="/mood" element={<MoodSelector />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### Improvements (recommended)

- **Don’t mutate state:** use `setWatchList([...watchlist, movieObj])` (or a callback) and then save to localStorage so React re-renders and the watchlist UI updates.
- **Avoid duplicates:** check if the movie id is already in watchlist before adding.

---

## 2. Pagination

### What it does

- The **Movies** page shows “now playing” movies for a **page number**.
- User can go **next** or **previous** page; the list and API request update accordingly.

### State and API

- **pageNo** state in **Movies** (e.g. `useState(1)`).
- TMDB “now playing” endpoint supports a **page** query param:  
  `...&page=${pageNo}`

### Code: Movies.jsx (pagination parts)

```jsx
const [pageNo, setPageNo] = useState(1);

function movePageAhead() {
  setPageNo(pageNo + 1);
}
function movePageBehind() {
  setPageNo(pageNo - 1);
}

useEffect(() => {
  async function getData() {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=...&language=en-US&page=${pageNo}`
    );
    setMovies(response.data.results);
  }
  getData();
}, [pageNo]);
```

- **useEffect** depends on **pageNo**: when the user changes page, **pageNo** updates → effect runs again → new request → **setMovies** → re-render with new list.
- **Pagination** component receives **pageNo**, **pageAhead**, and **pageBehind** as props.

### Pagination component

```jsx
function Pagination({ pageNo, pageAhead, pageBehind }) {
  return (
    <div className="w-full flex h-12.5 bg-gray-500 justify-center p-4 items-center">
      <div onClick={pageBehind} className="m-5">
        <i className="fa-solid fa-arrow-left"></i>
      </div>
      <div>{pageNo}</div>
      <div onClick={pageAhead} className="m-5">
        <i className="fa-solid fa-arrow-right"></i>
      </div>
    </div>
  );
}
```

- **Font Awesome** icons: add the Font Awesome CSS in **index.html** (e.g. CDN link) so `fa-solid fa-arrow-left` and `fa-arrow-right` work.
- Use **className** (not `class`) in JSX for the `<i>` element.

### index.html (Font Awesome)

```html
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
  crossorigin="anonymous"
/>
```

---

## 3. Add to Watchlist (MovieCard)

### What changed

- **MovieCard** can add the current movie to the watchlist.
- It receives **movieObject** (full movie object from API) and **handleAddtoWatchList** (callback from App via Movies).

### Code: MovieCard.jsx

```jsx
function MovieCard({ posterUrl, title, watchlist, movieObject, handleAddtoWatchList }) {
  return (
    <div className="relative w-64 h-100 ..." style={{ backgroundImage: `url(...)` }}>
      <button className="absolute top-0 left-0 m-2 ...">
        <span onClick={() => handleAddtoWatchList(movieObject)} className="...">
          +
        </span>
      </button>
      <div className="mt-auto ...">
        <h4 className="...">{title}</h4>
      </div>
    </div>
  );
}
```

- **Clicking “+”** calls `handleAddtoWatchList(movieObject)` so the parent can add the full movie object to watchlist and persist it (e.g. localStorage in App).

### Movies.jsx: passing props to MovieCard

```jsx
{movies.map((movieObj) => (
  <MovieCard
    key={movieObj.id}
    movieObject={movieObj}
    watchlist={watchlist}
    title={movieObj.original_title}
    posterUrl={movieObj.poster_path}
    handleAddtoWatchList={handleAddToWatchList}
  />
))}
```

- **movieObject** is the full TMDB movie item (needed for poster, title, id, genre_ids, etc. on the WatchList page).

---

## 4. Persisting Watchlist (localStorage)

### Saving when adding

- In **addToWatchList** (App), after updating watchlist state (or in the same flow), save to **localStorage** so the list survives refresh:

```javascript
localStorage.setItem("movies", JSON.stringify(watchlist));
```

- Use **JSON.stringify** because localStorage stores strings; we store the array of movie objects as a string.

### Loading on WatchList page

- When the **WatchList** component mounts, it reads from localStorage and sets watchlist state so the table shows saved movies.

```jsx
useEffect(() => {
  let moviesFromLS = localStorage.getItem("movies");
  if (!moviesFromLS) return;
  setWatchList(JSON.parse(moviesFromLS));
}, []);
```

- **JSON.parse** converts the string back to an array; **setWatchList** updates App’s state (passed down as prop). So the parent’s watchlist is hydrated from localStorage when the user opens the WatchList page.

---

## 5. WatchList Page: Table and Genre Filter

### Overview

- **WatchList** shows saved movies in a **table** (poster, name, ratings, popularity, genre).
- A **genre filter** lets the user show “All Genres” or one genre at a time; the table is filtered by **currentGenre**.

### Genre IDs: genres.js

- TMDB returns **genre_ids** (array of numbers) per movie. We map those to human-readable names.

**src/genres.js:**

```javascript
export const genreids = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  // ... more
  878: "Sci-Fi",
  53: "Thriller",
  // ...
};
```

- Usage: **genreids[movie.genre_ids[0]]** to show the first genre name (or you can show all ids mapped to names).

### State on WatchList

- **genreList** — list of genre names to show as filter buttons (“All Genres” + unique genres from the watchlist).
- **currentGenre** — which filter is active (“All Genres” or a specific genre name).

### Building genre list from watchlist

- When **watchList** changes, we derive the set of genres present in the list and build **genreList**:

```jsx
useEffect(() => {
  let temp = watchList.map((movieObj) => genreids[movieObj.genre_ids[0]]);
  temp = new Set(temp);
  setGenreList(["All Genres", ...temp]);
}, [watchList]);
```

- **genre_ids[0]** is used as the primary genre; **Set** removes duplicates; we prepend “All Genres”.

### Filter buttons

- Buttons are rendered from **genreList**; clicking sets **currentGenre**:

```jsx
<div className="flex m-8">
  {genreList.map((genre) => (
    <div
      key={genre}
      onClick={() => setCurrentGenre(genre)}
      className={
        currentGenre === genre
          ? "mx-4 ... bg-blue-400 ..."
          : "... bg-gray-400/50 ..."
      }
    >
      {genre}
    </div>
  ))}
</div>
```

- Active genre gets a different style (e.g. **bg-blue-400**).

### Filtering the table

- The table body only shows movies that match **currentGenre**:

```jsx
{watchList
  .filter(
    (movie) =>
      currentGenre === "All Genres" ||
      genreids[movie.genre_ids[0]] === currentGenre
  )
  .map((movie) => (
    <tr key={movie.id}>
      <td><img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.name} /></td>
      <td>{movie.original_title}</td>
      <td>⭐ {movie.vote_average}</td>
      <td>{movie.popularity}</td>
      <td><span>{genreids[movie.genre_ids[0]]}</span></td>
      <td><button className="...">Remove</button></td>
    </tr>
  ))}
```

- **filter** keeps only movies whose (first) genre matches **currentGenre**, or all if “All Genres”.

### Remove button

- The **Remove** button is present in the UI but not wired in the current code. To implement: call a handler (e.g. passed from App) that updates watchlist state by removing the movie by **id** and then saves the new array to localStorage.

---

## 6. File and Data Flow Summary

| File / Layer    | Role |
|-----------------|------|
| **App.jsx**     | Holds **watchlist** state; **addToWatchList** (and optionally persist); passes watchlist and handlers to Movies and WatchList. |
| **Movies.jsx**  | **pageNo** state; fetch with `page=${pageNo}`; **Pagination**; passes **movieObject** and **handleAddToWatchList** to each **MovieCard**. |
| **MovieCard.jsx** | “+” button calls **handleAddtoWatchList(movieObject)**; poster and title from props. |
| **Pagination.jsx** | Displays **pageNo**; prev/next call **pageBehind** / **pageAhead**. |
| **WatchList.jsx** | On mount, loads watchlist from **localStorage** into parent state; builds **genreList** from watchlist; **currentGenre** filter; table with filter + **genreids**. |
| **genres.js**   | **genreids** map (TMDB id → name). |
| **index.html** | Font Awesome CSS for pagination icons. |

---

## 7. Concepts Recap

| Concept | Where it’s used |
|--------|-----------------|
| **Lifting state up** | Watchlist in App, shared by Movies and WatchList. |
| **useEffect with dependency** | Movies: fetch when **pageNo** changes; WatchList: build genre list when **watchList** changes, load from localStorage when component mounts. |
| **localStorage** | Persist watchlist on add; restore on WatchList mount. |
| **List rendering + key** | Pagination controls; genre buttons; table rows (**key={movie.id}**). |
| **Conditional styling** | Active genre button (e.g. blue vs gray). |
| **Filter then map** | WatchList table: filter by **currentGenre**, then map to rows. |

---

## 8. Optional Next Steps

- **Fix addToWatchList:** Use **setWatchList([...watchlist, movieObj])** (and avoid mutating **watchlist**); then **localStorage.setItem**. Optionally prevent duplicate ids.
- **Wire Remove:** Pass a **handleRemove(movieId)** from App that updates state and localStorage.
- **Pagination limits:** Disable “next” when on last page (TMDB **response.data.total_pages**).
- **Loading/error:** Show loading or error state in Movies and WatchList when fetching or reading from localStorage.

---

*This file continues **Class-5-IMDB-Project-Notes.md** and reflects the IMDB project state after the latest commits (pagination, watchlist, genre filter).*
