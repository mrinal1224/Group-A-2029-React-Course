

* JSX and component thinking
* Props
* State
* `useState`
* Conditional rendering
* List rendering
* Event handling
* Controlled interaction patterns
* Derived UI
* Lifting state up
* `useEffect`
* `useRef`
* `useMemo`
* `useCallback`
* Context API
* Component composition
* Reusable child components
* Dynamic UI behavior
* Basic optimization thinking



---

# Problem 1: Email Inbox Category Switcher

## Problem Statement

You are building a simple **Inbox Category Switcher** for an email application. The inbox is divided into three categories:

* Primary
* Promotions
* Updates

Users should be able to click on a category tab and see only the emails that belong to that category. The selected category should be visually highlighted so that users know which section they are viewing.

This is a realistic feature because almost every email product, productivity dashboard, or messaging tool has some kind of categorized view. The goal of this problem is to help students practice state-driven filtering, list rendering, conditional styling, and reusable component thinking in React.

## Functional Requirements

1. Show three category buttons:

   * Primary
   * Promotions
   * Updates
2. Maintain a list of emails, where each email contains:

   * `id`
   * `subject`
   * `sender`
   * `category`
3. By default, show emails from the `Primary` category.
4. Clicking a category button should:

   * update the active category
   * re-render the visible emails
5. The active category button should look visually different.
6. Each visible email should show:

   * subject
   * sender
7. If a category contains no emails, show:

   * `No emails in this category`
8. Use a child component to render each email item.

## Concepts Covered

* State
* Props
* `useState`
* Conditional rendering
* List rendering
* Derived UI

## Hints

1. Keep the currently active category in state.
2. Use `filter()` to derive the visible emails.
3. Pass email data as props into a reusable child component.
4. Active button styling should depend on the selected category.
5. This is a great example of deriving UI from state rather than storing duplicate values.

## Code Stub

```jsx
import React, { useState } from "react";

const emails = [
  { id: 1, subject: "Project kickoff scheduled", sender: "Manager", category: "Primary" },
  { id: 2, subject: "50% off on travel bags", sender: "ShopEase", category: "Promotions" },
  { id: 3, subject: "Your monthly usage report", sender: "CloudPanel", category: "Updates" },
  { id: 4, subject: "Interview round details", sender: "Recruiter", category: "Primary" },
];

function EmailItem({ email }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
      <h4>{email.subject}</h4>
      <p>From: {email.sender}</p>
    </div>
  );
}

export default function InboxCategorySwitcher() {
  const [activeCategory, setActiveCategory] = useState("Primary");

  // TODO: derive visible emails
  const visibleEmails = emails;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Email Inbox</h2>

      <button onClick={() => setActiveCategory("Primary")}>Primary</button>
      <button onClick={() => setActiveCategory("Promotions")} style={{ marginLeft: "10px" }}>
        Promotions
      </button>
      <button onClick={() => setActiveCategory("Updates")} style={{ marginLeft: "10px" }}>
        Updates
      </button>

      <div style={{ marginTop: "20px" }}>
        {visibleEmails.map((email) => (
          <EmailItem key={email.id} email={email} />
        ))}
      </div>
    </div>
  );
}
```

## Full Solution

```jsx
import React, { useState } from "react";

const emails = [
  { id: 1, subject: "Project kickoff scheduled", sender: "Manager", category: "Primary" },
  { id: 2, subject: "50% off on travel bags", sender: "ShopEase", category: "Promotions" },
  { id: 3, subject: "Your monthly usage report", sender: "CloudPanel", category: "Updates" },
  { id: 4, subject: "Interview round details", sender: "Recruiter", category: "Primary" },
];

function EmailItem({ email }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px", borderRadius: "8px" }}>
      <h4>{email.subject}</h4>
      <p>From: {email.sender}</p>
    </div>
  );
}

export default function InboxCategorySwitcher() {
  const [activeCategory, setActiveCategory] = useState("Primary");

  const visibleEmails = emails.filter(
    (email) => email.category === activeCategory
  );

  const getButtonStyle = (category) => ({
    backgroundColor: activeCategory === category ? "#ddd" : "white",
    padding: "8px 12px",
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2>Email Inbox</h2>

      <button
        onClick={() => setActiveCategory("Primary")}
        style={getButtonStyle("Primary")}
      >
        Primary
      </button>
      <button
        onClick={() => setActiveCategory("Promotions")}
        style={{ ...getButtonStyle("Promotions"), marginLeft: "10px" }}
      >
        Promotions
      </button>
      <button
        onClick={() => setActiveCategory("Updates")}
        style={{ ...getButtonStyle("Updates"), marginLeft: "10px" }}
      >
        Updates
      </button>

      <div style={{ marginTop: "20px" }}>
        {visibleEmails.length === 0 ? (
          <p>No emails in this category</p>
        ) : (
          visibleEmails.map((email) => <EmailItem key={email.id} email={email} />)
        )}
      </div>
    </div>
  );
}
```

## Test Cases

1. Action: App loads
   Expected: Only `Primary` emails are shown.

2. Action: User clicks `Promotions`
   Expected: Only promotion emails are displayed.

3. Action: User clicks `Updates`
   Expected: Only update emails are displayed.

4. Action: User switches back to `Primary`
   Expected: Primary emails appear again.

5. Action: Active category is `Promotions`
   Expected: Promotions button is visually highlighted.

6. Action: Active category changes
   Expected: Previous active button loses highlight.

7. Action: Category contains no emails
   Expected: `No emails in this category` is shown.

8. Action: Each email item renders
   Expected: Subject and sender are both visible.

9. Action: User switches categories multiple times
   Expected: List always matches the selected category.

10. Action: App renders email items
    Expected: Each email uses its `id` as React key.

---

# Problem 2: Playlist Song Highlighter

## Problem Statement

You are building a **Playlist Song Highlighter** for a music streaming application. Users should be able to click on a song from the playlist and see which track is currently selected.

The selected song should be highlighted in the list, and a details panel should show the currently selected song’s title and artist. This kind of interaction is very common in media applications, music players, podcast platforms, and video playlists.

This problem helps students practice state, click interaction, selected-item rendering, props, and dynamic styling.

## Functional Requirements

1. Display a list of songs.
2. Each song should include:

   * `id`
   * `title`
   * `artist`
3. The first song should be selected by default.
4. Clicking a song should:

   * mark it as selected
   * update the details panel
5. The selected song should be styled differently.
6. The details panel should show:

   * selected song title
   * selected song artist
7. Use a child component to render each song row.

## Concepts Covered

* State
* Props
* `useState`
* Dynamic rendering
* Conditional styling
* List rendering

## Hints

1. Store the selected song’s `id` in state instead of storing the whole object.
2. Use `find()` to get the selected song data.
3. Pass `isSelected` as a prop to the child component.
4. The click handler should update only the selected ID.
5. This is a common “master-detail” UI pattern.

## Code Stub

```jsx
import React, { useState } from "react";

const songs = [
  { id: 1, title: "Blinding Lights", artist: "The Weeknd" },
  { id: 2, title: "Levitating", artist: "Dua Lipa" },
  { id: 3, title: "Heat Waves", artist: "Glass Animals" },
];

function SongItem({ song, isSelected, onSelect }) {
  return (
    <div
      onClick={() => onSelect(song.id)}
      style={{
        padding: "10px",
        border: "1px solid #ddd",
        marginBottom: "8px",
        cursor: "pointer",
      }}
    >
      <strong>{song.title}</strong>
      <p>{song.artist}</p>
    </div>
  );
}

export default function PlaylistHighlighter() {
  const [selectedSongId, setSelectedSongId] = useState(1);

  // TODO: derive selected song
  const selectedSong = songs[0];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Playlist</h2>

      <div>
        {songs.map((song) => (
          <SongItem
            key={song.id}
            song={song}
            isSelected={false}
            onSelect={setSelectedSongId}
          />
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Now Selected</h3>
        <p>Title: {selectedSong.title}</p>
        <p>Artist: {selectedSong.artist}</p>
      </div>
    </div>
  );
}
```

## Full Solution

```jsx
import React, { useState } from "react";

const songs = [
  { id: 1, title: "Blinding Lights", artist: "The Weeknd" },
  { id: 2, title: "Levitating", artist: "Dua Lipa" },
  { id: 3, title: "Heat Waves", artist: "Glass Animals" },
];

function SongItem({ song, isSelected, onSelect }) {
  return (
    <div
      onClick={() => onSelect(song.id)}
      style={{
        padding: "10px",
        border: "1px solid #ddd",
        marginBottom: "8px",
        cursor: "pointer",
        backgroundColor: isSelected ? "#e6f0ff" : "white",
      }}
    >
      <strong>{song.title}</strong>
      <p>{song.artist}</p>
    </div>
  );
}

export default function PlaylistHighlighter() {
  const [selectedSongId, setSelectedSongId] = useState(1);

  const selectedSong = songs.find((song) => song.id === selectedSongId);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Playlist</h2>

      <div>
        {songs.map((song) => (
          <SongItem
            key={song.id}
            song={song}
            isSelected={selectedSongId === song.id}
            onSelect={setSelectedSongId}
          />
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Now Selected</h3>
        <p>Title: {selectedSong.title}</p>
        <p>Artist: {selectedSong.artist}</p>
      </div>
    </div>
  );
}
```

## Test Cases

1. Action: App loads
   Expected: First song is selected by default.

2. Action: User clicks second song
   Expected: Second song becomes selected.

3. Action: User clicks third song
   Expected: Third song becomes selected.

4. Action: Selected song changes
   Expected: Details panel updates to the correct title and artist.

5. Action: A song is selected
   Expected: That row is visually highlighted.

6. Action: User clicks the same song again
   Expected: It stays selected.

7. Action: User switches between songs repeatedly
   Expected: Highlight and details panel always remain synchronized.

8. Action: Song rows render
   Expected: Each row shows title and artist.

9. Action: App first renders
   Expected: Details panel matches the first song.

10. Action: User selects another song
    Expected: Previous song loses highlight.

---

# Problem 3: Job Application Status Board

## Problem Statement

You are building a **Job Application Status Board** for a career portal. Users should be able to view job applications and filter them by their status:

* Applied
* Interview
* Rejected

This kind of feature is commonly seen in job boards, hiring dashboards, and tracking applications. The UI should allow users to switch views and inspect only the subset they need at the moment.

This problem helps students practice filtering, state-driven UI, button-based view switching, and rendering lists of objects.

## Functional Requirements

1. Display a list of job applications.
2. Each application should include:

   * `id`
   * `company`
   * `role`
   * `status`
3. Add four filter buttons:

   * All
   * Applied
   * Interview
   * Rejected
4. By default, show all applications.
5. Clicking a filter button should show only matching applications.
6. Highlight the active filter button.
7. If no applications match the current filter, show:

   * `No applications found`
8. Show the number of visible applications.

## Concepts Covered

* State
* `useState`
* Conditional rendering
* List filtering
* Derived UI

## Hints

1. Store the active filter in state.
2. Use `filter()` to compute the visible applications.
3. The `All` filter is just a special case.
4. Visible count should come from the filtered array.
5. Button styles should depend on active state.

## Code Stub

```jsx
import React, { useState } from "react";

const applications = [
  { id: 1, company: "Google", role: "Frontend Engineer", status: "Applied" },
  { id: 2, company: "Amazon", role: "SDE 1", status: "Interview" },
  { id: 3, company: "Meta", role: "UI Engineer", status: "Rejected" },
  { id: 4, company: "Atlassian", role: "React Developer", status: "Applied" },
];

export default function JobStatusBoard() {
  const [activeFilter, setActiveFilter] = useState("All");

  // TODO: derive visible applications
  const visibleApplications = applications;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Job Application Status Board</h2>

      <button onClick={() => setActiveFilter("All")}>All</button>
      <button onClick={() => setActiveFilter("Applied")} style={{ marginLeft: "10px" }}>
        Applied
      </button>
      <button onClick={() => setActiveFilter("Interview")} style={{ marginLeft: "10px" }}>
        Interview
      </button>
      <button onClick={() => setActiveFilter("Rejected")} style={{ marginLeft: "10px" }}>
        Rejected
      </button>

      <p style={{ marginTop: "20px" }}>Visible Applications: {visibleApplications.length}</p>

      {visibleApplications.map((application) => (
        <div key={application.id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
          <h4>{application.company}</h4>
          <p>{application.role}</p>
          <p>Status: {application.status}</p>
        </div>
      ))}
    </div>
  );
}
```

## Full Solution

```jsx
import React, { useState } from "react";

const applications = [
  { id: 1, company: "Google", role: "Frontend Engineer", status: "Applied" },
  { id: 2, company: "Amazon", role: "SDE 1", status: "Interview" },
  { id: 3, company: "Meta", role: "UI Engineer", status: "Rejected" },
  { id: 4, company: "Atlassian", role: "React Developer", status: "Applied" },
];

export default function JobStatusBoard() {
  const [activeFilter, setActiveFilter] = useState("All");

  const visibleApplications =
    activeFilter === "All"
      ? applications
      : applications.filter((application) => application.status === activeFilter);

  const getButtonStyle = (filter) => ({
    backgroundColor: activeFilter === filter ? "#ddd" : "white",
    padding: "8px 12px",
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2>Job Application Status Board</h2>

      <button onClick={() => setActiveFilter("All")} style={getButtonStyle("All")}>
        All
      </button>
      <button
        onClick={() => setActiveFilter("Applied")}
        style={{ ...getButtonStyle("Applied"), marginLeft: "10px" }}
      >
        Applied
      </button>
      <button
        onClick={() => setActiveFilter("Interview")}
        style={{ ...getButtonStyle("Interview"), marginLeft: "10px" }}
      >
        Interview
      </button>
      <button
        onClick={() => setActiveFilter("Rejected")}
        style={{ ...getButtonStyle("Rejected"), marginLeft: "10px" }}
      >
        Rejected
      </button>

      <p style={{ marginTop: "20px" }}>
        Visible Applications: {visibleApplications.length}
      </p>

      {visibleApplications.length === 0 ? (
        <p>No applications found</p>
      ) : (
        visibleApplications.map((application) => (
          <div
            key={application.id}
            style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px", borderRadius: "8px" }}
          >
            <h4>{application.company}</h4>
            <p>{application.role}</p>
            <p>Status: {application.status}</p>
          </div>
        ))
      )}
    </div>
  );
}
```

## Test Cases

1. Action: App loads
   Expected: All applications are visible.

2. Action: User clicks `Applied`
   Expected: Only applied jobs are shown.

3. Action: User clicks `Interview`
   Expected: Only interview jobs are shown.

4. Action: User clicks `Rejected`
   Expected: Only rejected jobs are shown.

5. Action: User clicks `All`
   Expected: Full application list is visible again.

6. Action: Active filter changes
   Expected: Correct button is highlighted.

7. Action: Visible applications are filtered
   Expected: Count updates to match rendered cards.

8. Action: No items match a filter
   Expected: `No applications found` is shown.

9. Action: User switches filters multiple times
   Expected: UI always remains accurate.

10. Action: Each application card renders
    Expected: Company, role, and status are all visible.

---

# Problem 4: Product Image Color Preview

## Problem Statement

You are building a **Product Color Preview** widget for an ecommerce product page. A product is available in multiple color options, and when a user clicks on a color swatch, the product preview should update to show the selected variant.

This kind of interaction is extremely common in ecommerce applications where customers compare visual variants before making a purchase decision.

The purpose of this problem is to help students practice selected state, dynamic rendering, conditional styling, and props-based component design.

## Functional Requirements

1. Show a product title.
2. Show a main preview image for the selected color variant.
3. Provide a set of color option buttons.
4. Each color option should contain:

   * `id`
   * `colorName`
   * `image`
5. The first color should be selected by default.
6. Clicking a color option should:

   * update the preview image
   * highlight the selected option
7. Show the selected color name below the image.
8. Use a child component for the color option item.

## Concepts Covered

* State
* Props
* `useState`
* Dynamic rendering
* Conditional styling
* Reusable child components

## Hints

1. Store the selected color ID in state.
2. Use `find()` to get the selected color object.
3. Pass selected state into the child swatch component.
4. The main image should depend entirely on selected state.
5. This is another good example of a master-detail UI.

## Code Stub

