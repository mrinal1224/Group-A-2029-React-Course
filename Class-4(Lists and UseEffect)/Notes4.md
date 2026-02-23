# Class 4: List Rendering & useEffect — Detailed Study Notes

These topics were introduced in **Class 3**; this document gives detailed notes on **list rendering** and **useEffect** so you can use them confidently in later projects (e.g. the IMDB app in Class 5).

---

## Part A: List Rendering in React

---

### 1. Why We Need List Rendering

Often we have **arrays of data** (products, movies, users) and want to show one UI element per item. We don’t write each item by hand; we **map** over the array and return JSX for each element.

---

### 2. The .map() Pattern

Use the array method **.map()** inside your JSX (inside `{ }`):

- **map** takes a function that runs for **each item** in the array.
- The function receives the **current item** (and optionally its **index**).
- You **return** one React element (or component) per item.
- The result is an array of elements that React can render.

**Basic syntax:**

```jsx
{arrayName.map((item) => (
  <SomeElement key={item.id}>{item.name}</SomeElement>
))}
```

Or with a block and `return`:

```jsx
{arrayName.map((item) => {
  return <SomeElement key={item.id}>{item.name}</SomeElement>;
})}
```

---

### 3. Example: ProductList (from Class 3)

**Data:** An array of product objects, each with `id`, `name`, and `price`.

```jsx
function ProductList() {
  const Products = [
    { id: 1, name: "Laptop", price: 1200 },
    { id: 2, name: "Headphones", price: 150 },
    { id: 3, name: "Smartphone", price: 800 },
    // ... more items
  ];

  return (
    <div>
      <ul>
        {Products.map((product) => (
          <li key={product.id}>
            Product Name - {product.name} Price - {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

**Step by step:**

1. **Products** is an array of objects.
2. **Products.map((product) => ...)** — For each `product`, we run the function.
3. We **return** one `<li>` per product, showing `product.name` and `product.price`.
4. **key={product.id}** — Required when rendering lists (see below).

---

### 4. The key Prop (Important)

When you render a **list** of elements (from a `.map()`), React needs a way to tell items apart so it can update the DOM correctly when the list changes (add, remove, reorder).

- You must provide a **key** on the **outermost element** (or component) returned inside the map.
- **key** should be **unique** among siblings and **stable** (same item → same key).
- Prefer a unique **id** from your data (e.g. `product.id`, `movie.id`).

**Good:**

```jsx
{movies.map((movie) => (
  <MovieCard key={movie.id} title={movie.title} />
))}
```

**Avoid:**

- Using **index** as key if the list can be reordered, filtered, or items added/removed (can cause bugs or wrong UI).
- Missing key (React will warn and fall back to index).

**Where to put key:** On the **top-level element** you return from the map (often the component you render for each item):

```jsx
{movies.map((movie) => (
  <MovieCard key={movie.id} title={movie.original_title} posterUrl={movie.poster_path} />
))}
```

---

### 5. Using a Component for Each Item

Instead of returning a plain `<li>`, you can return a **component** and pass item data as **props**:

```jsx
{movies.map((movie) => (
  <MovieCard
    key={movie.id}
    title={movie.original_title}
    posterUrl={movie.poster_path}
  />
))}
```

- **MovieCard** receives `title` and `posterUrl` (and any other props you need).
- **key** stays on the component that is the direct child of the map.

---

### 6. List Rendering Checklist

- [ ] Data is in an **array** (state or constant).
- [ ] Use **array.map((item) => ...)** and **return** one element/component per item.
- [ ] Give the top-level element/component a **key** that is **unique** and **stable** (prefer `item.id`).
- [ ] Use **{item.property}** (or expressions) inside JSX to show item data.

---

## Part B: useEffect Hook

---

### 1. What is useEffect For?

**useEffect** lets you run **side effects** after render. Side effects are things that reach outside the component:

- **Fetching data** from an API.
- **Subscriptions** or timers.
- **Updating the document** (e.g. `document.title`).
- **Reading from or writing to the DOM** when needed.

React’s render should stay “pure”; side effects are moved into **useEffect** so they run at the right time (after paint), not during render.

---

### 2. Syntax

```javascript
import { useEffect } from "react";

useEffect(() => {
  // Side effect code here
  return () => { /* optional cleanup */ };
}, [dependency1, dependency2]); // dependency array
```

| Part | Meaning |
|------|--------|
| **Function** | Runs after the component has rendered (and after paint). |
| **Cleanup (optional)** | If you return a function, React runs it before the next effect run or when the component unmounts. |
| **Dependency array** | When the effect runs (see below). |

---

### 3. When Does the Effect Run? (Dependency Array)

| Dependency array | When the effect runs |
|------------------|----------------------|
| **Omitted** | After **every** render. (Rarely what you want.) |
| **Empty []** | Only **once**, after the **first** render (like “on mount”). |
| **[a, b]** | After the first render and whenever **a** or **b** (or their references) **change**. |

---

### 4. Example: Run Once on Mount (Empty Array)

Use this for “load data when the component appears” (e.g. fetch movies once).

```javascript
useEffect(() => {
  console.log("Runs only once after first render");
  document.title = "My App";
}, []);
```

- Runs **once** after the first render.
- Good for one-time setup or a single data fetch.

---

### 5. Example: Run When State Changes (Dependency on State)

Use this when the effect should re-run when a **value** (e.g. count, id) changes.

**From Class 3 Counter:**

```javascript
const [count, setCount] = useState(0);

