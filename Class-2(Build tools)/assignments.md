# Class 2: React Build Tools — Assignment Plan (6 Assignments)

These 6 assignments use the **Vite + React** setup from Class 2. Students need Node.js and npm installed. Each assignment builds on the previous one; they can use the class `vite-project` as a starting point or create a new Vite app.

---

## Assignment 1: Create Project & Run Scripts

**Objective:** Create a new Vite + React project from scratch and run all standard npm scripts.

**Tasks:**
1. Create a new React app named **my-react-app** (or any name) using:
   ```bash
   npm create vite@latest my-react-app -- --template react
   ```
2. Go into the project folder and install dependencies:
   ```bash
   cd my-react-app
   npm install
   ```
3. Run each of these and briefly note what happens:
   - **npm run dev** — Open the URL in the browser; make a small change in `src/App.jsx` and confirm the page updates (HMR).
   - **npm run build** — Check that a **dist** folder is created with HTML and JS/CSS assets.
   - **npm run preview** — Serve the production build and open the URL; confirm the app works.
   - **npm run lint** — Fix any ESLint errors if the template reports them.



**Concepts tested:** Creating a Vite project, `npm install`, `dev` / `build` / `preview` / `lint` scripts, HMR.

---

## Assignment 2: Entry Point & Your First Component

**Objective:** Understand the entry flow (index.html → main.jsx → App) and add a simple custom component.

**Tasks:**
1. In your Vite project, open **index.html** and **src/main.jsx**. Write one sentence each: what is the role of `index.html`? What does `main.jsx` do?
2. In **src/App.jsx**, keep the existing content but add a **new component**:
   - Create a function component named **WelcomeMessage** in the same file (or in a new file `src/components/WelcomeMessage.jsx` and import it).
   - It should return a single `<h2>` with the text: `"Welcome to my React app"`.
3. In **App**, render **WelcomeMessage** above or below any existing content (e.g. above the default Vite content).
4. Run **npm run dev** and confirm the heading appears.

**Deliverable:** Updated `App.jsx` (and optional `WelcomeMessage.jsx`). Short answers for the roles of index.html and main.jsx.

**Concepts tested:** index.html as entry, main.jsx mounting the app, defining a component, importing and rendering a component in App.

---

## Assignment 3: Component with Props

**Objective:** Create a reusable component that accepts **props** and use it multiple times with different data.

**Tasks:**
1. Create a new component **Product** (in `src/components/Product.jsx`):
   - It should accept props: **name** and **price** (both strings or numbers are fine).
   - Render a **div** that shows:
     - The product **name** in a heading (e.g. `<h3>`).
     - The product **price** in a paragraph (e.g. "Price: Rs 500").
2. In **App.jsx**, import **Product** and render it **at least 3 times** with different `name` and `price` props (e.g. "Laptop" / "Rs 80000", "Mouse" / "Rs 1500", "Keyboard" / "Rs 3500").
3. Run **npm run dev** and **npm run lint**. Ensure there are no lint errors.

**Deliverable:** `src/components/Product.jsx` and updated `App.jsx` showing three products.

**Concepts tested:** Functional component, props (destructuring or `props.name`), reusing a component with different props.

---

## Assignment 4: Component with Its Own CSS File

**Objective:** Attach a **dedicated CSS file** to a component and use **className** for styling.

**Tasks:**
1. Create a component **Button** in `src/components/Button.jsx`:
   - It accepts an optional prop **label** (default: `"Click"`).
   - It returns a `<button className="custom-btn">` with the label text inside.
2. Create **src/components/Button.css** (or button.css — match the import):
   - Style `.custom-btn` with: padding (e.g. 10px 20px), background color, border, border-radius, cursor pointer. Add a **:hover** style (e.g. darker background or underline).
3. In **Button.jsx**, import the CSS: `import "./Button.css";` (or `./button.css` to match your filename).
4. In **App.jsx**, import **Button** and render it 1–2 times (with and without a custom `label` prop if you implemented default).
5. Run the app and confirm the button looks styled and hover works.