```jsx
import React, { useState } from "react";

const colorVariants = [
  { id: 1, colorName: "Black", image: "https://via.placeholder.com/300x200?text=Black+Shoes" },
  { id: 2, colorName: "White", image: "https://via.placeholder.com/300x200?text=White+Shoes" },
  { id: 3, colorName: "Blue", image: "https://via.placeholder.com/300x200?text=Blue+Shoes" },
];

function ColorSwatch({ variant, isSelected, onSelect }) {
  return (
    <button onClick={() => onSelect(variant.id)} style={{ marginRight: "10px" }}>
      {variant.colorName}
    </button>
  );
}

export default function ProductColorPreview() {
  const [selectedColorId, setSelectedColorId] = useState(1);

  // TODO: derive selected variant
  const selectedVariant = colorVariants[0];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Running Shoes</h2>

      <img src={selectedVariant.image} alt={selectedVariant.colorName} />

      <p>Selected Color: {selectedVariant.colorName}</p>

      <div style={{ marginTop: "10px" }}>
        {colorVariants.map((variant) => (
          <ColorSwatch
            key={variant.id}
            variant={variant}
            isSelected={false}
            onSelect={setSelectedColorId}
          />
        ))}
      </div>
    </div>
  );
}
```

## Full Solution

```jsx
import React, { useState } from "react";

const colorVariants = [
  { id: 1, colorName: "Black", image: "https://via.placeholder.com/300x200?text=Black+Shoes" },
  { id: 2, colorName: "White", image: "https://via.placeholder.com/300x200?text=White+Shoes" },
  { id: 3, colorName: "Blue", image: "https://via.placeholder.com/300x200?text=Blue+Shoes" },
];

function ColorSwatch({ variant, isSelected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(variant.id)}
      style={{
        marginRight: "10px",
        padding: "8px 12px",
        backgroundColor: isSelected ? "#ddd" : "white",
      }}
    >
      {variant.colorName}
    </button>
  );
}

export default function ProductColorPreview() {
  const [selectedColorId, setSelectedColorId] = useState(1);

  const selectedVariant = colorVariants.find(
    (variant) => variant.id === selectedColorId
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Running Shoes</h2>

      <img
        src={selectedVariant.image}
        alt={selectedVariant.colorName}
        style={{ width: "300px", height: "200px", objectFit: "cover" }}
      />

      <p>Selected Color: {selectedVariant.colorName}</p>

      <div style={{ marginTop: "10px" }}>
        {colorVariants.map((variant) => (
          <ColorSwatch
            key={variant.id}
            variant={variant}
            isSelected={selectedColorId === variant.id}
            onSelect={setSelectedColorId}
          />
        ))}
      </div>
    </div>
  );
}
```

## Test Cases

1. Action: App loads
   Expected: First color variant is selected by default.

2. Action: User clicks `White`
   Expected: White image is shown.

3. Action: User clicks `Blue`
   Expected: Blue image is shown.

4. Action: User changes color
   Expected: Selected color name updates correctly.

5. Action: Selected variant changes
   Expected: Active swatch is highlighted.

6. Action: Previous selected color loses focus state
   Expected: Only one swatch appears selected.

7. Action: User clicks different swatches repeatedly
   Expected: Preview image always matches the chosen swatch.

8. Action: App first renders
   Expected: Product title, image, and selected color text are visible.

9. Action: User clicks selected swatch again
   Expected: It remains selected without errors.

10. Action: Image alt text is rendered
    Expected: It matches the selected color name.

---

# Problem 5: Classroom Attendance Toggle List

## Problem Statement

You are building a **Classroom Attendance Toggle List** for a teacher dashboard. The teacher sees a list of students and can mark whether each student is present or absent.

Each student row should have a button that toggles attendance status. The dashboard should also show a live summary of how many students are present and absent.

This is a practical feature for education tools, admin systems, and classroom management software. It gives students practice with updating objects inside arrays, deriving counts, props, and conditional rendering.

## Functional Requirements

1. Display a list of students.
2. Each student should contain:

   * `id`
   * `name`
   * `present`
3. Each student row should show:

   * student name
   * attendance status
   * a toggle button
4. Clicking the button should switch:

   * Present → Absent
   * Absent → Present
5. Present students should look visually different from absent students.
6. Show summary counts:

   * total students
   * present students
   * absent students
7. Use a child component for each student row.

## Concepts Covered

* State
* Props
* `useState`
* List updates
* Derived UI
* Conditional styling

## Hints

1. Keep the students array in state.
2. Use `map()` to update just the clicked student.
3. Present and absent counts should be derived from the state array.
4. Pass the toggle handler and student data through props.
5. Styling can depend on the `present` boolean.

## Code Stub

```jsx
import React, { useState } from "react";

const initialStudents = [
  { id: 1, name: "Aarav", present: true },
  { id: 2, name: "Meera", present: false },
  { id: 3, name: "Kunal", present: true },
  { id: 4, name: "Ishita", present: false },
];

function StudentRow({ student, onToggle }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
      <h4>{student.name}</h4>
      <p>Status: {student.present ? "Present" : "Absent"}</p>
      <button onClick={() => onToggle(student.id)}>
        {/* TODO */}
      </button>
    </div>
  );
}

export default function AttendanceToggleList() {
  const [students, setStudents] = useState(initialStudents);

  // TODO: implement toggle logic
  const handleToggleAttendance = (id) => {};

  const totalStudents = students.length;
  const presentCount = 0;
  const absentCount = 0;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Attendance Dashboard</h2>

      <p>Total Students: {totalStudents}</p>
      <p>Present: {presentCount}</p>
      <p>Absent: {absentCount}</p>

      <div style={{ marginTop: "20px" }}>
        {students.map((student) => (
          <StudentRow
            key={student.id}
            student={student}
            onToggle={handleToggleAttendance}
          />
        ))}
      </div>
    </div>
  );
}
```

## Full Solution

```jsx
import React, { useState } from "react";

const initialStudents = [
  { id: 1, name: "Aarav", present: true },
  { id: 2, name: "Meera", present: false },
  { id: 3, name: "Kunal", present: true },
  { id: 4, name: "Ishita", present: false },
];

function StudentRow({ student, onToggle }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "10px",
        marginBottom: "10px",
        backgroundColor: student.present ? "#eafbea" : "#fdeaea",
        borderRadius: "8px",
      }}
    >
      <h4>{student.name}</h4>
      <p>Status: {student.present ? "Present" : "Absent"}</p>
      <button onClick={() => onToggle(student.id)}>
        {student.present ? "Mark Absent" : "Mark Present"}
      </button>
    </div>
  );
}

export default function AttendanceToggleList() {
  const [students, setStudents] = useState(initialStudents);

  const handleToggleAttendance = (id) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id
          ? { ...student, present: !student.present }
          : student
      )
    );
  };

  const totalStudents = students.length;
  const presentCount = students.filter((student) => student.present).length;
  const absentCount = totalStudents - presentCount;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Attendance Dashboard</h2>

      <p>Total Students: {totalStudents}</p>
      <p>Present: {presentCount}</p>
      <p>Absent: {absentCount}</p>

      <div style={{ marginTop: "20px" }}>
        {students.map((student) => (
          <StudentRow
            key={student.id}
            student={student}
            onToggle={handleToggleAttendance}
          />
        ))}
      </div>
    </div>
  );
}
```

## Test Cases

1. Action: App loads
   Expected: All students are displayed.

2. Action: App loads
   Expected: Present and absent counts match the student data.

3. Action: User clicks `Mark Present` on an absent student
   Expected: That student becomes present.

4. Action: User clicks `Mark Absent` on a present student
   Expected: That student becomes absent.

5. Action: Student attendance changes
   Expected: Present/absent summary updates correctly.

6. Action: Present student row renders
   Expected: It uses present-specific styling.

7. Action: Absent student row renders
   Expected: It uses absent-specific styling.

8. Action: User toggles the same student twice
   Expected: Status switches back correctly.

9. Action: User toggles multiple students
   Expected: All counts remain accurate.

10. Action: Each row renders
    Expected: Student name, status, and correct button text are visible.

---

Great — here is **Set 2 of the 30-question React practice sheet**, covering **Problems 6–10** in the same detailed format.

This set starts introducing slightly richer interaction patterns, including:

* search-based filtering
* parent-child coordination
* lifting state up
* basic `useEffect`
* derived summaries
* empty states
* reusable components

---

# Problem 6: Team Directory Search Panel

## Problem Statement

You are building a **Team Directory Search Panel** for an internal company dashboard. Employees should be able to search through a list of team members by name and quickly find the person they are looking for.

This is a very common feature in admin tools, collaboration apps, HR portals, and internal dashboards. The goal is to help students practice controlled inputs, filtering lists, derived UI, and empty-state handling in React.

The interaction should feel realistic: the user types into the search bar, and the visible employee list updates immediately.

## Functional Requirements

1. Display a list of team members.
2. Each team member should have:

   * `id`
   * `name`
   * `role`
3. Add a search input at the top.
4. The search input should be a **controlled component**.
5. Filter members by name as the user types.
6. Matching should be case-insensitive.
7. Show the total number of visible results.
8. If no team members match the search, show:

   * `No team members found`
9. Use a child component to render each member card.

## Concepts Covered

* State
* Props
* `useState`
* Controlled components
* List filtering
* Derived UI
* Conditional rendering

## Hints

1. Keep the search value in state.
2. Use `filter()` on the original members array.
3. Convert both the member name and search text to lowercase before comparing.
4. The visible count should come from the filtered array.
5. The child component should only focus on display, not filtering logic.

## Code Stub

```jsx
import React, { useState } from "react";

const members = [
  { id: 1, name: "Aarav Sharma", role: "Frontend Engineer" },
  { id: 2, name: "Meera Nair", role: "Product Designer" },
  { id: 3, name: "Kabir Jain", role: "Backend Engineer" },
  { id: 4, name: "Ishita Rao", role: "QA Engineer" },
];

function MemberCard({ member }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
      <h4>{member.name}</h4>
      <p>{member.role}</p>
    </div>
  );
}

export default function TeamDirectorySearch() {
  const [search, setSearch] = useState("");

  // TODO: derive visible members
  const visibleMembers = members;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Team Directory</h2>

      <input
        type="text"
        placeholder="Search team members"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p style={{ marginTop: "15px" }}>Visible Members: {visibleMembers.length}</p>

      <div style={{ marginTop: "15px" }}>
        {visibleMembers.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}
```

## Full Solution

```jsx
import React, { useState } from "react";

const members = [
  { id: 1, name: "Aarav Sharma", role: "Frontend Engineer" },
  { id: 2, name: "Meera Nair", role: "Product Designer" },
  { id: 3, name: "Kabir Jain", role: "Backend Engineer" },
  { id: 4, name: "Ishita Rao", role: "QA Engineer" },
];

function MemberCard({ member }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px", borderRadius: "8px" }}>
      <h4>{member.name}</h4>
      <p>{member.role}</p>
    </div>
  );
}

export default function TeamDirectorySearch() {
  const [search, setSearch] = useState("");

  const visibleMembers = members.filter((member) =>
    member.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Team Directory</h2>

      <input
        type="text"
        placeholder="Search team members"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p style={{ marginTop: "15px" }}>Visible Members: {visibleMembers.length}</p>

      <div style={{ marginTop: "15px" }}>
        {visibleMembers.length === 0 ? (
          <p>No team members found</p>
        ) : (
          visibleMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))
        )}
      </div>
    </div>
  );
}
```

## Test Cases

1. Action: App loads
   Expected: All members are displayed.

2. Action: User types `aarav`
   Expected: Only Aarav Sharma is visible.

3. Action: User types `MEERA`
   Expected: Meera Nair is visible due to case-insensitive matching.

4. Action: User types `rao`
   Expected: Ishita Rao is visible.

5. Action: User clears the search input
   Expected: Full member list returns.

6. Action: User types a name that does not exist
   Expected: `No team members found` is displayed.

7. Action: Search text changes
   Expected: Visible member count updates immediately.

8. Action: Search is empty
   Expected: Visible count matches the total member count.

9. Action: Each member card renders
   Expected: Member name and role are visible.

10. Action: User types partial text like `ka`
    Expected: Matching names containing `ka` are displayed.

---

# Problem 7: Product Rating Filter Bar

## Problem Statement

You are building a **Product Rating Filter Bar** for an ecommerce review page. Users should be able to filter products based on their star rating so they can quickly focus on the highest-rated or lower-rated items.

For example, a user may want to view only products with 4-star ratings or all products with 5 stars. This kind of filtering is common in marketplaces, food delivery platforms, shopping apps, and review sites.

This problem helps students practice state-driven filtering, buttons as filters, and list rendering with real product-style data.

## Functional Requirements

1. Display a list of products.
2. Each product should have:

   * `id`
   * `name`
   * `rating`
3. Add filter buttons:

   * All
   * 5 Stars
   * 4 Stars
   * 3 Stars
4. By default, show all products.
5. Clicking a filter button should show only products with that rating.
6. Highlight the active filter button.
7. Show the number of visible products.
8. If no products match the filter, show:

   * `No products available for this rating`

## Concepts Covered

* State
* `useState`
* List filtering
* Conditional rendering
* Derived UI
* Event handling

## Hints

1. Store the selected rating filter in state.
2. `All` is just a special filter that returns the full array.
3. Compare numeric ratings carefully.
4. Use filtered array length to show the visible count.
5. Button styles should depend on the active filter.

## Code Stub

```jsx
import React, { useState } from "react";

const products = [
  { id: 1, name: "Wireless Earbuds", rating: 5 },
  { id: 2, name: "Laptop Stand", rating: 4 },
  { id: 3, name: "Phone Holder", rating: 3 },
  { id: 4, name: "Bluetooth Speaker", rating: 5 },
];

export default function ProductRatingFilter() {
  const [activeFilter, setActiveFilter] = useState("All");

  // TODO: derive visible products
  const visibleProducts = products;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Product Rating Filter</h2>

      <button onClick={() => setActiveFilter("All")}>All</button>
      <button onClick={() => setActiveFilter(5)} style={{ marginLeft: "10px" }}>
        5 Stars
      </button>
      <button onClick={() => setActiveFilter(4)} style={{ marginLeft: "10px" }}>
        4 Stars
      </button>
      <button onClick={() => setActiveFilter(3)} style={{ marginLeft: "10px" }}>
        3 Stars
      </button>

      <p style={{ marginTop: "15px" }}>Visible Products: {visibleProducts.length}</p>

      {visibleProducts.map((product) => (
        <div key={product.id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
          <h4>{product.name}</h4>
          <p>Rating: {product.rating} Stars</p>
        </div>
      ))}
    </div>
  );
}
```

## Full Solution

```jsx
import React, { useState } from "react";

const products = [
  { id: 1, name: "Wireless Earbuds", rating: 5 },
  { id: 2, name: "Laptop Stand", rating: 4 },
  { id: 3, name: "Phone Holder", rating: 3 },
  { id: 4, name: "Bluetooth Speaker", rating: 5 },
];

export default function ProductRatingFilter() {
  const [activeFilter, setActiveFilter] = useState("All");

  const visibleProducts =
    activeFilter === "All"
      ? products
      : products.filter((product) => product.rating === activeFilter);

  const getButtonStyle = (filterValue) => ({
    backgroundColor: activeFilter === filterValue ? "#ddd" : "white",
    padding: "8px 12px",
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2>Product Rating Filter</h2>

      <button onClick={() => setActiveFilter("All")} style={getButtonStyle("All")}>
        All
      </button>
      <button onClick={() => setActiveFilter(5)} style={{ ...getButtonStyle(5), marginLeft: "10px" }}>
        5 Stars
      </button>
      <button onClick={() => setActiveFilter(4)} style={{ ...getButtonStyle(4), marginLeft: "10px" }}>
        4 Stars
      </button>
      <button onClick={() => setActiveFilter(3)} style={{ ...getButtonStyle(3), marginLeft: "10px" }}>
        3 Stars
      </button>

      <p style={{ marginTop: "15px" }}>Visible Products: {visibleProducts.length}</p>

      {visibleProducts.length === 0 ? (
        <p>No products available for this rating</p>
      ) : (
        visibleProducts.map((product) => (
          <div
            key={product.id}
            style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px", borderRadius: "8px" }}
          >
            <h4>{product.name}</h4>
            <p>Rating: {product.rating} Stars</p>
          </div>
        ))
      )}
    </div>
  );
}
```

## Test Cases

1. Action: App loads
   Expected: All products are displayed.

2. Action: User clicks `5 Stars`
   Expected: Only 5-star products appear.

3. Action: User clicks `4 Stars`
   Expected: Only 4-star products appear.

4. Action: User clicks `3 Stars`
   Expected: Only 3-star products appear.

