# Class 1: Introduction to React — Detailed Study Notes

---

## 1. What is React?

**React** is a **JavaScript library** for building user interfaces (UIs), especially for single-page and dynamic web applications. It was created by Facebook (Meta) and is maintained along with the open-source community.

- **Library, not framework**: React focuses on the **view layer** (what the user sees). You combine it with other libraries for routing, state management, etc.
- **Component-based**: UIs are built from reusable pieces called **components**.
- **Declarative**: You describe *what* the UI should look like; React figures out *how* to update the DOM efficiently.

---

## 2. Why React?

| Benefit | Description |
|--------|-------------|
| **Component reusability** | Build once, use many times. Components can be composed to form complex UIs. |
| **Virtual DOM** | React keeps a lightweight copy of the DOM in memory and only updates the real DOM where changes occur, which improves performance. |
| **One-way data flow** | Data flows down from parent to child components, making the app easier to reason about and debug. |
| **Large ecosystem** | Huge community, many libraries, and strong job market demand. |
| **JSX** | Write HTML-like syntax inside JavaScript for a clearer view structure. |

---

## 3. Using React From Scratch (No Build Tool)

You can try React in a plain HTML file by loading scripts from a CDN.

### 3.1 Scripts You Need

```html
<!-- React core library -->
<script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>

<!-- React DOM (for rendering to the browser) -->
<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
```

- **react**: Core React API (e.g. `React.createElement`, concept of components).
- **react-dom**: Connects React to the browser DOM (e.g. `ReactDOM.render`).

### 3.2 Mount Point

You need a real DOM node where React will render your app:

```html
<div id="root"></div>
```

React will replace or manage everything inside this div.

---

## 4. Vanilla DOM vs React

### Vanilla JavaScript (Imperative)

```javascript
let root = document.getElementById("root");
let heading1 = document.createElement("h1");
heading1.innerText = "Hello";
root.appendChild(heading1);
```

You tell the browser **step by step**: get element, create node, set text, append.

### React (Declarative)

```javascript
const root = document.getElementById("root");
const heading1 = React.createElement("h1", { style: { color: "red" } }, "hello");
ReactDOM.render(heading1, root);
```

You describe **what** you want (an `h1` with red text saying "hello"), and React handles creating and updating the DOM.

---

## 5. `React.createElement()`

This is the low-level API React uses to describe UI. You will use it rarely once you use JSX, but it helps to understand it.

### Syntax

```javascript
React.createElement(type, [props], [...children])
```

| Parameter | Meaning |
|----------|--------|
| **type** | Tag name string (e.g. `"div"`, `"h1"`) or a React component (function/class). |
| **props** | Object with attributes: `id`, `className`, `style`, `onClick`, etc. Can be `null` if no props. |
| **children** | Any number of arguments: strings, numbers, or more `React.createElement()` results. |

### Examples

**Simple element:**

```javascript
React.createElement("h1", { style: { color: "red" } }, "hello");
// → <h1 style="color: red">hello</h1>
```

**With multiple props:**

```javascript
React.createElement("div", {
  id: "main-container",
  className: "wrapper",
  style: { padding: "20px", backgroundColor: "#f0f0f0" }
}, "Content here");
```

**Nested elements (children):**

```javascript
React.createElement(
  "div",
  { className: "header" },
  React.createElement("h1", { style: { color: "blue" } }, "Welcome Back"),
  React.createElement("span", null, "User: Admin")
);
```

**Event handlers:**

```javascript
React.createElement(
  "button",
  { onClick: () => alert("Clicked!") },
  "Click Me"
);
```

- Props use **camelCase**: `onClick`, `className`, not `class` or `onclick`.
- `style` is an **object** with camelCase CSS properties (e.g. `backgroundColor`, not `background-color`).

---

## 6. `ReactDOM.render()`

This function **mounts** your React tree into a real DOM node.

```javascript
ReactDOM.render(whatToRender, domNode);
```

- **First argument**: Result of `React.createElement()` (or a component).
- **Second argument**: The DOM element that will contain your app (e.g. `document.getElementById("root")`).

Example:

```javascript
const root = document.getElementById("root");
ReactDOM.render(heading1, root);
```

---

## 7. Functional Components

A **component** is a reusable piece of UI. In modern React, the most common way to define one is a **function** that returns React elements (or JSX).