useEffect(() => {
  console.log("useEffect runs");
  document.title = `You clicked ${count} times`;
}, [count]);
```

- Runs after the **first** render and **every time `count` changes**.
- So the browser tab title stays in sync with the counter.

**Rule:** Whatever you **use inside** the effect (like `count`) should usually be in the dependency array so the effect stays correct when that value changes.

---

### 6. Example: Fetching Data (Async in useEffect)

You often need to **fetch data** when the component mounts or when an id (or other dependency) changes.

**Pattern:**

1. Put the data in **state** (e.g. `user`, `movies`).
2. In **useEffect**, call an **async** function that fetches and then **setState** with the result.
3. Use the **dependency array** to control when the fetch runs (e.g. `[]` for once, `[id]` when id changes).

**From Class 3 UserComponent:**

```javascript
const [user, setUser] = useState(null);
const [id, setId] = useState(1);

useEffect(() => {
  const fetchData = async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const userData = await response.json();
    setUser(userData);
  };
  fetchData();
}, [id]);
```

**Step by step:**

1. **useEffect(..., [id])** — Runs when the component first mounts and whenever **id** changes.
2. We define an **async** function **fetchData** inside the effect (because useEffect callback should not be async directly).
3. **fetch(url)** then **.json()** to get the user object.
4. **setUser(userData)** updates state → React re-renders and we can show `user.name`, etc.

**Why not make the effect async?**  
React expects the effect function to either return nothing or a cleanup function. An async function returns a Promise, so we put the async logic inside a normal function and call it.

---

### 7. Example: Fetch with Axios (Same Idea)

Same pattern with **axios** (e.g. in the IMDB project):

```javascript
const [movies, setMovies] = useState([]);

useEffect(() => {
  async function getData() {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=..."
    );
    setMovies(response.data.results);
  }
  getData();
}, []);
```

- Empty **[]** → fetch **once** when the component mounts.
- Result is stored in **movies** and rendered with **.map()** (list rendering).

---

### 8. Cleanup (Optional)

If your effect sets up something that must be torn down (timer, subscription, listener), **return a function** from the effect. React will call it before the next run of the effect or when the component unmounts.

**Example: timer**

```javascript
useEffect(() => {
  const id = setInterval(() => console.log("tick"), 1000);
  return () => clearInterval(id); // cleanup
}, []);
```

- Cleanup runs when the component unmounts (or before the effect runs again if deps change).
- For fetch requests you often don’t need cleanup unless you want to cancel the request (e.g. with AbortController).

---

### 9. Common Mistakes

| Mistake | Problem | Fix |
|--------|--------|-----|
| Forgetting dependency array | Effect runs after every render. | Add `[]` or `[dep1, dep2]`. |
| Missing deps | Stale values inside effect; hard-to-find bugs. | Include every value from the effect that can change. |
| Async effect directly | `useEffect(async () => { ... })` returns a Promise. | Use a sync effect that calls an async function inside. |
| Fetch in render | Fetch runs every render → infinite requests or too many calls. | Move fetch into useEffect. |
| No key in list | React warning; wrong behavior when list changes. | Add `key={item.id}` (or stable unique key). |

---

### 10. useEffect Checklist

- [ ] **Import:** `import { useEffect } from "react";`
- [ ] Effect runs **after** render (and after paint).
- [ ] Use **[]** to run once on mount; use **[value]** to run when `value` changes.
- [ ] For async work, define an **async** function **inside** the effect and call it.
- [ ] Update **state** with the result (e.g. setMovies, setUser) so the component re-renders with new data.
- [ ] If you set up timers/subscriptions, **return a cleanup** function.

---

## Quick Reference

### List rendering

```jsx
{items.map((item) => (
  <ItemComponent key={item.id} {...item} />
))}
```

- Use **key** on the top-level element/component.
- Prefer **id** (or stable unique value); avoid index if list can change.

### useEffect

```javascript
// Run once on mount
useEffect(() => { ... }, []);

// Run when `id` changes
useEffect(() => { ... }, [id]);

// Async fetch pattern
useEffect(() => {
  async function load() {
    const res = await fetch(url);
    const data = await res.json();
    setData(data);
  }
  load();
}, []);
```

---

## Summary

- **List rendering:** Use **.map()** on your array and return one element or component per item; always pass a **key** (usually `item.id`).
- **useEffect:** Use for **side effects** (fetch, document.title, subscriptions). Control **when** it runs with the dependency array: **[]** = once, **[dep]** = when dep changes. For fetch, call an **async** function inside the effect and **setState** with the result.

These patterns are used in **Class 5** (IMDB project) for fetching movies and rendering them in a list with **MovieCard** components.
