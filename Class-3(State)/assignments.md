# Class 3: State — Assignments (6)

Each assignment has a **problem statement**, a **clear ask**, and a **code stub**. Copy the stub into your project (or use the provided file in `assignment-stubs/`), then complete the parts marked with `// TODO` or `...` with your solution.

**Setup:** Use your Class 3 Vite project (`state/`). Create new components in `src/components/` and render them from `App.jsx` to test.

---

## Assignment 1: Counter

### Problem statement

Build a simple counter component. The user should see a number and two buttons: one to increase the count by 1 and one to decrease it by 1. The displayed number must update when the buttons are clicked.

### Ask

1. Use **useState** to store the count. Initial value must be **0**.
2. Display the current count in an **h1** (or similar).
3. Provide an **Increment** button that increases the count by 1.
4. Provide a **Decrement** button that decreases the count by 1.
5. Complete the code stub below (or use `assignment-stubs/Assignment1-Counter.jsx`).

### Code stub

```jsx
import React from "react";
// TODO: Import useState from "react"

function Counter() {
  // TODO: Declare state for count with initial value 0
  // const [count, setCount] = ...

  return (
    <div>
      {/* TODO: Add Increment button - onClick should increase count by 1 */}
      <button>Increment</button>

      {/* TODO: Display the current count in an h1 */}
      <h1>{/* count here */}</h1>

      {/* TODO: Add Decrement button - onClick should decrease count by 1 */}
      <button>Decrement</button>
    </div>
  );
}

export default Counter;
```

---

## Assignment 2: Controlled Text Input (Single Field)

### Problem statement

Build a component with a single text input. Whatever the user types should appear **below** the input in real time. The input is “controlled”: its value is driven by React state.

### Ask

1. Use **useState** to store the text. Initial value should be an empty string **""**.
2. Render an **input** (type="text") that is **controlled**: its `value` must be the state variable, and `onChange` must update that state with `e.target.value`.
3. Below the input, display the current text (e.g. in a **p** or **h4**).
4. Complete the code stub below (or use `assignment-stubs/Assignment2-TextDisplay.jsx`).

### Code stub

```jsx
import React from "react";
// TODO: Import useState from "react"

function TextDisplay() {
  // TODO: Declare state for the input text (initial value: "")

  return (
    <div>
      <label>Type something: </label>
      {/* TODO: Controlled input - value and onChange */}
      <input type="text" />

      {/* TODO: Display the current text below the input */}
      <p>You typed: {/* show state value here */}</p>
    </div>
  );
}

export default TextDisplay;
```

---

## Assignment 3: Toggle Visibility (Boolean State)

### Problem statement

Build a component that shows a short message (e.g. “Hello! This is visible.”). Add a button that **toggles** whether the message is visible or hidden. Use a boolean state variable.

### Ask

1. Use **useState** with a **boolean** (initial value **false**).
2. Render the message **only when** the boolean is true. Use conditional rendering: `{condition && <p>...</p>}`.
3. Add a single button (e.g. “Show / Hide” or “Toggle”). When clicked, it should **toggle** the boolean (true → false, false → true). Hint: `setVisible(!visible)`.
4. Complete the code stub below (or use `assignment-stubs/Assignment3-Toggle.jsx`).

### Code stub

```jsx
import React from "react";
// TODO: Import useState from "react"

function Toggle() {
  // TODO: Declare boolean state (e.g. visible / isVisible) with initial value false

  return (
    <div>
      {/* TODO: Button that toggles the boolean state on click */}
      <button>Toggle visibility</button>

      {/* TODO: Conditionally render the message only when state is true */}
      {/* e.g. {visible && <p>Hello! This is visible.</p>} */}
    </div>
  );
}

export default Toggle;
```

---

## Assignment 4: Simple Form (Two Fields + Reset)

### Problem statement

Build a small form with **Name** and **Email** fields. Both inputs must be **controlled**. When the user clicks **Submit**, log the name and email to the console (as an object) and **clear both fields** by resetting state.

### Ask

1. Use **two** useState variables: one for name, one for email. Initial values: empty strings.
2. Both inputs must be **controlled**: `value={state}` and `onChange={(e) => setState(e.target.value)}`.
3. Add a **Submit** button. On click, log an object like `{ name: name, email: email }` to the console, then call both setters with **""** to reset the form.
4. Complete the code stub below (or use `assignment-stubs/Assignment4-Form.jsx`).

### Code stub