5. Action: User clicks `All`
   Expected: All products appear again.

6. Action: Active filter changes
   Expected: Correct button is highlighted.

7. Action: No products exist for a selected rating
   Expected: `No products available for this rating` is shown.

8. Action: Filter changes
   Expected: Visible product count updates correctly.

9. Action: Product card renders
   Expected: Product name and rating are both visible.

10. Action: User switches filters repeatedly
    Expected: UI remains accurate and stable.

---

# Problem 8: Shared Selected Course Viewer

## Problem Statement

You are building a **Shared Selected Course Viewer** for an education platform. On the left side, users should see a list of available courses. On the right side, they should see the details of the currently selected course.

The important part of this problem is that the selected course state should live in the parent component, while both the course list and the course details panel depend on it. This is a classic case of **lifting state up**.

This pattern is very common in dashboards, admin tools, media apps, CRMs, and learning platforms where multiple sibling components need to stay synchronized based on shared parent state.

## Functional Requirements

1. Show a list of courses in one child component.
2. Show selected course details in another child component.
3. Each course should include:

   * `id`
   * `title`
   * `instructor`
   * `duration`
4. The first course should be selected by default.
5. Clicking a course in the list should update the details panel.
6. Highlight the selected course in the list.
7. State for selected course should be stored in the parent component.
8. The child components should communicate via props only.

## Concepts Covered

* State
* Props
* `useState`
* Lifting state up
* Parent-child communication
* Dynamic rendering

## Hints

1. The parent should own `selectedCourseId`.
2. Pass the selected ID and click handler down to the list component.
3. Pass the selected course data down to the details component.
4. Use `find()` in the parent to derive the selected course.
5. This is a good example of siblings sharing one source of truth.

## Code Stub

```jsx
import React, { useState } from "react";

const courses = [
  { id: 1, title: "React Basics", instructor: "Mrinal", duration: "4 Weeks" },
  { id: 2, title: "Advanced JavaScript", instructor: "Aman", duration: "6 Weeks" },
  { id: 3, title: "Node.js Fundamentals", instructor: "Riya", duration: "5 Weeks" },
];

function CourseList({ courses, selectedCourseId, onSelect }) {
  return (
    <div>
      {courses.map((course) => (
        <button
          key={course.id}
          onClick={() => onSelect(course.id)}
          style={{ display: "block", marginBottom: "10px" }}
        >
          {course.title}
        </button>
      ))}
    </div>
  );
}

function CourseDetails({ course }) {
  return (
    <div>
      <h3>{course.title}</h3>
      <p>Instructor: {course.instructor}</p>
      <p>Duration: {course.duration}</p>
    </div>
  );
}

export default function SharedCourseViewer() {
  const [selectedCourseId, setSelectedCourseId] = useState(1);

  // TODO: derive selected course
  const selectedCourse = courses[0];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Course Viewer</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <CourseList
          courses={courses}
          selectedCourseId={selectedCourseId}
          onSelect={setSelectedCourseId}
        />
        <CourseDetails course={selectedCourse} />
      </div>
    </div>
  );
}
```

## Full Solution

```jsx
import React, { useState } from "react";

const courses = [
  { id: 1, title: "React Basics", instructor: "Mrinal", duration: "4 Weeks" },
  { id: 2, title: "Advanced JavaScript", instructor: "Aman", duration: "6 Weeks" },
  { id: 3, title: "Node.js Fundamentals", instructor: "Riya", duration: "5 Weeks" },
];

function CourseList({ courses, selectedCourseId, onSelect }) {
  return (
    <div>
      {courses.map((course) => (
        <button
          key={course.id}
          onClick={() => onSelect(course.id)}
          style={{
            display: "block",
            marginBottom: "10px",
            backgroundColor: selectedCourseId === course.id ? "#ddd" : "white",
            padding: "8px 12px",
          }}
        >
          {course.title}
        </button>
      ))}
    </div>
  );
}

function CourseDetails({ course }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px", minWidth: "250px" }}>
      <h3>{course.title}</h3>
      <p>Instructor: {course.instructor}</p>
      <p>Duration: {course.duration}</p>
    </div>
  );
}

export default function SharedCourseViewer() {
  const [selectedCourseId, setSelectedCourseId] = useState(1);

  const selectedCourse = courses.find(
    (course) => course.id === selectedCourseId
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Course Viewer</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <CourseList
          courses={courses}
          selectedCourseId={selectedCourseId}
          onSelect={setSelectedCourseId}
        />
        <CourseDetails course={selectedCourse} />
      </div>
    </div>
  );
}
```

## Test Cases

1. Action: App loads
   Expected: First course is selected by default.

2. Action: User clicks second course
   Expected: Second course details appear on the right.

3. Action: User clicks third course
   Expected: Third course details appear.

4. Action: Selected course changes
   Expected: Correct course button is highlighted.

5. Action: Previous selected course changes
   Expected: Previous course button loses highlight.

6. Action: Course details panel renders
   Expected: Title, instructor, and duration are visible.

7. Action: State changes in parent
   Expected: Both child components update consistently.

8. Action: User switches courses repeatedly
   Expected: List and details panel remain synchronized.

9. Action: Course list renders
   Expected: All course titles appear as selectable buttons.

10. Action: App first loads
    Expected: List selection and details panel match each other.

---

# Problem 9: Auto-Updating Welcome Banner

## Problem Statement

You are building an **Auto-Updating Welcome Banner** for a learning dashboard. When the page loads, the banner should first show `Loading user...`. After 2 seconds, it should automatically update to show a welcome message such as `Welcome back, Student!`.

This simulates a simple asynchronous loading state that often appears in dashboards, profile screens, and SaaS apps when waiting for user data or remote content.

The purpose of this problem is to introduce students to **`useEffect`** for side effects and delayed UI updates.

## Functional Requirements

1. When the component first loads, show:

   * `Loading user...`
2. After 2 seconds, automatically update the banner to:

   * `Welcome back, Student!`
3. Use `useEffect` for the delayed update.
4. Keep the logic in a single component.
5. The UI should re-render automatically when the message changes.

## Concepts Covered

* State
* `useState`
* `useEffect`
* Side effects
* Conditional rendering

## Hints

1. Use one piece of state for the banner text.
2. `useEffect` can run once after the component mounts.
3. Use `setTimeout()` inside the effect.
4. Update state after the delay.
5. The initial state should represent loading.

## Code Stub

```jsx
import React, { useEffect, useState } from "react";

export default function WelcomeBanner() {
  const [message, setMessage] = useState("Loading user...");

  // TODO: update message after 2 seconds
  useEffect(() => {
  }, []);

  return (
    <div style={{ padding: "20px", border: "1px solid #ddd" }}>
      <h2>Dashboard Banner</h2>
      <p>{message}</p>
    </div>
  );
}
```

## Full Solution

```jsx
import React, { useEffect, useState } from "react";

export default function WelcomeBanner() {
  const [message, setMessage] = useState("Loading user...");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setMessage("Welcome back, Student!");
    }, 2000);

    return () => clearTimeout(timerId);
  }, []);

  return (
    <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2>Dashboard Banner</h2>
      <p>{message}</p>
    </div>
  );
}
```

## Test Cases

1. Action: App loads
   Expected: Banner shows `Loading user...`

2. Action: 2 seconds pass
   Expected: Banner updates to `Welcome back, Student!`

3. Action: Before 2 seconds are complete
   Expected: Banner still shows loading message.

4. Action: State updates after timeout
   Expected: Component re-renders with the new message.

5. Action: Component unmounts before timeout completes
   Expected: Cleanup prevents unwanted timeout side effects.

6. Action: App renders first time
   Expected: Heading and banner text are visible.

7. Action: Delay completes only once
   Expected: Message changes once and stays stable.

8. Action: App remains mounted
   Expected: Welcome message remains visible after update.

9. Action: `useEffect` runs
   Expected: It runs only once on initial mount.

10. Action: Timer finishes
    Expected: UI reflects updated message without manual refresh.

---

# Problem 10: Recently Viewed Articles Tracker

## Problem Statement

You are building a **Recently Viewed Articles Tracker** for a news platform. Users should be able to click article titles from a list and see the last article they viewed displayed in a small summary panel.

This is a realistic feature because news websites, blogs, learning platforms, and content apps often surface the user’s recently selected or last-viewed item. The key learning here is keeping one selected value in state and deriving the summary panel from it.

This problem is intentionally simple, but it builds strong foundational understanding for later “selected item” and “history” based UI patterns.

## Functional Requirements

1. Display a list of article titles.
2. Each article should contain:

   * `id`
   * `title`
   * `category`
3. By default, the summary panel should say:

   * `No article viewed yet`
4. Clicking an article should update the summary panel with:

   * article title
   * article category
5. The selected article row should be highlighted.
6. Use a child component to render each article item.

## Concepts Covered

* State
* Props
* `useState`
* Conditional rendering
* Dynamic rendering
* List rendering

## Hints

1. Store the last viewed article ID in state, starting with `null`.
2. Use `find()` to locate the selected article.
3. Only show the details panel when a valid article exists.
4. Pass `isSelected` to the child component for highlighting.
5. This is very similar to real content selection interfaces.

## Code Stub

```jsx
import React, { useState } from "react";

const articles = [
  { id: 1, title: "React 19 Features", category: "Frontend" },
  { id: 2, title: "Node.js Scaling Tips", category: "Backend" },
  { id: 3, title: "Designing Better APIs", category: "System Design" },
];

function ArticleItem({ article, isSelected, onView }) {
  return (
    <div
      onClick={() => onView(article.id)}
      style={{
        border: "1px solid #ddd",
        padding: "10px",
        marginBottom: "10px",
        cursor: "pointer",
      }}
    >
      <h4>{article.title}</h4>
      <p>{article.category}</p>
    </div>
  );
}

export default function ViewedArticlesTracker() {
  const [viewedArticleId, setViewedArticleId] = useState(null);

  // TODO: derive viewedArticle
  const viewedArticle = null;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Articles</h2>

      <div>
        {articles.map((article) => (
          <ArticleItem
            key={article.id}
            article={article}
            isSelected={false}
            onView={setViewedArticleId}
          />
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Recently Viewed</h3>
        <p>No article viewed yet</p>
      </div>
    </div>
  );
}
```

## Full Solution

```jsx
import React, { useState } from "react";

const articles = [
  { id: 1, title: "React 19 Features", category: "Frontend" },
  { id: 2, title: "Node.js Scaling Tips", category: "Backend" },
  { id: 3, title: "Designing Better APIs", category: "System Design" },
];

function ArticleItem({ article, isSelected, onView }) {
  return (
    <div
      onClick={() => onView(article.id)}
      style={{
        border: "1px solid #ddd",
        padding: "10px",
        marginBottom: "10px",
        cursor: "pointer",
        backgroundColor: isSelected ? "#eef4ff" : "white",
        borderRadius: "8px",
      }}
    >
      <h4>{article.title}</h4>
      <p>{article.category}</p>
    </div>
  );
}

export default function ViewedArticlesTracker() {
  const [viewedArticleId, setViewedArticleId] = useState(null);

  const viewedArticle = articles.find(
    (article) => article.id === viewedArticleId
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Articles</h2>

      <div>
        {articles.map((article) => (
          <ArticleItem
            key={article.id}
            article={article}
            isSelected={viewedArticleId === article.id}
            onView={setViewedArticleId}
          />
        ))}
      </div>

      <div style={{ marginTop: "20px", borderTop: "1px solid #ddd", paddingTop: "15px" }}>
        <h3>Recently Viewed</h3>
        {viewedArticle ? (
          <>
            <p>Title: {viewedArticle.title}</p>
            <p>Category: {viewedArticle.category}</p>
          </>
        ) : (
          <p>No article viewed yet</p>
        )}
      </div>
    </div>
  );
}
```

## Test Cases

1. Action: App loads
   Expected: Summary panel shows `No article viewed yet`.

2. Action: User clicks first article
   Expected: Summary shows first article title and category.

3. Action: User clicks second article
   Expected: Summary updates to second article details.

4. Action: User clicks third article
   Expected: Summary updates to third article details.

5. Action: An article is clicked
   Expected: That row becomes highlighted.

6. Action: User clicks another article
   Expected: Previous highlight is removed and new one appears.

7. Action: Before any click
   Expected: No row is highlighted.

8. Action: Article list renders
   Expected: All titles and categories are shown.

9. Action: User clicks the same article multiple times
   Expected: Summary remains correct and stable.

10. Action: Selected article changes
    Expected: Summary panel and row highlight stay in sync.

---

Great — here is **Set 3 of the 30-question React practice sheet**, covering **Problems 11–15** in the same detailed structure.

This set introduces a slightly wider range of React ideas, including:

* toggling favorites/bookmarks
* multiple filters working together
* `useRef` for DOM interaction
* `useEffect` with cleanup
* slightly richer component composition

---

# Problem 11: Saved Jobs Bookmark Board

## Problem Statement

You are building a **Saved Jobs Bookmark Board** for a job search platform. Users can browse job cards and bookmark jobs they want to revisit later.

Each job card should show a bookmark button. When the user clicks it, the job should switch between saved and unsaved states. The dashboard should also display how many jobs are currently saved.

This is a realistic feature because almost every job board, ecommerce app, content platform, or marketplace allows users to save items for later review. This problem helps students practice updating objects inside arrays, passing handlers through props, and deriving summary counts.

## Functional Requirements

1. Display a list of job cards.
2. Each job should include:

   * `id`
   * `company`
   * `role`
   * `saved`
3. Each job card should show a button:

   * `Save Job` if not saved
   * `Remove Saved` if already saved
4. Clicking the button should toggle the saved state for that job.
5. Saved jobs should appear visually different.
6. Show a summary count:

   * `Saved Jobs: X`
7. Use a child component to render each job card.

## Concepts Covered

* State
* Props
* `useState`
* List updates
* Conditional rendering
* Derived UI

## Hints

1. Keep the full jobs list in state.
2. Use `map()` to update only the clicked job.
3. The saved count can be derived using `filter()`.
4. Pass the job object and toggle handler into the child card component.
5. Let the button label depend on the `saved` value.

## Code Stub

```jsx
import React, { useState } from "react";

const initialJobs = [
  { id: 1, company: "Google", role: "Frontend Engineer", saved: false },
  { id: 2, company: "Amazon", role: "SDE 1", saved: true },
  { id: 3, company: "Notion", role: "Product Engineer", saved: false },
];

function JobCard({ job, onToggleSaved }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "12px", marginBottom: "10px" }}>
      <h4>{job.company}</h4>
      <p>{job.role}</p>
      <button onClick={() => onToggleSaved(job.id)}>
        {/* TODO */}
      </button>
    </div>
  );
}

export default function SavedJobsBoard() {
  const [jobs, setJobs] = useState(initialJobs);

  // TODO: implement toggle logic
  const handleToggleSaved = (id) => {};

  const savedCount = 0;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Saved Jobs</h2>
      <p>Saved Jobs: {savedCount}</p>

      {jobs.map((job) => (
        <JobCard key={job.id} job={job} onToggleSaved={handleToggleSaved} />
      ))}
    </div>
  );
}
```

## Full Solution

```jsx
import React, { useState } from "react";

const initialJobs = [
  { id: 1, company: "Google", role: "Frontend Engineer", saved: false },
  { id: 2, company: "Amazon", role: "SDE 1", saved: true },
  { id: 3, company: "Notion", role: "Product Engineer", saved: false },
];

function JobCard({ job, onToggleSaved }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "12px",
        marginBottom: "10px",
        borderRadius: "8px",
        backgroundColor: job.saved ? "#fff7e6" : "white",
      }}
    >
      <h4>{job.company}</h4>
      <p>{job.role}</p>
      <button onClick={() => onToggleSaved(job.id)}>
        {job.saved ? "Remove Saved" : "Save Job"}
      </button>
    </div>
  );
}

export default function SavedJobsBoard() {
  const [jobs, setJobs] = useState(initialJobs);

  const handleToggleSaved = (id) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id ? { ...job, saved: !job.saved } : job
      )
    );
  };

  const savedCount = jobs.filter((job) => job.saved).length;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Saved Jobs</h2>
      <p>Saved Jobs: {savedCount}</p>

      {jobs.map((job) => (
        <JobCard key={job.id} job={job} onToggleSaved={handleToggleSaved} />
      ))}
    </div>
  );
}
```

## Test Cases

1. Action: App loads
   Expected: All job cards are displayed.

2. Action: App loads
   Expected: Saved job count matches the initial data.

