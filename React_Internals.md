

---

# How React Works Behind the Scenes

## 1. Why plain DOM manipulation started becoming painful

Before React, developers mostly built interactive UIs by directly manipulating the **DOM** using browser APIs like:

```js
document.getElementById()
element.innerText = ...
element.appendChild(...)
element.remove()
element.classList.add(...)
```

This works fine for small pages. But as applications became larger, more interactive, and state-heavy, direct DOM programming became hard to manage. React exists to help developers describe **what the UI should look like for a given state**, while React figures out **how to update the real DOM efficiently**. ([React][1])

## 2. What was wrong with the DOM?

Important point: the DOM itself is not “bad.”
The problem is that **manual DOM updates become expensive and error-prone when the UI becomes complex**.

### A. DOM operations are relatively expensive

The browser DOM is not just a JavaScript object tree. It is tied to browser rendering systems. When DOM nodes change, the browser may need to do extra work like:

* recalculating styles
* recalculating layout
* repainting pixels
* compositing layers

So changing the DOM repeatedly and unnecessarily can hurt performance, especially in large trees or frequent updates. React’s core value is that later renders use a DOM diffing process to update efficiently instead of replacing everything blindly. ([React][2])

### B. Manual UI syncing becomes difficult

Imagine a shopping cart page:

* cart item count in navbar
* cart list in body
* total price at bottom
* discount badge
* checkout button enabled/disabled

If state changes, you must manually update all these places correctly. In plain DOM code, developers often end up scattering update logic everywhere.

### C. State and UI easily drift apart

You may change a variable in JavaScript but forget to update some DOM node.
Or update the DOM but not update your internal state properly.

This creates bugs like:

* stale UI
* duplicate nodes
* inconsistent counts
* wrong button state
* memory leaks from forgotten listeners

### D. Repeated updates can cause unnecessary work

Suppose a user types into an input and every keystroke causes many independent DOM changes. If your code mutates DOM piece by piece, you may force the browser to do more work than needed.

---

# 3. Real example: the pain of manual DOM

Imagine a counter app in plain JavaScript:

```html
<h1 id="count">0</h1>
<button id="inc">Increment</button>
```

```js
let count = 0;

const countEl = document.getElementById("count");
const incBtn = document.getElementById("inc");

incBtn.addEventListener("click", () => {
  count++;
  countEl.innerText = count;
});
```

Still easy.

Now imagine the app grows:

* show count in 3 places
* disable button at max count
* log history
* animate updates
* show warning after 10
* sync with server
* preserve state while switching sections

Now the problem is not just “update text.”
The problem becomes **managing UI as a function of changing application state**.

That is the gap React solves.

---

# 4. Why React was introduced

React was introduced to make UI development more **declarative**.

Instead of telling the browser step by step:

* create this node
* remove this node
* move this node
* change that class
* update this text

you tell React:

> “For this state, the UI should look like this.”

Then React computes the minimal changes needed to bring the real DOM in sync. React components are functions or classes that return React elements, which are descriptions of what should be rendered. The reconciler then recursively determines what each component renders and updates the UI tree accordingly. ([React][3])

---

# 5. The big mental model of React

React works in this broad flow:

### Step 1: State or props change

A user clicks a button, types into an input, receives data from an API, etc.

### Step 2: React re-renders components

React calls your component functions again to compute what the UI should look like now. React documents this as the **render** phase. ([React][4])

### Step 3: React compares old and new output

React compares the previous tree of elements with the new tree. This is the basis of **reconciliation** and **diffing**. ([React][5])

### Step 4: React updates the real DOM efficiently

Only the necessary DOM changes are committed. React describes this as the **commit** phase. ([React][4])

---

# 6. What is the Virtual DOM?

The phrase “Virtual DOM” is often oversimplified.

## Correct intuition

The Virtual DOM is a **JavaScript representation of the UI**.

When your component returns JSX like this:

```jsx
function App() {
  return <h1>Hello</h1>;
}
```

that JSX becomes a React element object, a lightweight description of what should appear on screen. React’s implementation notes explicitly describe elements like `<App />` as plain objects describing what to render. ([React][3])

A simplified mental model:

```js
{
  type: "h1",
  props: {
    children: "Hello"
  }
}
```

This is not the real DOM node.
It is a description of the UI.

## Why this helps

Because React can compare two lightweight descriptions in JavaScript first, and only then touch the real DOM where necessary.

---

# 7. Real example of Virtual DOM thinking

Suppose first render returns:

```jsx
<h1>Hello</h1>
```

