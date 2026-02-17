# Class 3: State — Detailed Study Notes

---

## 1. What is State?

**State** is data that **changes over time** and that a component “remembers” between renders. When state updates, React **re-renders** the component so the UI reflects the new data.

| Concept | Meaning |
|--------|--------|
| **State** | Data that can change; owned by the component; when it changes, the component re-renders. |
| **Props** | Data passed **from parent to child**; read-only; the parent controls them. |

- **Props** = “What my parent told me.” (Immutable from the child’s perspective.)
- **State** = “What I remember and can update myself.” (Mutable via a setter.)

Components that use state are often called **stateful**; components that only use props are **stateless** (or presentational).

---

## 2. Why Do We Need State?

- **User input**: Text in inputs, checkboxes, selections.
- **UI toggles**: Open/close, show/hide, expanded/collapsed.
- **Counts and values**: Like a counter, score, or step index.
- **Temporary data**: Form fields before submit, search query.

Without state, the component would always show the same thing; there would be no way to reflect user actions or internal changes.

---

## 3. The useState Hook

**Hooks** are special React functions that let you “hook into” features like state. **useState** is the hook for adding state to a **functional component**.

### 3.1 Import

```javascript
import { useState } from "react";
```

### 3.2 Syntax

```javascript
const [currentValue, setterFunction] = useState(initialValue);
```

| Part | Meaning |
|------|--------|
| **currentValue** | The state value **this render**. Use it to read the state (e.g. display in JSX). |
| **setterFunction** | Call this to **update** the state. React will re-render with the new value. |
| **initialValue** | The value used on the **first** render (number, string, boolean, array, object, etc.). |

- You can name the variable and setter anything (e.g. `count` / `setCount`, `name` / `setName`).
- Convention: name the setter **set** + name of the state (e.g. `setCount` for `count`).

### 3.3 Examples

**Number (e.g. counter):**

```javascript
const [count, setCount] = useState(0);
// count starts at 0; use setCount(1), setCount(count + 1), etc.
```

**String (e.g. input text):**

```javascript
const [text, setText] = useState("");
// Empty string by default; use setText(e.target.value) in onChange
```

**Boolean (e.g. toggle):**

```javascript
const [showEmail, setShowEmail] = useState(false);
// Toggle with setShowEmail(true) or setShowEmail(false)
```

**Multiple state variables in one component:**

```javascript
const [count, setCount] = useState(0);
const [text, setText] = useState("");
```

Each piece of state has its own variable and setter; you can have as many `useState` calls as you need.

---

## 4. Reading and Updating State

### Reading state

Use the **current value** variable in your JSX or logic:

```jsx
<h1>{count}</h1>
<p>{text}</p>
```

### Updating state

- **Always use the setter** (e.g. `setCount`, `setName`). Do **not** assign to the state variable (e.g. `count = 1` is wrong).
- Calling the setter **schedules a re-render**. React will call your component again with the new state.

**Example — counter:**

```jsx
<button onClick={() => setCount(count + 1)}>Increment</button>
<h1>{count}</h1>
<button onClick={() => setCount(count - 1)}>Decrement</button>
```

Or with a named function:

```javascript
function decrement() {
  setCount(count - 1);
}
// ...
<button onClick={decrement}>Decrement</button>
```

**Example — text input:**

```jsx
<input type="text" onChange={(e) => setText(e.target.value)} />
<h4>{text}</h4>
```

- **e** is the **event** object; **e.target** is the input element; **e.target.value** is the current text. Every keystroke runs `onChange`, so the state (and UI) stay in sync with the input.

---

## 5. State Updates and Re-renders

- When you call a state setter (e.g. `setCount(5)`), React **re-renders** that component.
- On the next render, `useState` returns the **new** value (e.g. `count` becomes 5).
- So: **set state → re-render → UI shows new state.**

If you put a `console.log("Re-Rendered")` in the component, you will see it run on every state update (and on parent re-renders). This is normal.

---

## 6. Controlled Inputs (Forms)

