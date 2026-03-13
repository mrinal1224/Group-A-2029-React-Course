

---

# 🧩 React Mini Project Problem Statements

## 🧩 1. Community Blood Donor Finder 🩸

### Problem Context

Hospitals and patients often struggle to find blood donors quickly. Build a React app that allows users to view, filter, and request blood donors from a dataset.

### Functional Requirements

* Fetch donor data from API using `useEffect` on mount
* Store:

  * donors list
  * selected blood group
  * request status per donor
* Provide dropdown filter for blood group (A+, B+, O−, etc.)
* Display donor cards with:

  * Name
  * Blood group
  * City
  * Availability
* Add **“Request Help”** button

  * On click → change to **“Request Sent ✅”**
* Show total available donors count

### UI States

* Loading spinner
* No donors found message

### Suggested API

👉 [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)
(Map users → donors, add static blood groups locally)

### Bonus

* Search donors by city
* Sort by availability

### Learning Outcomes

Filtering, derived state, conditional rendering

---

## 🧩 2. Daily Motivation Dashboard 🌞

### Problem Context

Students need daily motivation. Build an app that fetches and displays quotes with a like system.

### Functional Requirements

* Fetch random quote using `useEffect`
* Store:

  * quote
  * author
  * loading state
  * liked quotes array
* **“New Quote”** button → fetch new quote
* **“Like ❤️”** button → toggle liked state
* Display total liked count

### UI States

* Disable button while fetching
* Show loading text

### Suggested API

👉 [https://api.quotable.io/random](https://api.quotable.io/random)

### Bonus

* Show list of all liked quotes
* Persist likes in `localStorage`

### Learning Outcomes

Array state updates, re-fetching data, toggles

---

## 🧩 3. Student Attendance Viewer 🎓

### Problem Context

Teachers need a visual way to track attendance and identify low-performing students.

### Functional Requirements

* Fetch student data using `useEffect`
* Store:

  * students list
  * filter type
  * selected student
  * showLowAttendance toggle
* Display:

  * Name
  * Attendance %
  * Status badge
* Filter buttons:

  * All
  * Present
  * Absent
* Highlight row on click
* Toggle **“Show <75% attendance”**

### UI States

* Color code:

  * Green → ≥75%
  * Red → <75%

### Suggested API

👉 [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)
(Add random attendance % locally)

### Bonus

* Sort by attendance %

### Learning Outcomes

Complex filtering, conditional styling, list selection

---

## 🧩 4. Simple Weather Checker ☁️

### Problem Context

Users should be able to quickly check weather for any city.

### Functional Requirements

* Input field for city name
* Fetch weather data when user searches
* Store:

  * city
  * temperature
  * condition
  * loading
  * unit (°C / °F)
* Toggle °C ↔ °F
* Display weather card

### UI States

* Loading message
* Error if city not found

### Suggested API

👉 [https://api.openweathermap.org/data/2.5/weather](https://api.openweathermap.org/data/2.5/weather)
(Use free API key)

### Bonus

* Show weather icon
* Save last searched cities

### Learning Outcomes

Controlled inputs, effect dependencies, error handling

---

## 🧩 5. NGO Event Explorer 🤝

### Problem Context

Users should discover and register for social impact events.

### Functional Requirements

* Fetch events using `useEffect`
* Store:

  * events
  * search text
  * registered events
* Search events by name
* Event card:

  * Title
  * Date
  * Location
  * **“Register”** button → becomes **“Registered ✅”**
* Show total registered events count

### Suggested API

👉 [https://jsonplaceholder.typicode.com/posts](https://jsonplaceholder.typicode.com/posts)
(Map posts → events)

### Bonus

* Filter by upcoming/past events

### Learning Outcomes

Search filtering, array updates, state mapping

---

## 🧩 6. Public Transport Tracker 🚌

### Problem Context

Users need real-time transport schedules.

### Functional Requirements

* Fetch transport timings using `useEffect`
* Store:

  * routes
  * selected route
  * last updated time
* Dropdown to select route number
* Highlight next arriving bus/train
* **“Refresh”** button → re-fetch data

### Suggested API

👉 [https://jsonplaceholder.typicode.com/todos](https://jsonplaceholder.typicode.com/todos)
(Map todos → routes with time data locally)

### Bonus

* Auto-refresh every 30 seconds

### Learning Outcomes

Time-based state, manual re-fetch, derived values

---

## 🧩 7. COVID Stats Mini Dashboard 🦠

### Problem Context

Users should view COVID statistics country-wise.

### Functional Requirements

* Fetch data using `useEffect`
* Dropdown to select country
* Display:

  * Total cases
  * Recovered
  * Deaths
* Toggle view:

  * Card view
  * Table view
* Color code severity

### Suggested API

👉 [https://disease.sh/v3/covid-19/countries](https://disease.sh/v3/covid-19/countries)

### Bonus

* Show global summary

### Learning Outcomes

Conditional layouts, data mapping, multi-view UI

---

## 🧩 8. Job Listing Mini Portal 💼

### Problem Context

Students need a simple job browsing and saving tool.

### Functional Requirements

* Fetch jobs using `useEffect`
* Store:

  * jobs
  * search text
  * saved jobs
  * view mode (All / Saved)
* Search by role
* **“Save Job”** button → adds to saved list
* Show saved jobs count

### Suggested API

👉 [https://jsonplaceholder.typicode.com/posts](https://jsonplaceholder.typicode.com/posts)
(Map posts → jobs)

### Bonus

* Remove from saved jobs

### Learning Outcomes

List filtering, multi-view state, array mutations

---

## 🧩 9. Recipe Finder 🍲

### Problem Context

Users should find recipes based on ingredients.

### Functional Requirements

* Input ingredient
* Fetch recipes on search
* Store:

  * recipes
  * favorites
  * expanded recipe ID
* Recipe card:

  * Image
  * Title
  * **“Show Details”** toggle
  * **“Favorite ❤️”** button
* Show favorites count

### Suggested API

👉 [https://www.themealdb.com/api/json/v1/1/search.php?s=chicken](https://www.themealdb.com/api/json/v1/1/search.php?s=chicken)

### Bonus

* Filter vegetarian recipes

### Learning Outcomes

Toggle per item, API query params, nested data display

---

## 🧩 🔟 News Headlines Reader 📰

### Problem Context

Users should read and track latest news.

### Functional Requirements

* Fetch headlines using `useEffect`
* Store:

  * articles
  * selected category
  * read articles IDs
* Filter by category
* Click headline → expand description
* **“Mark as Read”** → strike-through text
* Show read count

### Suggested API

👉 [https://newsapi.org/v2/top-headlines?country=in&apiKey=YOUR_KEY](https://newsapi.org/v2/top-headlines?country=in&apiKey=YOUR_KEY)
(Free tier)

### Bonus

* Dark mode toggle

### Learning Outcomes

Conditional styling, expandable lists, category filtering

---

# 🧪 Common Technical Constraints (For All Projects)

Students must:

* Use `useState` for UI + data
* Use `useEffect` for API calls
* Handle loading + empty states
* Use `map()` to render lists
* Use keys properly
* Implement at least one filter/search
* Implement one toggle interaction

---

# 📊 Evaluation Rubric

| Criteria                  | Marks  |
| ------------------------- | ------ |
| API integration works     | 10     |
| State management correct  | 10     |
| Interactivity implemented | 10     |
| Conditional rendering     | 10     |
| UI clarity & structure    | 10     |
| Code readability          | 10     |
| **Total**                 | **60** |

---
