export interface LessonSection {
  title: string;
  body: string;
  exampleSql?: string;
  tablePreview?: {
    caption: string;
    headers: string[];
    rows: (string | number | null)[][];
  };
}

export interface Lesson {
  id: string;
  moduleTitle: string;
  moduleOrder: number;
  lessonOrder: number;
  title: string;
  description: string;
  sections: LessonSection[];
  quickReference?: { goal: string; syntax: string }[];
  commonMistake?: {
    wrongSql: string;
    correctSql: string;
    explanation: string;
  };
  tryItSql: string;
}

export interface Activity {
  id: string;
  order: number;
  moduleTag: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  context: string;
  goal: string;
  tablesUsed: string[];
  sampleInput: {
    tableName: string;
    headers: string[];
    rows: (string | number | null)[][];
  };
  expectedOutputPreview: {
    headers: string[];
    sampleRows: (string | number | null)[][];
    totalExpectedRows: number;
  };
  starterCode: string;
  expectedQuery: string;
  hints: string[];
  walkthrough: string;
}

export const MODULES = [
  {
    id: 1,
    title: 'Module 1: Foundations & Filtering',
    description: 'Learn how to retrieve data, filter records, handle missing NULL values, and sort results.'
  },
  {
    id: 2,
    title: 'Module 2: Summarizing & Grouping Data',
    description: 'Calculate metrics using COUNT, SUM, AVG, and bucket data with GROUP BY and HAVING.'
  },
  {
    id: 3,
    title: 'Module 3: Combining Tables with Joins',
    description: 'Connect related tables using INNER JOIN, LEFT JOIN, and master the Anti-Join pattern.'
  },
  {
    id: 4,
    title: 'Module 4: Advanced Data Engineering Transformations',
    description: 'Write professional pipelines using CASE WHEN, CTEs (WITH), and Window Functions.'
  }
];

