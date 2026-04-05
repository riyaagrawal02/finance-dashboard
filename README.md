# Finance Dashboard UI

A modern Finance Dashboard web application built using React, TypeScript, and Tailwind CSS.
This project demonstrates dashboard UI design, component structuring, state management, and data visualization on the frontend.

---

## Project Overview

The Finance Dashboard allows users to track financial activity, view transactions, analyze spending patterns, and see financial insights through charts and summary cards.

This project focuses on frontend architecture, UI/UX design, and state management rather than backend integration.

---

## Features

### Dashboard Overview

* Summary cards for Total Balance, Income, and Expenses
* Balance trend visualization
* Spending breakdown by category
* Responsive dashboard layout

### Transactions

* Transactions table with Date, Amount, Category, and Type
* Search functionality
* Filter by income and expense
* Sorting support
* Admin can add transactions
* Viewer can only view data

### Role Based UI

* Role switch between Admin and Viewer
* Admin can add transactions
* Viewer has read-only access

### Insights

* Highest spending category
* Monthly income vs expense comparison
* Basic financial insights

### UI / UX

* Modern dashboard layout with sidebar and topbar
* Responsive design
* Dark mode support
* Clean card-based UI
* Smooth hover effects and spacing

### Data Management

* State managed using Context API
* Transactions stored in Local Storage
* Mock data used for demonstration

---

## Tech Stack

* React
* TypeScript
* Tailwind CSS
* Recharts (for charts)
* Context API (State Management)
* Local Storage

---

## Project Structure

```
src
 ├── components
 ├── pages
 ├── context
 ├── data
 ├── App.tsx
 ├── main.tsx
```

---

## Setup Instructions

1. Clone the repository
2. Install dependencies

```
npm install
```

3. Run the development server

```
npm run dev
```

4. Open in browser

```
http://localhost:5173
```

---



