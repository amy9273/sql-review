export interface Lesson {
  id: string;
  category: 'Fundamentals' | 'Intermediate' | 'Advanced' | 'Data Cleaning';
  title: string;
  subtitle: string;
  readingTime: string;
  summary: string;
  content: string;
  starterSql: string;
  keyTakeaways: string[];
}

export interface Activity {
  id: string;
  title: string;
  companyTag?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  prompt: string;
  tablesUsed: string[];
  starterCode: string;
  expectedQuery: string;
  hints: string[];
  solutionExplanation: string;
}

export const LESSONS: Lesson[] = [
  {
    id: 'sql-execution-order',
    category: 'Fundamentals',
    title: 'How SQL Thinks: Order of Execution',
    subtitle: 'The #1 difference between writing SQL and how the database runs it',
    readingTime: '4 min',
    summary: 'Why aliases fail in WHERE clauses and how the query planner processes clauses step-by-step.',
    keyTakeaways: [
      'SQL does NOT execute top-to-bottom.',
      'FROM and JOIN run first to assemble the dataset.',
      'WHERE runs before GROUP BY to filter raw rows.',
      'HAVING runs after GROUP BY to filter aggregated groups.',
      'SELECT runs almost last, which is why SELECT aliases cannot be referenced in WHERE.'
    ],
    starterSql: `-- Notice how we can't do "WHERE total > 500" if "total" was aliased in SELECT!
SELECT 
    customer_id, 
    SUM(sale_amount) AS total_sales
FROM sales
WHERE sale_amount > 100         -- Filters individual orders BEFORE grouping
GROUP BY customer_id
HAVING SUM(sale_amount) > 400   -- Filters aggregated buckets AFTER grouping
ORDER BY total_sales DESC;`,
    content: `
### The Mental Model
The biggest stumbling block when learning SQL is that you write queries in one order, but the query engine executes them in a completely different pipeline:

\`\`\`text
What You Write:           How SQL Runs:
1. SELECT                 1. FROM & JOIN     -> Locate & join the base tables
2. FROM / JOIN            2. WHERE           -> Filter individual rows
3. WHERE                  3. GROUP BY        -> Bucket matching rows
4. GROUP BY               4. HAVING          -> Filter the grouped buckets
5. HAVING                 5. SELECT          -> Pick columns & compute expressions
6. ORDER BY               6. DISTINCT        -> Deduplicate results
7. LIMIT                  7. ORDER BY        -> Sort final output
                          8. LIMIT / OFFSET  -> Return subset
\`\`\`

### Why This Matters in Real Life
Have you ever tried to do this?
\`\`\`sql
-- ❌ FAILS IN MOST ENGINES:
SELECT customer_id, sale_amount * 1.10 AS adjusted_price
FROM sales
WHERE adjusted_price > 200;
\`\`\`
It fails because at step 2 (\`WHERE\`), the database doesn't even know what \`adjusted_price\` is! The \`SELECT\` step (step 5) hasn't happened yet.
`
  },
  {
    id: 'null-handling',
    category: 'Data Cleaning',
    title: 'Handling NULL Values in SQL',
    subtitle: 'From your study notes: Three-valued logic, COUNT behavior, and Anti-Joins',
    readingTime: '5 min',
    summary: 'Mastering NULL vs 0 vs empty strings, COUNT(*) vs COUNT(col), and the IS NULL predicate.',
    keyTakeaways: [
      'NULL means "unknown or missing", not 0 and not empty string "".',
      'Never use = NULL or != NULL. Always use IS NULL or IS NOT NULL.',
      'COUNT(*) counts every physical row. COUNT(column) ignores NULLs.',
      'Anti-Join: LEFT JOIN with right_table.id IS NULL finds records that never occurred.'
    ],
    starterSql: `-- Compare how COUNT(*) counts everything vs COUNT(email) skipping NULLs
SELECT 
    COUNT(*) AS total_customers,
    COUNT(email) AS customers_with_email,
    COUNT(*) - COUNT(email) AS missing_email_count
FROM customers;`,
    content: `
### What is NULL?
In relational algebra, \`NULL\` represents missing, unknown, or inapplicable information.

* \`NULL ≠ 0\` (Zero is a known numeric value).
* \`NULL ≠ ''\` (An empty string is a known string with length 0).
* \`NULL\` means: *"We do not have this information."*

### Three-Valued Logic
Because NULL is unknown, comparing anything to NULL with standard operators (\`=\`, \`<>\`, \`<\`) results in **UNKNOWN**, never \`TRUE\`.

\`\`\`sql
-- ❌ ALWAYS WRONG: Returns 0 rows every single time
SELECT * FROM customers WHERE email = NULL;

-- ✅ CORRECT:
SELECT * FROM customers WHERE email IS NULL;
\`\`\`

### The Critical COUNT() Difference
* \`COUNT(*)\`: Counts all rows, regardless of NULLs.
* \`COUNT(column_name)\`: Counts only non-NULL entries in that specific column.
* \`COUNT(column_name)\` is mathematically identical to \`COUNT(*) WHERE column_name IS NOT NULL\`.
`
  },
  {
    id: 'group-by-having',
    category: 'Fundamentals',
    title: 'Aggregation: GROUP BY and HAVING',
    subtitle: 'Squashing rows into buckets and filtering aggregated statistics',
    readingTime: '4 min',
    summary: 'When to use WHERE vs HAVING, and how aggregate functions like SUM, AVG, MIN, MAX operate.',
    keyTakeaways: [
      'Any non-aggregated column in your SELECT MUST be in your GROUP BY clause.',
      'WHERE cannot contain aggregate functions (e.g. WHERE SUM(x) > 100 is illegal).',
      'HAVING is designed exclusively to filter on aggregated results.'
    ],
    starterSql: `-- Calculate average salary per department for salaries over $90k
SELECT 
    department_id,
    COUNT(*) AS employee_count,
    ROUND(AVG(salary), 2) AS avg_dept_salary,
    MAX(salary) AS highest_salary
FROM employees
WHERE salary > 90000
GROUP BY department_id
HAVING COUNT(*) >= 2;`,
    content: `
### The Core Difference: WHERE vs HAVING
* **\`WHERE\`** filters individual records **before** grouping takes place.
* **\`HAVING\`** filters group statistics **after** rows have been squashed together.

\`\`\`sql
SELECT region, SUM(sale_amount) AS total_revenue
FROM sales
WHERE sale_date >= '2024-01-01'      -- Filter individual dates
GROUP BY region
HAVING SUM(sale_amount) > 500;       -- Filter aggregated total
\`\`\`

### Rule of Non-Aggregated Columns
If you include a column in your \`SELECT\` that is not inside an aggregate function (\`SUM\`, \`AVG\`, \`COUNT\`), it **must** appear in the \`GROUP BY\` list. Otherwise, SQL won't know which row's value to show for that group!
`
  },
  {
    id: 'table-joins',
    category: 'Intermediate',
    title: 'Mastering Joins: INNER, LEFT, & Anti-Joins',
    subtitle: 'Connecting disparate data models and discovering missing connections',
    readingTime: '5 min',
    summary: 'Visualizing relational joins, handling NULL matches, and the Anti-Join interview secret.',
    keyTakeaways: [
      'INNER JOIN returns only rows with a match in BOTH tables.',
      'LEFT JOIN preserves all rows from the left table; missing right values are NULL.',
      'Anti-Join: LEFT JOIN + WHERE right_table.key IS NULL is the fastest way to find orphaned records.',
      'Always use descriptive table aliases (e.g. c for customers, s for sales).'
    ],
    starterSql: `-- Finding products that NEVER got sold using a LEFT JOIN Anti-Join
SELECT 
    p.product_id,
    p.product_name,
    p.price
FROM products p
LEFT JOIN sales s ON p.product_id = s.product_id
WHERE s.sale_id IS NULL;`,
    content: `
### Visualizing Joins
1. **INNER JOIN**: Intersection. Keeps only records that exist in both Table A and Table B.
2. **LEFT JOIN**: Keeps everything from Table A. If Table B doesn't match, Table B columns become \`NULL\`.
3. **RIGHT JOIN**: Keeps everything from Table B. (In practice, most data engineers just flip to a LEFT JOIN for readability).
4. **FULL OUTER JOIN**: Keeps everything from both tables, filling mismatches with \`NULL\`.

### The "Anti-Join" Pattern (Facebook & Amazon Interview Classic)
When an interviewer asks:
> *"Find customers who never made an order"* or *"Find pages with zero likes"*,
your brain should instantly trigger the Anti-Join pattern:

\`\`\`sql
SELECT p.page_id
FROM pages p
LEFT JOIN page_likes l ON p.page_id = l.page_id
WHERE l.page_id IS NULL;
\`\`\`
`
  },
  {
    id: 'ctes-and-subqueries',
    category: 'Intermediate',
    title: 'CTEs (WITH Statements) & Subqueries',
    subtitle: 'Writing clean, maintainable, and modular data transformations',
    readingTime: '6 min',
    summary: 'Transitioning from messy nested subqueries to clean Common Table Expressions (WITH).',
    keyTakeaways: [
      'CTEs act like temporary, named views within a single query execution.',
      'CTEs can be chained sequentially: WITH a AS (...), b AS (...) SELECT ...',
      'In Data Engineering pipelines, CTEs make complex ETL logic readable and testable.'
    ],
    starterSql: `-- Using a CTE to find employees earning above their department's average
WITH dept_averages AS (
    SELECT 
        department_id,
        AVG(salary) AS avg_sal
    FROM employees
    GROUP BY department_id
)
SELECT 
    e.employee_id,
    e.name,
    e.department_id,
    e.salary,
    ROUND(d.avg_sal, 2) AS dept_avg_sal
FROM employees e
JOIN dept_averages d ON e.department_id = d.department_id
WHERE e.salary > d.avg_sal;`,
    content: `
### Subquery vs CTE
A subquery is a query nested inside another query:
\`\`\`sql
-- Subquery in WHERE:
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);
\`\`\`

While subqueries work, they quickly turn into unreadable "SQL spaghetti" when nested 3 or 4 layers deep.

### Enter the Common Table Expression (CTE)
A CTE begins with the \`WITH\` keyword. It lets you create named virtual blocks that read top-to-bottom:

\`\`\`sql
WITH clean_orders AS (
    SELECT customer_id, sale_amount
    FROM sales
    WHERE sale_amount IS NOT NULL
),
customer_totals AS (
    SELECT customer_id, SUM(sale_amount) AS total_spent
    FROM clean_orders
    GROUP BY customer_id
)
SELECT * FROM customer_totals WHERE total_spent > 500;
\`\`\`
`
  },
  {
    id: 'window-functions',
    category: 'Advanced',
    title: 'Window Functions: ROW_NUMBER, RANK, & PARTITION BY',
    subtitle: 'The #1 skill tested in senior Data Engineering SQL interviews',
    readingTime: '7 min',
    summary: 'Calculating running totals, top-N per category, rankings, and deduplicating records.',
    keyTakeaways: [
      'Window functions calculate across a set of rows WITHOUT collapsing rows like GROUP BY does.',
      'PARTITION BY divides the rows into groups/windows.',
      'ORDER BY defines the sequence within each window.',
      'ROW_NUMBER() always assigns 1, 2, 3... (never ties).',
      'RANK() leaves gaps on ties (1, 2, 2, 4), while DENSE_RANK() leaves no gaps (1, 2, 2, 3).'
    ],
    starterSql: `-- Finding the latest transaction for each customer using ROW_NUMBER()
WITH ranked_tx AS (
    SELECT 
        transaction_id,
        customer_id,
        amount,
        transaction_date,
        ROW_NUMBER() OVER (
            PARTITION BY customer_id 
            ORDER BY transaction_date DESC
        ) AS rn
    FROM transactions
)
SELECT 
    customer_id,
    transaction_id,
    amount,
    transaction_date
FROM ranked_tx
WHERE rn = 1;`,
    content: `
### The Crucial Difference: GROUP BY vs Window Functions
* \`GROUP BY\`: Aggregates and collapses 10 rows into 1 row.
* **Window Function**: Calculates an aggregate or ranking across a group, but **keeps all 10 individual rows** in the final output!

\`\`\`text
Syntax Anatomy:
<FUNCTION>() OVER (
    PARTITION BY <group_column>
    ORDER BY <sort_column> [ASC|DESC]
)
\`\`\`

### ROW_NUMBER() vs RANK() vs DENSE_RANK()
Suppose two products both have $500 in revenue:
* \`ROW_NUMBER()\`: Product A gets 1, Product B gets 2 (arbitrary tie-break).
* \`RANK()\`: Product A gets 1, Product B gets 1, Next Product gets **3** (leaves a gap).
* \`DENSE_RANK()\`: Product A gets 1, Product B gets 1, Next Product gets **2** (no gaps).
`
  },
  {
    id: 'conditional-logic-case',
    category: 'Fundamentals',
    title: 'Conditional Logic: CASE WHEN & Pivoting',
    subtitle: 'If-Else logic inside queries and conditional aggregations',
    readingTime: '5 min',
    summary: 'Transforming categorical values, preventing divide-by-zero, and one-pass conditional sums.',
    keyTakeaways: [
      'CASE WHEN works like an IF / ELSE IF / ELSE statement.',
      'Always include an ELSE branch unless you intentionally want unmatched rows to be NULL.',
      'Conditional Aggregation (e.g. SUM(CASE WHEN ...)) pivots data without complex joins.'
    ],
    starterSql: `-- Classify customers into spending tiers and count transactions
SELECT 
    customer_id,
    sale_amount,
    CASE 
        WHEN sale_amount >= 300 THEN 'VIP'
        WHEN sale_amount >= 150 THEN 'Regular'
        ELSE 'Budget'
    END AS customer_tier
FROM sales
ORDER BY sale_amount DESC;`,
    content: `
### Standard Syntax
\`\`\`sql
CASE 
    WHEN condition1 THEN result1
    WHEN condition2 THEN result2
    ELSE default_result
END
\`\`\`

### The Data Engineering Superpower: Conditional Aggregation
Instead of running 3 separate queries with different WHERE clauses, you can calculate multiple metrics in a single table scan:

\`\`\`sql
SELECT 
    region,
    COUNT(*) AS total_orders,
    SUM(CASE WHEN sale_amount >= 200 THEN 1 ELSE 0 END) AS high_value_orders,
    SUM(CASE WHEN sale_amount < 200 THEN 1 ELSE 0 END) AS standard_orders
FROM sales
GROUP BY region;
\`\`\`
`
  }
];