export const LESSONS: Lesson[] = [
  {
    id: 'select-from-order',
    moduleTitle: 'Module 1: Foundations & Filtering',
    moduleOrder: 1,
    lessonOrder: 1,
    title: 'Retrieving Data & Query Execution Order',
    description: 'Learn the basic syntax of SELECT and understand how SQL executes queries behind the scenes.',
    sections: [
      {
        title: 'What is a SQL Query?',
        body: 'A database stores information in tables made of rows (individual records) and columns (attributes). When you write a SQL query, you are asking the database to find specific information and show it to you.\n\nThe most fundamental command in SQL is made of two parts:\n- SELECT: tells the database which columns you want to see.\n- FROM: tells the database which table has those columns.'
      },
      {
        title: 'The Written Order vs. The Execution Order',
        body: 'Here is a surprising fact that every beginner needs to know: SQL does NOT execute clauses in the order you write them.\n\nWhen you write a query, you start with SELECT. But the database must first locate the table before it can pick columns!',
        exampleSql: `-- Written Order:
SELECT customer_id, first_name, city
FROM customers
LIMIT 5;`
      },
      {
        title: 'How SQL Executes Step-by-Step',
        body: '1. FROM: First, the database finds the table (e.g., customers).\n2. SELECT: Second, it extracts only the requested columns (customer_id, first_name, city).\n3. LIMIT: Finally, it stops reading after the specified number of rows (5 rows).'
      }
    ],
    quickReference: [
      { goal: 'Select all columns', syntax: 'SELECT * FROM table_name;' },
      { goal: 'Select specific columns', syntax: 'SELECT col1, col2 FROM table_name;' },
      { goal: 'Limit number of results', syntax: 'SELECT col FROM table_name LIMIT 10;' }
    ],
    tryItSql: `-- Try selecting customer names and their city
SELECT 
    customer_id, 
    first_name, 
    last_name, 
    city 
FROM customers 
LIMIT 5;`
  },
  {
    id: 'where-filtering',
    moduleTitle: 'Module 1: Foundations & Filtering',
    moduleOrder: 1,
    lessonOrder: 2,
    title: 'Filtering Data with the WHERE Clause',
    description: 'Learn how to narrow down records using comparison operators for numbers and text.',
    sections: [
      {
        title: 'Why Filter Data?',
        body: 'Real database tables often hold millions of rows. Usually, you only care about a specific subset—such as customers in a certain city, or orders placed above $100.\n\nTo filter data, we use the WHERE clause. It checks every row against a condition and only keeps the rows where the condition is TRUE.'
      },
      {
        title: 'Filtering Numbers with Comparison Operators',
        body: 'You can compare numeric values using standard mathematical symbols:\n- > (Greater than)\n- < (Less than)\n- >= (Greater than or equal to)\n- <= (Less than or equal to)\n- = (Equal to)\n- <> or != (Not equal to)',
        exampleSql: `-- Find products priced higher than $150
SELECT product_name, category, price
FROM products
WHERE price > 150;`
      },
      {
        title: 'Filtering Text (Strings)',
        body: 'When filtering text, you must enclose the text inside single quotation marks. Without quotes, SQL thinks the word is a column name!',
        exampleSql: `-- Filtering for customers located in Chicago
SELECT first_name, last_name, city
FROM customers
WHERE city = 'Chicago';`
      }
    ],
    quickReference: [
      { goal: 'Exact match', syntax: "WHERE city = 'Boston'" },
      { goal: 'Excluding a value', syntax: "WHERE city <> 'Boston'" },
      { goal: 'Greater than', syntax: 'WHERE price > 100' },
      { goal: 'Between two numbers', syntax: 'WHERE price BETWEEN 50 AND 200' }
    ],
    commonMistake: {
      wrongSql: "SELECT * FROM customers WHERE city = Chicago;",
      correctSql: "SELECT * FROM customers WHERE city = 'Chicago';",
      explanation: "Always wrap text strings in single quotes so SQL knows you mean a text value, not a table column."
    },
    tryItSql: `-- Try finding all products in the 'Electronics' category
SELECT product_id, product_name, category, price
FROM products
WHERE category = 'Electronics';`
  },
  {
    id: 'null-values',
    moduleTitle: 'Module 1: Foundations & Filtering',
    moduleOrder: 1,
    lessonOrder: 3,
    title: 'Handling NULL Values in SQL',
    description: 'Understand missing data, three-valued logic, and the difference between COUNT(*) and COUNT(column).',
    sections: [
      {
        title: 'What is NULL?',
        body: 'In real-world datasets, information is often missing. A customer may not have provided their email address, or an end-date has not happened yet.\n\nIn SQL, missing information is marked with a special marker called NULL.\n\nNULL does NOT mean:\n- It is not the number 0.\n- It is not an empty text string "".\n- It is not FALSE.\n\nNULL simply means: "We do not know the value."'
      },
      {
        title: 'Finding Missing Values with IS NULL',
        body: 'Because NULL represents unknown data, you CANNOT compare it using the regular equals sign (=). Comparing anything to NULL with = produces UNKNOWN, which always fails.\n\nInstead, SQL gives you two dedicated keywords:\n- IS NULL: finds records where the value is missing.\n- IS NOT NULL: finds records where a real value exists.',
        exampleSql: `-- Find customers without an email address
SELECT customer_id, first_name, last_name
FROM customers
WHERE email IS NULL;`
      },
      {
        title: 'COUNT(*) vs. COUNT(column_name)',
        body: 'This is one of the most tested questions in Data Engineering interviews:\n\n1. COUNT(*): Counts every row in the table, even if some columns have NULL.\n2. COUNT(column_name): Only counts rows where that specific column is NOT NULL!\n\nIf you have 10 rows and 2 of them have NULL emails, COUNT(*) returns 10, but COUNT(email) returns 8.'
      }
    ],
    commonMistake: {
      wrongSql: "SELECT * FROM customers WHERE email = NULL;",
      correctSql: "SELECT * FROM customers WHERE email IS NULL;",
      explanation: "In SQL, nothing equals NULL (not even NULL equals NULL!). Always use 'IS NULL' or 'IS NOT NULL'."
    },
    quickReference: [
      { goal: 'Find missing records', syntax: 'WHERE column_name IS NULL' },
      { goal: 'Find non-missing records', syntax: 'WHERE column_name IS NOT NULL' },
      { goal: 'Count only non-null values', syntax: 'SELECT COUNT(column_name) FROM table;' }
    ],
    tryItSql: `-- Compare how COUNT(*) counts all rows while COUNT(email) skips NULLs
SELECT 
    COUNT(*) AS total_customers,
    COUNT(email) AS customers_with_email,
    COUNT(*) - COUNT(email) AS missing_email_count
FROM customers;`
  },
  {
    id: 'sorting-distinct',
    moduleTitle: 'Module 1: Foundations & Filtering',
    moduleOrder: 1,
    lessonOrder: 4,
    title: 'Sorting Results & Deduplication',
    description: 'Order your records with ORDER BY (ASC/DESC) and eliminate duplicate values using DISTINCT.',
    sections: [
      {
        title: 'Sorting Data with ORDER BY',
        body: 'By default, relational databases do not guarantee any specific order when returning rows. To organize your results, use the ORDER BY clause:\n- ASC: Ascending order (lowest to highest, A to Z). This is the default.\n- DESC: Descending order (highest to lowest, Z to A).'
      },
      {
        title: 'Removing Duplicates with DISTINCT',
        body: 'If a column contains repeated entries and you only want to see the unique values once, place DISTINCT right after SELECT.',
        exampleSql: `-- Get the unique list of regions where sales have occurred
SELECT DISTINCT region
FROM sales
ORDER BY region ASC;`
      }
    ],
    quickReference: [
      { goal: 'Sort lowest to highest', syntax: 'ORDER BY price ASC' },
      { goal: 'Sort highest to lowest', syntax: 'ORDER BY price DESC' },
      { goal: 'Sort by multiple columns', syntax: 'ORDER BY category ASC, price DESC' },
      { goal: 'Keep unique values only', syntax: 'SELECT DISTINCT category FROM products;' }
    ],
    tryItSql: `-- Find products sorted from most expensive to least expensive
SELECT product_name, category, price
FROM products
ORDER BY price DESC
LIMIT 5;`
  },
  {
    id: 'aggregations-metrics',
    moduleTitle: 'Module 2: Summarizing & Grouping Data',
    moduleOrder: 2,
    lessonOrder: 1,
    title: 'Summarizing Data with Aggregate Functions',
    description: 'Calculate totals, averages, counts, and extremes using COUNT, SUM, AVG, MIN, and MAX.',
    sections: [
      {
        title: 'What are Aggregate Functions?',
        body: 'Instead of viewing individual rows, aggregate functions look at a whole column of numbers and summarize them into a single value:\n- COUNT(): counts how many records exist.\n- SUM(): adds all the numbers together.\n- AVG(): calculates the mathematical average.\n- MIN(): finds the lowest value.\n- MAX(): finds the highest value.'
      },
      {
        title: 'Rounding Decimals with ROUND()',
        body: 'Averages often produce long decimals like 149.9933333. You can wrap any numeric calculation with ROUND(value, decimal_places) to make it clean.',
        exampleSql: `-- Calculate overall sales metrics
SELECT 
    COUNT(*) AS total_orders,
    ROUND(SUM(sale_amount), 2) AS total_revenue,
    ROUND(AVG(sale_amount), 2) AS average_sale,
    MIN(sale_amount) AS lowest_sale,
    MAX(sale_amount) AS highest_sale
FROM sales;`
      }
    ],
    quickReference: [
      { goal: 'Total sum', syntax: 'SELECT SUM(sale_amount) FROM sales;' },
      { goal: 'Average rounded to 2 decimals', syntax: 'SELECT ROUND(AVG(sale_amount), 2) FROM sales;' },
      { goal: 'Find highest value', syntax: 'SELECT MAX(salary) FROM employees;' }
    ],
    tryItSql: `-- Try calculating overall employee compensation statistics
SELECT 
    COUNT(*) AS employee_count,
    ROUND(AVG(salary), 2) AS average_salary,
    MIN(salary) AS minimum_salary,
    MAX(salary) AS maximum_salary
FROM employees;`
  },
  {
    id: 'group-by-having',
    moduleTitle: 'Module 2: Summarizing & Grouping Data',
    moduleOrder: 2,
    lessonOrder: 2,
    title: 'Grouping Data with GROUP BY & HAVING',
    description: 'Organize data into categories and learn why HAVING is required to filter aggregated numbers.',
    sections: [
      {
        title: 'Squashing Rows into Categories with GROUP BY',
        body: 'What if you want to know the average salary NOT for the entire company, but for each separate department?\n\nThis is where GROUP BY comes in. It groups rows that share the same value into buckets, and then calculates the aggregate for each bucket.'
      },
      {
        title: 'The Golden Rule of GROUP BY',
        body: 'Any column that appears in your SELECT list that is NOT inside an aggregate function (like SUM or AVG) MUST be listed in the GROUP BY clause.'
      },
      {
        title: 'Filtering Groups: WHERE vs. HAVING',
        body: 'Here is the rule you must remember:\n- WHERE filters individual rows BEFORE they are grouped.\n- HAVING filters the grouped results AFTER the aggregation is calculated.\n\nYou cannot write "WHERE SUM(sale_amount) > 500" because WHERE runs before SUM even exists! You must write "HAVING SUM(sale_amount) > 500".',
        exampleSql: `-- Find regions with more than $500 in total sales
SELECT 
    region,
    ROUND(SUM(sale_amount), 2) AS total_sales
FROM sales
GROUP BY region
HAVING SUM(sale_amount) > 500;`
      }
    ],
    commonMistake: {
      wrongSql: "SELECT region, SUM(sale_amount) FROM sales WHERE SUM(sale_amount) > 500 GROUP BY region;",
      correctSql: "SELECT region, SUM(sale_amount) FROM sales GROUP BY region HAVING SUM(sale_amount) > 500;",
      explanation: "Aggregates like SUM() cannot appear in a WHERE clause. Always use HAVING to filter on aggregated values."
    },
    quickReference: [
      { goal: 'Group by a column', syntax: 'SELECT category, COUNT(*) FROM products GROUP BY category;' },
      { goal: 'Filter calculated totals', syntax: 'GROUP BY region HAVING SUM(sale_amount) > 1000' }
    ],
    tryItSql: `-- Find average salary per department for departments with at least 2 employees
SELECT 
    department_id,
    COUNT(*) AS employee_count,
    ROUND(AVG(salary), 2) AS avg_salary
FROM employees
GROUP BY department_id
HAVING COUNT(*) >= 2;`
  },
  {
    id: 'table-joins',
    moduleTitle: 'Module 3: Combining Tables with Joins',
    moduleOrder: 3,
    lessonOrder: 1,
    title: 'Connecting Tables: INNER JOIN & LEFT JOIN',
    description: 'Learn how foreign keys link data across tables and master matching vs preserving records.',
    sections: [
      {
        title: 'Why Multiple Tables?',
        body: 'In professional data systems, data is split into multiple tables to avoid repetition (this is called normalization). For example, rather than repeating customer names inside every sale row, we store a customer_id in the sales table that points back to the customers table.'
      },
      {
        title: 'INNER JOIN: Keeping Matches Only',
        body: 'An INNER JOIN combines records from two tables only when there is a matching key in BOTH tables. If an employee belongs to no department, or a department has no employees, they are dropped from the output.',
        exampleSql: `-- Combine employees with their department name
SELECT 
    e.employee_id,
    e.name AS employee_name,
    d.department_name,
    e.salary
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id;`
      },
      {
        title: 'LEFT JOIN: Keeping All Left Records',
        body: 'A LEFT JOIN keeps every single row from the LEFT table, even if there is no match on the right. If there is no match, the columns from the right table are filled with NULL.'
      }
    ],
    quickReference: [
      { goal: 'INNER JOIN (matches only)', syntax: 'FROM tableA a INNER JOIN tableB b ON a.id = b.a_id' },
      { goal: 'LEFT JOIN (keeps all tableA)', syntax: 'FROM tableA a LEFT JOIN tableB b ON a.id = b.a_id' }
    ],
    tryItSql: `-- Join products to sales to see which products have sales records
SELECT 
    p.product_name,
    p.price,
    s.sale_id,
    s.sale_amount
FROM products p
LEFT JOIN sales s ON p.product_id = s.product_id;`
  },
  {
    id: 'anti-join-pattern',
    moduleTitle: 'Module 3: Combining Tables with Joins',
    moduleOrder: 3,
    lessonOrder: 2,
    title: 'The Anti-Join: Finding What Never Happened',
    description: 'Learn how to identify products never sold, pages with zero likes, or customers who never ordered.',
    sections: [
      {
        title: 'The "Never Happened" Challenge',
        body: 'One of the most frequent interview questions in data roles is: "Find products that have never been purchased" or "Find users who never placed an order."\n\nHow do you find data that is NOT there?'
      },
      {
        title: 'The Anti-Join Recipe',
        body: '1. Start with the full list in the LEFT table (e.g., all products).\n2. Do a LEFT JOIN to the activity table (e.g., sales).\n3. If a product was never purchased, all the sales columns for that product will be NULL.\n4. Add a WHERE clause checking: WHERE sales.sale_id IS NULL!\n\nThis immediately eliminates all purchased products and leaves only the unsold items.',
        exampleSql: `-- Products that were NEVER sold
SELECT 
    p.product_id,
    p.product_name
FROM products p
LEFT JOIN sales s ON p.product_id = s.product_id
WHERE s.sale_id IS NULL;`
      }
    ],
    quickReference: [
      { goal: 'Anti-Join syntax', syntax: 'FROM parent p LEFT JOIN child c ON p.id = c.p_id WHERE c.id IS NULL' }
    ],
    tryItSql: `-- Find Facebook pages that have zero likes using the Anti-Join pattern
SELECT p.page_id, p.page_name
FROM pages p
LEFT JOIN page_likes l ON p.page_id = l.page_id
WHERE l.page_id IS NULL;`
  },
  {
    id: 'ctes-with-statements',
    moduleTitle: 'Module 4: Advanced Data Engineering Transformations',
    moduleOrder: 4,
    lessonOrder: 1,
    title: 'Common Table Expressions (WITH Statements)',
    description: 'Break complex queries into clean, readable, modular steps instead of messy nested subqueries.',
    sections: [
      {
        title: 'The Problem with Nested Subqueries',
        body: 'When you need to perform multi-stage calculations (like calculating department averages first, and then comparing each employee to that average), nesting queries inside parentheses makes code difficult to read and maintain.'
      },
      {
        title: 'What is a CTE?',
        body: 'A Common Table Expression (CTE) begins with the word WITH. It allows you to create a temporary, named result block that acts like a clean virtual table for the rest of your query.',
        exampleSql: `-- Find employees earning more than their department's average
WITH dept_averages AS (
    SELECT 
        department_id,
        AVG(salary) AS avg_dept_salary
    FROM employees
    GROUP BY department_id
)
SELECT 
    e.employee_id,
    e.name,
    e.salary,
    ROUND(d.avg_dept_salary, 2) AS dept_average
FROM employees e
JOIN dept_averages d ON e.department_id = d.department_id
WHERE e.salary > d.avg_dept_salary;`
      }
    ],
    quickReference: [
      { goal: 'Basic CTE', syntax: 'WITH my_cte AS (SELECT col FROM table) SELECT * FROM my_cte;' },
      { goal: 'Chained CTEs', syntax: 'WITH step1 AS (...), step2 AS (...) SELECT * FROM step2;' }
    ],
    tryItSql: `-- Try a CTE that aggregates sales per customer first
WITH customer_totals AS (
    SELECT 
        customer_id, 
        ROUND(SUM(sale_amount), 2) AS total_spent
    FROM sales
    GROUP BY customer_id
)
SELECT * 
FROM customer_totals 
WHERE total_spent > 300;`
  },
  {
    id: 'window-functions',
    moduleTitle: 'Module 4: Advanced Data Engineering Transformations',
    moduleOrder: 4,
    lessonOrder: 2,
    title: 'Window Functions: ROW_NUMBER & PARTITION BY',
    description: 'Number rows, rank top records per category, and find the latest events without collapsing rows.',
    sections: [
      {
        title: 'GROUP BY vs. Window Functions',
        body: 'When you use GROUP BY, 10 individual rows get squashed into 1 summary row.\n\nWindow functions are different: they perform a calculation across a group of rows, but KEEP all individual rows intact in your final output!'
      },
      {
        title: 'The Syntax Anatomy',
        body: 'A window function always has an OVER() clause:\n- PARTITION BY: divides rows into subgroups (like grouping by customer_id).\n- ORDER BY: sorts the rows inside each subgroup (like sorting by date DESC).'
      },
      {
        title: 'Finding the Latest Record per Customer',
        body: 'In data engineering, finding the latest event for every user is a classic requirement. We assign ROW_NUMBER() = 1 to the newest event, and then filter for rn = 1.',
        exampleSql: `-- Find the single latest transaction for every customer
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
SELECT customer_id, transaction_id, amount, transaction_date
FROM ranked_tx
WHERE rn = 1;`
      }
    ],
    quickReference: [
      { goal: 'Row number per category', syntax: 'ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC)' },
      { goal: 'Dense ranking with no gaps', syntax: 'DENSE_RANK() OVER (ORDER BY revenue DESC)' }
    ],
    tryItSql: `-- Try ranking products by price within each category
SELECT 
    product_name,
    category,
    price,
    ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC) AS price_rank
FROM products;`
  }
];