Later, after state change, it returns:

```jsx
<h1>Hello Mrinal</h1>
```

React compares:

Old:

```js
{ type: "h1", props: { children: "Hello" } }
```

New:

```js
{ type: "h1", props: { children: "Hello Mrinal" } }
```

It sees:

* same element type: `h1`
* only text child changed

So it updates only the text in the real DOM.

That is the key idea:
**React does not rebuild everything blindly.**

---

# 8. Render phase vs Commit phase

This is one of the most important ideas.

## Render phase

React figures out what the UI should look like.
This means calling components and producing element trees. React’s docs describe state updates as queueing a render. ([React][4])

## Commit phase

React applies the final changes to the real DOM. ([React][4])

### Simple analogy

Render phase = architect prepares updated blueprint
Commit phase = workers actually modify the building

React tries to keep expensive DOM work in the commit phase as small as possible.

---

# 9. Reconciliation: what it actually means

**Reconciliation** is React’s process of comparing the old tree and the new tree to determine what must change. React’s official reconciliation docs describe it as the algorithm React uses to diff one tree with another and decide controlled updates. ([React][5])

When state changes, React does **not** compare raw HTML strings.
It compares **element trees**.

For example:

Old tree:

```jsx
<div>
  <h1>Hello</h1>
  <p>Count: 1</p>
</div>
```

New tree:

```jsx
<div>
  <h1>Hello</h1>
  <p>Count: 2</p>
</div>
```

React sees:

* root `div` is same
* `h1` is same
* `p` is same type
* text inside `p` changed

So only the text node needs update.

---

# 10. Why React needs a diffing algorithm

A perfect comparison of two arbitrary trees can be very expensive. React’s reconciliation docs explain that general tree-diffing algorithms can be too costly, and React uses heuristics to make the process practical. ([React][5])

React’s diffing is based on a couple of important assumptions.

## Assumption 1: Elements of different types produce different trees

Example:

Old:

```jsx
<div />
```

New:

```jsx
<span />
```

Different type means React throws away the old subtree and builds a new one. The reconciliation docs state that when root element types differ, React tears down the old tree and builds the new one from scratch. ([React][5])

## Assumption 2: Developers can hint stable identity using `key`

When rendering lists, keys tell React which child corresponds to which previous child. React’s docs on preserving and resetting state explain that identity depends on position in the tree, and keys help control whether state is preserved or reset. ([React][6])

---

# 11. Diffing algorithm in detail

## Case 1: Different root element types

Old:

```jsx
<div>
  <Counter />
</div>
```

New:

```jsx
<span>
  <Counter />
</span>
```

Since `div` and `span` are different types, React destroys the old subtree and mounts a new one. State under that subtree is lost. This behavior is documented in React’s reconciliation docs. ([React][5])

## Case 2: Same DOM element type

Old:

```jsx
<div className="box" />
```

New:

```jsx
<div className="box active" />
```

Same type: `div`
React keeps the existing DOM node and updates only changed attributes. React’s reconciliation docs describe this same-type behavior for DOM elements. ([React][5])

## Case 3: Same component type

Old:

```jsx
<UserCard name="Mrinal" />
```

New:

```jsx
<UserCard name="Rahul" />
```

React keeps the same component instance/identity and re-renders it with new props, instead of unmounting and remounting, as long as the type and identity are preserved. This is consistent with React’s state preservation rules. ([React][6])

## Case 4: Children lists

Old:

```jsx
<ul>
  <li>A</li>
  <li>B</li>
</ul>
```

New:

```jsx
<ul>
  <li>A</li>
  <li>B</li>
  <li>C</li>
</ul>
```

This is easy. React matches first two, inserts third.

But consider:

Old:

```jsx
<ul>
  <li>A</li>
  <li>B</li>
</ul>
```

New:

```jsx
<ul>
  <li>B</li>
  <li>A</li>
</ul>
```

Without keys, React may compare by position and do more work than needed or preserve the wrong state for list items. With keys, React can track identity more accurately. React’s docs explicitly tie identity and state preservation to keys and positions in the tree. ([React][6])

---

# 12. Why `key` is so important

A `key` is not for removing warnings only.
It is about **identity**.

Example:

```jsx
{users.map(user => (
  <UserCard key={user.id} user={user} />
))}
```

Here React understands:

* this `UserCard` for user 7 is the same conceptual node as before
* if order changes, keep its state with the right item

Without stable keys:

* state may stick to wrong item
* inputs may jump
* performance can suffer
* reordering becomes confusing