**Deliverable:** `Button.jsx`, `Button.css`, and updated `App.jsx`.

**Concepts tested:** Component-specific CSS file, `import "./Component.css"`, `className`, default prop (optional).

---

## Assignment 5: Composition — Layout with Multiple Components

**Objective:** Build a small **layout** by composing several components (e.g. header, list, or card grid).

**Tasks:**
1. Create a **Header** component (`src/components/Header.jsx`):
   - Accepts a prop **title** (e.g. "My Shop").
   - Renders a header area (e.g. `<header>` with an `<h1>` showing the title). You can add a simple CSS file for Header or use inline styles.
2. Create a **Footer** component (`src/components/Footer.jsx`):
   - Renders a footer with a short line of text (e.g. "© 2025 My React App"). No props required.
3. In **App.jsx**:
   - Use the existing **Product** component (from Assignment 3) or a simple **Card**-like component.
   - Compose the page: **Header** at top (with a title prop), then a **div** containing two or three **Product** (or Card) items, then **Footer** at the bottom.
4. The final page should show: Header → content area with products/cards → Footer. Run **npm run dev** and **npm run lint**.

**Deliverable:** `Header.jsx`, `Footer.jsx`, and updated `App.jsx` with the composed layout.

**Concepts tested:** Composition, multiple components in one page, props for configurable content (e.g. Header title).

---

## Assignment 6: Build, Preview & Customize

**Objective:** Run a **production build**, **preview** it, and make a small **customization** to the project config or assets.

**Tasks:**
1. **Build for production:**
   - Run **npm run build**.
   - Confirm the **dist** folder exists and contains `index.html` and assets (e.g. in `dist/assets/`).
2. **Preview the build:**
   - Run **npm run preview** and open the URL. Confirm the app looks and works the same as in dev (all your components and styles load).
3. **Customize one of the following** (pick at least one):
   - **Option A:** Change the **page title**: In **index.html**, change `<title>...</title>` to your app name (e.g. "My React Shop"). Rebuild and preview to confirm.
   - **Option B:** Add a **favicon**: Place an image (e.g. `favicon.ico` or a `.svg`) in the **public** folder and update the `<link rel="icon">` in index.html to point to it. Rebuild and preview.
   - **Option C:** **Vite config**: In **vite.config.js**, add a custom **server port** (e.g. `server: { port: 3000 }`). Run `npm run dev` and confirm the app runs on that port.
4. Run **npm run lint** one more time and fix any remaining issues.

**Deliverable:** Confirmation that build and preview work; a short note or screenshot of your customization (title, favicon, or port). Optionally, list the contents of `dist/` (or a screenshot).

**Concepts tested:** `npm run build`, `npm run preview`, `dist/` output, index.html title or public assets, optional vite.config.js change.

---

## Summary Table

| # | Title | Main concepts | Deliverable |
|---|--------|----------------|-------------|
| 1 | Create project & run scripts | Vite create, npm scripts (dev/build/preview/lint), HMR | Notes/screenshots |
| 2 | Entry point & first component | index.html, main.jsx, custom component in App | App + short answers |
| 3 | Component with props | Product component, name/price props, reuse in App | Product.jsx, App.jsx |
| 4 | Component with CSS file | Button component, Button.css, import, className | Button.jsx, Button.css, App.jsx |
| 5 | Composition — layout | Header, Footer, Product/Card; compose in App | Header, Footer, App.jsx |
| 6 | Build, preview & customize | build, preview, title/favicon/port | Build + customization proof |

---

## Tips for Students

- **Order:** Do assignments 1 → 6 in order. You can use the class **vite-project** as the base for 2–6, or start from Assignment 1 with a new project.
- **Paths:** When creating new components, put them in **src/components/** and use `import Component from "./components/Component"` (or relative path from App).
- **Lint:** Run **npm run lint** after each assignment and fix errors (e.g. unused variables, missing keys in lists — we’ll cover keys later).
- **Reference:** Use the Class 2 study notes and the existing **Navbar** and **Card** components in the class project as examples.

---
