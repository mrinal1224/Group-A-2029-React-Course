
# Class 1: Introduction to React — Assignment Plan (6 Assignments)

These 6 assignments are designed to be solved using **only** what you learned in Class 1: React via CDN (no Vite or build tools). They progress from basic setup to a small composed UI.

---

## Assignment 1: React Setup & First Element

**Objective:** Set up a minimal React page and render one element using `React.createElement` and `ReactDOM.render`.

**Tasks:**
1. Create an HTML file with:
   - React and React-DOM scripts from CDN (use the same URLs as in class).
   - A `<div id="root"></div>` in the body.
2. In a `<script>` tag (no Babel):
   - Get the root element.
   - Create a **paragraph** (`<p>`) with the text: `"My first React element"`.
   - Use `React.createElement("p", null, "My first React element")`.
   - Render it with `ReactDOM.render(..., root)`.

**Deliverable:** One HTML file that, when opened in the browser, shows the paragraph.

**Concepts tested:** CDN setup, root div, `React.createElement`, `ReactDOM.render`.

---

## Assignment 2: Elements with Props and Nested Structure

**Objective:** Use `React.createElement` with **props** (e.g. `style`, `className`) and **nested** children.

**Tasks:**
1. Reuse your Assignment 1 setup (or start from the class `index.html`).
2. Create a **div** that has:
   - `className: "card"` (you can add a simple `<style>` in the page for `.card` if you like).
   - `style: { padding: "20px", backgroundColor: "#f5f5f5", borderRadius: "8px" }`.
3. Give this div **two children**:
   - An **h2** with the text `"Welcome"`.
   - A **p** with the text `"This is built with React.createElement."`.
4. Render this single div (with its nested h2 and p) into the root.

**Deliverable:** One HTML file that shows a styled card-like box with the heading and paragraph inside.

**Concepts tested:** `React.createElement` with props object, nested `React.createElement` as children.

---

## Assignment 3: Button with Click Handler

**Objective:** Add **event handling** using `React.createElement` (no JSX).

**Tasks:**
1. Create a **button** with:
   - Text: `"Click me"`.
   - An **onClick** prop: when clicked, it should `alert("Button clicked!")`.
2. Optionally wrap the button in a div with a short label (e.g. "Assignment 3") and render both into the root.

**Hint:**  
`React.createElement("button", { onClick: function() { alert("Button clicked!"); } }, "Click me")`

**Deliverable:** One HTML file; clicking the button shows the alert.

**Concepts tested:** Props object, `onClick` (camelCase), event handler function.

---

## Assignment 4: Functional Component (Without JSX)

**Objective:** Define a **functional component** and render it using only `React.createElement` (no Babel, no JSX).

**Tasks:**
1. Define a function called **Greeting** that returns a React element:
   - A **div** containing:
     - An **h1** with the text `"Hello, React!"`.
     - A **p** with the text `"This is a functional component."`.
2. Use only `React.createElement` inside the function (no JSX).
3. Render the component with:  
   `ReactDOM.render(React.createElement(Greeting, null), document.getElementById("root"));`

**Deliverable:** One HTML file that shows the heading and paragraph from the Greeting component.

**Concepts tested:** Functional component, returning `React.createElement`, rendering a component with `React.createElement(ComponentName, null)`.

---

## Assignment 5: Babel + JSX — Same UI in JSX

**Objective:** Use **Babel** and **JSX** to build the same (or similar) UI as in Assignment 4.

**Tasks:**
1. In a **new** HTML file:
   - Add the Babel standalone script:  
     `https://unpkg.com/@babel/standalone/babel.min.js`
   - Add React and React-DOM scripts (same as before).
   - Use a `<script type="text/babel">` for your code.
2. Define the **Greeting** component again, but this time using **JSX**:
   - Return a `<div>` containing an `<h1>` and a `<p>` with the same text as in Assignment 4.
3. Render with:  
   `ReactDOM.render(<Greeting />, document.getElementById("root"));`

**Deliverable:** One HTML file that shows the same output as Assignment 4, but written in JSX.

**Concepts tested:** Babel script, `type="text/babel"`, JSX syntax, component as `<Greeting />`.

---

## Assignment 6: Mini Card UI with JSX (Composition)

**Objective:** Build a **small card-style UI** using **JSX**, **functional components**, and **inline styles**.

**Tasks:**
1. Use the same setup as Assignment 5 (Babel + React + React-DOM, `script type="text/babel"`).
2. Create a functional component called **Card** that:
   - Accepts **props** (you can use `title` and `description` for simplicity).
   - Returns a single **div** with:
     - Inline style: e.g. `style={{ padding: "16px", border: "1px solid #ddd", borderRadius: "8px", maxWidth: "300px" }}`.
     - Inside the div: an **h3** showing `title` and a **p** showing `description`.
3. Create a functional component called **App** that returns a **div** containing:
   - A heading (e.g. `<h1>My Cards</h1>`).
   - **Two** `<Card />` components with different `title` and `description` props (e.g. "Card 1" / "First card description" and "Card 2" / "Second card description").
4. Render `<App />` into the root.

**Deliverable:** One HTML file that shows a heading and two styled cards with different titles and descriptions.

**Concepts tested:** JSX, functional components, props (title, description), composition (App using Card), inline styles `style={{ }}`.

---

## Summary Table

| # | Title                          | Main concepts                                      | Output                    |
|---|--------------------------------|----------------------------------------------------|---------------------------|
| 1 | Setup & First Element          | CDN, root, createElement, render                   | One paragraph             |
| 2 | Props & Nested Structure       | createElement with props and nested children        | Styled div with h2 + p    |
| 3 | Button with Click Handler      | onClick, event handling                            | Button that alerts        |
| 4 | Functional Component (No JSX)   | Function component, createElement only             | Greeting component        |
| 5 | Babel + JSX                    | Babel, type="text/babel", JSX, &lt;Greeting /&gt;   | Same as 4, written in JSX |
| 6 | Mini Card UI with JSX          | Components, props, composition, inline styles      | App with two Cards        |

---

## Tips for Students

- **Order:** Do assignments 1 → 6 in order; each builds on the previous.
- **Testing:** Open each HTML file **directly in the browser** (file:// or from a simple local server). No `npm` or build step needed.
- **Reference:** Use the Class 1 study notes and the class `index.html` / `index2.html` as reference.
- **Errors:** If nothing shows, open the browser **Developer Console** (F12) and check for script errors or wrong script order (React and React-DOM before your script; Babel before your script when using JSX).

---