React documents that keys help determine whether state is preserved or reset. ([React][6])

---

# 13. Is Virtual DOM the reason React is fast?

Not fully.

This is a very common misunderstanding.

React is not fast merely because it has a “virtual DOM.”
The real strength is:

* declarative update model
* efficient diffing heuristics
* batching of updates
* controlled commit phase
* component-based structure
* Fiber scheduling and prioritization

The Virtual DOM is just one part of the system.

---

# 14. Batch processing / batching in React

When multiple state updates happen close together, React can **batch** them so it does not re-render after every single update.

React’s docs state that React batches state updates and updates the screen after event handlers have run. ([React][7])

## Example

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  }

  return <button onClick={handleClick}>{count}</button>;
}
```

A beginner expects `+3`.
But each call sees the same render snapshot value of `count`, so this does not behave like three independent DOM updates. React queues the updates and processes them after the handler. React explains this with state as a snapshot and queued updates. ([React][7])

To truly apply successive updates based on previous state:

```jsx
setCount(c => c + 1);
setCount(c => c + 1);
setCount(c => c + 1);
```

Then React can process them as:

* 0 → 1
* 1 → 2
* 2 → 3

## Why batching is useful

Without batching:

* React may render many times in one event
* DOM updates could happen repeatedly
* performance drops

With batching:

* React groups updates
* computes one final consistent UI
* commits efficiently

---

# 15. Simple real-world batching example

Suppose on one button click you do:

```jsx
setUser(newUser);
setCart(newCart);
setTheme("dark");
```

React does not want to:

* render once for `user`
* then again for `cart`
* then again for `theme`

Instead, it batches them so the UI updates in a more efficient combined pass. React explicitly documents batching as preventing multiple re-renders during a single event. ([React][8])

---

# 16. Why old React architecture had limits

Before Fiber, React’s reconciliation was more synchronous and harder to interrupt.
That meant if a render/update was large, React could spend too long working before giving control back to the browser.

This is where **Fiber architecture** became important.

React’s official internals FAQ states that Fiber is the reconciliation engine introduced in React 16, and its main goal is to enable **incremental rendering** of the virtual DOM. ([React][9])

---

# 17. What is Fiber architecture?

Fiber is React’s internal reconciliation engine.

You can think of Fiber as a redesign of how React represents work and schedules rendering work.

## Main goal of Fiber

To break rendering work into smaller units so React can:

* pause work
* continue later
* prioritize urgent updates
* avoid blocking the main thread too long

React’s docs on Fiber explicitly mention incremental rendering as the main goal. ([React][9])

---

# 18. Why Fiber was needed

Imagine a huge app:

* typing in a search bar
* rendering a 10,000 item filtered list
* updating an animation
* showing notifications
* loading a panel in background

Not all updates are equally urgent.

### Urgent update

Typing in input should feel instant.

### Less urgent update

Rendering a huge sidebar can happen slightly later.

Fiber helps React prioritize this kind of work more intelligently.

---

# 19. Fiber mental model

Each React element/component corresponds internally to a **Fiber node**.

A Fiber node stores information like:

* component type
* props
* state
* parent/child/sibling links
* pending work
* side effects to commit

So instead of treating the whole tree as one big recursive synchronous task, React can process it as many smaller linked units of work.

---

# 20. Why Fiber is powerful

## A. Incremental rendering

React can split work into chunks instead of doing all rendering in one long blocking operation. Fiber’s purpose is explicitly described as enabling incremental rendering. ([React][9])

## B. Prioritization

Some updates matter more than others.

* typing: high priority
* background rendering: lower priority

## C. Better user experience

The browser gets chances to handle:

* input
* paint
* animation
* other urgent tasks

instead of being blocked by one giant synchronous render.

---

# 21. Fiber and the two phases again

Fiber makes the render phase more flexible.

## Render phase in Fiber

React can build work, compare trees, and prepare effects. This work can be split and scheduled.

## Commit phase in Fiber

Once React is ready, it performs the actual DOM mutations. The commit phase is where visible changes happen. React’s render-and-commit docs are the clearest official framing for this two-step model. ([React][4])

Important:
The **commit phase must be consistent and atomic enough for the user to not see half-finished UI**.

---

# 22. A practical analogy for Fiber

Think of old rendering like writing an entire exam answer in one sitting without stopping.

Fiber is like writing in chunks:

* do one chunk
* check urgency
* maybe switch to a more important task
* come back and continue

That makes React more responsive under heavy workloads.

---

# 23. DOM vs React summary with one real example

## Plain DOM approach

Imagine a todo app where adding one item requires:

* create `li`
* set text
* attach delete listener
* append node
* update total count
* update empty-state message
* maybe sort the list
* maybe save to local storage

You manually coordinate everything.

## React approach

You update the state:

```jsx
setTodos([...todos, newTodo]);
```

Then React:

* re-renders component tree
* creates new element descriptions
* diffs old and new trees
* updates only what changed
* preserves or resets state based on type and key
* batches related work
* schedules render work through Fiber

That is the behind-the-scenes power.

---

# 24. Important misconceptions to clear while teaching

## Misconception 1: “React updates the whole DOM every time”

No. React may re-render components logically, but during commit it updates only the changed parts of the real DOM based on reconciliation and diffing. ([React][4])

## Misconception 2: “Re-render means repaint”

No. Re-render in React means component functions run again to produce a new UI description. That does not automatically mean the whole DOM is rebuilt or the whole screen repaints. React then decides what real DOM work is actually needed. ([React][4])

## Misconception 3: “Virtual DOM replaces the real DOM”

No. The Virtual DOM is a JavaScript representation. The browser still displays the **real DOM**. React uses the virtual representation to decide efficient updates. ([React][3])

## Misconception 4: “Keys are only for warnings”

No. Keys are essential for identity, especially in lists and state preservation. ([React][6])

---

# 25. Flow

## Part 1: Start with the DOM

Understand in this Manner:

* DOM is a tree of nodes
* browser uses it to represent page structure
* changing DOM can trigger costly browser work
* manual UI sync becomes hard at scale

## Part 2: See the main problem

In complex apps, the hardest part is not making UI once.
It is **keeping UI synced with state over time**.

## Part 3: See React

React says:

> UI = f(state)

Meaning:
Given the current state, React computes what UI should be shown.

## Part 4: Understand Virtual DOM

JS objects describe UI.
React compares previous and next descriptions before touching real DOM.

## Part 5: Understand reconciliation and diffing

React compares trees:

* different types → replace subtree
* same type → update in place
* lists depend on keys

## Part 6: Explain batching

Multiple state updates are grouped to avoid unnecessary renders and DOM work.

## Part 7: Explain Fiber

Fiber is the internal engine that makes rendering more interruptible, schedulable, and priority-aware, especially for large apps. ([React][9])

---

# 26. One final end-to-end example

Suppose this component:

```jsx
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Counter</h1>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