3. Action: User clicks `Save Job` on an unsaved job
   Expected: That job becomes saved.

4. Action: User clicks `Remove Saved` on a saved job
   Expected: That job becomes unsaved.

5. Action: A job becomes saved
   Expected: Its card styling changes to show saved state.

6. Action: User toggles a job
   Expected: Saved count updates correctly.

7. Action: User toggles the same job twice
   Expected: It returns to its original state.

8. Action: Button label changes
   Expected: It reflects the new saved status.

9. Action: User saves multiple jobs
   Expected: Saved count increases accordingly.

10. Action: User unsaves all saved jobs
    Expected: Saved count becomes 0.

---

# Problem 12: Product Catalog Search and Stock Filter

## Problem Statement

You are building a **Product Catalog Search and Stock Filter** for an ecommerce admin panel. The admin should be able to search products by name and also toggle whether they want to see only in-stock products.

This problem introduces the idea of applying **multiple filters together**. The visible list should depend on both the search text and the stock-only toggle.

This is a very realistic interaction pattern because most dashboards, admin tools, and catalog screens allow users to combine search and filters at the same time.

## Functional Requirements

1. Display a list of products.
2. Each product should include:

   * `id`
   * `name`
   * `category`
   * `inStock`
3. Add a search input for product name.
4. The search input should be a controlled component.
5. Add a checkbox:

   * `Show in-stock only`
6. The visible product list should update based on:

   * current search text
   * checkbox status
7. Matching search should be case-insensitive.
8. Show visible product count.
9. If no products match, show:

   * `No matching products found`

## Concepts Covered

* State
* `useState`
* Controlled components
* Multiple filters
* Derived UI
* Conditional rendering

## Hints

1. Keep search text and stock-only state separate.
2. Apply both conditions when deriving the visible list.
3. You can first filter by search and then by stock, or do both in one filter callback.
4. Use `checked` for checkbox state.
5. The visible count should come from the filtered list.

## Code Stub

```jsx
import React, { useState } from "react";

const products = [
  { id: 1, name: "Wireless Mouse", category: "Accessories", inStock: true },
  { id: 2, name: "Mechanical Keyboard", category: "Accessories", inStock: false },
  { id: 3, name: "Laptop Stand", category: "Office", inStock: true },
  { id: 4, name: "USB-C Hub", category: "Electronics", inStock: true },
];

export default function ProductSearchStockFilter() {
  const [search, setSearch] = useState("");
  const [showInStockOnly, setShowInStockOnly] = useState(false);

  // TODO: derive visible products using both filters
  const visibleProducts = products;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Product Catalog</h2>

      <input
        type="text"
        placeholder="Search products"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <label style={{ display: "block", marginTop: "10px" }}>
        <input
          type="checkbox"
          checked={showInStockOnly}
          onChange={(e) => setShowInStockOnly(e.target.checked)}
        />
        Show in-stock only
      </label>

      <p style={{ marginTop: "15px" }}>Visible Products: {visibleProducts.length}</p>

      {visibleProducts.map((product) => (
        <div key={product.id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
          <h4>{product.name}</h4>
          <p>{product.category}</p>
          <p>{product.inStock ? "In Stock" : "Out of Stock"}</p>
        </div>
      ))}
    </div>
  );
}
```

## Full Solution

```jsx
import React, { useState } from "react";

const products = [
  { id: 1, name: "Wireless Mouse", category: "Accessories", inStock: true },
  { id: 2, name: "Mechanical Keyboard", category: "Accessories", inStock: false },
  { id: 3, name: "Laptop Stand", category: "Office", inStock: true },
  { id: 4, name: "USB-C Hub", category: "Electronics", inStock: true },
];

export default function ProductSearchStockFilter() {
  const [search, setSearch] = useState("");
  const [showInStockOnly, setShowInStockOnly] = useState(false);

  const visibleProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStock = showInStockOnly ? product.inStock : true;

    return matchesSearch && matchesStock;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2>Product Catalog</h2>

      <input
        type="text"
        placeholder="Search products"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <label style={{ display: "block", marginTop: "10px" }}>
        <input
          type="checkbox"
          checked={showInStockOnly}
          onChange={(e) => setShowInStockOnly(e.target.checked)}
        />
        Show in-stock only
      </label>

      <p style={{ marginTop: "15px" }}>Visible Products: {visibleProducts.length}</p>

      {visibleProducts.length === 0 ? (
        <p>No matching products found</p>
      ) : (
        visibleProducts.map((product) => (
          <div
            key={product.id}
            style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px", borderRadius: "8px" }}
          >
            <h4>{product.name}</h4>
            <p>{product.category}</p>
            <p>{product.inStock ? "In Stock" : "Out of Stock"}</p>
          </div>
        ))
      )}
    </div>
  );
}
```

## Test Cases

1. Action: App loads
   Expected: All products are shown.

2. Action: User types `mouse`
   Expected: Only Wireless Mouse is visible.

3. Action: User checks `Show in-stock only`
   Expected: Out-of-stock products are hidden.

4. Action: User types `keyboard` while stock-only is checked
   Expected: No products are shown because keyboard is out of stock.

5. Action: User unchecks stock-only while `keyboard` search is active
   Expected: Mechanical Keyboard becomes visible.

6. Action: User clears search input
   Expected: All products matching stock toggle are shown.

7. Action: Search is case-insensitive
   Expected: Typing `LAPTOP` still matches Laptop Stand.

8. Action: No products match filters
   Expected: `No matching products found` is displayed.

9. Action: Filter conditions change
   Expected: Visible product count updates correctly.

10. Action: User toggles stock checkbox multiple times
    Expected: Visible list updates correctly each time.

---

# Problem 13: Auto Focus Search Bar

## Problem Statement

You are building a **Search Bar Widget** for a documentation portal. The product team wants the search input to automatically receive focus as soon as the widget appears, so the user can start typing immediately without clicking first.

This is a small but very realistic usability enhancement found in search overlays, login screens, dashboards, and command palettes. The purpose of this problem is to introduce students to **`useRef`** for DOM access and `useEffect` for performing an action after render.

## Functional Requirements

1. Show a search input.
2. Show a list of static documentation topics below it.
3. When the component first loads, the cursor should automatically focus the search input.
4. The search input should be controlled.
5. Filter topics based on the input value.
6. Matching should be case-insensitive.
7. Show:

   * `No topics found`
     when no topic matches.

## Concepts Covered

* State
* `useState`
* `useRef`
* `useEffect`
* Controlled components
* List filtering

## Hints

1. Create a ref and attach it to the input.
2. Use `useEffect` with an empty dependency array to focus the input once.
3. Keep the search value in state.
4. Use `filter()` to derive the visible topics.
5. `ref.current.focus()` is the key DOM interaction here.

## Code Stub

```jsx
import React, { useEffect, useRef, useState } from "react";

const topics = [
  "React Components",
  "Props and State",
  "useEffect Hook",
  "Context API",
  "React Router Basics",
];

export default function AutoFocusTopicSearch() {
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  // TODO: focus input on component mount
  useEffect(() => {
  }, []);

  // TODO: derive filtered topics
  const filteredTopics = topics;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Docs Search</h2>

      <input
        ref={inputRef}
        type="text"
        placeholder="Search topics"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={{ marginTop: "15px" }}>
        {filteredTopics.map((topic) => (
          <p key={topic}>{topic}</p>
        ))}
      </div>
    </div>
  );
}
```

## Full Solution

```jsx
import React, { useEffect, useRef, useState } from "react";

const topics = [
  "React Components",
  "Props and State",
  "useEffect Hook",
  "Context API",
  "React Router Basics",
];

export default function AutoFocusTopicSearch() {
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filteredTopics = topics.filter((topic) =>
    topic.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Docs Search</h2>

      <input
        ref={inputRef}
        type="text"
        placeholder="Search topics"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={{ marginTop: "15px" }}>
        {filteredTopics.length === 0 ? (
          <p>No topics found</p>
        ) : (
          filteredTopics.map((topic) => <p key={topic}>{topic}</p>)
        )}
      </div>
    </div>
  );
}
```

## Test Cases

1. Action: App loads
   Expected: Cursor is automatically placed inside the search input.

2. Action: User types `react`
   Expected: Matching React topics are shown.

3. Action: User types `effect`
   Expected: `useEffect Hook` is shown.

4. Action: User types `context`
   Expected: `Context API` is shown.

5. Action: Search is case-insensitive
   Expected: Typing `ROUTER` matches `React Router Basics`.

6. Action: User clears the search input
   Expected: All topics are visible again.

7. Action: User types text with no matches
   Expected: `No topics found` appears.

8. Action: App first loads
   Expected: Input is focused before user clicks anything.

9. Action: Search text changes
   Expected: Filtered topic list updates immediately.

10. Action: Input remains controlled
    Expected: Typed text always matches component state.

---

# Problem 14: Flash Sale Countdown Banner

## Problem Statement

You are building a **Flash Sale Countdown Banner** for an ecommerce homepage. The banner should start with a countdown of 10 seconds and update every second until it reaches 0.

Once the timer reaches 0, the message should change to `Sale ended`. This simulates a simple live-updating UI feature found in marketplaces, travel sites, booking apps, and promotional dashboards.

This problem helps students practice `useEffect`, intervals, cleanup, and time-based state updates.

## Functional Requirements

1. Display a countdown starting from 10.
2. Decrease the value by 1 every second.
3. Use `useEffect` to start the interval.
4. Stop the countdown when it reaches 0.
5. When countdown is greater than 0, show:

   * `Flash sale ends in X seconds`
6. When countdown reaches 0, show:

   * `Sale ended`
7. Clear the interval properly.

## Concepts Covered

* State
* `useState`
* `useEffect`
* Intervals
* Cleanup function
* Conditional rendering

## Hints

1. Use `setInterval()` inside `useEffect`.
2. Clear the interval in the cleanup function.
3. You can decrease state using the updater callback.
4. Make sure the countdown does not go below 0.
5. The displayed message can be derived from the countdown value.

## Code Stub

```jsx
import React, { useEffect, useState } from "react";

export default function FlashSaleCountdown() {
  const [secondsLeft, setSecondsLeft] = useState(10);

  // TODO: start countdown interval
  useEffect(() => {
  }, []);

  return (
    <div style={{ padding: "20px", border: "1px solid #ddd" }}>
      <h2>Flash Sale Banner</h2>
      <p>
        {/* TODO: render countdown text */}
      </p>
    </div>
  );
}
```

## Full Solution

```jsx
import React, { useEffect, useState } from "react";

export default function FlashSaleCountdown() {
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2>Flash Sale Banner</h2>
      <p>
        {secondsLeft > 0
          ? `Flash sale ends in ${secondsLeft} seconds`
          : "Sale ended"}
      </p>
    </div>
  );
}
```

## Test Cases

1. Action: App loads
   Expected: Countdown starts at 10 seconds.

2. Action: 1 second passes
   Expected: Countdown becomes 9.

3. Action: Several seconds pass
   Expected: Countdown decreases by 1 each second.

4. Action: Countdown reaches 1
   Expected: Next update changes it to 0.

5. Action: Countdown reaches 0
   Expected: Message changes to `Sale ended`.

6. Action: Countdown reaches 0
   Expected: It does not go below 0.

7. Action: Component unmounts before countdown ends
   Expected: Interval is cleared in cleanup.

8. Action: Countdown is active
   Expected: Message shows remaining seconds.

9. Action: Countdown ends
   Expected: Interval stops running.

10. Action: UI rerenders over time
    Expected: Updated countdown text appears without manual refresh.

---

# Problem 15: Expandable Team Details Cards

## Problem Statement

You are building an **Expandable Team Details** section for a company directory. The directory initially shows each employee’s name and role. When the user clicks **View Details** on a card, additional information such as department and location should appear for that employee.

Each card should manage its expansion based on state stored in the parent list component. This problem is useful because expandable cards are extremely common in dashboards, admin panels, profile pages, and internal tools.

This exercise helps students practice list updates, conditional rendering, and slightly richer component composition.

## Functional Requirements

1. Display a list of employee cards.
2. Each employee should include:

   * `id`
   * `name`
   * `role`
   * `department`
   * `location`
   * `showDetails`
3. By default, employee cards should show:

   * name
   * role
4. Each card should have a button:

   * `View Details` if collapsed
   * `Hide Details` if expanded
5. Clicking the button should toggle details for that specific employee only.
6. When expanded, show:

   * department
   * location
7. Use a child component to render each employee card.

## Concepts Covered

* State
* Props
* `useState`
* List updates
* Conditional rendering
* Component composition

## Hints

1. Keep the employees array in state.
2. Toggle only the clicked employee’s `showDetails` value.
3. Render extra content only when `showDetails` is true.
4. Button text should depend on current expansion state.
5. Each card should receive its own employee object via props.

## Code Stub

```jsx
import React, { useState } from "react";

const initialEmployees = [
  {
    id: 1,
    name: "Rohan Mehta",
    role: "Software Engineer",
    department: "Engineering",
    location: "Bangalore",
    showDetails: false,
  },
  {
    id: 2,
    name: "Aisha Khan",
    role: "Product Manager",
    department: "Product",
    location: "Mumbai",
    showDetails: false,
  },
];

function EmployeeCard({ employee, onToggleDetails }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "12px", marginBottom: "10px" }}>
      <h4>{employee.name}</h4>
      <p>{employee.role}</p>

      {/* TODO: show more info conditionally */}

      <button onClick={() => onToggleDetails(employee.id)}>
        {/* TODO */}
      </button>
    </div>
  );
}

export default function ExpandableTeamCards() {
  const [employees, setEmployees] = useState(initialEmployees);

  // TODO: implement toggle logic
  const handleToggleDetails = (id) => {};

  return (
    <div style={{ padding: "20px" }}>
      <h2>Team Directory</h2>

      {employees.map((employee) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          onToggleDetails={handleToggleDetails}
        />
      ))}
    </div>
  );
}
```

## Full Solution

```jsx
import React, { useState } from "react";

const initialEmployees = [
  {
    id: 1,
    name: "Rohan Mehta",
    role: "Software Engineer",
    department: "Engineering",
    location: "Bangalore",
    showDetails: false,
  },
  {
    id: 2,
    name: "Aisha Khan",
    role: "Product Manager",
    department: "Product",
    location: "Mumbai",
    showDetails: false,
  },
];

function EmployeeCard({ employee, onToggleDetails }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "12px", marginBottom: "10px", borderRadius: "8px" }}>
      <h4>{employee.name}</h4>
      <p>{employee.role}</p>

      {employee.showDetails && (
        <div>
          <p>Department: {employee.department}</p>
          <p>Location: {employee.location}</p>
        </div>
      )}

      <button onClick={() => onToggleDetails(employee.id)}>
        {employee.showDetails ? "Hide Details" : "View Details"}
      </button>
    </div>
  );
}

export default function ExpandableTeamCards() {
  const [employees, setEmployees] = useState(initialEmployees);

  const handleToggleDetails = (id) => {
    setEmployees((prev) =>
      prev.map((employee) =>
        employee.id === id
          ? { ...employee, showDetails: !employee.showDetails }
          : employee
      )
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Team Directory</h2>

      {employees.map((employee) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          onToggleDetails={handleToggleDetails}
        />
      ))}
    </div>
  );
}
```

## Test Cases

1. Action: App loads
   Expected: Employee cards show only name and role by default.

2. Action: User clicks `View Details` on first employee
   Expected: Department and location appear for the first employee.

3. Action: User clicks `Hide Details` on the same employee
   Expected: Extra details disappear.

4. Action: User clicks `View Details` on second employee
   Expected: Only second employee’s details expand.

5. Action: First employee is expanded and user expands second
   Expected: Both can remain expanded if toggled separately.

6. Action: Button text changes after toggle
   Expected: It switches between `View Details` and `Hide Details`.

7. Action: Non-clicked employee cards
   Expected: Their state remains unchanged.

8. Action: Expanded employee card renders
   Expected: Department and location are visible.

9. Action: User toggles same card multiple times
   Expected: Expansion state changes correctly every time.

10. Action: Each card renders
    Expected: Name, role, and correct action button are visible.

---
Excellent — here is **Set 4 of the 30-question React practice sheet**, covering **Problems 16–20** in the same detailed format.

This set begins the transition from foundational React into **practical intermediate React**, especially:

* `useMemo`
* `useCallback`
* derived summaries
* shared state with `Context API`
* reusable child components with more structured parent logic
* performance-aware thinking at a beginner-friendly level

---

