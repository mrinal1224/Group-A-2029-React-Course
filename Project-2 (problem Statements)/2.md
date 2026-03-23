
---

# PRD 2 — Personal Finance & Expense Analytics App (React Project)

## 1. Product Title

**Personal Finance & Expense Analytics App**

---

# 2. Problem Statement

Many students and young professionals struggle to understand **where their money is going every month**. Expenses are often scattered across:

* UPI transactions
* credit cards
* subscriptions
* cash spending

Without a clear system to track spending, users cannot easily answer questions like:

* How much did I spend this month?
* Which category consumes the most money?
* Am I exceeding my budget?
* Where can I cut expenses?

Most people rely on manual spreadsheets or basic notes, which lack:

* automated categorization
* analytics
* filtering
* visual insights

The goal of this project is to build a **Personal Finance & Expense Analytics App** using React that allows users to:

* record income and expenses
* categorize spending
* track monthly budgets
* search and filter transactions
* analyze financial behavior using charts

This application should simulate a **real consumer finance product**.

---

# 3. Product Goals

### Primary Goals

The system should allow users to:

1. Record income and expense transactions
2. Categorize financial activity
3. Monitor spending patterns
4. Track budgets
5. Visualize financial insights

---

### Secondary Goals

* Help users build healthy spending habits
* Provide financial awareness
* Build a scalable React architecture

---

# 4. Target Users

### Primary Users

* Students managing personal expenses
* Early-career professionals
* Freelancers managing irregular income

### User Pain Points

Users often:

* overspend unknowingly
* lose track of subscriptions
* fail to analyze spending patterns
* lack visibility of financial trends

---

# 5. Core Functional Requirements

---

# Feature 1 — Add Transactions

Users should be able to add financial transactions.

### Transaction Types

* Income
* Expense

---

### Required Fields

* Title
* Amount
* Category
* Date
* Transaction Type
* Notes

---

### Categories

Expense categories should include:

* Food
* Travel
* Rent
* Shopping
* Entertainment
* Health
* Utilities
* Subscriptions

---

### Form Handling

Forms should be implemented using

```
react-hook-form
```

Validation using

```
yup
```

---

# Feature 2 — Transaction List

Display all transactions in a list.

Each item should display:

* Title
* Category
* Amount
* Date
* Type

---

### Actions

Users should be able to:

* edit transaction
* delete transaction

---

# Feature 3 — Search Transactions

Users should be able to search transactions by:

* title
* notes

Search should update results dynamically.

---

# Feature 4 — Filtering

Transactions should be filterable by:

* category
* transaction type
* date range

Example:

```
Food
Travel
Rent
```

---

# Feature 5 — Sorting

Sorting options should include:

* date
* amount
* category

---

# Feature 6 — Budget Tracking

Users should be able to set monthly budgets.

Example:

```
Monthly Budget: ₹50,000
```

The system should display:

* total spending
* remaining budget
* percentage used

---

# Feature 7 — Analytics Dashboard

Dashboard should show financial insights.

Key metrics:

* Total Income
* Total Expenses
* Net Balance
* Top spending category

Charts should include:

* spending by category (pie chart)
* monthly spending trend (line chart)
* income vs expense comparison (bar chart)

---

# Feature 8 — Recurring Expense Tracking

Users should be able to mark expenses as recurring.

Examples:

* Netflix subscription
* Rent
* Gym membership

These transactions should be highlighted.

---

# 6. Non Functional Requirements

The system should:

* support mobile screens
* load data quickly
* display loading states
* handle empty data scenarios

---

# 7. Pages Required

Use **React Router DOM**.

---

### Dashboard Page

Displays financial analytics.

Route:

```
/dashboard
```

---

### Transactions Page

Displays all transactions.

Route:

```
/transactions
```

---

### Add Transaction Page

Transaction form.

Route:

```
/transactions/new
```

---

### Budget Page

Displays budget tracking.

Route:

```
/budget
```

---

### Analytics Page

Shows detailed charts.

Route:

```
/analytics
```

---

# 8. APIs

Students should integrate at least one API.

---

### Currency Exchange API

Example

```
https://api.exchangerate-api.com
```

Allows optional currency conversion.

---

### Financial News API (Optional)

Example

```
https://newsapi.org
```

Displays financial news feed.

---

# 9. Data Model

Transaction Object

```
{
 id: string,
 title: string,
 amount: number,
 category: string,
 type: "income" | "expense",
 date: date,
 notes: string,
 recurring: boolean
}
```

---

Budget Object

```
{
 monthlyBudget: number
}
```

---

# 10. React Concepts Required

---

# useState

Used for:

* transaction form inputs
* filters
* search query
* sorting options

Example

```javascript
const [transactions, setTransactions] = useState([])
```

---

# useEffect

Used for:

* fetching transaction data
* recalculating analytics

Example

```javascript
useEffect(()=>{
 calculateAnalytics()
},[transactions])
```

---

# Context API

Used for **global state management**.

Create

```
FinanceContext
```

Global state should include:

* transactions
* addTransaction()
* deleteTransaction()
* updateTransaction()
* budget

Provider should wrap the app.

---

# Custom Hooks

Students should implement reusable hooks.

Examples:

### useTransactions()

Handles CRUD logic.

---

### useBudget()

Handles budget calculations.

---

### useCurrency()

Formats currency values.

---

### useDebounce()

Optimizes search performance.

---

# React Router DOM

Routing structure

```
/dashboard
/transactions
/transactions/new
/budget
/analytics
```

---

# 11. External npm Packages

Students must use external libraries.

Required packages:

```
react-router-dom
axios
react-icons
react-toastify
react-hook-form
yup
recharts
date-fns
uuid
framer-motion
```

---

# 12. Suggested Folder Structure

```
src

components
   TransactionCard
   Charts
   SearchBar
   Filters
   BudgetCard

pages
   Dashboard
   Transactions
   AddTransaction
   Budget
   Analytics

context
   FinanceContext

hooks
   useTransactions
   useBudget
   useDebounce

services
   api.js

utils
   currencyFormatter.js
```

---

# 13. Evaluation Criteria

| Criteria             | Weight |
| -------------------- | ------ |
| Feature completeness | 25%    |
| React architecture   | 25%    |
| State management     | 20%    |
| UI design            | 15%    |
| Code quality         | 15%    |

---

