# SQL Review & Data Engineering Playground 🚀

An interactive web application and practice platform tailored for Data Engineering SQL interviews and practical mastery.

## ✨ Features

- **Interactive In-Browser SQL Engine**: Runs real SQLite WebAssembly (`sql.js`) client-side with zero latency.
- **Data Engineering Curriculum**:
  - Execution Order & The SQL Mental Model
  - Aggregations (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`)
  - `GROUP BY` and `HAVING` post-aggregation filters
  - Table Relationships & Joins (`INNER`, `LEFT`, `RIGHT`, `FULL`, and the Anti-Join pattern)
  - Subqueries & Common Table Expressions (`WITH` CTEs)
  - Window Functions (`ROW_NUMBER`, `RANK`, `DENSE_RANK`, `PARTITION BY`)
  - Data Cleaning & Three-Valued Logic (`NULL` handling, blank strings, deduplication)
  - Conditional Logic (`CASE WHEN` & Pivot aggregations)
  - Date Manipulation (`DATE_TRUNC`, `strftime`, date math)
- **10+ Handcrafted Practical Exercises**:
  - Top 5 customers by sales
  - Duplicate record detection
  - Products never sold (Anti-Join)
  - Monthly regional sales trends
  - Employees above department average
  - Missing email address detection
  - Revenue ranking with `DENSE_RANK()`
  - Latest transaction per customer with `ROW_NUMBER()`
  - DataLemur Meta & LinkedIn interview challenges
- **Live Schema Inspector & Query Validator**:
  - Instant output comparison against expected result sets
  - Multi-level hints and detailed solution explanations
  - Progress tracker saved to `localStorage`

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS (custom dark violet/aubergine palette)
- **Database Engine**: `sql.js` (SQLite in WebAssembly)
- **Icons**: Lucide React
- **Confetti & FX**: canvas-confetti

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/amy9273/sql-review.git

# Install dependencies
npm install

# Run the local development server
npm run dev
```