# Problem 16: Expense Dashboard with Category Summary

## Problem Statement

You are building an **Expense Dashboard** for a personal finance app. The app displays a list of expenses, and users can filter them by category such as Food, Travel, or Bills.

In addition to showing the filtered list, the dashboard should also show the **total amount** of the currently visible expenses. Since the visible list and total are both derived from filters, this is a good place to introduce `useMemo`.

This is a realistic feature because finance apps, admin dashboards, and reporting tools often derive filtered lists and summary numbers from the same data source.

## Functional Requirements

1. Display a list of expenses.
2. Each expense should include:

   * `id`
   * `title`
   * `category`
   * `amount`
3. Add category filter buttons:

   * All
   * Food
   * Travel
   * Bills
4. By default, show all expenses.
5. Clicking a category should filter the list.
6. Show the total amount of the **currently visible** expenses.
7. Use `useMemo` for:

   * filtered expenses
   * visible total amount
8. Highlight the active filter button.
9. Show:

   * `No expenses found`
     if the selected category has no matching items.

## Concepts Covered

* State
* `useState`
* `useMemo`
* List filtering
* Derived UI
* Conditional rendering

## Hints

1. The selected category belongs in state.
2. The filtered list can be memoized based on the expense list and active category.
3. The total amount can also be derived from the filtered list.
4. `useMemo` is useful when derived values are recalculated from the same inputs.
5. Keep the original expense list unchanged.

## Code Stub

```jsx
import React, { useMemo, useState } from "react";

const expenses = [
  { id: 1, title: "Lunch", category: "Food", amount: 250 },
  { id: 2, title: "Cab Ride", category: "Travel", amount: 480 },
  { id: 3, title: "Electricity Bill", category: "Bills", amount: 1800 },
  { id: 4, title: "Coffee", category: "Food", amount: 180 },
];

export default function ExpenseDashboard() {
  const [activeCategory, setActiveCategory] = useState("All");

  // TODO: memoize filtered expenses
  const visibleExpenses = useMemo(() => {
    return expenses;
  }, []);

  // TODO: memoize total amount
  const totalAmount = useMemo(() => {
    return 0;
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Expense Dashboard</h2>

      <button onClick={() => setActiveCategory("All")}>All</button>
      <button onClick={() => setActiveCategory("Food")} style={{ marginLeft: "10px" }}>
        Food
      </button>
      <button onClick={() => setActiveCategory("Travel")} style={{ marginLeft: "10px" }}>
        Travel
      </button>
      <button onClick={() => setActiveCategory("Bills")} style={{ marginLeft: "10px" }}>
        Bills
      </button>

      <p style={{ marginTop: "15px" }}>Visible Total: ₹{totalAmount}</p>

      <div style={{ marginTop: "15px" }}>
        {visibleExpenses.map((expense) => (
          <div key={expense.id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
            <h4>{expense.title}</h4>
            <p>{expense.category}</p>
            <p>₹{expense.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Full Solution

```jsx
import React, { useMemo, useState } from "react";

const expenses = [
  { id: 1, title: "Lunch", category: "Food", amount: 250 },
  { id: 2, title: "Cab Ride", category: "Travel", amount: 480 },
  { id: 3, title: "Electricity Bill", category: "Bills", amount: 1800 },
  { id: 4, title: "Coffee", category: "Food", amount: 180 },
];

export default function ExpenseDashboard() {
  const [activeCategory, setActiveCategory] = useState("All");

  const visibleExpenses = useMemo(() => {
    return activeCategory === "All"
      ? expenses
      : expenses.filter((expense) => expense.category === activeCategory);
  }, [activeCategory]);

  const totalAmount = useMemo(() => {
    return visibleExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [visibleExpenses]);

  const getButtonStyle = (category) => ({
    backgroundColor: activeCategory === category ? "#ddd" : "white",
    padding: "8px 12px",
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2>Expense Dashboard</h2>

      <button onClick={() => setActiveCategory("All")} style={getButtonStyle("All")}>
        All
      </button>
      <button onClick={() => setActiveCategory("Food")} style={{ ...getButtonStyle("Food"), marginLeft: "10px" }}>
        Food
      </button>
      <button onClick={() => setActiveCategory("Travel")} style={{ ...getButtonStyle("Travel"), marginLeft: "10px" }}>
        Travel
      </button>
      <button onClick={() => setActiveCategory("Bills")} style={{ ...getButtonStyle("Bills"), marginLeft: "10px" }}>
        Bills
      </button>

      <p style={{ marginTop: "15px" }}>Visible Total: ₹{totalAmount}</p>

      <div style={{ marginTop: "15px" }}>
        {visibleExpenses.length === 0 ? (
          <p>No expenses found</p>
        ) : (
          visibleExpenses.map((expense) => (
            <div
              key={expense.id}
              style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px", borderRadius: "8px" }}
            >
              <h4>{expense.title}</h4>
              <p>{expense.category}</p>
              <p>₹{expense.amount}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
```

## Test Cases

1. Action: App loads
   Expected: All expenses are visible.

2. Action: User clicks `Food`
   Expected: Only food expenses are displayed.

3. Action: User clicks `Travel`
   Expected: Only travel expenses are displayed.

4. Action: User clicks `Bills`
   Expected: Only bill expenses are displayed.

5. Action: User clicks `All`
   Expected: Full list is shown again.

6. Action: Filter changes
   Expected: Visible total updates to match the filtered list.

7. Action: `Food` filter is active
   Expected: Total equals the sum of only food expenses.

8. Action: Active category changes
   Expected: Correct button is highlighted.

9. Action: No expenses match the category
   Expected: `No expenses found` appears.

10. Action: Visible list changes
    Expected: Total amount always matches the rendered cards.

---

# Problem 17: Course Progress Cards with Stable Action Handlers

## Problem Statement

You are building a **Course Progress Board** for an online learning platform. Each course card shows whether the course is completed or still in progress. Users can click a button on a course card to toggle completion status.

Because the toggle handler is passed into multiple child cards, this is a good place to introduce `useCallback`. The main goal is still functional correctness, but students should begin understanding that stable event handlers can be helpful when child components depend on function props.

This problem is realistic because learning platforms, productivity tools, and admin dashboards commonly update item status through reusable child components.

## Functional Requirements

1. Display a list of courses.
2. Each course should have:

   * `id`
   * `title`
   * `completed`
3. Show each course inside a child component.
4. Each course card should have a button:

   * `Mark Completed` if incomplete
   * `Mark Incomplete` if completed
5. Clicking the button should toggle the completion status.
6. Completed courses should have different styling.
7. Show a summary:

   * total courses
   * completed courses
8. Use `useCallback` for the toggle handler passed to child components.

## Concepts Covered

* State
* Props
* `useState`
* `useCallback`
* List updates
* Derived UI
* Conditional styling

## Hints

1. Keep the course list in state.
2. The child card should remain presentation-focused.
3. Use `map()` to update the clicked course.
4. `useCallback` can wrap the toggle function so its reference remains stable.
5. The summary count should be derived from current state.

## Code Stub

```jsx
import React, { useCallback, useState } from "react";

const initialCourses = [
  { id: 1, title: "React Basics", completed: false },
  { id: 2, title: "Node.js Fundamentals", completed: true },
  { id: 3, title: "System Design Intro", completed: false },
];

function CourseCard({ course, onToggle }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "12px", marginBottom: "10px" }}>
      <h4>{course.title}</h4>
      <p>Status: {course.completed ? "Completed" : "In Progress"}</p>
      <button onClick={() => onToggle(course.id)}>
        {/* TODO */}
      </button>
    </div>
  );
}

export default function CourseProgressBoard() {
  const [courses, setCourses] = useState(initialCourses);

  // TODO: wrap with useCallback
  const handleToggle = useCallback((id) => {
  }, []);

  const completedCount = 0;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Course Progress Board</h2>
      <p>Total Courses: {courses.length}</p>
      <p>Completed Courses: {completedCount}</p>

      {courses.map((course) => (
        <CourseCard key={course.id} course={course} onToggle={handleToggle} />
      ))}
    </div>
  );
}
```

## Full Solution

```jsx
import React, { useCallback, useState } from "react";

const initialCourses = [
  { id: 1, title: "React Basics", completed: false },
  { id: 2, title: "Node.js Fundamentals", completed: true },
  { id: 3, title: "System Design Intro", completed: false },
];

function CourseCard({ course, onToggle }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "12px",
        marginBottom: "10px",
        borderRadius: "8px",
        backgroundColor: course.completed ? "#eafbea" : "white",
      }}
    >
      <h4>{course.title}</h4>
      <p>Status: {course.completed ? "Completed" : "In Progress"}</p>
      <button onClick={() => onToggle(course.id)}>
        {course.completed ? "Mark Incomplete" : "Mark Completed"}
      </button>
    </div>
  );
}

export default function CourseProgressBoard() {
  const [courses, setCourses] = useState(initialCourses);

  const handleToggle = useCallback((id) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === id
          ? { ...course, completed: !course.completed }
          : course
      )
    );
  }, []);

  const completedCount = courses.filter((course) => course.completed).length;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Course Progress Board</h2>
      <p>Total Courses: {courses.length}</p>
      <p>Completed Courses: {completedCount}</p>

      {courses.map((course) => (
        <CourseCard key={course.id} course={course} onToggle={handleToggle} />
      ))}
    </div>
  );
}
```

## Test Cases

1. Action: App loads
   Expected: All course cards are shown.

2. Action: Completed course renders
   Expected: It shows completed styling and `Mark Incomplete`.

3. Action: Incomplete course renders
   Expected: It shows in-progress styling and `Mark Completed`.

4. Action: User clicks `Mark Completed` on an incomplete course
   Expected: Course becomes completed.

5. Action: User clicks `Mark Incomplete` on a completed course
   Expected: Course becomes incomplete.

6. Action: Course status changes
   Expected: Completed count updates correctly.

7. Action: User toggles the same course twice
   Expected: It returns to its original state.

8. Action: Total courses are shown
   Expected: Count matches the number of cards rendered.

9. Action: Child cards receive handler via props
   Expected: Clicking their button updates the correct course only.

10. Action: Multiple courses are toggled
    Expected: Summary and styling remain accurate.

---

# Problem 18: Theme Preference Center with Context API

## Problem Statement

You are building a **Theme Preference Center** for a dashboard application. The app contains multiple nested components, and they all need access to the same theme setting.

Instead of passing theme props manually through many component levels, the application should use **Context API**. A user should be able to toggle between light mode and dark mode from one component, and another component should reflect the updated theme immediately.

This is a realistic feature because theme, language, user preferences, and auth data are all common examples of shared state in React apps.

## Functional Requirements

1. Create a theme context.
2. The context should provide:

   * current theme (`light` or `dark`)
   * a toggle function
3. Build at least three components:

   * `ThemeProvider`
   * `ThemeSwitcher`
   * `ThemePreviewCard`
4. `ThemeSwitcher` should allow the user to toggle the theme.
5. `ThemePreviewCard` should display the current theme.
6. The preview card’s styling should change based on the theme.
7. Shared state should be stored in the provider, not in child components.

## Concepts Covered

* State
* `useState`
* Context API
* Props
* Shared state
* Conditional styling

## Hints

1. Create the context outside the components.
2. The provider should own the actual theme state.
3. Expose both the current theme and the toggle function in context.
4. Consume context inside nested components with `useContext`.
5. This problem is about avoiding prop drilling.

## Code Stub

```jsx
import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  // TODO: create theme state
  // TODO: create toggle function

  return (
    <ThemeContext.Provider value={{}}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemeSwitcher() {
  // TODO: consume theme context
  return <button>Toggle Theme</button>;
}

function ThemePreviewCard() {
  // TODO: consume theme context
  return (
    <div style={{ padding: "20px", marginTop: "20px" }}>
      <h3>Theme Preview</h3>
      <p>Current theme:</p>
    </div>
  );
}

function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Theme Preference Center</h2>
      <ThemeSwitcher />
      <ThemePreviewCard />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}
```

## Full Solution

```jsx
import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemeSwitcher() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme}>
      {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    </button>
  );
}

function ThemePreviewCard() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      style={{
        padding: "20px",
        marginTop: "20px",
        borderRadius: "8px",
        backgroundColor: theme === "dark" ? "#222" : "#f5f5f5",
        color: theme === "dark" ? "#fff" : "#000",
      }}
    >
      <h3>Theme Preview</h3>
      <p>Current theme: {theme}</p>
    </div>
  );
}

function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Theme Preference Center</h2>
      <ThemeSwitcher />
      <ThemePreviewCard />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}
```

## Test Cases

1. Action: App loads
   Expected: Default theme is light.

2. Action: User clicks theme toggle
   Expected: Theme changes from light to dark.

3. Action: User clicks toggle again
   Expected: Theme changes from dark to light.

4. Action: Theme is dark
   Expected: Preview card uses dark styling.

5. Action: Theme is light
   Expected: Preview card uses light styling.

6. Action: Theme changes in switcher
   Expected: Preview card updates immediately.

7. Action: Provider stores theme state
   Expected: Child components consume the same shared value.

8. Action: Button label updates
   Expected: It changes based on current theme.

9. Action: Nested components render
   Expected: They can access theme without prop drilling.

10. Action: User toggles multiple times
    Expected: UI remains synchronized across all consumers.

---

# Problem 19: Searchable Employee Directory with Memoized Filtering

## Problem Statement

You are building a **Searchable Employee Directory** for a company intranet. The directory contains a moderately large list of employees, and users should be able to search by name or department.

Because the visible employee list is derived from search input, this is a good place to use `useMemo` so the filtering logic is only recalculated when relevant inputs change.

This mirrors real-world dashboards and admin tools where filtering large lists is common and developers need to think about efficient derived computations.

## Functional Requirements

1. Display a list of employees.
2. Each employee should include:

   * `id`
   * `name`
   * `department`
3. Add a search input.
4. The search input should be controlled.
5. Search should match either:

   * employee name
   * department
6. Matching should be case-insensitive.
7. Use `useMemo` for the filtered list.
8. Show visible result count.
9. If nothing matches, show:

   * `No employees found`

## Concepts Covered

* State
* `useState`
* Controlled components
* `useMemo`
* Filtering by multiple fields
* Derived UI

## Hints

1. Keep search text in state.
2. Use `useMemo` around the filter logic.
3. Check both name and department in the same filter callback.
4. Convert everything to lowercase for case-insensitive comparison.
5. Result count should come from the memoized array.

## Code Stub

```jsx
import React, { useMemo, useState } from "react";

const employees = [
  { id: 1, name: "Riya Sharma", department: "Engineering" },
  { id: 2, name: "Aman Verma", department: "Design" },
  { id: 3, name: "Kabir Khanna", department: "Engineering" },
  { id: 4, name: "Neha Rao", department: "HR" },
];