A **controlled input** is one whose value is driven by **React state** and updated via **onChange**.

### Pattern

1. Store the value in state: `const [name, setName] = useState("");`
2. Set the input’s **value** from state: `value={name}`
3. Update state on change: `onChange={(e) => setName(e.target.value)}`

```jsx
<label>Name</label>
<input
  type="text"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
```

- **value={name}** makes the input show whatever is in state.
- **onChange** updates state when the user types, so the input and state always match.

### Why “controlled”?

React is the **single source of truth**. The input doesn’t keep its own internal value; it only shows `name` and updates it through `setName`. That makes it easy to validate, reset, or send the value elsewhere.

### Uncontrolled vs controlled

| Uncontrolled | Controlled |
|--------------|------------|
| No `value` prop (or `value` not tied to state). | `value={stateVariable}`. |
| You might read the value with a ref or on submit. | You read the value from state anytime. |
| Example: `<input type="text" onChange={(e) => setText(e.target.value)} />` without `value={text}`. | Same input but with `value={text}`. |

For forms you want to validate or reset, use controlled inputs.

---

## 7. Forms with Multiple Fields

You can use **one useState per field**:

```javascript
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
```

**Inputs:**

```jsx
<input type="text" value={name} onChange={(e) => setName(e.target.value)} />
<input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
<input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
```

**On submit:** read state, build an object (or send to API), then **reset state** to clear the form:

```javascript
function handleSignup() {
  const userObj = {
    name: name,
    email: email,
    pass: password,
  };
  console.log(userObj); // or send to server

  // Reset form
  setName("");
  setEmail("");
  setPassword("");
}
```

```jsx
<button onClick={handleSignup}>Submit</button>
```

- Resetting state clears the inputs because they are controlled by that state.

---

## 8. Conditional Rendering

You can show or hide UI based on state (or props) using JavaScript expressions inside JSX.

### 8.1 Logical AND (&&)

Use when you want to show **one thing** or **nothing**:

```jsx
{showEmail && <p>{User.email}</p>}
```

- If `showEmail` is **true**, the right side is rendered (the paragraph).
- If `showEmail` is **false**, React renders nothing (and skips the right side).

**Note:** If the left side is `0` or `""`, React will render that. For booleans, `&&` is safe for “show or hide.”

### 8.2 Ternary operator (? :)

Use when you want to choose **between two alternatives**:

```jsx
<p>Age: {User.dob.age} ({User.dob.age >= 18 ? "Adult" : "Minor"})</p>
```

- Condition **true** → “Adult”.
- Condition **false** → “Minor”.

**Another example — conditional style:**

```jsx
backgroundColor: User.gender === "Male" ? "blue" : "pink"
```

### 8.3 Toggle buttons and state

Use boolean state to toggle visibility:

```javascript
const [showEmail, setShowEmail] = useState(false);
```

```jsx
<button onClick={() => setShowEmail(true)}>Show Email</button>
<button onClick={() => setShowEmail(false)}>Hide Email</button>
<p>{showEmail && User.email}</p>
```

---

## 9. Combining Props (or Data) with State

A component can both:

- **Receive data** from outside (e.g. **props** or an imported constant).
- **Own local state** for UI behavior (e.g. show/hide, expanded).

**Example idea (UserCard):**

- **User data**: name, email, age, picture — can come from **props** (e.g. `user`) or from an imported object (e.g. `User` from `user.js`).
- **Local state**: `showEmail` — whether to show the email. This is internal to the component.

```javascript
const [showEmail, setShowEmail] = useState(false);

return (
  <div>
    <p>Name: {User.name.first} {User.name.last}</p>
    {showEmail && <p>{User.email}</p>}
    <button onClick={() => setShowEmail(true)}>Show Email</button>
    <button onClick={() => setShowEmail(false)}>Hide Email</button>
    <p>Age: {User.dob.age} ({User.dob.age >= 18 ? "Adult" : "Minor"})</p>
  </div>
);
```

- **Data** (User) → what to show.
- **State** (showEmail) → how to show it (e.g. hide or show email).

