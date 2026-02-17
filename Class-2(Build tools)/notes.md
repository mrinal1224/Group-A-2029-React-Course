# Class 2: React Build Tools — Detailed Study Notes

---

## 1. Why Use a Build Tool?

In **Class 1** you used React via CDN and Babel in the browser. That approach has limits:

| Limitation | Build-tool approach |
|------------|---------------------|
| **No native ES modules** | You can use `import`/`export` and split code across files. |
| **No JSX without Babel in browser** | JSX is compiled at build time; no runtime Babel script. |
| **Slower development** | Tools like Vite offer **Hot Module Replacement (HMR)** — changes appear instantly without full reload. |
| **No optimization for production** | Build step can **bundle**, **minify**, and **tree-shake** for smaller, faster apps. |
| **Hard to scale** | A real project has many components, assets, and dependencies; a build tool manages them. |

A **build tool** (e.g. Vite, Create React App, Webpack) compiles your source code, resolves imports, and produces files ready for development or production.

---

## 2. What is Vite?

**Vite** (French for “fast”) is a modern front-end build tool created by Evan You (Vue.js author). It is framework-agnostic but has first-class support for React.

### Why Vite?

- **Fast dev server**: Uses native **ES modules** in the browser during development — no bundling step, so startup is very fast.
- **Fast HMR**: Only the changed module is replaced; the rest of the app state can be preserved.
- **Production builds**: Uses **Rollup** under the hood to produce optimized bundles.
- **Simple config**: Minimal `vite.config.js`; sensible defaults.
- **Official React plugin**: `@vitejs/plugin-react` for JSX and Fast Refresh.

### Key concepts

| Term | Meaning |
|------|--------|
| **Dev server** | Serves your app during development with HMR. |
| **Build** | Compiles and bundles the app for production (output usually in `dist/`). |
| **Preview** | Serves the production build locally so you can test it. |

---

## 3. Creating a Vite + React Project

### One-time setup

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
```

- **npm create vite@latest** — Runs the Vite project generator.
- **--template react** — Uses the React template (JSX, React plugin pre-configured).
- **npm install** — Installs dependencies listed in `package.json`.

### Available templates

- `react` — React with JSX (what this class uses).
- `react-ts` — React with TypeScript.
- `react-swc` — React with SWC instead of Babel (faster).
- `vanilla`, `vue`, etc. — Other frameworks or no framework.

---

## 4. Project Structure (vite-project)

```
vite-project/
├── index.html              # Entry HTML; script points to src/main.jsx
├── package.json            # Dependencies and npm scripts
├── vite.config.js          # Vite configuration
├── eslint.config.js        # ESLint rules
├── .gitignore
├── public/                 # Static assets (copied as-is)
│   └── vite.svg
└── src/
    ├── main.jsx            # JavaScript entry; mounts React app
    ├── App.jsx             # Root React component
    ├── App.css             # Styles for App (or global)
    ├── index.css           # Global styles (imported in main.jsx)
    ├── assets/             # Images etc. (processed by Vite)
    │   └── react.svg
    └── components/
        ├── Navbar.jsx
        ├── navbar.css
        ├── Card.jsx
        └── card.css        # or Card.css — match import in Card.jsx
```

### Important points

- **`index.html` is at the root** — In Vite, the HTML file is the entry point; the script tag points to `src/main.jsx`.
- **`src/`** — Source code lives here; Vite resolves `import` from this folder.
- **`public/`** — Files here are served at the root (e.g. `/vite.svg`). Not processed by Vite.
- **`assets/`** — For images/fonts that you `import` in code; Vite can hash filenames and optimize.

---

## 5. package.json — Dependencies and Scripts

### Scripts

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "lint": "eslint .",
  "preview": "vite preview"
}
```