export default function EmployeeDirectory() {
  const [search, setSearch] = useState("");

  // TODO: memoize filtered employees
  const visibleEmployees = useMemo(() => {
    return employees;
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Employee Directory</h2>

      <input
        type="text"
        placeholder="Search by name or department"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p style={{ marginTop: "15px" }}>Visible Employees: {visibleEmployees.length}</p>

      <div style={{ marginTop: "15px" }}>
        {visibleEmployees.map((employee) => (
          <div key={employee.id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
            <h4>{employee.name}</h4>
            <p>{employee.department}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Full Solution

```jsx
import React, { useMemo, useState } from "react";

const employees = [
  { id: 1, name: "Riya Sharma", department: "Engineering" },
  { id: 2, name: "Aman Verma", department: "Design" },
  { id: 3, name: "Kabir Khanna", department: "Engineering" },
  { id: 4, name: "Neha Rao", department: "HR" },
];

export default function EmployeeDirectory() {
  const [search, setSearch] = useState("");

  const visibleEmployees = useMemo(() => {
    const query = search.toLowerCase();

    return employees.filter((employee) => {
      return (
        employee.name.toLowerCase().includes(query) ||
        employee.department.toLowerCase().includes(query)
      );
    });
  }, [search]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Employee Directory</h2>

      <input
        type="text"
        placeholder="Search by name or department"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p style={{ marginTop: "15px" }}>Visible Employees: {visibleEmployees.length}</p>

      <div style={{ marginTop: "15px" }}>
        {visibleEmployees.length === 0 ? (
          <p>No employees found</p>
        ) : (
          visibleEmployees.map((employee) => (
            <div
              key={employee.id}
              style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px", borderRadius: "8px" }}
            >
              <h4>{employee.name}</h4>
              <p>{employee.department}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
```

## Test Cases

1. Action: App loads
   Expected: All employees are visible.

2. Action: User types `riya`
   Expected: Only Riya Sharma is shown.

3. Action: User types `engineering`
   Expected: All engineering employees are shown.

4. Action: User types `design`
   Expected: Only Aman Verma is shown.

5. Action: Search is case-insensitive
   Expected: Typing `HR` still matches HR.

6. Action: User clears search
   Expected: Full employee list returns.

7. Action: User types a non-matching term
   Expected: `No employees found` is shown.

8. Action: Search changes
   Expected: Visible employee count updates correctly.

9. Action: Search matches department but not name
   Expected: Matching employees are still shown.

10. Action: Filtered list is derived with `useMemo`
    Expected: It recalculates only when search changes.

---

# Problem 20: Sidebar Collapse Manager with Shared Context

## Problem Statement

You are building a **Sidebar Collapse Manager** for an admin dashboard. The dashboard layout includes a sidebar and a content area. A button in the header should collapse or expand the sidebar, and both the header and sidebar should always reflect the same state.

Because the same UI state is needed in multiple nested places, this is a practical use case for **Context API**. The sidebar state should be stored in one place and consumed wherever needed.

This kind of layout state management is very common in SaaS apps, admin panels, CRMs, and analytics dashboards.

## Functional Requirements

1. Create a sidebar context.
2. Store:

   * whether the sidebar is collapsed
   * a function to toggle it
3. Create these components:

   * `SidebarProvider`
   * `Header`
   * `Sidebar`
   * `DashboardLayout`
4. The header should contain a button to toggle sidebar state.
5. The sidebar should display:

   * `Expanded Sidebar` when open
   * `Collapsed Sidebar` when collapsed
6. Sidebar width/styling should visually change based on state.
7. Shared state should be managed by context provider.

## Concepts Covered

* State
* `useState`
* Context API
* Shared layout state
* Conditional rendering
* Conditional styling

## Hints

1. Create a context and provider similar to other shared-state examples.
2. The provider should own the collapsed boolean.
3. The header only needs the toggle function and maybe current state label.
4. The sidebar should consume the shared state directly.
5. This is another example of avoiding prop drilling.

## Code Stub

```jsx
import React, { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

function SidebarProvider({ children }) {
  // TODO: create collapsed state and toggle function

  return (
    <SidebarContext.Provider value={{}}>
      {children}
    </SidebarContext.Provider>
  );
}

function Header() {
  // TODO: consume sidebar context
  return <button>Toggle Sidebar</button>;
}

function Sidebar() {
  // TODO: consume sidebar context
  return <div>Sidebar</div>;
}

function DashboardLayout() {
  return (
    <div style={{ padding: "20px" }}>
      <Header />
      <div style={{ display: "flex", marginTop: "20px", gap: "20px" }}>
        <Sidebar />
        <div style={{ flex: 1, border: "1px solid #ddd", padding: "20px" }}>
          Main Content Area
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <SidebarProvider>
      <DashboardLayout />
    </SidebarProvider>
  );
}
```

## Full Solution

```jsx
import React, { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

function SidebarProvider({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ collapsed, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

function Header() {
  const { collapsed, toggleSidebar } = useContext(SidebarContext);

  return (
    <button onClick={toggleSidebar}>
      {collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
    </button>
  );
}

function Sidebar() {
  const { collapsed } = useContext(SidebarContext);

  return (
    <div
      style={{
        width: collapsed ? "100px" : "220px",
        border: "1px solid #ddd",
        padding: "20px",
        transition: "0.2s",
      }}
    >
      {collapsed ? "Collapsed Sidebar" : "Expanded Sidebar"}
    </div>
  );
}

function DashboardLayout() {
  return (
    <div style={{ padding: "20px" }}>
      <Header />
      <div style={{ display: "flex", marginTop: "20px", gap: "20px" }}>
        <Sidebar />
        <div style={{ flex: 1, border: "1px solid #ddd", padding: "20px" }}>
          Main Content Area
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <SidebarProvider>
      <DashboardLayout />
    </SidebarProvider>
  );
}
```

## Test Cases

1. Action: App loads
   Expected: Sidebar starts expanded by default.

2. Action: User clicks `Collapse Sidebar`
   Expected: Sidebar switches to collapsed state.

3. Action: User clicks `Expand Sidebar`
   Expected: Sidebar returns to expanded state.

4. Action: Sidebar is expanded
   Expected: Header button text says `Collapse Sidebar`.

5. Action: Sidebar is collapsed
   Expected: Header button text says `Expand Sidebar`.

6. Action: Sidebar state changes
   Expected: Sidebar width updates visually.

7. Action: Sidebar is collapsed
   Expected: It shows `Collapsed Sidebar`.

8. Action: Sidebar is expanded
   Expected: It shows `Expanded Sidebar`.

9. Action: Header and sidebar consume same context
   Expected: Both always stay synchronized.

10. Action: User toggles repeatedly
    Expected: Layout remains stable and consistent.

---

Great — here is **Set 5 of the 30-question React practice sheet**, covering **Problems 21–25** in the same detailed format.

This set pushes the sheet further into **practical intermediate React**, especially:

* combining search + sort
* `useRef` for previous value tracking
* timer controls with pause/resume
* richer parent-child composition
* realistic dashboard-style UI behavior

---

# Problem 21: Candidate Pipeline Search and Sort Board

## Problem Statement

You are building a **Candidate Pipeline Board** for a hiring dashboard. Recruiters should be able to search candidates by name and also sort the visible candidates by experience.

This mirrors real recruiter dashboards where users narrow down a list using search and then change the ordering to inspect the strongest or most junior candidates first.

This problem helps students practice combining **controlled input**, **search filtering**, **sorting**, and **derived UI** in one screen.

## Functional Requirements

1. Display a list of candidates.
2. Each candidate should include:

   * `id`
   * `name`
   * `role`
   * `yearsOfExperience`
3. Add a controlled search input to filter by candidate name.
4. Add a sort dropdown with options:

   * Default
   * Experience: Low to High
   * Experience: High to Low
5. Filtering should be case-insensitive.
6. Sorting should apply to the filtered list.
7. Show the count of visible candidates.
8. If no candidates match the search, show:

   * `No candidates found`

## Concepts Covered

* State
* `useState`
* Controlled components
* Search + sort combination
* Derived UI
* Conditional rendering

## Hints

1. Keep search and sort selection as separate pieces of state.
2. First filter the candidates, then sort the filtered result.
3. Create a copy of the filtered array before sorting.
4. Default sort should preserve the original ordering.
5. Visible count should come from the final rendered array.

## Code Stub

```jsx
import React, { useState } from "react";

const candidates = [
  { id: 1, name: "Riya Sharma", role: "Frontend Engineer", yearsOfExperience: 2 },
  { id: 2, name: "Aman Verma", role: "Backend Engineer", yearsOfExperience: 5 },
  { id: 3, name: "Neha Rao", role: "Product Designer", yearsOfExperience: 3 },
  { id: 4, name: "Kabir Jain", role: "Full Stack Engineer", yearsOfExperience: 1 },
];

export default function CandidatePipelineBoard() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");

  // TODO: derive visibleCandidates using search + sort
  const visibleCandidates = candidates;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Candidate Pipeline</h2>

      <input
        type="text"
        placeholder="Search candidates"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        style={{ marginLeft: "10px" }}
      >
        <option value="default">Default</option>
        <option value="exp-asc">Experience: Low to High</option>
        <option value="exp-desc">Experience: High to Low</option>
      </select>

      <p style={{ marginTop: "15px" }}>
        Visible Candidates: {visibleCandidates.length}
      </p>

      <div style={{ marginTop: "15px" }}>
        {visibleCandidates.map((candidate) => (
          <div key={candidate.id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
            <h4>{candidate.name}</h4>
            <p>{candidate.role}</p>
            <p>{candidate.yearsOfExperience} years experience</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Full Solution

```jsx
import React, { useState } from "react";

const candidates = [
  { id: 1, name: "Riya Sharma", role: "Frontend Engineer", yearsOfExperience: 2 },
  { id: 2, name: "Aman Verma", role: "Backend Engineer", yearsOfExperience: 5 },
  { id: 3, name: "Neha Rao", role: "Product Designer", yearsOfExperience: 3 },
  { id: 4, name: "Kabir Jain", role: "Full Stack Engineer", yearsOfExperience: 1 },
];

export default function CandidatePipelineBoard() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const visibleCandidates = [...candidates]
    .filter((candidate) =>
      candidate.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "exp-asc") {
        return a.yearsOfExperience - b.yearsOfExperience;
      }

      if (sortBy === "exp-desc") {
        return b.yearsOfExperience - a.yearsOfExperience;
      }

      return 0;
    });

  return (
    <div style={{ padding: "20px" }}>
      <h2>Candidate Pipeline</h2>

      <input
        type="text"
        placeholder="Search candidates"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        style={{ marginLeft: "10px" }}
      >
        <option value="default">Default</option>
        <option value="exp-asc">Experience: Low to High</option>
        <option value="exp-desc">Experience: High to Low</option>
      </select>

      <p style={{ marginTop: "15px" }}>
        Visible Candidates: {visibleCandidates.length}
      </p>

      <div style={{ marginTop: "15px" }}>
        {visibleCandidates.length === 0 ? (
          <p>No candidates found</p>
        ) : (
          visibleCandidates.map((candidate) => (
            <div
              key={candidate.id}
              style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px", borderRadius: "8px" }}
            >
              <h4>{candidate.name}</h4>
              <p>{candidate.role}</p>
              <p>{candidate.yearsOfExperience} years experience</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
```

## Test Cases

1. Action: App loads
   Expected: All candidates are visible in default order.

2. Action: User types `riya`
   Expected: Only Riya Sharma is shown.

3. Action: User types `a`
   Expected: Candidates whose names contain `a` are shown.

4. Action: User selects `Experience: Low to High`
   Expected: Visible candidates are sorted by increasing experience.

5. Action: User selects `Experience: High to Low`
   Expected: Visible candidates are sorted by decreasing experience.

6. Action: User searches and sorts together
   Expected: Sorting applies only to the filtered results.

7. Action: User clears search
   Expected: Full list returns, with current sort still applied.

8. Action: Search text has no matches
   Expected: `No candidates found` is shown.

9. Action: Sort is set to default
   Expected: Original order is preserved.

10. Action: Visible list changes
    Expected: Visible count updates correctly.

---

# Problem 22: Live Score Change Tracker with Previous Value

## Problem Statement

You are building a **Live Score Change Tracker** for a sports dashboard. The UI should display the current score and also show what the previous score was before the latest update.

Every time the user clicks **Increase Score**, the current score should go up by 1 and the previously displayed score should be stored and shown separately.

This is a good practical case for introducing **`useRef` to track previous values** without using extra state for rerender-driven logic. Tracking previous values is a common pattern in analytics dashboards, financial tools, and monitoring screens.

## Functional Requirements

1. Display:

   * current score
   * previous score
2. Add an **Increase Score** button.
3. Each click should:

   * store the old score as previous score
   * increase the current score by 1
4. Initially:

   * current score should be 0
   * previous score should show `N/A`
5. Use `useRef` to track previous score.
6. Do not store previous score in a separate `useState`.

## Concepts Covered

* State
* `useState`
* `useRef`
* Previous value tracking
* Event handling
* Derived display

## Hints

1. Keep the current score in state.
2. Before updating state, store the current value in the ref.
3. A ref update does not cause a rerender by itself.
4. The rerender will happen because current score state changes.
5. Display `N/A` when the ref value is still `null`.

## Code Stub

```jsx
import React, { useRef, useState } from "react";

export default function ScoreChangeTracker() {
  const [score, setScore] = useState(0);
  const previousScoreRef = useRef(null);

  // TODO: update previous score using ref
  const handleIncreaseScore = () => {};

  return (
    <div style={{ padding: "20px" }}>
      <h2>Live Score Tracker</h2>
      <p>Current Score: {score}</p>
      <p>Previous Score: {/* TODO */}</p>

      <button onClick={handleIncreaseScore}>Increase Score</button>
    </div>
  );
}
```

## Full Solution

```jsx
import React, { useRef, useState } from "react";

export default function ScoreChangeTracker() {
  const [score, setScore] = useState(0);
  const previousScoreRef = useRef(null);

  const handleIncreaseScore = () => {
    previousScoreRef.current = score;
    setScore((prev) => prev + 1);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Live Score Tracker</h2>
      <p>Current Score: {score}</p>
      <p>
        Previous Score:{" "}
        {previousScoreRef.current === null ? "N/A" : previousScoreRef.current}
      </p>

      <button onClick={handleIncreaseScore}>Increase Score</button>
    </div>
  );
}
```

## Test Cases

1. Action: App loads
   Expected: Current score is 0.

2. Action: App loads
   Expected: Previous score shows `N/A`.

3. Action: User clicks `Increase Score` once
   Expected: Current score becomes 1 and previous score becomes 0.

4. Action: User clicks `Increase Score` again
   Expected: Current score becomes 2 and previous score becomes 1.

5. Action: User clicks button multiple times
   Expected: Previous score always shows the value before the latest increment.

6. Action: Current score updates
   Expected: Previous score is not the same as the newly updated score.

7. Action: Previous score is stored in ref
   Expected: No separate state is used for previous score.

8. Action: User never clicks button
   Expected: Previous score remains `N/A`.

9. Action: Score increases from 4 to 5
   Expected: Previous score shows 4.

10. Action: UI rerenders after state update
    Expected: Ref-backed previous value is displayed correctly.

---

# Problem 23: Study Timer with Start, Pause, and Reset

## Problem Statement

You are building a **Study Timer** for a student productivity app. The timer should start from 0 seconds and allow the user to:

* start the timer
* pause the timer
* reset the timer

This is a realistic feature for focus tools, study dashboards, productivity apps, and time trackers. It helps students practice more advanced timer behavior using `useEffect`, intervals, cleanup, and multi-button interaction.

## Functional Requirements

1. Display elapsed seconds starting from 0.
2. Add three buttons:

   * Start
   * Pause
   * Reset
3. When Start is clicked:

   * timer should begin increasing by 1 every second
4. When Pause is clicked:

   * timer should stop increasing
5. When Reset is clicked:

   * timer should stop
   * elapsed time should return to 0
6. Use `useEffect` for interval management.
7. Ensure intervals are cleaned up properly.

## Concepts Covered

* State
* `useState`
* `useEffect`
* Intervals
* Cleanup
* Multi-button UI control

## Hints

1. Keep one state for elapsed time and one state for whether the timer is running.
2. The interval should only run when the timer is active.
3. Cleanup is important whenever the effect reruns or unmounts.
4. Reset should stop the timer as well as clear the elapsed value.
5. The displayed seconds should always match state.

## Code Stub

```jsx
import React, { useEffect, useState } from "react";

export default function StudyTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // TODO: manage timer interval
  useEffect(() => {
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Study Timer</h2>
      <p>Elapsed Time: {seconds}s</p>

      <button onClick={() => setIsRunning(true)}>Start</button>
      <button onClick={() => setIsRunning(false)} style={{ marginLeft: "10px" }}>
        Pause
      </button>
      <button
        onClick={() => {
          // TODO: reset timer
        }}
        style={{ marginLeft: "10px" }}
      >
        Reset
      </button>
    </div>
  );
}
```

## Full Solution

```jsx
import React, { useEffect, useState } from "react";

export default function StudyTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Study Timer</h2>
      <p>Elapsed Time: {seconds}s</p>

      <button onClick={() => setIsRunning(true)}>Start</button>
      <button onClick={() => setIsRunning(false)} style={{ marginLeft: "10px" }}>
        Pause
      </button>
      <button onClick={handleReset} style={{ marginLeft: "10px" }}>
        Reset
      </button>
    </div>
  );
}
```

## Test Cases

1. Action: App loads
   Expected: Elapsed time is 0 seconds.

2. Action: User clicks `Start`
   Expected: Timer begins increasing every second.

3. Action: User waits 3 seconds after starting
   Expected: Elapsed time becomes approximately 3 seconds.

4. Action: User clicks `Pause`
   Expected: Timer stops increasing.

5. Action: User clicks `Start` again after pause
   Expected: Timer resumes from the paused value.

6. Action: User clicks `Reset` while timer is running
   Expected: Timer stops and returns to 0.

7. Action: User clicks `Reset` while timer is paused
   Expected: Time returns to 0 and remains stopped.

8. Action: User clicks `Pause` before starting
   Expected: Time remains 0 without errors.

9. Action: Component rerenders while timer is running
   Expected: Timer continues correctly without duplicate intervals.

10. Action: Component unmounts
    Expected: Interval is cleared properly.

---

# Problem 24: Expandable Project Board with Shared Active Project

## Problem Statement

You are building a **Project Board** for a team collaboration tool. A list of project names is shown on the left, and a project details panel is shown on the right.

Only one project should be active at a time. When the user clicks a project in the list, the details panel should update to show its description, team size, and status.

This problem builds on lifting state up and shared parent state, but in a more realistic dashboard-style layout.

## Functional Requirements

1. Show a list of projects in one component.
2. Show the selected project’s details in another component.
3. Each project should include:

   * `id`
   * `name`
   * `description`
   * `teamSize`
   * `status`
4. The first project should be selected by default.
5. Clicking a project name should update the details panel.
6. Highlight the active project in the list.
7. State should be stored in the parent.
8. Child components should receive data and handlers through props.

## Concepts Covered

* State
* Props
* `useState`
* Lifting state up
* Parent-child communication
* Dynamic rendering
* Conditional styling

## Hints

1. Store only the selected project ID in the parent.
2. Use `find()` to derive the active project.
3. Pass `selectedProjectId` and `onSelect` to the list component.
4. The details component should only render the selected project’s data.
5. This is another classic master-detail pattern.

## Code Stub

```jsx
import React, { useState } from "react";

const projects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Revamp the marketing website homepage and landing pages.",
    teamSize: 4,
    status: "In Progress",
  },
  {
    id: 2,
    name: "Mobile App Launch",
    description: "Prepare the first production release for the mobile app.",
    teamSize: 6,
    status: "Planning",
  },
  {
    id: 3,
    name: "Dashboard Analytics",
    description: "Build usage analytics for internal stakeholders.",
    teamSize: 3,
    status: "Completed",
  },
];

function ProjectList({ projects, selectedProjectId, onSelect }) {
  return (
    <div>
      {projects.map((project) => (
        <button
          key={project.id}
          onClick={() => onSelect(project.id)}
          style={{ display: "block", marginBottom: "10px" }}
        >
          {project.name}
        </button>
      ))}
    </div>
  );
}

function ProjectDetails({ project }) {
  return (
    <div>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <p>Team Size: {project.teamSize}</p>
      <p>Status: {project.status}</p>
    </div>
  );
}

export default function ProjectBoard() {
  const [selectedProjectId, setSelectedProjectId] = useState(1);

  // TODO: derive selectedProject
  const selectedProject = projects[0];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Project Board</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <ProjectList
          projects={projects}
          selectedProjectId={selectedProjectId}
          onSelect={setSelectedProjectId}
        />
        <ProjectDetails project={selectedProject} />
      </div>
    </div>
  );
}
```

## Full Solution

```jsx
import React, { useState } from "react";

const projects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Revamp the marketing website homepage and landing pages.",
    teamSize: 4,
    status: "In Progress",
  },
  {
    id: 2,
    name: "Mobile App Launch",
    description: "Prepare the first production release for the mobile app.",
    teamSize: 6,
    status: "Planning",
  },
  {
    id: 3,
    name: "Dashboard Analytics",
    description: "Build usage analytics for internal stakeholders.",
    teamSize: 3,
    status: "Completed",
  },
];

function ProjectList({ projects, selectedProjectId, onSelect }) {
  return (
    <div>
      {projects.map((project) => (
        <button
          key={project.id}
          onClick={() => onSelect(project.id)}
          style={{
            display: "block",
            marginBottom: "10px",
            backgroundColor: selectedProjectId === project.id ? "#ddd" : "white",
            padding: "8px 12px",
          }}
        >
          {project.name}
        </button>
      ))}
    </div>
  );
}

function ProjectDetails({ project }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "16px", borderRadius: "8px", minWidth: "320px" }}>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <p>Team Size: {project.teamSize}</p>
      <p>Status: {project.status}</p>
    </div>
  );
}

