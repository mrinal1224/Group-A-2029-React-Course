# Class 12 Notes - Optimization 2 (`useMemo` and `useRef`)

## 1) Class Focus

Class 12 continues React performance work with two key hooks:
- `useMemo` -> optimize expensive calculations
- `useRef` -> persist mutable values / access DOM without re-render

This class answers:
- "Why does typing in a small input freeze UI?"
- "How can we keep computed values cached?"
- "How do we directly focus or style an input safely?"

---

## 2) `useMemo` in Detail

## A) What `useMemo` does

`useMemo` caches the result of a calculation and recomputes only when dependencies change.

Syntax:
```jsx
const memoizedValue = useMemo(() => {
  // expensive calculation
  return result;
}, [dependencies]);
```

---

## B) Problem shown in class

In analytics components:
- Large `orders` data is filtered and reduced.
- Typing in textarea updates `note`.
- Without memoization, heavy calculation runs again every keystroke.

This causes lag.

---

## C) With and without memo behavior

### Without `useMemo`
```jsx
const totalRevenue = orders
  .filter((order) => order.status === "paid")
  .reduce((sum, order) => sum + order.amount, 0);
```
Runs on every render.

### With `useMemo`
```jsx
const analytics = useMemo(() => {
  const paidOrdersList = orders.filter((order) => order.status === "paid");
  const totalRevenue = paidOrdersList.reduce((sum, order) => sum + order.amount, 0);
  const averageOrderValue = paidOrdersList.length
    ? totalRevenue / paidOrdersList.length
    : 0;

  return {
    totalRevenue,
    averageOrderValue,
    paidOrders: paidOrdersList.length,
  };
}, []);
```

For static `orders`, this computes once.

---

## D) Correct dependency strategy

If computation depends on changing values, include them.

Example:
```jsx
const filtered = useMemo(() => {
  return products.filter((p) => p.category === selectedCategory);
}, [products, selectedCategory]);
```

Missing dependency can give stale results.
Too many dependencies can reduce optimization benefit.

---

## E) When to use `useMemo` (and when not)

Use when:
- calculation is expensive (big loops/filter/sort/map),
- renders happen frequently,
- result is reused in render/props.

Avoid when:
- calculation is trivial,
- dependencies change every render anyway,
- optimization overhead is larger than savings.

---

## 3) `useRef` in Detail

## A) What `useRef` is

`useRef(initialValue)` returns an object:
```js
{ current: initialValue }
```

Properties:
- persists between renders,
- updating `ref.current` does **not** trigger re-render.

---

## B) Main use cases

1. Accessing DOM nodes directly
2. Storing mutable values (timer id, previous value, flag) without re-render

---

## C) Class example (`Ref` component pattern)

```jsx
const inputRef = useRef(null);

function reset() {
  setText("");
  inputRef.current.focus();
  inputRef.current.style.backgroundColor = "red";
}

return <input ref={inputRef} value={text} onChange={(e) => setText(e.target.value)} />;
```

What happens:
- `inputRef.current` points to the input DOM element after mount.
- On reset, input value clears via state.
- Focus and style are controlled imperatively.

---

## D) Extra examples for `useRef`

## Example 1: Track previous value
```jsx
function Price({ value }) {
  const prev = useRef(value);

  useEffect(() => {
    prev.current = value;
  }, [value]);

  return <p>Now: {value}, Previous: {prev.current}</p>;
}
```

## Example 2: Store interval ID
```jsx
function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  function start() {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
  }

  function stop() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }

  useEffect(() => stop, []);

  return (
    <>
      <h3>{seconds}</h3>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </>
  );
}
```

## Example 3: Prevent double submit
```jsx
function SaveButton() {
  const isSavingRef = useRef(false);

  async function handleSave() {
    if (isSavingRef.current) return;
    isSavingRef.current = true;
    try {
      await fakeApiCall();
    } finally {
      isSavingRef.current = false;
    }
  }

  return <button onClick={handleSave}>Save</button>;
}
```

---

## 4) `useMemo` + `React.memo` + `useCallback` together

Advanced pattern:
- Parent calculates derived data with `useMemo`
- Parent passes stable callback via `useCallback`
- Child wrapped in `React.memo`

This trio avoids unnecessary expensive renders in complex UIs.

Example:
```jsx
const visibleUsers = useMemo(() => filterUsers(users, query), [users, query]);
const onSelect = useCallback((id) => setSelected(id), []);

return <UserList users={visibleUsers} onSelect={onSelect} />;
```

---

## 5) Common Mistakes in Optimization

1. Memoizing everything
   - makes code harder to read
   - may not improve performance

2. Wrong dependencies in `useMemo`
   - stale values / bugs

3. Using `useRef` as state
   - UI will not update when ref changes

4. Direct DOM manipulation when not needed
   - prefer React state/props first, imperative DOM only when required

5. Ignoring profiling
   - optimize with evidence, not assumptions

---

## 6) Performance Workflow (Practical)

1. Detect lag (typing, scrolling, interactions).
2. Log renders / use React DevTools Profiler.
3. Find heavy calculations or render chains.
4. Apply `useMemo` to expensive derived values.
5. Apply `React.memo` + `useCallback` where child rerenders are unnecessary.
6. Re-profile and verify gain.

---

## 7) Quick Definitions

- **`useMemo`**: memoizes computed value.
- **`useRef`**: mutable box persisted across renders; no re-render on update.
- **Derived data**: value calculated from existing state/props.
- **Imperative code**: directly commanding DOM/API (e.g., `focus()`).

---

## 8) Class 12 Key Takeaways

- Use `useMemo` for expensive derived values, not as default.
- Use `useRef` for DOM access and persistent mutable values.
- Optimization must preserve correctness first, then improve speed.
- Measure before and after to confirm real benefit.