| Script | Command | Purpose |
|--------|---------|--------|
| **dev** | `npm run dev` | Starts Vite dev server (default often `http://localhost:5173`). Use this while coding. |
| **build** | `npm run build` | Produces production build in `dist/`. |
| **preview** | `npm run preview` | Serves the `dist/` folder so you can test the production build. |
| **lint** | `npm run lint` | Runs ESLint to check code quality and catch common mistakes. |

### Dependencies (runtime)

```json
"dependencies": {
  "react": "^19.2.0",
  "react-dom": "^19.2.0"
}
```

- **react** — Core library.
- **react-dom** — Renders React to the DOM. Both are needed in the browser.

### DevDependencies (build and tooling only)

```json
"devDependencies": {
  "@eslint/js": "^9.39.1",
  "@types/react": "^19.2.5",
  "@types/react-dom": "^19.2.3",
  "@vitejs/plugin-react": "^5.1.1",
  "eslint": "^9.39.1",
  "eslint-plugin-react-hooks": "^7.0.1",
  "eslint-plugin-react-refresh": "^0.4.24",
  "globals": "^16.5.0",
  "vite": "^7.2.4"
}
```

| Package | Role |
|---------|------|
| **vite** | Build tool and dev server. |
| **@vitejs/plugin-react** | Enables JSX and React Fast Refresh in Vite. |
| **eslint** + **@eslint/js** | Linting. |
| **eslint-plugin-react-hooks** | Rules for React Hooks (e.g. dependency arrays). |
| **eslint-plugin-react-refresh** | Ensures components work with Vite’s Fast Refresh. |
| **globals** | Browser globals for ESLint. |
| **@types/react** / **@types/react-dom** | TypeScript type definitions (useful even in JS for editor hints). |

### `"type": "module"`

- Makes Node treat `.js` files as **ES modules** (use `import`/`export`).
- Vite and modern React projects use ES modules everywhere.

---

## 6. index.html — Entry Point

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>vite-project</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- **`<div id="root">`** — React will render your app into this element (same idea as Class 1).
- **`<script type="module" src="/src/main.jsx">`** — Loads the app as an ES module. Vite will process `main.jsx` (JSX, imports, etc.). Path is from project root; Vite serves `src/` correctly.

In Vite, **index.html is the entry**, not a random JS file. All other JS/CSS are pulled in via imports from `main.jsx`.

---

## 7. main.jsx — Mounting the React App

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from './App'

createRoot(document.getElementById("root")).render(<App />);
```

### Difference from Class 1: createRoot vs ReactDOM.render

| Class 1 (old API) | Class 2 (current API) |
|-------------------|----------------------|
| `ReactDOM.render(<App />, root)` | `createRoot(root).render(<App />)` |

- **React 18+** uses **createRoot** from `react-dom/client`. The old `ReactDOM.render` is deprecated.
- **createRoot(root)** creates a root for the DOM node; **.render(<App />)** renders your root component into it.

### StrictMode (optional but recommended)

```jsx
import { StrictMode } from "react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- **StrictMode** helps find side effects and deprecated patterns by double-invoking some logic in development. It does not run in production. Often left in even when not actively debugging.

### Imports

- **./index.css** — Global styles applied to the whole app.
- **App** — Default import from `./App.jsx` (extension can be omitted; Vite resolves it).

---

## 8. App.jsx — Root Component and Composition

```jsx
import "./App.css";
import Card from "./components/Card";
import NavBar from "./components/Navbar";

function App() {
  return (
    <div>
      <NavBar />

      <div>
        <Card title="Laptops" content="Apple Macbooks" footerData="Rs 100000" />
        <Card
          title="Headphone"
          content="Bose Headphones"
          footerData="Rs 45000"
        />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default App;
```

### Concepts

- **Composition** — Building the UI from smaller pieces: `NavBar` and multiple `Card` components.
- **Importing components** — Each component lives in its own file and is **default-exported**, then **imported** by name (e.g. `import Card from "./components/Card"`).
- **Props** — Data passed from parent to child: `title`, `content`, `footerData`. `<Card />` with no props uses default behaviour (see next section).
- **Single root** — The return has one top-level `<div>`; all content is inside it.