export default function ProjectBoard() {
  const [selectedProjectId, setSelectedProjectId] = useState(1);

  const selectedProject = projects.find(
    (project) => project.id === selectedProjectId
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Project Board</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <ProjectList
          projects={projects}
          selectedProjectId={selectedProjectId}
          onSelect={setSelectedProjectId}
        />
        <ProjectDetails project={selectedProject} />
      </div>
    </div>
  );
}
```

## Test Cases

1. Action: App loads
   Expected: First project is selected by default.

2. Action: User clicks second project
   Expected: Details panel updates to show second project.

3. Action: User clicks third project
   Expected: Details panel updates to show third project.

4. Action: Active project changes
   Expected: Correct project button is highlighted.

5. Action: Previous active project changes
   Expected: Previous project loses highlight.

6. Action: Details panel renders
   Expected: Name, description, team size, and status are visible.

7. Action: Parent state changes
   Expected: Both list and details panel update consistently.

8. Action: User switches between projects multiple times
   Expected: UI remains synchronized.

9. Action: List renders
   Expected: All projects appear as clickable items.

10. Action: App first loads
    Expected: Selected project and details panel match.

---

# Problem 25: Notification Preferences Panel with Context and Summary

## Problem Statement

You are building a **Notification Preferences Panel** for a productivity app. The app should allow a user to toggle app-wide notification settings such as:

* Email notifications
* SMS notifications
* Push notifications

These settings should be shared across multiple components. One component should allow the user to toggle them, while another component should show a live summary of which notifications are enabled.

This is a realistic use case for **Context API**, where app-wide preferences are shared by multiple nested components without prop drilling.

## Functional Requirements

1. Create a notification preferences context.
2. Store three boolean preferences:

   * `email`
   * `sms`
   * `push`
3. Create a toggle function that can update one preference at a time.
4. Create these components:

   * `NotificationProvider`
   * `PreferencesControls`
   * `PreferencesSummary`
5. Controls component should let the user toggle all three settings.
6. Summary component should show:

   * which settings are enabled
   * total number of enabled settings
7. State should be shared using context.
8. Controls and summary should stay synchronized automatically.

## Concepts Covered

* State
* `useState`
* Context API
* Shared state
* Derived UI
* Controlled UI interactions

## Hints

1. Store the preferences object in provider state.
2. Use one generic toggle function that takes a key.
3. Consume context in both controls and summary.
4. Enabled count can be derived from the preferences object values.
5. This is similar to real settings dashboards.

## Code Stub

```jsx
import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

function NotificationProvider({ children }) {
  // TODO: create preferences state
  // TODO: create toggle function

  return (
    <NotificationContext.Provider value={{}}>
      {children}
    </NotificationContext.Provider>
  );
}

function PreferencesControls() {
  // TODO: consume context
  return <div>Controls</div>;
}

function PreferencesSummary() {
  // TODO: consume context
  return <div>Summary</div>;
}

function PreferencesPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Notification Preferences</h2>
      <PreferencesControls />
      <PreferencesSummary />
    </div>
  );
}

export default function App() {
  return (
    <NotificationProvider>
      <PreferencesPage />
    </NotificationProvider>
  );
}
```

## Full Solution

```jsx
import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

function NotificationProvider({ children }) {
  const [preferences, setPreferences] = useState({
    email: true,
    sms: false,
    push: true,
  });

  const togglePreference = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <NotificationContext.Provider value={{ preferences, togglePreference }}>
      {children}
    </NotificationContext.Provider>
  );
}

function PreferencesControls() {
  const { preferences, togglePreference } = useContext(NotificationContext);

  return (
    <div style={{ marginBottom: "20px" }}>
      <button onClick={() => togglePreference("email")}>
        {preferences.email ? "Disable Email" : "Enable Email"}
      </button>

      <button onClick={() => togglePreference("sms")} style={{ marginLeft: "10px" }}>
        {preferences.sms ? "Disable SMS" : "Enable SMS"}
      </button>

      <button onClick={() => togglePreference("push")} style={{ marginLeft: "10px" }}>
        {preferences.push ? "Disable Push" : "Enable Push"}
      </button>
    </div>
  );
}

function PreferencesSummary() {
  const { preferences } = useContext(NotificationContext);

  const enabledCount = Object.values(preferences).filter(Boolean).length;

  return (
    <div style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px" }}>
      <h3>Preferences Summary</h3>
      <p>Email: {preferences.email ? "Enabled" : "Disabled"}</p>
      <p>SMS: {preferences.sms ? "Enabled" : "Disabled"}</p>
      <p>Push: {preferences.push ? "Enabled" : "Disabled"}</p>
      <p>Total Enabled: {enabledCount}</p>
    </div>
  );
}

function PreferencesPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Notification Preferences</h2>
      <PreferencesControls />
      <PreferencesSummary />
    </div>
  );
}

export default function App() {
  return (
    <NotificationProvider>
      <PreferencesPage />
    </NotificationProvider>
  );
}
```

## Test Cases

1. Action: App loads
   Expected: Initial preferences are shown in the summary.

2. Action: User clicks email toggle
   Expected: Email preference changes state.

3. Action: User clicks SMS toggle
   Expected: SMS preference changes state.

4. Action: User clicks push toggle
   Expected: Push preference changes state.

5. Action: Any preference changes
   Expected: Summary updates immediately.

6. Action: User toggles multiple preferences
   Expected: Total enabled count updates correctly.

7. Action: All preferences are disabled
   Expected: Total enabled becomes 0.

8. Action: All preferences are enabled
   Expected: Total enabled becomes 3.

9. Action: Controls and summary use shared context
   Expected: Both stay synchronized without prop drilling.

10. Action: Toggle button text changes
    Expected: It reflects whether that preference is currently enabled or disabled.

---

Perfect — here is the **final set of the 30-question React practice sheet**, covering **Problems 26–30** in the same detailed pattern.

This last set is designed to round out the sheet with practical, realistic React work involving:

* combined derived state
* `useMemo` + `useCallback` together
* `useRef` for UI behavior
* `useEffect` synchronization patterns
* reusable component composition
* real dashboard/product-style interactions

---

# Problem 26: Orders Dashboard with Search, Status Filter, and Memoized Summary

## Problem Statement

You are building an **Orders Dashboard** for an ecommerce admin panel. The admin should be able to search orders by customer name and also filter them by status such as Pending, Shipped, or Delivered.

In addition to showing the visible orders, the dashboard should show a live summary of the **total value of currently visible orders**.

This is a very realistic admin panel feature because ecommerce teams often search, filter, and analyze subsets of orders at the same time. This problem helps students practice combining multiple filters and using `useMemo` for derived values.

## Functional Requirements

1. Display a list of orders.
2. Each order should include:

   * `id`
   * `customerName`
   * `status`
   * `amount`
3. Add a controlled search input for customer name.
4. Add status filter buttons:

   * All
   * Pending
   * Shipped
   * Delivered
5. Filter logic should combine:

   * search text
   * selected status
6. Search should be case-insensitive.
7. Show visible order count.
8. Show total value of visible orders.
9. Use `useMemo` for:

   * filtered orders
   * visible total value
10. Show:

* `No orders found`
  when no order matches the active conditions.

## Concepts Covered

* State
* `useState`
* Controlled components
* `useMemo`
* Combined filtering
* Derived UI
* Conditional rendering

## Hints

1. Search text and active status should be separate state values.
2. `useMemo` can derive the visible orders based on both inputs.
3. The visible total can be computed from the filtered array.
4. Apply search and status conditions together.
5. The total value should reflect only rendered orders.

## Code Stub

```jsx
import React, { useMemo, useState } from "react";

const orders = [
  { id: 1, customerName: "Aarav", status: "Pending", amount: 1200 },
  { id: 2, customerName: "Meera", status: "Shipped", amount: 2500 },
  { id: 3, customerName: "Kabir", status: "Delivered", amount: 1800 },
  { id: 4, customerName: "Aisha", status: "Pending", amount: 900 },
];