When button is clicked:

### Step 1

`setCount(count + 1)` queues an update. React documents this as queueing a render. ([React][4])

### Step 2

React re-runs `App()` to get the new tree.

Old tree:

```jsx
<div>
  <h1>Counter</h1>
  <p>0</p>
  <button>Increment</button>
</div>
```

New tree:

```jsx
<div>
  <h1>Counter</h1>
  <p>1</p>
  <button>Increment</button>
</div>
```

### Step 3

Reconciliation compares both trees.

* `div` same
* `h1` same
* `button` same
* only `p` text changed

### Step 4

Commit phase updates only the `p` text node in the real DOM. ([React][4])

That is React internals in action at a beginner-to-intermediate level.

---

# 27. Final takeaway

React was introduced because building large interactive UIs with direct DOM manipulation becomes difficult to reason about and maintain. React solves this by letting developers describe UI declaratively, then internally using element trees, reconciliation, diffing heuristics, batched updates, and Fiber-based scheduling to keep the real DOM in sync efficiently. ([React][1])



[1]: https://react.dev/?utm_source=chatgpt.com "React"
[2]: https://legacy.reactjs.org/docs/react-dom.html?utm_source=chatgpt.com "ReactDOM"
[3]: https://legacy.reactjs.org/docs/implementation-notes.html?utm_source=chatgpt.com "Implementation Notes"
[4]: https://react.dev/learn/render-and-commit?utm_source=chatgpt.com "Render and Commit"
[5]: https://legacy.reactjs.org/docs/reconciliation.html?utm_source=chatgpt.com "Reconciliation"
[6]: https://react.dev/learn/preserving-and-resetting-state?utm_source=chatgpt.com "Preserving and Resetting State"
[7]: https://react.dev/learn/queueing-a-series-of-state-updates?utm_source=chatgpt.com "Queueing a Series of State Updates"
[8]: https://react.dev/reference/react/useState?utm_source=chatgpt.com "useState"
[9]: https://legacy.reactjs.org/docs/faq-internals.html?utm_source=chatgpt.com "Virtual DOM and Internals"