### File naming

- **.jsx** — Convention for files that contain JSX. Helps tools and developers know the file uses React syntax.

---

## 9. Card Component — Props and Structure

```jsx
import React from "react";
import "./Card.css";

function Card({ title, content, footerData }) {
  return (
    <div className="card">
      <div className="card-title">{title}</div>
      <div className="card-content">{content}</div>
      <div className="card-footer">{footerData}</div>
    </div>
  );
}

export default Card;
```

### Props via destructuring

- **Props** are the single object argument to the function. **Destructuring** in the parameter list: `({ title, content, footerData })` pulls those keys from the props object.
- Equivalent to:
  ```jsx
  function Card(props) {
    const title = props.title;
    const content = props.content;
    const footerData = props.footerData;
    // ...
  }
  ```

### Using props in JSX

- **{title}**, **{content}**, **{footerData}** — JavaScript expressions in JSX. If the parent doesn’t pass a prop (e.g. `<Card />`), that value is `undefined`, and React will render nothing (or you can add default values).

### Default props (optional improvement)

When `<Card />` is used with no props, you might want fallbacks:

```jsx
function Card({ title = "Title", content = "Content", footerData = "—" }) {
  // ...
}
```

Or:

```jsx
Card.defaultProps = {
  title: "Title",
  content: "Content",
  footerData: "—",
};
```

### CSS module scope

- **import "./Card.css"** — The CSS file is bundled by Vite. Class names like `.card` are global unless you use CSS Modules (e.g. `Card.module.css`). So use unique class names (e.g. prefixed) to avoid clashes.

### Export

- **export default Card** — One default export per file. Import with `import Card from "./components/Card"`.

---

## 10. Navbar Component

```jsx
import './navbar.css'

function NavBar() {
  return (
    <nav>
      <a>Home</a>
      <a>About</a>
      <a>Contact</a>
    </nav>
  );
}

export default NavBar
```

- No props — presentational navigation bar.
- **nav** and **a** are semantic HTML; styling is in `navbar.css` (flex layout, colors, hover). For real navigation, you’d use React Router’s `<Link>` or `href` on `<a>`.

---

## 11. Styling — CSS Files and Imports

### Two levels

| Where | File | Imported in | Scope |
|-------|------|-------------|--------|
| Global | `index.css` | `main.jsx` | Whole app |
| Component | `App.css`, `navbar.css`, `card.css` | `App.jsx`, `Navbar.jsx`, `Card.jsx` | Global by default; apply classes only where you use them |

### How it works

- In a component file: `import "./Card.css";`. Vite includes that CSS in the bundle. Any element with `className="card"` (and other classes defined in that file) gets the styles.
- Class names are **global** unless you switch to **CSS Modules** (e.g. `Card.module.css` and `import styles from "./Card.module.css"` then `className={styles.card}`).

### Naming convention

- Use a clear, unique prefix (e.g. `.card`, `.card-title`) or BEM-style names to avoid conflicts. Matching file name case to the import (e.g. `Card.css` and `import "./Card.css"`) avoids issues on case-sensitive systems.

---

## 12. vite.config.js — Vite Configuration

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

- **defineConfig** — TypeScript/editor support and validation for the config object.
- **plugins: [react()]** — Enables the official React plugin: JSX transformation and **Fast Refresh** (component state preserved when you edit and save).

You can add more options later (e.g. `base`, `resolve.alias`, `server.port`, `build.outDir`).

---

## 13. ESLint — Code Linting

```javascript
// eslint.config.js (flat config format)
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
```

### What ESLint does