If the user were passed as a **prop** (e.g. `function UserCard({ user })`), you would use `user.name`, `user.email`, etc., instead of `User`.

---

## 10. Rules of Thumb for State

### Do

- **Use the setter** to update state: `setCount(count + 1)`.
- **Keep state in the component that needs it** (or lift it up to a parent if several components need it).
- Use **controlled inputs** when you need to read, validate, or reset form values.
- Use **multiple useState calls** when the values change independently (e.g. name, email, password).

### Don’t

- **Don’t mutate state directly**: e.g. `count = 5` or `user.name = "x"` for state that’s an object. Use the setter (and for objects/arrays, copy then update).
- **Don’t call the setter outside of event handlers or effects** in a way that runs on every render without condition — that can cause an infinite loop.

---

## 11. Immutability (Why We Use Setters)

React compares **previous** and **next** state to decide if it should re-render. If you **mutate** the same object/array in place, the reference doesn’t change and React may not detect the change. So we **replace** state with a new value:

```javascript
// Good: replace with new value
setCount(count + 1);
setName("New Name");
setShowEmail(!showEmail);

// Bad: mutating (don’t do this for state)
// count = count + 1;
// user.email = "new@mail.com";  // if user is state
```

For **objects and arrays** we’ll see later how to update by creating a **copy** and then calling the setter with the new object/array.

---

## 12. Destructuring (Quick Recap)

You’ll often **destructure** props or the result of `useState`:

**useState:**

```javascript
const [count, setCount] = useState(0);
// count and setCount are “destructured” from the array useState returns
```

**Props:**

```javascript
function UserCard({ user }) {
  // user = props.user
}
```

**Object (general JS):**

```javascript
const obj = { name: "Adam", age: 26, phone: 891237897 };
let { name, phone } = obj;
// name === "Adam", phone === 891237897
```

This keeps the code short and clear when you have several props or state variables.

---

## 13. Class 3 Project Structure (Reference)

```
state/
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   ├── components/
│   │   ├── Counter.jsx    # useState: count, text; buttons + input
│   │   ├── Form.jsx       # useState: name, email, password; controlled form; reset
│   │   ├── UserCard.jsx   # useState: showEmail; conditional render; data from user.js
│   │   └── user.js        # exported User object (sample data)
```

---

## 14. Summary Checklist

After Class 3, you should be able to:

- [ ] Explain the difference between **state** and **props**.
- [ ] Use **useState(initialValue)** and the **[value, setValue]** pattern.
- [ ] **Read** state in JSX and **update** it by calling the setter (e.g. in onClick, onChange).
- [ ] Explain that **updating state causes a re-render**.
- [ ] Build **controlled inputs** with `value={state}` and `onChange={(e) => setState(e.target.value)}`.
- [ ] Handle **multiple form fields** with separate state variables and reset them on submit.
- [ ] Use **conditional rendering** with `&&` and ternary (`? :`).
- [ ] Use **boolean state** for toggles (e.g. show/hide email).
- [ ] Combine **data** (props or imported) with **local state** in one component (e.g. UserCard).
- [ ] Avoid **mutating state** directly; use the setter instead.

---

## 15. Quick Reference

| Task | Code / pattern |
|------|-----------------|
| Add state | `const [x, setX] = useState(initial);` |
| Read state | `{x}` in JSX |
| Update state | `setX(newValue)` (e.g. in onClick or onChange) |
| Counter up/down | `setCount(c => c + 1)` or `setCount(count + 1)` |
| Text input (controlled) | `value={text}` + `onChange={(e) => setText(e.target.value)}` |
| Toggle boolean | `setShow(!show)` or `setShow(true)` / `setShow(false)` |
| Show only when true | `{condition && <Component />}` |
| Choose A or B | `{condition ? "A" : "B"}` |
| Reset form | Call setters with initial values (e.g. `setName("")`) |

---

*Next: In later classes you’ll see more hooks (e.g. useEffect), lifting state up, and updating state for objects and arrays.*