### Using `React.createElement` (no JSX)

```javascript
function App() {
  return React.createElement("div", null, "Hello from App!");
}
ReactDOM.render(React.createElement(App, null), document.getElementById("root"));
```

### Using JSX (next section)

```javascript
function App() {
  return <div>Hello from App!</div>;
}
ReactDOM.render(<App />, document.getElementById("root"));
```

- **Naming**: Component names start with a **capital letter** (e.g. `App`, `Header`).
- **Usage**: You render them as **tags**: `<App />` (self-closing) or `<App></App>`.

---

## 8. JSX (JavaScript XML)

**JSX** is a syntax extension that lets you write HTML-like tags inside JavaScript. Browsers don’t understand it directly, so it must be **transpiled** to `React.createElement()` calls.

### Why JSX?

- Easier to read and write than long `React.createElement()` chains.
- Looks like the final HTML structure.
- Works well with component composition.

### Enabling JSX in the Browser: Babel

In a simple HTML setup (no build step), you can use **Babel standalone** to compile JSX in the browser:

```html
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
```

Then write your React code in a script with `type="text/babel"`:

```html
<script type="text/babel">
  function App() {
    return (
      <div style={{ color: "blue", margin: "10px" }}>
        <a>Home</a>
        <a>About</a>
        <a>Contact</a>
      </div>
    );
  }
  ReactDOM.render(<App />, document.getElementById("root"));
</script>
```

Babel turns the JSX into `React.createElement()` so the browser can run it.

### JSX Rules and Conventions

| Rule | Example |
|------|--------|
| **One parent** | Return a single top-level element (e.g. one `<div>` or fragment `<>...</>`). |
| **Close all tags** | Use `<br />` or `<img />` for self-closing tags. |
| **`class` → `className`** | Use `className` instead of `class` (it’s a reserved word in JS). |
| **Inline `style` is an object** | `style={{ color: "blue", margin: "10px" }}` — outer `{}` = JS expression, inner `{}` = object. |
| **JavaScript inside JSX** | Use `{ }` for expressions: `<p>{2 + 2}</p>`, `<span>{user.name}</span>`. |
| **Components are Capitalized** | `<App />` is a component; `<div>` is a built-in HTML element. |

### Inline Styles in JSX

In JSX, `style` must be a **JavaScript object** with **camelCase** property names:

```jsx
<div style={{ color: "blue", marginTop: "10px", backgroundColor: "#f0f0f0" }}>
  Content
</div>
```

- First `{ }`: “this is a JavaScript expression.”
- Second `{ }`: “this is an object.”

---

## 9. Quick Reference: DOM vs React

| Concept | Vanilla DOM | React |
|--------|-------------|--------|
| Get container | `document.getElementById("root")` | Same, then pass to `ReactDOM.render` |
| Create element | `document.createElement("h1")` | `React.createElement("h1", props, children)` |
| Set text | `el.innerText = "Hello"` | Pass as child: `React.createElement("h1", null, "Hello")` |
| Set attributes | `el.setAttribute("id", "x")` or `el.id = "x"` | Pass in props object |
| Add to DOM | `root.appendChild(el)` | `ReactDOM.render(reactElement, root)` |
| Event | `el.addEventListener("click", fn)` | `React.createElement("button", { onClick: fn }, "Click")` |

---

## 10. Summary Checklist

After Class 1, you should be able to:

- [ ] Explain what React is and why we use it (components, Virtual DOM, declarative UI).
- [ ] Add React and React-DOM via CDN and use a single root div.
- [ ] Use `React.createElement(type, props, ...children)` for elements and nesting.
- [ ] Use `ReactDOM.render(element, domNode)` to render into the page.
- [ ] Define a simple **functional component** that returns React elements.
- [ ] Use **Babel** in the browser to run **JSX**.
- [ ] Write JSX with correct syntax: one root, `className`, `style` as object, `{ }` for expressions.
- [ ] Differentiate between imperative (vanilla DOM) and declarative (React) code.

---

## 11. Files in This Class

| File | Purpose |
|------|--------|
| **index.html** | React without JSX: `React.createElement`, nested structure, `ReactDOM.render`. |
| **index2.html** | React with JSX and Babel: functional `App` component, inline styles, `<App />`. |

---

*Good luck with your React journey. Next: Class 2 — React build tools (e.g. Vite) and a proper project setup.*
