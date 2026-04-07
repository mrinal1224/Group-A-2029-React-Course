# Class 10 Notes - React Performance Foundations

## 1) Why Performance Matters in React

React is fast, but any app can feel slow if:
- Components re-render too often.
- Heavy calculations run on every render.
- Side effects are not cleaned up.
- Event listeners/timers keep running even after UI changes.

Class 10 focuses on identifying *why* re-renders happen and how to prevent unnecessary work.

---

## 2) Core Concepts Covered

## A) Re-render basics

A React component re-renders when:
- Its `state` changes.
- Its `props` change.
- Its parent re-renders (default behavior).

Important: parent re-render does not always mean child should do expensive work again.

---

## B) `useEffect` and Cleanup (Timer and Mouse Tracker pattern)

### Why `useEffect`?
`useEffect` is used for side effects:
- timers (`setInterval`, `setTimeout`)
- subscriptions
- event listeners
- API calls

### Why cleanup matters?
If cleanup is missing:
- intervals keep running in background,
- event listeners stack up,
- memory leaks and duplicate behavior appear.

### Timer example (concept from class)
```jsx
useEffect(() => {
  const interval = setInterval(() => {
    setCount((prev) => prev + 1);
  }, 1000);

  return () => {
    clearInterval(interval);
  };
}, []);
```

#### Explanation:
- Effect runs once (because dependency array is `[]`).
- Timer increments state every second.
- Cleanup runs when component unmounts.

### Extra example: window resize listener
```jsx
useEffect(() => {
  function onResize() {
    setWidth(window.innerWidth);
  }

  window.addEventListener("resize", onResize);
  return () => window.removeEventListener("resize", onResize);
}, []);
```

---

## C) `React.memo` for child component optimization

`React.memo(Component)` memoizes a component and skips re-render if props are shallowly equal.

Use when:
- child is pure/presentational,
- parent re-renders often,
- child props usually stay same.

### Class idea:
- `Parent` updates `count`.
- `Child` receives `name` and `clickFn`.
- Without memoization, child re-renders every parent change.
- With `React.memo`, child can skip re-render if props references are unchanged.

Example:
```jsx
function Child({ name }) {
  return <h2>{name}</h2>;
}

export default React.memo(Child);
```

---

## D) `useCallback` to stabilize function props

Problem:
- Functions created inline in parent are new on each render.
- For memoized child, a new function prop means "props changed", so child re-renders.

Solution:
- Wrap function in `useCallback`.

```jsx
const handleClick = useCallback(() => {
  console.log("clicked");
}, []);
```

Now child receives the same function reference between renders (until dependencies change).

### Extra example with dependency
```jsx
const handleAdd = useCallback(() => {
  setItems((prev) => [...prev, query]);
}, [query]);
```

Rule: include every external value used inside callback (`query` here).

---

## E) Heavy rendering vs light rendering

In your analytics pattern:
- A huge list is filtered/reduced.
- If this runs during every tiny UI change (like typing in textarea), app feels laggy.

Class 10 introduces this problem so that Class 12 solves it deeply using `useMemo`.

---

## 3) Practical Debug Checklist

When app feels slow:
1. Add `console.log("Component rendered")` temporarily.
2. Check which component re-renders too often.
3. Ask: is this render necessary?
4. If child renders unnecessarily:
   - wrap child in `React.memo`,
   - stabilize function props with `useCallback`,
   - stabilize object/array props with `useMemo`.
5. Ensure all `useEffect` side effects have cleanup.

---

## 4) Common Mistakes (Very Important)

1. **Using `React.memo` everywhere**
   - Adds complexity.
   - Only useful when re-renders are actually expensive/frequent.

2. **Wrong dependency arrays**
   - Missing dependency can create stale values.
   - Extra dependency can trigger too many recomputations.

3. **No cleanup in effects**
   - Causes duplicate listeners or runaway timers.

4. **Inline functions passed to many memoized children**
   - Defeats memoization.

---

## 5) Extra Practice Examples

## Example 1: Memoized Product Card
```jsx
const ProductCard = React.memo(function ProductCard({ title, price, onAdd }) {
  console.log("ProductCard rendered:", title);
  return (
    <div>
      <h4>{title}</h4>
      <p>{price}</p>
      <button onClick={onAdd}>Add</button>
    </div>
  );
});
```

## Example 2: Parent with stable handlers
```jsx
function Shop() {
  const [cartCount, setCartCount] = useState(0);

  const handleAdd = useCallback(() => {
    setCartCount((c) => c + 1);
  }, []);

  return (
    <>
      <h3>Cart: {cartCount}</h3>
      <ProductCard title="Keyboard" price={2000} onAdd={handleAdd} />
    </>
  );
}
```

## Example 3: Cleanup fetch with abort
```jsx
useEffect(() => {
  const controller = new AbortController();

  async function loadData() {
    const res = await fetch("/api/users", { signal: controller.signal });
    const data = await res.json();
    setUsers(data);
  }

  loadData();
  return () => controller.abort();
}, []);
```

---

## 6) Interview-style Quick Definitions

- **Re-render**: React runs component function again to calculate updated UI.
- **Memoization**: storing previous result/reference to avoid unnecessary recomputation.
- **`React.memo`**: skips child re-render when props are unchanged (shallow compare).
- **`useCallback`**: memoizes function reference.
- **Effect cleanup**: function returned from `useEffect`, runs before next effect/unmount.

---

## 7) Key Takeaways from Class 10

- First optimize by understanding render flow.
- Always write cleanup for side effects.
- `React.memo` + `useCallback` is a common pair for parent-child optimization.
- Don’t optimize blindly; optimize measured bottlenecks.