export default function OrdersDashboard() {
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState("All");

  // TODO: memoize visibleOrders
  const visibleOrders = useMemo(() => {
    return orders;
  }, []);

  // TODO: memoize visibleTotal
  const visibleTotal = useMemo(() => {
    return 0;
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Orders Dashboard</h2>

      <input
        type="text"
        placeholder="Search by customer name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={{ marginTop: "10px" }}>
        <button onClick={() => setActiveStatus("All")}>All</button>
        <button onClick={() => setActiveStatus("Pending")} style={{ marginLeft: "10px" }}>
          Pending
        </button>
        <button onClick={() => setActiveStatus("Shipped")} style={{ marginLeft: "10px" }}>
          Shipped
        </button>
        <button onClick={() => setActiveStatus("Delivered")} style={{ marginLeft: "10px" }}>
          Delivered
        </button>
      </div>

      <p style={{ marginTop: "15px" }}>Visible Orders: {visibleOrders.length}</p>
      <p>Total Value: ₹{visibleTotal}</p>

      <div style={{ marginTop: "15px" }}>
        {visibleOrders.map((order) => (
          <div key={order.id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
            <h4>{order.customerName}</h4>
            <p>Status: {order.status}</p>
            <p>₹{order.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Full Solution

```jsx
import React, { useMemo, useState } from "react";

const orders = [
  { id: 1, customerName: "Aarav", status: "Pending", amount: 1200 },
  { id: 2, customerName: "Meera", status: "Shipped", amount: 2500 },
  { id: 3, customerName: "Kabir", status: "Delivered", amount: 1800 },
  { id: 4, customerName: "Aisha", status: "Pending", amount: 900 },
];

export default function OrdersDashboard() {
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState("All");

  const visibleOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch = order.customerName
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        activeStatus === "All" ? true : order.status === activeStatus;

      return matchesSearch && matchesStatus;
    });
  }, [search, activeStatus]);

  const visibleTotal = useMemo(() => {
    return visibleOrders.reduce((sum, order) => sum + order.amount, 0);
  }, [visibleOrders]);

  const getButtonStyle = (status) => ({
    backgroundColor: activeStatus === status ? "#ddd" : "white",
    padding: "8px 12px",
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2>Orders Dashboard</h2>

      <input
        type="text"
        placeholder="Search by customer name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={{ marginTop: "10px" }}>
        <button onClick={() => setActiveStatus("All")} style={getButtonStyle("All")}>
          All
        </button>
        <button onClick={() => setActiveStatus("Pending")} style={{ ...getButtonStyle("Pending"), marginLeft: "10px" }}>
          Pending
        </button>
        <button onClick={() => setActiveStatus("Shipped")} style={{ ...getButtonStyle("Shipped"), marginLeft: "10px" }}>
          Shipped
        </button>
        <button onClick={() => setActiveStatus("Delivered")} style={{ ...getButtonStyle("Delivered"), marginLeft: "10px" }}>
          Delivered
        </button>
      </div>

      <p style={{ marginTop: "15px" }}>Visible Orders: {visibleOrders.length}</p>
      <p>Total Value: ₹{visibleTotal}</p>

      <div style={{ marginTop: "15px" }}>
        {visibleOrders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          visibleOrders.map((order) => (
            <div
              key={order.id}
              style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px", borderRadius: "8px" }}
            >
              <h4>{order.customerName}</h4>
              <p>Status: {order.status}</p>
              <p>₹{order.amount}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
```

## Test Cases

1. Action: App loads
   Expected: All orders are visible.

2. Action: User types `aa`
   Expected: Matching customer names are filtered case-insensitively.

3. Action: User clicks `Pending`
   Expected: Only pending orders are shown.

4. Action: User searches and filters together
   Expected: Only orders matching both conditions appear.

5. Action: User clicks `Delivered`
   Expected: Only delivered orders are visible.

6. Action: No orders match
   Expected: `No orders found` is shown.

7. Action: Filter changes
   Expected: Visible order count updates.

8. Action: Search changes
   Expected: Total value updates to match the visible orders.

9. Action: Active status changes
   Expected: Correct button is highlighted.

10. Action: User resets search manually and chooses `All`
    Expected: Full list and total value return.

---

# Problem 27: Pinned Notes Board with Stable Child Actions

## Problem Statement

You are building a **Pinned Notes Board** for a productivity app. Users should see a list of notes and be able to pin or unpin them. Pinned notes should be visually distinct.

Because the pin/unpin action is passed into many child note cards, this is a good problem for combining reusable components with `useCallback`.

This reflects real features in productivity tools, note-taking apps, and team collaboration platforms.

## Functional Requirements

1. Display a list of notes.
2. Each note should include:

   * `id`
   * `title`
   * `pinned`
3. Each note card should show:

   * title
   * pin/unpin button
4. Button text should be:

   * `Pin Note` if not pinned
   * `Unpin Note` if pinned
5. Clicking the button should toggle the pinned state.
6. Pinned notes should have different styling.
7. Show summary:

   * total notes
   * pinned notes
8. Use a child component for rendering each note.
9. Use `useCallback` for the handler passed to child notes.

## Concepts Covered

* State
* Props
* `useState`
* `useCallback`
* List updates
* Derived UI
* Conditional styling

## Hints

1. Store the notes array in state.
2. Use `map()` to update the clicked note.
3. Memoize the toggle handler with `useCallback`.
4. The pinned count should be derived from state.
5. Visual styling can change based on `pinned`.

## Code Stub

```jsx
import React, { useCallback, useState } from "react";

const initialNotes = [
  { id: 1, title: "Prepare interview questions", pinned: false },
  { id: 2, title: "Finish React practice sheet", pinned: true },
  { id: 3, title: "Review project PRD", pinned: false },
];

function NoteCard({ note, onTogglePin }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "12px", marginBottom: "10px" }}>
      <h4>{note.title}</h4>
      <button onClick={() => onTogglePin(note.id)}>
        {/* TODO */}
      </button>
    </div>
  );
}

export default function PinnedNotesBoard() {
  const [notes, setNotes] = useState(initialNotes);

  // TODO: use useCallback
  const handleTogglePin = useCallback((id) => {
  }, []);

  const pinnedCount = 0;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Pinned Notes Board</h2>
      <p>Total Notes: {notes.length}</p>
      <p>Pinned Notes: {pinnedCount}</p>

      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onTogglePin={handleTogglePin} />
      ))}
    </div>
  );
}
```

## Full Solution

```jsx
import React, { useCallback, useState } from "react";

const initialNotes = [
  { id: 1, title: "Prepare interview questions", pinned: false },
  { id: 2, title: "Finish React practice sheet", pinned: true },
  { id: 3, title: "Review project PRD", pinned: false },
];

function NoteCard({ note, onTogglePin }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "12px",
        marginBottom: "10px",
        borderRadius: "8px",
        backgroundColor: note.pinned ? "#fff7e6" : "white",
      }}
    >
      <h4>{note.title}</h4>
      <button onClick={() => onTogglePin(note.id)}>
        {note.pinned ? "Unpin Note" : "Pin Note"}
      </button>
    </div>
  );
}

export default function PinnedNotesBoard() {
  const [notes, setNotes] = useState(initialNotes);

  const handleTogglePin = useCallback((id) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note
      )
    );
  }, []);

  const pinnedCount = notes.filter((note) => note.pinned).length;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Pinned Notes Board</h2>
      <p>Total Notes: {notes.length}</p>
      <p>Pinned Notes: {pinnedCount}</p>

      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onTogglePin={handleTogglePin} />
      ))}
    </div>
  );
}
```

## Test Cases

1. Action: App loads
   Expected: All notes are visible.

2. Action: Pinned note renders
   Expected: It shows pinned styling and `Unpin Note`.

3. Action: Unpinned note renders
   Expected: It shows normal styling and `Pin Note`.

4. Action: User clicks `Pin Note`
   Expected: The note becomes pinned.

5. Action: User clicks `Unpin Note`
   Expected: The note becomes unpinned.

6. Action: Pin state changes
   Expected: Pinned count updates correctly.

7. Action: User toggles same note twice
   Expected: It returns to original state.

8. Action: Multiple notes are pinned
   Expected: Summary count reflects the correct total.

9. Action: Child receives function prop
   Expected: It toggles only its own note.

10. Action: Total notes count
    Expected: It always matches rendered notes.

---

# Problem 28: Chat Message List with Auto Scroll to Latest

## Problem Statement

You are building a **Chat Message List** for a team messaging app. The interface should show a list of messages and provide a button to add a new sample message.

Whenever a new message is added, the view should automatically scroll to the latest message at the bottom.

This is a very realistic requirement in chat apps, support inboxes, collaboration tools, and notification feeds. It is a strong practical use case for **`useRef` with DOM behavior**.

## Functional Requirements

1. Display a list of chat messages.
2. Each message should include:

   * `id`
   * `text`
3. Add a button:

   * `Add Message`
4. Clicking the button should append a new sample message.
5. When a message is added, the message list should automatically scroll to the bottom.
6. Use `useRef` for the bottom marker or scroll target.
7. Use `useEffect` to trigger scrolling when messages change.

## Concepts Covered

* State
* `useState`
* `useRef`
* `useEffect`
* List updates
* DOM interaction

## Hints

1. Keep messages in state.
2. Append a new object when the button is clicked.
3. Add a `div` at the bottom of the list and attach a ref to it.
4. Use `scrollIntoView()` after the message list updates.
5. The effect should run whenever messages change.

## Code Stub

```jsx
import React, { useEffect, useRef, useState } from "react";

const initialMessages = [
  { id: 1, text: "Hey team, standup starts in 10 minutes." },
  { id: 2, text: "Got it, joining shortly." },
];

export default function ChatMessageList() {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef(null);

  // TODO: auto-scroll when messages change
  useEffect(() => {
  }, []);

  const handleAddMessage = () => {
    const newMessage = {
      id: Date.now(),
      text: `New message ${messages.length + 1}`,
    };

    // TODO: append new message
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Team Chat</h2>

      <button onClick={handleAddMessage}>Add Message</button>

      <div
        style={{
          marginTop: "15px",
          border: "1px solid #ddd",
          padding: "10px",
          maxHeight: "200px",
          overflowY: "auto",
        }}
      >
        {messages.map((message) => (
          <p key={message.id}>{message.text}</p>
        ))}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
```

## Full Solution

```jsx
import React, { useEffect, useRef, useState } from "react";

const initialMessages = [
  { id: 1, text: "Hey team, standup starts in 10 minutes." },
  { id: 2, text: "Got it, joining shortly." },
];

export default function ChatMessageList() {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAddMessage = () => {
    const newMessage = {
      id: Date.now(),
      text: `New message ${messages.length + 1}`,
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Team Chat</h2>

      <button onClick={handleAddMessage}>Add Message</button>

      <div
        style={{
          marginTop: "15px",
          border: "1px solid #ddd",
          padding: "10px",
          maxHeight: "200px",
          overflowY: "auto",
          borderRadius: "8px",
        }}
      >
        {messages.map((message) => (
          <p key={message.id}>{message.text}</p>
        ))}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
```

## Test Cases

1. Action: App loads
   Expected: Initial messages are visible.

2. Action: User clicks `Add Message` once
   Expected: A new message is appended to the list.

3. Action: User clicks `Add Message` multiple times
   Expected: Each click adds a new message.

4. Action: New message is added
   Expected: Scroll moves to the latest message automatically.

5. Action: Messages array updates
   Expected: Effect runs and scroll behavior happens.

6. Action: Message count grows
   Expected: Bottom marker remains the scroll target.

7. Action: Message IDs are unique
   Expected: New messages render correctly in the list.

8. Action: User adds message when list is already long
   Expected: Latest message becomes visible.

9. Action: Component first renders
   Expected: Initial message list is displayed without errors.

10. Action: Button clicked repeatedly
    Expected: List keeps updating correctly and scroll stays synced.

---

# Problem 29: Weather Widget with Loading and Data Update Effect

## Problem Statement

You are building a simple **Weather Widget** for a travel dashboard. When the widget first loads, it should display `Loading weather...`. After 2 seconds, it should update with weather information for a destination.

This simulates fetching external data and updating the UI when the response is ready. It is a realistic case for `useEffect`, loading state, and conditional rendering.

This type of UI appears in travel apps, dashboards, booking flows, and home screens where content loads asynchronously.

## Functional Requirements

1. Initially show:

   * `Loading weather...`
2. After 2 seconds, display weather data containing:

   * city
   * temperature
   * condition
3. Use `useEffect` to simulate data loading.
4. Use state to store whether the widget is loading.
5. Use state to store the loaded weather data.
6. After loading, show weather details in a card.
7. Clean up the timeout properly.

## Concepts Covered

* State
* `useState`
* `useEffect`
* Loading state
* Conditional rendering
* Cleanup

## Hints

1. Use one state variable for loading and one for weather data.
2. `useEffect` should start a timeout on mount.
3. After timeout finishes, update data and loading state.
4. Before data loads, render loading text.
5. Cleanup should clear the timeout if unmounted early.

## Code Stub

```jsx
import React, { useEffect, useState } from "react";

export default function WeatherWidget() {
  const [isLoading, setIsLoading] = useState(true);
  const [weather, setWeather] = useState(null);

  // TODO: simulate loading weather data
  useEffect(() => {
  }, []);

  return (
    <div style={{ padding: "20px", border: "1px solid #ddd" }}>
      <h2>Weather Widget</h2>

      {/* TODO: render loading or weather info */}
    </div>
  );
}
```

## Full Solution

```jsx
import React, { useEffect, useState } from "react";

export default function WeatherWidget() {
  const [isLoading, setIsLoading] = useState(true);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setWeather({
        city: "Bali",
        temperature: "29°C",
        condition: "Sunny",
      });
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timerId);
  }, []);

  return (
    <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2>Weather Widget</h2>

      {isLoading ? (
        <p>Loading weather...</p>
      ) : (
        <div>
          <p>City: {weather.city}</p>
          <p>Temperature: {weather.temperature}</p>
          <p>Condition: {weather.condition}</p>
        </div>
      )}
    </div>
  );
}
```

## Test Cases

1. Action: App loads
   Expected: `Loading weather...` is displayed.

2. Action: 2 seconds pass
   Expected: Loading message disappears and weather data appears.

3. Action: While loading
   Expected: Weather details are not shown yet.

4. Action: Data loads
   Expected: City, temperature, and condition are visible.

5. Action: Component unmounts before timeout completes
   Expected: Timeout is cleaned up.

6. Action: Loading completes once
   Expected: Widget remains in loaded state.

7. Action: App first renders
   Expected: Heading and loading message are visible.

8. Action: Weather data becomes available
   Expected: `isLoading` becomes false.

9. Action: UI updates after timeout
   Expected: Card content changes automatically.

10. Action: Component stays mounted
    Expected: Loaded weather details remain visible.

---

# Problem 30: Multi-Section Learning Dashboard with Context, Memoized Summary, and Stable Actions

## Problem Statement

You are building a **Learning Dashboard** for an online education platform. The dashboard contains a list of lessons, and users can mark lessons as completed.

The app should also show a summary panel displaying:

* total lessons
* completed lessons
* remaining lessons

The lesson list and summary are in different components, so the lesson state should be shared using **Context API**. Since the summary values are derived from lesson data, `useMemo` should be used for computing them. Because the toggle handler is passed into lesson items, `useCallback` should be used for a stable function reference.

This problem brings together multiple React concepts into one practical dashboard-style feature.

## Functional Requirements

1. Create a lessons context.
2. Store lesson state in the provider.
3. Each lesson should include:

   * `id`
   * `title`
   * `completed`
4. Create these components:

   * `LessonsProvider`
   * `LessonList`
   * `LessonItem`
   * `LessonsSummary`
5. Users should be able to toggle lesson completion.
6. Completed lessons should have different styling.
7. Summary panel should show:

   * total lessons
   * completed lessons
   * remaining lessons
8. Use `useMemo` for summary values.
9. Use `useCallback` for the lesson toggle function.
10. Keep components reusable and clean.

## Concepts Covered

* State
* `useState`
* Props
* Context API
* `useMemo`
* `useCallback`
* Derived UI
* Shared state
* Component composition

## Hints

1. Put lessons state and toggle handler inside the provider.
2. Consume context in both the list and summary components.
3. Memoize the summary counts from the lessons array.
4. Memoize the toggle handler with `useCallback`.
5. `LessonItem` should remain focused on rendering one lesson.

## Code Stub

```jsx
import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

const LessonsContext = createContext();

const initialLessons = [
  { id: 1, title: "React Components", completed: false },
  { id: 2, title: "Props and State", completed: true },
  { id: 3, title: "useEffect Basics", completed: false },
];

function LessonsProvider({ children }) {
  const [lessons, setLessons] = useState(initialLessons);

  // TODO: create toggle handler with useCallback

  return (
    <LessonsContext.Provider value={{}}>
      {children}
    </LessonsContext.Provider>
  );
}

function LessonItem({ lesson, onToggle }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
      <h4>{lesson.title}</h4>
      <p>Status: {lesson.completed ? "Completed" : "Pending"}</p>
      <button onClick={() => onToggle(lesson.id)}>
        {/* TODO */}
      </button>
    </div>
  );
}

function LessonList() {
  // TODO: consume context
  return <div>Lesson list</div>;
}

function LessonsSummary() {
  // TODO: consume context
  // TODO: memoize summary values
  return <div>Summary</div>;
}

function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Learning Dashboard</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        <LessonList />
        <LessonsSummary />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LessonsProvider>
      <Dashboard />
    </LessonsProvider>
  );
}
```

## Full Solution

```jsx
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const LessonsContext = createContext();

const initialLessons = [
  { id: 1, title: "React Components", completed: false },
  { id: 2, title: "Props and State", completed: true },
  { id: 3, title: "useEffect Basics", completed: false },
];

function LessonsProvider({ children }) {
  const [lessons, setLessons] = useState(initialLessons);

  const toggleLesson = useCallback((id) => {
    setLessons((prev) =>
      prev.map((lesson) =>
        lesson.id === id
          ? { ...lesson, completed: !lesson.completed }
          : lesson
      )
    );
  }, []);

  return (
    <LessonsContext.Provider value={{ lessons, toggleLesson }}>
      {children}
    </LessonsContext.Provider>
  );
}

function LessonItem({ lesson, onToggle }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "8px",
        backgroundColor: lesson.completed ? "#eafbea" : "white",
      }}
    >
      <h4>{lesson.title}</h4>
      <p>Status: {lesson.completed ? "Completed" : "Pending"}</p>
      <button onClick={() => onToggle(lesson.id)}>
        {lesson.completed ? "Mark Pending" : "Mark Completed"}
      </button>
    </div>
  );
}

function LessonList() {
  const { lessons, toggleLesson } = useContext(LessonsContext);

  return (
    <div style={{ flex: 1 }}>
      {lessons.map((lesson) => (
        <LessonItem key={lesson.id} lesson={lesson} onToggle={toggleLesson} />
      ))}
    </div>
  );
}

function LessonsSummary() {
  const { lessons } = useContext(LessonsContext);

  const summary = useMemo(() => {
    const total = lessons.length;
    const completed = lessons.filter((lesson) => lesson.completed).length;
    const remaining = total - completed;

    return { total, completed, remaining };
  }, [lessons]);

  return (
    <div
      style={{
        width: "260px",
        border: "1px solid #ddd",
        padding: "15px",
        borderRadius: "8px",
      }}
    >
      <h3>Lessons Summary</h3>
      <p>Total Lessons: {summary.total}</p>
      <p>Completed Lessons: {summary.completed}</p>
      <p>Remaining Lessons: {summary.remaining}</p>
    </div>
  );
}

function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Learning Dashboard</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        <LessonList />
        <LessonsSummary />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LessonsProvider>
      <Dashboard />
    </LessonsProvider>
  );
}
```

## Test Cases

1. Action: App loads
   Expected: Lesson list and summary are both visible.

2. Action: App loads
   Expected: Summary counts match the initial lesson data.

3. Action: User clicks `Mark Completed` on a pending lesson
   Expected: Lesson becomes completed.

4. Action: User clicks `Mark Pending` on a completed lesson
   Expected: Lesson becomes pending.

5. Action: Lesson state changes
   Expected: Summary updates immediately.

6. Action: Completed lesson renders
   Expected: It uses completed styling.

7. Action: Pending lesson renders
   Expected: It uses normal styling.

8. Action: User toggles multiple lessons
   Expected: Total stays same, completed and remaining update correctly.

9. Action: Context provides shared lessons state
   Expected: List and summary stay synchronized without prop drilling.

10. Action: Toggle handler is passed into lesson items
    Expected: Only clicked lesson changes.

---


Across the full sheet, you now have coverage of:

* JSX and component thinking
* Props
* State and `useState`
* Event handling
* Conditional rendering
* List rendering
* Controlled components
* Derived UI
* Filtering and sorting
* Lifting state up
* `useEffect`
* `useRef`
* `useMemo`
* `useCallback`
* Context API
* Shared state patterns
* Timers
* Previous value tracking
* DOM interaction
* Reusable component composition