export const ACTIVITIES: Activity[] = [
  {
    id: 'act-top-5-customers',
    title: 'Top 5 Customers by Total Sales',
    companyTag: 'Amazon / Retail DE',
    difficulty: 'Easy',
    category: 'Aggregation & Sorting',
    prompt: `Write a query to find the top 5 customers who have spent the highest total amount across all their sales. 
Display the \`customer_id\` and their \`total_sales\` (sum of sale_amount), rounded or formatted to 2 decimals if needed. 
Order the results by total sales in descending order and limit to 5 records.`,
    tablesUsed: ['sales'],
    starterCode: `-- Find top 5 customers by total sales amount
SELECT 
    customer_id,
    -- calculate total sales here
FROM sales
-- add your grouping and ordering logic
`,
    expectedQuery: `SELECT 
    customer_id, 
    ROUND(SUM(sale_amount), 2) AS total_sales 
FROM sales 
GROUP BY customer_id 
ORDER BY total_sales DESC 
LIMIT 5;`,
    hints: [
      'Use GROUP BY customer_id to aggregate sales per customer.',
      'Use SUM(sale_amount) to calculate the sum, and ORDER BY ... DESC.',
      'Add LIMIT 5 at the end to restrict the output to the top 5.'
    ],
    solutionExplanation: `We group all records in the sales table by customer_id. The SUM(sale_amount) calculates the total revenue from each customer. Sorting by total_sales in descending order (DESC) places the biggest spenders first, and LIMIT 5 extracts just the top 5.`
  },
  {
    id: 'act-duplicate-customers',
    title: 'Identify Duplicate Customer Records',
    companyTag: 'Data Quality / ETL',
    difficulty: 'Easy',
    category: 'Data Cleaning & HAVING',
    prompt: `In data pipelines, deduplication is essential. 
Write a query to identify any duplicate customer accounts based on \`first_name\`, \`last_name\`, and \`email\`. 
Return the \`first_name\`, \`last_name\`, \`email\`, and the count of occurrences as \`record_count\`. Only return records that appear more than once!`,
    tablesUsed: ['customers'],
    starterCode: `-- Identify duplicate customer entries
SELECT 
    first_name,
    last_name,
    email,
    COUNT(*) AS record_count
FROM customers
-- group and filter for duplicates
`,
    expectedQuery: `SELECT 
    first_name, 
    last_name, 
    email, 
    COUNT(*) AS record_count 
FROM customers 
GROUP BY first_name, last_name, email 
HAVING COUNT(*) > 1;`,
    hints: [
      'Group by all three identifying columns: first_name, last_name, email.',
      'Use the HAVING clause to filter out groups that only appear once.',
      'The filter condition is HAVING COUNT(*) > 1.'
    ],
    solutionExplanation: `By grouping on (first_name, last_name, email), every unique identity forms a single group. COUNT(*) tells us how many rows belong to that identity. The HAVING COUNT(*) > 1 filters away unique individuals and isolates only duplicate records.`
  },
  {
    id: 'act-unsold-products',
    title: 'Find Products That Have Never Been Sold',
    companyTag: 'E-Commerce / Inventory',
    difficulty: 'Medium',
    category: 'Table Relationships & Joins',
    prompt: `The marketing team wants to audit inventory for items with zero sales traction. 
Write a query to return the \`product_id\` and \`product_name\` of all products in the \`products\` table that have NEVER appeared in the \`sales\` table. 
Order the results by \`product_id\` ascending.`,
    tablesUsed: ['products', 'sales'],
    starterCode: `-- Find products never sold using a LEFT JOIN Anti-Join
SELECT 
    p.product_id,
    p.product_name
FROM products p
-- join to sales and filter
ORDER BY p.product_id ASC;`,
    expectedQuery: `SELECT 
    p.product_id, 
    p.product_name 
FROM products p 
LEFT JOIN sales s ON p.product_id = s.product_id 
WHERE s.sale_id IS NULL 
ORDER BY p.product_id ASC;`,
    hints: [
      'Use a LEFT JOIN from products (left table) to sales (right table).',
      'For products with zero sales, the columns coming from sales will be filled with NULL.',
      'Filter with WHERE s.sale_id IS NULL (or s.product_id IS NULL).'
    ],
    solutionExplanation: `A LEFT JOIN retains all products from the products table. If a product was never purchased, no matching row exists in sales, causing SQL to populate all sales columns with NULL. Adding WHERE s.sale_id IS NULL strips away sold products, leaving only unsold items.`
  },
  {
    id: 'act-monthly-regional-sales',
    title: 'Calculate Monthly Sales for Each Region',
    companyTag: 'Snowflake / Analytics',
    difficulty: 'Medium',
    category: 'Date Manipulation & Aggregation',
    prompt: `Analyze revenue trends over time. 
Write a query to calculate total sales for each \`region\` by month. 
Extract the year-month formatted as \`YYYY-MM\` (in SQLite, use \`strftime('%Y-%m', sale_date)\`) as \`sales_month\`. 
Output \`region\`, \`sales_month\`, and \`total_sales\` (rounded to 2 decimal places). 
Order by \`region\` ascending, then \`sales_month\` ascending.`,
    tablesUsed: ['sales'],
    starterCode: `-- Calculate monthly regional sales
SELECT 
    region,
    strftime('%Y-%m', sale_date) AS sales_month,
    -- calculate total sales
FROM sales
-- group and sort
`,
    expectedQuery: `SELECT 
    region, 
    strftime('%Y-%m', sale_date) AS sales_month, 
    ROUND(SUM(sale_amount), 2) AS total_sales 
FROM sales 
GROUP BY region, strftime('%Y-%m', sale_date) 
ORDER BY region ASC, sales_month ASC;`,
    hints: [
      'In SQLite, extract year-month using strftime(\'%Y-%m\', sale_date).',
      'You must GROUP BY both region AND the extracted month expression.',
      'Order by region ASC, sales_month ASC.'
    ],
    solutionExplanation: `Because we want sales per region per month, we extract the YYYY-MM component using strftime('%Y-%m', sale_date). We then group by both region and this month string. SUM(sale_amount) totals the sales for each unique region-month combination.`
  },
  {
    id: 'act-above-dept-average-salary',
    title: 'Employees Earning Above Department Average',
    companyTag: 'Meta / HR Analytics',
    difficulty: 'Medium',
    category: 'CTEs & Subqueries',
    prompt: `Write a query to find all employees who earn strictly MORE than the average salary of their own department. 
Return the employee's \`employee_id\`, \`name\`, \`department_id\`, and their \`salary\`. 
Order the output by \`department_id\` ascending, then \`salary\` descending.`,
    tablesUsed: ['employees'],
    starterCode: `-- Use a CTE to calculate department averages first
WITH dept_averages AS (
    SELECT 
        department_id,
        AVG(salary) AS avg_salary
    FROM employees
    GROUP BY department_id
)
SELECT 
    e.employee_id,
    e.name,
    e.department_id,
    e.salary
FROM employees e
-- Join to dept_averages and filter
`,
    expectedQuery: `WITH dept_averages AS (
    SELECT 
        department_id, 
        AVG(salary) AS avg_salary 
    FROM employees 
    GROUP BY department_id
) 
SELECT 
    e.employee_id, 
    e.name, 
    e.department_id, 
    e.salary 
FROM employees e 
JOIN dept_averages d ON e.department_id = d.department_id 
WHERE e.salary > d.avg_salary 
ORDER BY e.department_id ASC, e.salary DESC;`,
    hints: [
      'Create a CTE (WITH clause) that calculates AVG(salary) grouped by department_id.',
      'JOIN the employees table e with your CTE d ON e.department_id = d.department_id.',
      'Filter where e.salary > d.avg_salary.'
    ],
    solutionExplanation: `We first calculate each department's average salary in a Common Table Expression (dept_averages). Next, we join every employee back to their department's average record. Finally, the WHERE e.salary > d.avg_salary filter retains only high earners.`
  },
  {
    id: 'act-missing-emails',
    title: 'Identify Customers with Missing Email Addresses',
    companyTag: 'Data Cleaning / CRM',
    difficulty: 'Easy',
    category: 'Data Cleaning & NULLs',
    prompt: `From your notes on NULL handling: When working with real customer data, fields can be missing either as a database \`NULL\` or as an empty blank string \`''\`. 
Write a query to select the \`customer_id\`, \`first_name\`, and \`last_name\` of all customers who have either a \`NULL\` email OR an empty/blank email string. 
Order the output by \`customer_id\` ascending.`,
    tablesUsed: ['customers'],
    starterCode: `-- Find customers with missing or blank emails
SELECT 
    customer_id,
    first_name,
    last_name
FROM customers
-- check for NULL or blank string
ORDER BY customer_id ASC;`,
    expectedQuery: `SELECT 
    customer_id, 
    first_name, 
    last_name 
FROM customers 
WHERE email IS NULL OR TRIM(email) = '' 
ORDER BY customer_id ASC;`,
    hints: [
      'Use IS NULL to check for null values.',
      'Use TRIM(email) = \'\' or email = \'\' to catch blank strings.',
      'Combine both conditions using an OR.'
    ],
    solutionExplanation: `In real databases, missing data comes in two flavors: genuine NULLs and empty strings (''). By checking email IS NULL OR TRIM(email) = '', we defensively capture both types of incomplete customer profiles.`
  },
  {
    id: 'act-rank-products-revenue',
    title: 'Rank Products Based on Total Revenue',
    companyTag: 'Uber / Pricing DE',
    difficulty: 'Medium',
    category: 'Window Functions',
    prompt: `Write a query to rank products based on their total revenue generated in the \`sales\` table. 
Display the \`product_id\`, their \`total_revenue\` (sum of sale_amount rounded to 2 decimals), and their ranking using \`DENSE_RANK()\` as \`revenue_rank\`. 
Sort the results by \`revenue_rank\` ascending, then \`product_id\` ascending.`,
    tablesUsed: ['sales'],
    starterCode: `-- Rank products by total revenue using DENSE_RANK()
SELECT 
    product_id,
    ROUND(SUM(sale_amount), 2) AS total_revenue,
    -- add DENSE_RANK() window function here
FROM sales
GROUP BY product_id
-- order results
`,
    expectedQuery: `SELECT 
    product_id, 
    ROUND(SUM(sale_amount), 2) AS total_revenue, 
    DENSE_RANK() OVER (ORDER BY SUM(sale_amount) DESC) AS revenue_rank 
FROM sales 
GROUP BY product_id 
ORDER BY revenue_rank ASC, product_id ASC;`,
    hints: [
      'Group by product_id first to get the total revenue per product.',
      'Use DENSE_RANK() OVER (ORDER BY SUM(sale_amount) DESC) as your ranking function.',
      'Sort the final output by revenue_rank ASC, product_id ASC.'
    ],
    solutionExplanation: `We aggregate sales by product_id using SUM(sale_amount). The window function DENSE_RANK() OVER (ORDER BY SUM(sale_amount) DESC) looks at all grouped products and assigns ranks starting from 1 for the highest earner without leaving rank gaps on ties.`
  },
  {
    id: 'act-latest-transaction-per-customer',
    title: 'Find the Latest Transaction for Each Customer',
    companyTag: 'Stripe / Fintech DE',
    difficulty: 'Hard',
    category: 'Window Functions & CTE',
    prompt: `In financial event-streaming pipelines, deduplicating to the latest state is a common requirement. 
Write a query to find the single most recent transaction for every customer in the \`transactions\` table. 
Return \`customer_id\`, \`transaction_id\`, \`amount\`, and \`transaction_date\`. 
Order by \`customer_id\` ascending.`,
    tablesUsed: ['transactions'],
    starterCode: `-- Use ROW_NUMBER() inside a CTE to find the latest transaction
WITH ranked_transactions AS (
    SELECT 
        transaction_id,
        customer_id,
        amount,
        transaction_date,
        -- add ROW_NUMBER() window function partitioned by customer
    FROM transactions
)
SELECT 
    customer_id,
    transaction_id,
    amount,
    transaction_date
FROM ranked_transactions
-- filter for latest record
ORDER BY customer_id ASC;`,
    expectedQuery: `WITH ranked_transactions AS (
    SELECT 
        transaction_id, 
        customer_id, 
        amount, 
        transaction_date, 
        ROW_NUMBER() OVER (
            PARTITION BY customer_id 
            ORDER BY transaction_date DESC
        ) AS rn 
    FROM transactions
) 
SELECT 
    customer_id, 
    transaction_id, 
    amount, 
    transaction_date 
FROM ranked_transactions 
WHERE rn = 1 
ORDER BY customer_id ASC;`,
    hints: [
      'In the CTE, compute ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY transaction_date DESC) AS rn.',
      'PARTITION BY customer_id ensures the row count resets to 1 for each customer.',
      'ORDER BY transaction_date DESC puts the most recent transaction at rank 1.',
      'In the outer query, filter with WHERE rn = 1.'
    ],
    solutionExplanation: `By partitioning by customer_id and sorting transaction_date in descending order, the newest transaction for every customer receives rn = 1. Filtering for rn = 1 in the outer SELECT gives exactly one latest record per customer.`
  },
  {
    id: 'act-facebook-page-no-likes',
    title: 'Facebook: Page With No Likes',
    companyTag: 'Meta (DataLemur)',
    difficulty: 'Easy',
    category: 'Table Relationships & Joins',
    prompt: `Assume you are given two tables containing data about Facebook Pages and their respective likes. 
Write a query to return the IDs of the Facebook pages that have zero likes. 
The output should only contain the \`page_id\` column and be sorted in ascending order.`,
    tablesUsed: ['pages', 'page_likes'],
    starterCode: `-- Facebook Page With No Likes
SELECT p.page_id
FROM pages p
-- Perform a LEFT JOIN to page_likes and filter for missing records
ORDER BY p.page_id ASC;`,
    expectedQuery: `SELECT p.page_id 
FROM pages p 
LEFT JOIN page_likes l ON p.page_id = l.page_id 
WHERE l.page_id IS NULL 
ORDER BY p.page_id ASC;`,
    hints: [
      'Perform a LEFT JOIN between pages and page_likes on page_id.',
      'Pages with zero likes will have NULL for page_likes.page_id.',
      'Filter with WHERE l.page_id IS NULL.'
    ],
    solutionExplanation: `A LEFT JOIN guarantees all Facebook pages remain in the intermediate output. When a page has never been liked, the page_likes columns evaluate to NULL. Filtering WHERE l.page_id IS NULL keeps exclusively the pages with zero likes.`
  },
  {
    id: 'act-linkedin-ds-skills',
    title: 'LinkedIn: Candidate Skill Matching',
    companyTag: 'LinkedIn (DataLemur)',
    difficulty: 'Easy',
    category: 'Grouping & Filtering',
    prompt: `Given a table of candidates and their skills, find the candidates who are proficient in ALL THREE of the required skills: 'Python', 'Tableau', and 'PostgreSQL'. 
List the \`candidate_id\` for matching candidates. 
Sort the output by \`candidate_id\` in ascending order.`,
    tablesUsed: ['candidates'],
    starterCode: `-- Find candidates who possess all 3 skills: Python, Tableau, PostgreSQL
SELECT candidate_id
FROM candidates
-- filter, group, and enforce all 3 skills
ORDER BY candidate_id ASC;`,
    expectedQuery: `SELECT candidate_id 
FROM candidates 
WHERE skill IN ('Python', 'Tableau', 'PostgreSQL') 
GROUP BY candidate_id 
HAVING COUNT(DISTINCT skill) = 3 
ORDER BY candidate_id ASC;`,
    hints: [
      'Filter for relevant skills first: WHERE skill IN (\'Python\', \'Tableau\', \'PostgreSQL\').',
      'Group by candidate_id.',
      'Use HAVING COUNT(DISTINCT skill) = 3 to verify they have all three distinct requirements.'
    ],
    solutionExplanation: `Remember the trap: never use AND between different row values! Instead, filter with WHERE skill IN ('Python', 'Tableau', 'PostgreSQL'), group by candidate_id, and assert HAVING COUNT(DISTINCT skill) = 3.`
  }
];