- **Linting** — Flags potential bugs, bad patterns, and style issues (e.g. unused variables, missing hook dependencies).
- **Flat config** — New ESLint config format (single array of config objects).
- **globalIgnores(['dist'])** — Don’t lint the build output.
- **files: ['**/*.{js,jsx}']** — Apply to all JS/JSX files.
- **react-hooks** — Enforces Rules of Hooks (you’ll use these in later classes).
- **react-refresh** — Keeps Fast Refresh working (e.g. components must be named and exported in a way the plugin can understand).
- **varsIgnorePattern: '^[A-Z_]'** — Allows unused variables that start with a capital letter or underscore (e.g. React components or placeholders).

Run with: **npm run lint**.

---

## 14. .gitignore — What Not to Commit

- **node_modules/** — Installed dependencies (reinstall with `npm install`).
- **dist/** — Production build output (rebuilt with `npm run build`).
- ***.local** — Local env files (often secrets).
- **.env**, **.DS_Store**, editor/IDE folders — Common to leave out of version control.

---

## 15. Development Workflow

1. **Start dev server**: `npm run dev` → open the URL (e.g. http://localhost:5173).
2. **Edit** `src/` files → browser updates automatically (HMR).
3. **Lint**: `npm run lint` to check for issues.
4. **Production build**: `npm run build` → output in `dist/`.
5. **Test production**: `npm run preview` → serves `dist/` locally.

---

## 16. Class 1 vs Class 2 — Quick Comparison

| Topic | Class 1 | Class 2 |
|-------|--------|--------|
| React setup | CDN scripts in HTML | npm + Vite, `import` React |
| JSX | Babel in browser (`type="text/babel"`) | Built by Vite (no Babel in browser) |
| Entry | Single HTML + inline script | index.html + src/main.jsx |
| Rendering | ReactDOM.render | createRoot(...).render |
| Structure | One or two files | Many files: main, App, components |
| Styling | Inline or one CSS file | index.css + CSS per component |
| Components | One function (e.g. App) | Multiple components, composition, props |
| Build | None | `npm run build` → dist/ |
| Dev experience | Refresh page | HMR, Fast Refresh |

---

## 17. Summary Checklist

After Class 2, you should be able to:

- [ ] Explain why we use a build tool (modules, JSX, HMR, production bundles).
- [ ] Create a new Vite + React project with `npm create vite@latest`.
- [ ] Describe the role of `index.html`, `main.jsx`, and `App.jsx` in the Vite setup.
- [ ] Use **createRoot** from `react-dom/client` to mount the app (React 18+).
- [ ] Import and use components (e.g. `NavBar`, `Card`) inside another component.
- [ ] Pass **props** into a component and use them (including destructuring).
- [ ] Attach CSS files to components with `import "./Component.css"` and use `className`.
- [ ] Run **npm run dev**, **npm run build**, **npm run preview**, and **npm run lint**.
- [ ] Explain the role of `vite.config.js` and the `react()` plugin.
- [ ] Know what ESLint is for and that the project uses React Hooks and React Refresh rules.

---

## 18. Files in This Class (Reference)

| File | Purpose |
|------|--------|
| **index.html** | Entry HTML; root div and script to `src/main.jsx`. |
| **package.json** | Scripts, dependencies, devDependencies, `"type": "module"`. |
| **vite.config.js** | Vite config with React plugin. |
| **eslint.config.js** | ESLint flat config for JS/JSX, React Hooks, React Refresh. |
| **src/main.jsx** | Imports React, createRoot, index.css, App; mounts `<App />`. |
| **src/App.jsx** | Root component; composes NavBar and multiple Cards with props. |
| **src/App.css** | (Optional) styles for App. |
| **src/index.css** | Global styles. |
| **src/components/Navbar.jsx** | Navigation bar component; uses navbar.css. |
| **src/components/navbar.css** | Nav layout and link styles. |
| **src/components/Card.jsx** | Card component with title, content, footerData props; uses Card.css. |
| **src/components/card.css** | Card layout and hover styles. |

---

*Next step: practice by adding a new component, passing more props, or trying CSS Modules. Then move on to state and hooks in later classes.*