export const ACTIVITIES: Activity[] = [
  {
    id: 'act-1-top-5-customers',
    order: 1,
    moduleTag: 'Aggregations',
    title: '1. Find the Top 5 Customers by Total Sales',
    difficulty: 'Beginner',
    context: 'The sales team wants to reward top VIP customers based on their historical spend.',
    goal: 'Write a query to calculate each customer\'s total spending. Return customer_id and total_sales (rounded to 2 decimal places). Sort the output by total_sales descending and limit to the top 5 records.',
    tablesUsed: ['sales'],
    sampleInput: {
      tableName: 'sales',
      headers: ['sale_id', 'customer_id', 'sale_amount', 'region', 'sale_date'],
      rows: [
        [1001, 1, 149.99, 'East', '2024-01-10'],
        [1002, 1, 499.99, 'East', '2024-01-22'],
        [1003, 2, 299.50, 'Midwest', '2024-01-25'],
        [1005, 4, 499.99, 'South', '2024-02-14']
      ]
    },
    expectedOutputPreview: {
      headers: ['customer_id', 'total_sales'],
      sampleRows: [
        [1, 977.98],
        [4, 679.98],
        [10, 698.99]
      ],
      totalExpectedRows: 5
    },
    starterCode: `-- Exercise 1: Top 5 customers by total sales
SELECT 
    customer_id,
    ROUND(SUM(sale_amount), 2) AS total_sales
FROM sales
-- Step 1: Group by customer
-- Step 2: Sort highest sales first
-- Step 3: Limit to 5
;`,
    expectedQuery: `SELECT 
    customer_id, 
    ROUND(SUM(sale_amount), 2) AS total_sales 
FROM sales 
GROUP BY customer_id 
ORDER BY total_sales DESC 
LIMIT 5;`,
    hints: [
      'Use GROUP BY customer_id to combine all purchases made by the same person.',
      'Use ORDER BY total_sales DESC to put the largest spenders at the top.',
      'Add LIMIT 5 at the end to keep only the top 5.'
    ],
    walkthrough: 'We group the sales table by customer_id so all purchases for a single customer are squashed into one bucket. SUM(sale_amount) totals their spending. ORDER BY total_sales DESC sorts the list from highest to lowest, and LIMIT 5 returns the top 5.'
  },
  {
    id: 'act-2-duplicate-records',
    order: 2,
    moduleTag: 'Data Cleaning',
    title: '2. Identify Duplicate Records in a Customer Table',
    difficulty: 'Beginner',
    context: 'Data hygiene is a core duty for Data Engineers. Customers often get entered twice by mistake.',
    goal: 'Write a query to find customer accounts that appear more than once with the exact same first_name, last_name, and email. Return first_name, last_name, email, and record_count. Only show records with record_count > 1.',
    tablesUsed: ['customers'],
    sampleInput: {
      tableName: 'customers',
      headers: ['customer_id', 'first_name', 'last_name', 'email'],
      rows: [
        [1, 'Alice', 'Morgan', 'alice.m@gmail.com'],
        [2, 'Bob', 'Stone', 'bob.stone@yahoo.com'],
        [7, 'Bob', 'Stone', 'bob.stone@yahoo.com']
      ]
    },
    expectedOutputPreview: {
      headers: ['first_name', 'last_name', 'email', 'record_count'],
      sampleRows: [
        ['Bob', 'Stone', 'bob.stone@yahoo.com', 2]
      ],
      totalExpectedRows: 1
    },
    starterCode: `-- Exercise 2: Identify duplicate customer records
SELECT 
    first_name,
    last_name,
    email,
    COUNT(*) AS record_count
FROM customers
-- Group by all three attributes and use HAVING to find duplicates
;`,
    expectedQuery: `SELECT 
    first_name, 
    last_name, 
    email, 
    COUNT(*) AS record_count 
FROM customers 
GROUP BY first_name, last_name, email 
HAVING COUNT(*) > 1;`,
    hints: [
      'Group by first_name, last_name, email so identical people share a single bucket.',
      'COUNT(*) counts how many times that exact combination appears.',
      'Use HAVING COUNT(*) > 1 to filter away unique records and only keep duplicates.'
    ],
    walkthrough: 'By grouping on (first_name, last_name, email), every unique persona forms a group. COUNT(*) tells us how many rows match that persona. The HAVING COUNT(*) > 1 clause filters out single, unique entries and leaves only records that appear 2 or more times.'
  },
  {
    id: 'act-3-unsold-products',
    order: 3,
    moduleTag: 'Joins',
    title: '3. Find Products That Have Never Been Sold',
    difficulty: 'Intermediate',
    context: 'Inventory audit: We need to find products in our catalog that have zero recorded sales.',
    goal: 'Write a query to return product_id and product_name for all products in the products table that do NOT exist in the sales table. Sort by product_id ascending.',
    tablesUsed: ['products', 'sales'],
    sampleInput: {
      tableName: 'products',
      headers: ['product_id', 'product_name', 'price'],
      rows: [
        [101, 'Mechanical Keyboard Pro', 149.99],
        [106, 'Titanium Coffee Mug', 45.00]
      ]
    },
    expectedOutputPreview: {
      headers: ['product_id', 'product_name'],
      sampleRows: [
        [106, 'Titanium Coffee Mug'],
        [107, 'Vintage Desk Lamp']
      ],
      totalExpectedRows: 2
    },
    starterCode: `-- Exercise 3: Unsold products (Anti-Join)
SELECT 
    p.product_id,
    p.product_name
FROM products p
-- Step 1: LEFT JOIN to sales on product_id
-- Step 2: Filter where sales.sale_id IS NULL
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
      'For items with zero sales, the columns coming from the sales table evaluate to NULL.',
      'Add WHERE s.sale_id IS NULL to keep only the unsold items.'
    ],
    walkthrough: 'A LEFT JOIN keeps every product from the products table. If a product has never been ordered, no matching record exists in the sales table, so SQL fills the sales columns with NULL. Adding WHERE s.sale_id IS NULL strips away sold products, leaving only items that never had a sale.'
  },
  {
    id: 'act-4-monthly-sales-region',
    order: 4,
    moduleTag: 'Aggregations',
    title: '4. Calculate Monthly Sales for Each Region',
    difficulty: 'Intermediate',
    context: 'Financial reporting: The executive team needs regional sales broken down by calendar month.',
    goal: "Write a query to calculate total sales per region per month. In SQLite, extract the month as YYYY-MM using strftime('%Y-%m', sale_date) as sales_month. Output region, sales_month, and total_sales (rounded to 2 decimals). Sort by region ASC, then sales_month ASC.",
    tablesUsed: ['sales'],
    sampleInput: {
      tableName: 'sales',
      headers: ['sale_id', 'region', 'sale_amount', 'sale_date'],
      rows: [
        [1001, 'East', 149.99, '2024-01-10'],
        [1002, 'East', 499.99, '2024-01-22'],
        [1006, 'East', 129.00, '2024-02-18']
      ]
    },
    expectedOutputPreview: {
      headers: ['region', 'sales_month', 'total_sales'],
      sampleRows: [
        ['East', '2024-01', 649.98],
        ['East', '2024-02', 129.00]
      ],
      totalExpectedRows: 9
    },
    starterCode: `-- Exercise 4: Monthly sales per region
SELECT 
    region,
    strftime('%Y-%m', sale_date) AS sales_month,
    ROUND(SUM(sale_amount), 2) AS total_sales
FROM sales
-- Group by both region and the extracted month
ORDER BY region ASC, sales_month ASC;`,
    expectedQuery: `SELECT 
    region, 
    strftime('%Y-%m', sale_date) AS sales_month, 
    ROUND(SUM(sale_amount), 2) AS total_sales 
FROM sales 
GROUP BY region, strftime('%Y-%m', sale_date) 
ORDER BY region ASC, sales_month ASC;`,
    hints: [
      "In SQLite, use strftime('%Y-%m', sale_date) to format the date as 'YYYY-MM'.",
      'Because you want sales per region AND month, your GROUP BY must include both columns: GROUP BY region, strftime(...)',
      'Sort using ORDER BY region ASC, sales_month ASC.'
    ],
    walkthrough: 'We extract the year and month using strftime, and group by both region and that month string. SUM(sale_amount) totals the sales inside each monthly regional bucket.'
  },
  {
    id: 'act-5-above-dept-salary',
    order: 5,
    moduleTag: 'CTEs',
    title: "5. Find Employees Above Their Department's Average",
    difficulty: 'Intermediate',
    context: 'HR compensation review: Identify standout earners in each individual department.',
    goal: "Write a query to find employees whose salary is strictly greater than the average salary of their own department. Output employee_id, name, department_id, and salary. Order by department_id ASC, then salary DESC.",
    tablesUsed: ['employees'],
    sampleInput: {
      tableName: 'employees',
      headers: ['employee_id', 'name', 'department_id', 'salary'],
      rows: [
        [201, 'Amaya Balion', 10, 135000],
        [202, 'Marcus Vance', 10, 110000],
        [203, 'Elena Rostova', 10, 95000]
      ]
    },
    expectedOutputPreview: {
      headers: ['employee_id', 'name', 'department_id', 'salary'],
      sampleRows: [
        [201, 'Amaya Balion', 10, 135000],
        [206, 'Priya Patel', 20, 160000]
      ],
      totalExpectedRows: 3
    },
    starterCode: `-- Exercise 5: Employees above their department average
-- Step 1: Create a CTE to calculate average salary per department
WITH dept_averages AS (
    SELECT 
        department_id,
        AVG(salary) AS avg_sal
    FROM employees
    GROUP BY department_id
)
-- Step 2: Join employees back to dept_averages and filter
SELECT 
    e.employee_id,
    e.name,
    e.department_id,
    e.salary
FROM employees e
JOIN dept_averages d ON e.department_id = d.department_id
WHERE e.salary > d.avg_sal
ORDER BY e.department_id ASC, e.salary DESC;`,
    expectedQuery: `WITH dept_averages AS (
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
    e.salary 
FROM employees e 
JOIN dept_averages d ON e.department_id = d.department_id 
WHERE e.salary > d.avg_sal 
ORDER BY e.department_id ASC, e.salary DESC;`,
    hints: [
      'First write a WITH clause called dept_averages that groups by department_id and calculates AVG(salary).',
      'In your main query, join employees e with dept_averages d on department_id.',
      'Filter with WHERE e.salary > d.avg_sal.'
    ],
    walkthrough: 'We first calculate the department average in a Common Table Expression (CTE). Then we join each employee back to their department\'s benchmark row and filter for records where e.salary > d.avg_sal.'
  },
  {
    id: 'act-6-missing-emails',
    order: 6,
    moduleTag: 'Data Cleaning',
    title: '6. Identify Customers with Missing Email Addresses',
    difficulty: 'Beginner',
    context: 'Data Cleaning: Find incomplete profiles where email is either database NULL or blank string.',
    goal: "Write a query to select customer_id, first_name, and last_name of all customers whose email is either NULL or an empty blank string ('' or blank spaces). Order by customer_id ASC.",
    tablesUsed: ['customers'],
    sampleInput: {
      tableName: 'customers',
      headers: ['customer_id', 'first_name', 'last_name', 'email'],
      rows: [
        [3, 'Charlie', 'Kim', null],
        [4, 'Diana', 'Prince', 'diana.p@gmail.com'],
        [5, 'Evan', 'Wright', '']
      ]
    },
    expectedOutputPreview: {
      headers: ['customer_id', 'first_name', 'last_name'],
      sampleRows: [
        [3, 'Charlie', 'Kim'],
        [5, 'Evan', 'Wright'],
        [8, 'George', 'Miller']
      ],
      totalExpectedRows: 3
    },
    starterCode: `-- Exercise 6: Find missing email addresses
SELECT 
    customer_id,
    first_name,
    last_name
FROM customers
-- Check for both NULL and blank string ''
WHERE email IS NULL OR TRIM(email) = ''
ORDER BY customer_id ASC;`,
    expectedQuery: `SELECT 
    customer_id, 
    first_name, 
    last_name 
FROM customers 
WHERE email IS NULL OR TRIM(email) = '' 
ORDER BY customer_id ASC;`,
    hints: [
      'In SQL, use IS NULL to check for missing database markers.',
      'Use TRIM(email) = \'\' to also catch empty blank text strings.',
      'Combine both checks with an OR condition.'
    ],
    walkthrough: 'In real databases, missing data comes in two forms: genuine NULLs and empty strings (\'\'). By writing WHERE email IS NULL OR TRIM(email) = \'\', we catch both categories.'
  },
  {
    id: 'act-7-rank-products-revenue',
    order: 7,
    moduleTag: 'Window Functions',
    title: '7. Rank Products Based on Total Revenue',
    difficulty: 'Intermediate',
    context: 'Catalog performance: Rank items from highest revenue to lowest without rank gaps.',
    goal: 'Write a query to calculate total revenue per product (sum of sale_amount rounded to 2 decimals) and assign a ranking using DENSE_RANK() as revenue_rank. Sort by revenue_rank ASC, then product_id ASC.',
    tablesUsed: ['sales'],
    sampleInput: {
      tableName: 'sales',
      headers: ['sale_id', 'product_id', 'sale_amount'],
      rows: [
        [1001, 101, 149.99],
        [1002, 102, 499.99],
        [1005, 102, 499.99]
      ]
    },
    expectedOutputPreview: {
      headers: ['product_id', 'total_revenue', 'revenue_rank'],
      sampleRows: [
        [102, 1499.97, 1],
        [103, 599.00, 2]
      ],
      totalExpectedRows: 5
    },
    starterCode: `-- Exercise 7: Rank products by revenue using DENSE_RANK()
SELECT 
    product_id,
    ROUND(SUM(sale_amount), 2) AS total_revenue,
    DENSE_RANK() OVER (ORDER BY SUM(sale_amount) DESC) AS revenue_rank
FROM sales
GROUP BY product_id
ORDER BY revenue_rank ASC, product_id ASC;`,
    expectedQuery: `SELECT 
    product_id, 
    ROUND(SUM(sale_amount), 2) AS total_revenue, 
    DENSE_RANK() OVER (ORDER BY SUM(sale_amount) DESC) AS revenue_rank 
FROM sales 
GROUP BY product_id 
ORDER BY revenue_rank ASC, product_id ASC;`,
    hints: [
      'Group by product_id to sum sales per product.',
      'Use the window function DENSE_RANK() OVER (ORDER BY SUM(sale_amount) DESC).',
      'DENSE_RANK does not skip numbers when there are ties (1, 2, 2, 3).'
    ],
    walkthrough: 'We group sales by product_id to get total revenue. Then the window function DENSE_RANK() OVER (ORDER BY SUM(sale_amount) DESC) looks across all products and ranks them starting from 1 for the highest earner.'
  },
  {
    id: 'act-8-latest-transaction',
    order: 8,
    moduleTag: 'Window Functions',
    title: '8. Find the Latest Transaction for Each Customer',
    difficulty: 'Advanced',
    context: 'Event streaming: In event logs, we regularly need the most recent state for each account.',
    goal: 'Write a query to find the single most recent transaction for every customer in the transactions table. Return customer_id, transaction_id, amount, and transaction_date. Sort by customer_id ASC.',
    tablesUsed: ['transactions'],
    sampleInput: {
      tableName: 'transactions',
      headers: ['transaction_id', 'customer_id', 'amount', 'transaction_date'],
      rows: [
        [5001, 1, 45.50, '2024-01-05 10:20:00'],
        [5002, 1, 120.00, '2024-02-14 14:15:00'],
        [5003, 1, 85.25, '2024-03-22 09:30:00']
      ]
    },
    expectedOutputPreview: {
      headers: ['customer_id', 'transaction_id', 'amount', 'transaction_date'],
      sampleRows: [
        [1, 5003, 85.25, '2024-03-22 09:30:00'],
        [2, 5005, 95.00, '2024-04-10 11:00:00']
      ],
      totalExpectedRows: 4
    },
    starterCode: `-- Exercise 8: Latest transaction per customer
WITH ranked_transactions AS (
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
      'In a CTE, use ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY transaction_date DESC) AS rn.',
      'PARTITION BY customer_id restarts numbering at 1 for each customer.',
      'ORDER BY transaction_date DESC ensures the newest transaction receives row number 1.',
      'In the outer query, simply filter with WHERE rn = 1.'
    ],
    walkthrough: 'By partitioning on customer_id and sorting transaction_date descending, every customer\'s newest transaction is labeled rn = 1. Filtering WHERE rn = 1 extracts exactly one latest event per customer.'
  },
  {
    id: 'act-9-facebook-pages',
    order: 9,
    moduleTag: 'Interview Classic',
    title: '9. Facebook: Page With No Likes',
    difficulty: 'Beginner',
    context: 'DataLemur Meta Question: Find pages with zero user engagements.',
    goal: 'Write a query to return the page_id of all Facebook pages from the pages table that have zero likes in the page_likes table. Sort by page_id ascending.',
    tablesUsed: ['pages', 'page_likes'],
    sampleInput: {
      tableName: 'pages',
      headers: ['page_id', 'page_name'],
      rows: [
        [20001, 'SQL Solutions'],
        [20045, 'Brain Exercises'],
        [20701, 'Tips for Data Analysts']
      ]
    },
    expectedOutputPreview: {
      headers: ['page_id'],
      sampleRows: [[20701]],
      totalExpectedRows: 1
    },
    starterCode: `-- Exercise 9: Facebook Page With No Likes
SELECT p.page_id
FROM pages p
LEFT JOIN page_likes l ON p.page_id = l.page_id
WHERE l.page_id IS NULL
ORDER BY p.page_id ASC;`,
    expectedQuery: `SELECT p.page_id 
FROM pages p 
LEFT JOIN page_likes l ON p.page_id = l.page_id 
WHERE l.page_id IS NULL 
ORDER BY p.page_id ASC;`,
    hints: [
      'Do a LEFT JOIN from pages to page_likes on page_id.',
      'If nobody liked a page, the page_likes columns will be NULL.',
      'Add WHERE l.page_id IS NULL.'
    ],
    walkthrough: 'A LEFT JOIN keeps every single page. For unliked pages, page_likes columns evaluate to NULL. Filtering WHERE l.page_id IS NULL isolates pages with 0 likes.'
  },
  {
    id: 'act-10-linkedin-skills',
    order: 10,
    moduleTag: 'Interview Classic',
    title: '10. LinkedIn: Candidate Skill Matching',
    difficulty: 'Beginner',
    context: 'DataLemur LinkedIn Question: Match job applicants with strict multi-skill criteria.',
    goal: "Write a query to find candidates who possess ALL THREE of these skills: 'Python', 'Tableau', and 'PostgreSQL'. Return candidate_id sorted in ascending order.",
    tablesUsed: ['candidates'],
    sampleInput: {
      tableName: 'candidates',
      headers: ['candidate_id', 'skill'],
      rows: [
        [123, 'Python'],
        [123, 'Tableau'],
        [123, 'PostgreSQL'],
        [234, 'R'],
        [345, 'Python']
      ]
    },
    expectedOutputPreview: {
      headers: ['candidate_id'],
      sampleRows: [[123], [147]],
      totalExpectedRows: 2
    },
    starterCode: `-- Exercise 10: Candidates with all 3 skills
SELECT candidate_id
FROM candidates
WHERE skill IN ('Python', 'Tableau', 'PostgreSQL')
GROUP BY candidate_id
HAVING COUNT(DISTINCT skill) = 3
ORDER BY candidate_id ASC;`,
    expectedQuery: `SELECT candidate_id 
FROM candidates 
WHERE skill IN ('Python', 'Tableau', 'PostgreSQL') 
GROUP BY candidate_id 
HAVING COUNT(DISTINCT skill) = 3 
ORDER BY candidate_id ASC;`,
    hints: [
      "Never use 'AND' between rows (e.g. WHERE skill = 'Python' AND skill = 'Tableau' returns 0 rows!).",
      "Instead, filter for the 3 target skills with WHERE skill IN ('Python', 'Tableau', 'PostgreSQL').",
      'Group by candidate_id and assert HAVING COUNT(DISTINCT skill) = 3.'
    ],
    walkthrough: 'Each row only has one skill. We filter for any rows matching the 3 required skills, group by candidate_id, and check HAVING COUNT(DISTINCT skill) = 3 to guarantee they know all three.'
  }
];

export const SAMPLE_SCHEMAS = [
  {
    tableName: 'customers',
    description: 'Stores customer demographics and email addresses',
    columns: [
      { name: 'customer_id', type: 'INTEGER', notes: 'Primary Key' },
      { name: 'first_name', type: 'TEXT' },
      { name: 'last_name', type: 'TEXT' },
      { name: 'email', type: 'TEXT', notes: 'Contains NULL and blank values for data cleaning exercises' },
      { name: 'city', type: 'TEXT' },
      { name: 'signup_date', type: 'TEXT' }
    ]
  },
  {
    tableName: 'products',
    description: 'Product catalog with prices and categories',
    columns: [
      { name: 'product_id', type: 'INTEGER', notes: 'Primary Key' },
      { name: 'product_name', type: 'TEXT' },
      { name: 'category', type: 'TEXT' },
      { name: 'price', type: 'REAL' }
    ]
  },
  {
    tableName: 'sales',
    description: 'Order transactions with regions and amounts',
    columns: [
      { name: 'sale_id', type: 'INTEGER', notes: 'Primary Key' },
      { name: 'customer_id', type: 'INTEGER', notes: 'Foreign Key -> customers.customer_id' },
      { name: 'product_id', type: 'INTEGER', notes: 'Foreign Key -> products.product_id' },
      { name: 'region', type: 'TEXT', notes: 'East, West, South, Midwest' },
      { name: 'sale_amount', type: 'REAL' },
      { name: 'sale_date', type: 'TEXT', notes: 'YYYY-MM-DD' }
    ]
  },
  {
    tableName: 'employees',
    description: 'Employee directory with department IDs and salaries',
    columns: [
      { name: 'employee_id', type: 'INTEGER', notes: 'Primary Key' },
      { name: 'name', type: 'TEXT' },
      { name: 'department_id', type: 'INTEGER', notes: 'Foreign Key -> departments.department_id' },
      { name: 'salary', type: 'REAL' },
      { name: 'hire_date', type: 'TEXT' }
    ]
  },
  {
    tableName: 'departments',
    description: 'Business units and departments',
    columns: [
      { name: 'department_id', type: 'INTEGER', notes: 'Primary Key' },
      { name: 'department_name', type: 'TEXT' }
    ]
  },
  {
    tableName: 'transactions',
    description: 'Payment log with precise timestamps for window functions',
    columns: [
      { name: 'transaction_id', type: 'INTEGER', notes: 'Primary Key' },
      { name: 'customer_id', type: 'INTEGER', notes: 'Foreign Key -> customers.customer_id' },
      { name: 'amount', type: 'REAL' },
      { name: 'transaction_date', type: 'TEXT' }
    ]
  },
  {
    tableName: 'pages',
    description: 'Facebook Pages catalog',
    columns: [
      { name: 'page_id', type: 'INTEGER', notes: 'Primary Key' },
      { name: 'page_name', type: 'TEXT' }
    ]
  },
  {
    tableName: 'page_likes',
    description: 'Facebook Page user likes log',
    columns: [
      { name: 'user_id', type: 'INTEGER' },
      { name: 'page_id', type: 'INTEGER', notes: 'Foreign Key -> pages.page_id' },
      { name: 'liked_date', type: 'TEXT' }
    ]
  },
  {
    tableName: 'candidates',
    description: 'Recruitment skill tags per candidate',
    columns: [
      { name: 'candidate_id', type: 'INTEGER' },
      { name: 'skill', type: 'TEXT' }
    ]
  }
];