export const SAMPLE_SCHEMAS: { tableName: string; description: string; columns: { name: string; type: string; notes?: string }[] }[] = [
  {
    tableName: 'customers',
    description: 'Stores customer demographic, email, and registration data',
    columns: [
      { name: 'customer_id', type: 'INTEGER', notes: 'Primary Key' },
      { name: 'first_name', type: 'TEXT' },
      { name: 'last_name', type: 'TEXT' },
      { name: 'email', type: 'TEXT', notes: 'Contains NULL and blank string values' },
      { name: 'city', type: 'TEXT' },
      { name: 'signup_date', type: 'TEXT', notes: 'YYYY-MM-DD' }
    ]
  },
  {
    tableName: 'products',
    description: 'Product catalog with category pricing',
    columns: [
      { name: 'product_id', type: 'INTEGER', notes: 'Primary Key' },
      { name: 'product_name', type: 'TEXT' },
      { name: 'category', type: 'TEXT' },
      { name: 'price', type: 'REAL' }
    ]
  },
  {
    tableName: 'sales',
    description: 'Historical order transactions with regional dimensions',
    columns: [
      { name: 'sale_id', type: 'INTEGER', notes: 'Primary Key' },
      { name: 'customer_id', type: 'INTEGER', notes: 'FK -> customers.customer_id' },
      { name: 'product_id', type: 'INTEGER', notes: 'FK -> products.product_id' },
      { name: 'region', type: 'TEXT', notes: 'East, West, South, Midwest' },
      { name: 'sale_amount', type: 'REAL' },
      { name: 'sale_date', type: 'TEXT', notes: 'YYYY-MM-DD' }
    ]
  },
  {
    tableName: 'employees',
    description: 'Company workforce information with department and salary',
    columns: [
      { name: 'employee_id', type: 'INTEGER', notes: 'Primary Key' },
      { name: 'name', type: 'TEXT' },
      { name: 'department_id', type: 'INTEGER', notes: 'FK -> departments.department_id' },
      { name: 'salary', type: 'REAL' },
      { name: 'hire_date', type: 'TEXT' }
    ]
  },
  {
    tableName: 'departments',
    description: 'Organizational business units',
    columns: [
      { name: 'department_id', type: 'INTEGER', notes: 'Primary Key' },
      { name: 'department_name', type: 'TEXT' }
    ]
  },
  {
    tableName: 'transactions',
    description: 'Payment log with timestamps for window function deduplication',
    columns: [
      { name: 'transaction_id', type: 'INTEGER', notes: 'Primary Key' },
      { name: 'customer_id', type: 'INTEGER', notes: 'FK -> customers.customer_id' },
      { name: 'amount', type: 'REAL' },
      { name: 'transaction_date', type: 'TEXT', notes: 'YYYY-MM-DD HH:MM:SS' }
    ]
  },
  {
    tableName: 'pages',
    description: 'Facebook Pages directory',
    columns: [
      { name: 'page_id', type: 'INTEGER', notes: 'Primary Key' },
      { name: 'page_name', type: 'TEXT' }
    ]
  },
  {
    tableName: 'page_likes',
    description: 'User likes log for Facebook Pages',
    columns: [
      { name: 'user_id', type: 'INTEGER' },
      { name: 'page_id', type: 'INTEGER', notes: 'FK -> pages.page_id' },
      { name: 'liked_date', type: 'TEXT' }
    ]
  },
  {
    tableName: 'candidates',
    description: 'Candidate skill tags for recruitment matching',
    columns: [
      { name: 'candidate_id', type: 'INTEGER' },
      { name: 'skill', type: 'TEXT', notes: 'e.g. Python, SQL, Tableau' }
    ]
  }
];