```jsx
import React from "react";
// TODO: Import useState from "react"

function SimpleForm() {
  // TODO: useState for name (initial "")
  // TODO: useState for email (initial "")

  function handleSubmit() {
    // TODO: Log an object with name and email to console
    // TODO: Reset both name and email to "" (call both setters)
  }

  return (
    <div>
      <h2>Simple Form</h2>

      <label>Name</label>
      {/* TODO: Controlled input for name */}
      <input type="text" />

      <label>Email</label>
      {/* TODO: Controlled input for email */}
      <input type="text" />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default SimpleForm;
```

---

## Assignment 5: Age Label (Conditional Rendering with Ternary)

### Problem statement

Build a component that displays an **age** (number) and a label that says either **"Adult"** or **"Minor"** based on whether the age is **>= 18**. The age should be editable (e.g. via an input or two buttons: “Older” / “Younger”) so the label updates when age changes.

### Ask

1. Use **useState** to store **age**. Initial value can be **16** (or any number).
2. Display the age and, next to it, the label **"Adult"** if age >= 18, otherwise **"Minor"**. Use a **ternary**: `{age >= 18 ? "Adult" : "Minor"}`.
3. Provide a way to change the age (e.g. two buttons: one that does `setAge(age + 1)` and one that does `setAge(age - 1)`), so the user can see the label switch.
4. Complete the code stub below (or use `assignment-stubs/Assignment5-AgeLabel.jsx`).

### Code stub

```jsx
import React from "react";
// TODO: Import useState from "react"

function AgeLabel() {
  // TODO: useState for age (initial value 16 or similar)

  return (
    <div>
      {/* TODO: Buttons to increase and decrease age */}
      <button>Older</button>
      <span style={{ margin: "0 10px" }}>{/* TODO: show age */}</span>
      <button>Younger</button>

      {/* TODO: Display "Adult" if age >= 18, otherwise "Minor" using ternary */}
      <p>Status: {/* ... */}</p>
    </div>
  );
}

export default AgeLabel;
```

---

## Assignment 6: User Card with Email Toggle

### Problem statement

Build a **UserCard** component that displays a user’s **name** and **email**. The email should be **hidden by default**. Add two buttons: **“Show Email”** and **“Hide Email”**. Only one of them needs to be visible at a time if you prefer, or show both. Use a boolean state to control email visibility.

### Ask

1. Use the provided **user** object (or define a minimal one: `name`, `email`). You may get it from props later; for now a constant at the top is fine.
2. Use **useState(false)** for “show email” (e.g. `showEmail`).
3. Display the user’s **name** always.
4. Display the user’s **email** only when `showEmail` is true. Use: `{showEmail && <p>{user.email}</p>}`.
5. **“Show Email”** button: onClick sets the boolean to **true**. **“Hide Email”** button: onClick sets the boolean to **false**.
6. Style the card minimally (e.g. border, padding) so it looks like a card. Complete the code stub below (or use `assignment-stubs/Assignment6-UserCard.jsx`).

### Code stub

```jsx
import React from "react";
// TODO: Import useState from "react"

// Sample user - you can change the values
const user = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
};

function UserCard() {
  // TODO: useState for showEmail (initial false)

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        borderRadius: "8px",
        maxWidth: "300px",
      }}
    >
      <p><strong>Name:</strong> {/* TODO: user.name */}</p>

      {/* TODO: Show email only when showEmail is true */}

      {/* TODO: Show Email button - onClick set showEmail to true */}
      <button>Show Email</button>

      {/* TODO: Hide Email button - onClick set showEmail to false */}
      <button>Hide Email</button>
    </div>
  );
}

export default UserCard;
```

---

## Summary

| # | Topic              | Main concept(s)                    | Stub file                      |
|---|--------------------|------------------------------------|--------------------------------|
| 1 | Counter            | useState(number), onClick, setter | Assignment1-Counter.jsx        |
| 2 | Text display       | useState(string), controlled input | Assignment2-TextDisplay.jsx     |
| 3 | Toggle visibility  | useState(boolean), conditional &&  | Assignment3-Toggle.jsx         |
| 4 | Form + reset       | Multiple useState, controlled, reset | Assignment4-Form.jsx         |
| 5 | Age label          | useState(number), ternary          | Assignment5-AgeLabel.jsx       |
| 6 | User card + toggle | useState(boolean), data + state    | Assignment6-UserCard.jsx       |

**How to use the stubs:** Copy each stub from this document into a new file in `src/components/`, or use the files in `assignment-stubs/` and move them into `src/components/`. Then complete the TODOs and render the component in `App.jsx` to verify (e.g. `<Counter />`, `<TextDisplay />`, etc.).
