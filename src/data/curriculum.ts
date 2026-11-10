export interface LessonSection {
  title: string;
  body: string;
  exampleSql?: string;
}

export interface LessonChallenge {
  title: string;
  scenario: string;
  instructions: string;
  starterCode: string;
  expectedQuery: string;
  hints: string[];
  solutionExplanation: string;
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
  challenge: LessonChallenge;
}

export interface TableSample {
  tableName: string;
  description?: string;
  headers: string[];
  rows: (string | number | null)[][];
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
  sampleInputs: TableSample[];
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
    title: 'Part 1: Basic SQL (From Zero to Querying)',
    description: 'Start from absolute scratch: learn what databases and tables are, and master SELECT, WHERE, AND/OR, BETWEEN, IN, LIKE, and ORDER BY.'
  },
  {
    id: 2,
    title: 'Part 2: Intermediate SQL (Aggregations & Data Cleaning)',
    description: 'Summarize metrics with COUNT/SUM/AVG, master GROUP BY and HAVING, clean pesky NULLs, format dates, and write CASE WHEN logic.'
  },
  {
    id: 3,
    title: 'Part 3: Relational SQL (Joins & Set Logic)',
    description: 'Connect datasets across tables using Primary & Foreign Keys, master INNER JOIN and LEFT JOIN, and solve the classic Anti-Join puzzle.'
  },
  {
    id: 4,
    title: 'Part 4: Advanced SQL (Data Engineering Core)',
    description: 'Master senior interview concepts: Subqueries, Common Table Expressions (WITH), and Window Functions (ROW_NUMBER, RANK, DENSE_RANK).'
  }
];

export const LESSONS: Lesson[] = [
  // ==========================================
  // PART 1: BASIC SQL (LESSONS 1 - 9)
  // ==========================================
  {
    id: 'intro-to-sql-databases',
    moduleTitle: 'Part 1: Basic SQL (From Zero to Querying)',
    moduleOrder: 1,
    lessonOrder: 1,
    title: '1. Intro to SQL & Databases',
    description: 'Understand what relational databases and tables actually are before writing your first query.',
    sections: [
      {
        title: 'What is a Database?',
        body: 'A database is an organized collection of data stored electronically. While spreadsheets like Excel work well for small personal lists, databases are designed to store millions of rows securely, quickly, and without crashing.'
      },
      {
        title: 'Tables, Columns, and Rows',
        body: 'Inside a database, information lives inside Tables (like a spreadsheet):\n- Columns (vertical) define what kind of data is stored, like product_name, price, or city.\n- Rows (horizontal) represent one specific record, like a single product or a customer.'
      },
      {
        title: 'Your First Query: SELECT *',
        body: 'SQL (Structured Query Language) is the language we use to ask the database questions. The asterisk (*) means "all columns":',
        exampleSql: `-- View all columns and rows from the products table
SELECT * FROM products;`
      }
    ],
    quickReference: [
      { goal: 'View every column in a table', syntax: 'SELECT * FROM table_name;' }
    ],
    challenge: {
      title: 'Audit New Customer Signups',
      scenario: 'The customer operations team is doing a quick audit of the CRM database to see what customer information is recorded when new accounts sign up.',
      instructions: 'Write a query to retrieve all columns from the customers table for the first 5 customers in the system.',
      starterCode: `-- Challenge 1: Inspect customer records for the CRM team
-- 1. Select all columns from customers
-- 2. Limit the result to 5 rows

`,
      expectedQuery: 'SELECT * FROM customers LIMIT 5;',
      hints: [
        'Use SELECT * to pick all columns.',
        'Query the customers table (FROM customers).',
        'Add LIMIT 5 at the end.'
      ],
      solutionExplanation: 'SELECT * FROM customers retrieves every column from the customers table, and LIMIT 5 returns the first 5 customer records.'
    }
  },
  {
    id: 'sql-select-columns',
    moduleTitle: 'Part 1: Basic SQL (From Zero to Querying)',
    moduleOrder: 1,
    lessonOrder: 2,
    title: '2. SQL SELECT & FROM',
    description: 'Learn how to retrieve only the specific columns you need for faster, cleaner queries.',
    sections: [
      {
        title: 'Why Pick Specific Columns?',
        body: 'In real data systems, tables often contain 50+ columns. Pulling all columns with SELECT * wastes network bandwidth and slows down applications.\n\nInstead, name the exact columns you want, separated by commas.'
      },
      {
        title: 'Syntax and Example',
        body: 'List the column names after SELECT in any order you want:',
        exampleSql: `-- Retrieve only customer name and city
SELECT first_name, last_name, city
FROM customers;`
      }
    ],
    quickReference: [
      { goal: 'Pick specific columns', syntax: 'SELECT col1, col2 FROM table;' }
    ],
    commonMistake: {
      wrongSql: 'SELECT first_name last_name FROM customers;',
      correctSql: 'SELECT first_name, last_name FROM customers;',
      explanation: 'Always separate multiple column names with a comma.'
    },
    challenge: {
      title: 'Warehouse Catalog Price Sheet',
      scenario: 'The warehouse logistics department is printing out an updated product catalog list. They need the item name, its category, and unit price, without exposing internal database IDs.',
      instructions: 'Write a query to retrieve only product_name, category, and price from the products table.',
      starterCode: `-- Challenge 2: Catalog list for warehouse logistics
-- Select product_name, category, price
-- From products;

`,
      expectedQuery: 'SELECT product_name, category, price FROM products;',
      hints: [
        'Separate the columns with commas: product_name, category, price.',
        'Specify FROM products.'
      ],
      solutionExplanation: 'We selected only the 3 specific columns needed for the warehouse price sheet, avoiding unnecessary data transfer.'
    }
  },
  {
    id: 'sql-limit-and-as',
    moduleTitle: 'Part 1: Basic SQL (From Zero to Querying)',
    moduleOrder: 1,
    lessonOrder: 3,
    title: '3. SQL LIMIT & Aliasing (AS)',
    description: 'Control the number of returned rows and rename output columns with friendly labels.',
    sections: [
      {
        title: 'Preventing Overload with LIMIT',
        body: 'Adding LIMIT at the end of your query tells the database engine to stop searching as soon as it collects the requested number of records.'
      },
      {
        title: 'Renaming Columns with AS',
        body: 'You can give any column a temporary label in the output using AS. This is called aliasing:',
        exampleSql: `-- Rename product_name to item_name
SELECT product_name AS item_name, price
FROM products
LIMIT 3;`
      }
    ],
    quickReference: [
      { goal: 'Limit rows', syntax: 'LIMIT 10;' },
      { goal: 'Rename column in output', syntax: 'SELECT col AS new_label FROM table;' }
    ],
    challenge: {
      title: 'Executive Headcount Dashboard Preview',
      scenario: "The leadership dashboard needs a preview of employee compensation. To match the executive dashboard's design, the employee's name must appear as employee_name and their salary as annual_compensation.",
      instructions: 'Select name aliased as employee_name and salary aliased as annual_compensation from the employees table. Limit the result to 3 rows.',
      starterCode: `-- Challenge 3: Headcount preview widget for leadership
-- Select name AS employee_name, salary AS annual_compensation
-- From employees
-- Limit 3;

`,
      expectedQuery: 'SELECT name AS employee_name, salary AS annual_compensation FROM employees LIMIT 3;',
      hints: [
        'Use name AS employee_name to rename the name column.',
        'Use salary AS annual_compensation.',
        'Add LIMIT 3 at the bottom.'
      ],
      solutionExplanation: 'The AS keyword temporarily labels the columns with business-friendly names without modifying the database schema.'
    }
  },
  {
    id: 'sql-where-filtering',
    moduleTitle: 'Part 1: Basic SQL (From Zero to Querying)',
    moduleOrder: 1,
    lessonOrder: 4,
    title: '4. SQL WHERE (Comparison Operators)',
    description: 'Filter rows based on numeric and text conditions using standard comparison symbols.',
    sections: [
      {
        title: 'Filtering Rows with WHERE',
        body: 'The WHERE clause evaluates each row: if the condition is TRUE, the row is kept; if FALSE, it is excluded.'
      },
      {
        title: 'Comparison Operators',
        body: '- = (Equal to)\n- != or <> (Not equal to)\n- > (Greater than)\n- < (Less than)\n- >= (Greater than or equal to)\n- <= (Less than or equal to)',
        exampleSql: `-- Products priced strictly under $100
SELECT product_name, price
FROM products
WHERE price < 100;`
      }
    ],
    quickReference: [
      { goal: 'Filter numbers', syntax: 'WHERE price < 100' },
      { goal: 'Filter text (wrap in quotes)', syntax: "WHERE status = 'active'" }
    ],
    challenge: {
      title: 'Six-Figure Payroll Compliance Audit',
      scenario: 'Finance is conducting an executive payroll audit and needs to review all team members whose compensation is at or above the $100,000 threshold.',
      instructions: 'Retrieve name, department_id, and salary from the employees table for all staff earning at least 100,000 (salary >= 100000).',
      starterCode: `-- Challenge 4: Six-figure payroll audit
-- Select name, department_id, salary
-- From employees
-- Where salary >= 100000;

`,
      expectedQuery: 'SELECT name, department_id, salary FROM employees WHERE salary >= 100000;',
      hints: [
        'Select name, department_id, salary from employees.',
        'Use WHERE salary >= 100000.'
      ],
      solutionExplanation: 'The condition salary >= 100000 filters out lower compensation bands and retains only senior six-figure earners.'
    }
  },
  {
    id: 'and-or-not-logic',
    moduleTitle: 'Part 1: Basic SQL (From Zero to Querying)',
    moduleOrder: 1,
    lessonOrder: 5,
    title: '5. AND, OR, NOT (Multiple Conditions)',
    description: 'Chain multiple logical conditions together to satisfy complex business requirements.',
    sections: [
      {
        title: 'Combining Conditions',
        body: '- AND: ALL conditions must be true simultaneously.\n- OR: AT LEAST ONE condition must be true.\n- NOT: Inverts a condition (e.g. NOT region = \'West\').',
        exampleSql: `-- East region orders above $140
SELECT sale_id, region, sale_amount
FROM sales
WHERE region = 'East' AND sale_amount > 140;`
      }
    ],
    quickReference: [
      { goal: 'Both true', syntax: 'WHERE cond1 AND cond2' },
      { goal: 'Either true', syntax: 'WHERE cond1 OR cond2' },
      { goal: 'Invert', syntax: 'WHERE NOT cond' }
    ],
    challenge: {
      title: 'Find Senior Engineering Mentors',
      scenario: 'HR is launching a technical mentorship program in Department 10. They want to identify experienced team members in Department 10 who joined the company before 2023.',
      instructions: "Find employees in Department 10 (department_id = 10) who were hired before 2023 (hire_date < '2023-01-01'). Return name, department_id, and hire_date.",
      starterCode: `-- Challenge 5: Find tenured mentors in Department 10
-- Select name, department_id, hire_date
-- From employees
-- Where department_id = 10 AND hire_date < '2023-01-01';

`,
      expectedQuery: "SELECT name, department_id, hire_date FROM employees WHERE department_id = 10 AND hire_date < '2023-01-01';",
      hints: [
        'Select name, department_id, hire_date from employees.',
        "Use WHERE department_id = 10 AND hire_date < '2023-01-01'."
      ],
      solutionExplanation: 'The AND operator requires both criteria to be satisfied: working in Department 10 and possessing a hire date before 2023.'
    }
  },
  {
    id: 'sql-between-range',
    moduleTitle: 'Part 1: Basic SQL (From Zero to Querying)',
    moduleOrder: 1,
    lessonOrder: 6,
    title: '6. SQL BETWEEN (Filtering Ranges)',
    description: 'Filter numbers and dates within an inclusive range using the clean BETWEEN keyword.',
    sections: [
      {
        title: 'What is BETWEEN?',
        body: 'Instead of writing WHERE price >= 50 AND price <= 200, SQL gives you a cleaner shorthand:\nWHERE price BETWEEN 50 AND 200.\n\nNote: BETWEEN is INCLUSIVE, meaning both 50 and 200 are included in the results.',
        exampleSql: `-- Mid-tier products between $50 and $200
SELECT product_name, price
FROM products
WHERE price BETWEEN 50 AND 200;`
      }
    ],
    quickReference: [
      { goal: 'Filter inclusive range', syntax: 'WHERE price BETWEEN 50 AND 200' }
    ],
    challenge: {
      title: 'Medium-Value Payment Verification',
      scenario: 'The payments risk team conducts routine verification on mid-sized charges between $50 and $150 to check for automated card-testing scripts.',
      instructions: 'Find all payment records in the transactions table with an amount between 50 and 150 (inclusive). Return transaction_id, customer_id, and amount.',
      starterCode: `-- Challenge 6: Medium-value transaction verification
-- Select transaction_id, customer_id, amount
-- From transactions
-- Where amount BETWEEN 50 AND 150;

`,
      expectedQuery: 'SELECT transaction_id, customer_id, amount FROM transactions WHERE amount BETWEEN 50 AND 150;',
      hints: [
        'Select transaction_id, customer_id, amount from transactions.',
        'Use WHERE amount BETWEEN 50 AND 150.'
      ],
      solutionExplanation: 'BETWEEN 50 AND 150 captures all charges falling within the specified risk audit boundary.'
    }
  },
  {
    id: 'sql-in-lists',
    moduleTitle: 'Part 1: Basic SQL (From Zero to Querying)',
    moduleOrder: 1,
    lessonOrder: 7,
    title: '7. SQL IN (List Matching)',
    description: 'Avoid messy chained OR statements by matching against a clean list of allowed values.',
    sections: [
      {
        title: 'Why Use IN?',
        body: "Writing WHERE category = 'Electronics' OR category = 'Furniture' OR category = 'Audio' gets unreadable quickly.\n\nUsing IN allows you to pass a tidy comma-separated list inside parentheses:",
        exampleSql: `-- Clean list matching
SELECT product_name, category
FROM products
WHERE category IN ('Electronics', 'Furniture');`
      }
    ],
    quickReference: [
      { goal: 'Match values in list', syntax: "WHERE col IN ('A', 'B', 'C')" },
      { goal: 'Exclude list', syntax: "WHERE col NOT IN ('A', 'B')" }
    ],
    challenge: {
      title: 'Targeted Metropolitan Event Invites',
      scenario: 'The customer marketing team is hosting VIP networking events in major tech hubs: New York, Chicago, and San Francisco.',
      instructions: "Retrieve first_name, last_name, and city from the customers table for all customers living in either 'New York', 'Chicago', or 'San Francisco'.",
      starterCode: `-- Challenge 7: Invite customers in target event cities
-- Select first_name, last_name, city
-- From customers
-- Where city IN ('New York', 'Chicago', 'San Francisco');

`,
      expectedQuery: "SELECT first_name, last_name, city FROM customers WHERE city IN ('New York', 'Chicago', 'San Francisco');",
      hints: [
        'Select first_name, last_name, city from customers.',
        "Use WHERE city IN ('New York', 'Chicago', 'San Francisco')."
      ],
      solutionExplanation: 'The IN operator checks whether the customer city matches any of the three target event locations.'
    }
  },
  {
    id: 'sql-like-patterns',
    moduleTitle: 'Part 1: Basic SQL (From Zero to Querying)',
    moduleOrder: 1,
    lessonOrder: 8,
    title: '8. SQL LIKE (Pattern Matching Strings)',
    description: 'Search for text patterns using the percent sign (%) and underscore (_) wildcards.',
    sections: [
      {
        title: 'The LIKE Operator',
        body: 'When you do not know the exact string, LIKE allows wildcard pattern matching:\n- % (Percent): Matches zero or more characters.\n  - \'%@gmail.com\': ends with @gmail.com\n  - \'Desk%\': starts with Desk\n  - \'%Desk%\': contains Desk anywhere\n- _ (Underscore): Matches exactly ONE single character.',
        exampleSql: `-- Find all Gmail accounts
SELECT customer_id, first_name, email
FROM customers
WHERE email LIKE '%@gmail.com';`
      }
    ],
    quickReference: [
      { goal: 'Starts with', syntax: "WHERE col LIKE 'Start%'" },
      { goal: 'Ends with', syntax: "WHERE col LIKE '%End'" },
      { goal: 'Contains', syntax: "WHERE col LIKE '%Word%'" }
    ],
    challenge: {
      title: 'Identify Desk Accessories for Promotion',
      scenario: 'Our merchandising lead wants to bundle all desk-related equipment for an upcoming work-from-home campaign. Identify all items in the catalog that contain the word "Desk" in their name.',
      instructions: "Select product_id, product_name, and price from the products table for any item whose product_name contains 'Desk'.",
      starterCode: `-- Challenge 8: Find all desk-related products
-- Select product_id, product_name, price
-- From products
-- Where product_name LIKE '%Desk%';

`,
      expectedQuery: "SELECT product_id, product_name, price FROM products WHERE product_name LIKE '%Desk%';",
      hints: [
        'Select product_id, product_name, price from products.',
        "Add WHERE product_name LIKE '%Desk%'."
      ],
      solutionExplanation: "The pattern '%Desk%' matches any product name where 'Desk' appears at the beginning, middle, or end."
    }
  },
  {
    id: 'sql-order-by-sorting',
    moduleTitle: 'Part 1: Basic SQL (From Zero to Querying)',
    moduleOrder: 1,
    lessonOrder: 9,
    title: '9. SQL ORDER BY (Sorting Results)',
    description: 'Order results ascending or descending, sort by multiple columns, and find top/bottom records.',
    sections: [
      {
        title: 'Sorting with ORDER BY',
        body: 'Use ORDER BY followed by column names:\n- ASC: Ascending order (lowest to highest, A to Z). Default.\n- DESC: Descending order (highest to lowest, Z to A).',
        exampleSql: `-- Top 3 most expensive products
SELECT product_name, price
FROM products
ORDER BY price DESC
LIMIT 3;`
      }
    ],
    quickReference: [
      { goal: 'Sort lowest to highest', syntax: 'ORDER BY col ASC' },
      { goal: 'Sort highest to lowest', syntax: 'ORDER BY col DESC' },
      { goal: 'Multi-column sort', syntax: 'ORDER BY col1 ASC, col2 DESC' }
    ],
    challenge: {
      title: 'Top 5 Largest Wire Transfers',
      scenario: 'The finance controller needs an immediate look at our largest wire transfers to ensure liquidity reserves for daily settlement.',
      instructions: 'Select all columns from the transactions table, sorted from highest amount to lowest amount. Limit the output to the top 5 largest transactions.',
      starterCode: `-- Challenge 9: Top 5 largest financial transfers
-- Select *
-- From transactions
-- Order by amount DESC
-- Limit 5;

`,
      expectedQuery: 'SELECT * FROM transactions ORDER BY amount DESC LIMIT 5;',
      hints: [
        'Use SELECT * FROM transactions.',
        'Sort with ORDER BY amount DESC.',
        'Limit to 5 rows.'
      ],
      solutionExplanation: 'ORDER BY amount DESC puts the highest wire amounts first, and LIMIT 5 extracts the top 5 entries.'
    }
  },

  // ==========================================
  // PART 2: INTERMEDIATE SQL (LESSONS 10 - 16)
  // ==========================================
  {
    id: 'sql-distinct-duplicates',
    moduleTitle: 'Part 2: Intermediate SQL (Aggregations & Data Cleaning)',
    moduleOrder: 2,
    lessonOrder: 1,
    title: '10. SQL DISTINCT (Removing Duplicates)',
    description: 'Strip out duplicate rows and extract unique lists of categories or user actions.',
    sections: [
      {
        title: 'Removing Duplicates with DISTINCT',
        body: 'If a table repeats values many times, place DISTINCT directly after SELECT to collapse duplicate entries into unique rows:',
        exampleSql: `-- Unique list of categories in alphabetical order
SELECT DISTINCT category
FROM products
ORDER BY category ASC;`
      }
    ],
    quickReference: [
      { goal: 'Unique values only', syntax: 'SELECT DISTINCT col FROM table;' }
    ],
    challenge: {
      title: 'Master List of Active Sales Territories',
      scenario: 'The VP of Sales needs a clean master list of all distinct geographic regions where customer orders have been booked.',
      instructions: 'Retrieve the unique list of region names from the sales table using DISTINCT. Sort the regions alphabetically in ascending order.',
      starterCode: `-- Challenge 10: Master list of active sales regions
-- Select DISTINCT region
-- From sales
-- Order by region ASC;

`,
      expectedQuery: 'SELECT DISTINCT region FROM sales ORDER BY region ASC;',
      hints: [
        'Write SELECT DISTINCT region FROM sales.',
        'Add ORDER BY region ASC.'
      ],
      solutionExplanation: 'DISTINCT removes duplicate occurrences of regions in the transaction log, producing a unique list.'
    }
  },
  {
    id: 'sql-aggregate-functions',
    moduleTitle: 'Part 2: Intermediate SQL (Aggregations & Data Cleaning)',
    moduleOrder: 2,
    lessonOrder: 2,
    title: '11. Aggregate Functions (COUNT, SUM, AVG, MIN, MAX)',
    description: 'Calculate metrics across whole tables and round decimals cleanly with ROUND().',
    sections: [
      {
        title: 'The 5 Core Aggregates',
        body: '- COUNT(): counts rows\n- SUM(): totals numbers\n- AVG(): computes mean\n- MIN(): finds lowest value\n- MAX(): finds highest value'
      },
      {
        title: 'Rounding Clean Decimals',
        body: 'Wrap calculations in ROUND(number, 2) to format numbers cleanly for reports:',
        exampleSql: `-- Overall sales metrics
SELECT 
    COUNT(*) AS total_orders,
    ROUND(SUM(sale_amount), 2) AS total_revenue,
    ROUND(AVG(sale_amount), 2) AS avg_sale
FROM sales;`
      }
    ],
    quickReference: [
      { goal: 'Count rows', syntax: 'SELECT COUNT(*) FROM table;' },
      { goal: 'Sum and round', syntax: 'SELECT ROUND(SUM(col), 2) FROM table;' }
    ],
    challenge: {
      title: 'Executive Compensation Benchmark',
      scenario: 'Leadership is preparing next fiscal year payroll budget. They need an executive summary of total head count, the average annual salary across the company (rounded to 2 decimal places), and the maximum salary currently paid to any employee.',
      instructions: 'Write a query against the employees table to calculate: total_employees (count of all staff), average_salary (mean salary rounded to 2 decimals), and highest_salary (maximum salary).',
      starterCode: `-- Challenge 11: Executive compensation benchmark
-- Select COUNT(*) AS total_employees,
--        ROUND(AVG(salary), 2) AS average_salary,
--        MAX(salary) AS highest_salary
-- From employees;

`,
      expectedQuery: 'SELECT COUNT(*) AS total_employees, ROUND(AVG(salary), 2) AS average_salary, MAX(salary) AS highest_salary FROM employees;',
      hints: [
        'Use COUNT(*) AS total_employees.',
        'Use ROUND(AVG(salary), 2) AS average_salary.',
        'Use MAX(salary) AS highest_salary.'
      ],
      solutionExplanation: 'These aggregate metrics summarize the entire payroll dataset into three essential executive KPIs.'
    }
  },
  {
    id: 'sql-group-by-categories',
    moduleTitle: 'Part 2: Intermediate SQL (Aggregations & Data Cleaning)',
    moduleOrder: 2,
    lessonOrder: 3,
    title: '12. SQL GROUP BY (Aggregating by Category)',
    description: 'Squash records into category buckets to calculate totals per department, region, or user.',
    sections: [
      {
        title: 'Why Group Data?',
        body: 'Instead of finding company-wide sales, GROUP BY allows you to break down totals by region, customer, or department.'
      },
      {
        title: 'The Golden Rule of GROUP BY',
        body: 'Any column in SELECT that is NOT inside an aggregate function MUST be included in the GROUP BY clause:',
        exampleSql: `-- Sales per region
SELECT 
    region,
    ROUND(SUM(sale_amount), 2) AS total_sales
FROM sales
GROUP BY region
ORDER BY total_sales DESC;`
      }
    ],
    quickReference: [
      { goal: 'Group by column', syntax: 'SELECT col, SUM(val) FROM table GROUP BY col;' }
    ],
    challenge: {
      title: 'Catalog Product Depth and Average Price',
      scenario: 'The catalog operations manager wants to assess product depth across our inventory. For each product category, they need to know the total number of distinct items we sell and the average retail price within that category.',
      instructions: 'Group the products table by category. Return category, item_count (total items), and avg_price (average price rounded to 2 decimal places). Sort the output by item_count descending.',
      starterCode: `-- Challenge 12: Product depth and average pricing by category
-- Select category,
--        COUNT(*) AS item_count,
--        ROUND(AVG(price), 2) AS avg_price
-- From products
-- Group by category
-- Order by item_count DESC;

`,
      expectedQuery: 'SELECT category, COUNT(*) AS item_count, ROUND(AVG(price), 2) AS avg_price FROM products GROUP BY category ORDER BY item_count DESC;',
      hints: [
        'Select category, COUNT(*) AS item_count, and ROUND(AVG(price), 2) AS avg_price.',
        'Group by category.',
        'Order by item_count DESC.'
      ],
      solutionExplanation: 'GROUP BY category aggregates items per category, providing department counts and mean prices.'
    }
  },
  {
    id: 'sql-having-clause',
    moduleTitle: 'Part 2: Intermediate SQL (Aggregations & Data Cleaning)',
    moduleOrder: 2,
    lessonOrder: 4,
    title: '13. SQL HAVING (Filtering Aggregates vs WHERE)',
    description: 'Understand the critical difference between WHERE and HAVING in SQL execution order.',
    sections: [
      {
        title: 'WHERE vs HAVING',
        body: '- WHERE filters raw individual rows BEFORE grouping.\n- HAVING filters calculated aggregate numbers AFTER grouping.\n\nYou cannot write WHERE SUM(...) because WHERE runs before SUM exists! You must use HAVING.'
      },
      {
        title: 'Example',
        body: 'Finding VIP customers who spent more than $500 total:',
        exampleSql: `-- Customers spending over $500
SELECT 
    customer_id,
    ROUND(SUM(sale_amount), 2) AS total_spent
FROM sales
GROUP BY customer_id
HAVING SUM(sale_amount) > 500
ORDER BY total_spent DESC;`
      }
    ],
    commonMistake: {
      wrongSql: "SELECT region, SUM(sale_amount) FROM sales WHERE SUM(sale_amount) > 500 GROUP BY region;",
      correctSql: "SELECT region, SUM(sale_amount) FROM sales GROUP BY region HAVING SUM(sale_amount) > 500;",
      explanation: "Aggregates cannot be filtered in WHERE. Always use HAVING."
    },
    quickReference: [
      { goal: 'Filter on aggregate', syntax: 'GROUP BY col HAVING SUM(val) > 500' }
    ],
    challenge: {
      title: 'High-Frequency Delivery Territories',
      scenario: 'The logistics operations team only wants to route dedicated delivery trucks to high-frequency territories. Filter out small-volume regions and only return sales regions that have recorded at least 3 completed orders.',
      instructions: 'Group the sales table by region to compute region and order_count (total orders). Use HAVING to keep only regions with order_count >= 3. Sort by order_count descending.',
      starterCode: `-- Challenge 13: High-frequency territories with >= 3 orders
-- Select region, COUNT(*) AS order_count
-- From sales
-- Group by region
-- Having COUNT(*) >= 3
-- Order by order_count DESC;

`,
      expectedQuery: 'SELECT region, COUNT(*) AS order_count FROM sales GROUP BY region HAVING COUNT(*) >= 3 ORDER BY order_count DESC;',
      hints: [
        'Group by region.',
        'Use HAVING COUNT(*) >= 3.',
        'Order by order_count DESC.'
      ],
      solutionExplanation: 'HAVING filters post-aggregation, isolating territories that satisfy the minimum 3-order logistical threshold.'
    }
  },
  {
    id: 'sql-null-cleaning',
    moduleTitle: 'Part 2: Intermediate SQL (Aggregations & Data Cleaning)',
    moduleOrder: 2,
    lessonOrder: 5,
    title: '14. SQL NULL & Missing Data Cleaning',
    description: 'Learn why = NULL fails, master IS NULL, and clean empty text strings with TRIM().',
    sections: [
      {
        title: 'What is NULL?',
        body: 'NULL represents unknown or missing data. NULL is not 0 and not an empty string ("").\n\nBecause NULL is unknown, comparing it with = produces UNKNOWN. You must always use IS NULL or IS NOT NULL.'
      },
      {
        title: 'Catching Dirty Data',
        body: 'In real datasets, missing emails may be stored as NULL or as empty spaces. Check for both using TRIM():',
        exampleSql: `-- Find customers with missing or blank emails
SELECT customer_id, first_name, email
FROM customers
WHERE email IS NULL OR TRIM(email) = '';`
      }
    ],
    quickReference: [
      { goal: 'Missing check', syntax: 'WHERE col IS NULL' },
      { goal: 'Present check', syntax: 'WHERE col IS NOT NULL' },
      { goal: 'Thorough cleaning', syntax: "WHERE col IS NULL OR TRIM(col) = ''" }
    ],
    challenge: {
      title: 'Clean Customer Email Delivery List',
      scenario: 'The digital marketing team is launching an email newsletter. To protect sender reputation and prevent bounce-backs, they strictly need customers who have a confirmed, non-empty email address on file.',
      instructions: "Select customer_id, first_name, last_name, and email from customers for all accounts where email is NOT NULL and is not an empty blank string (TRIM(email) != ''). Sort by customer_id ascending.",
      starterCode: `-- Challenge 14: Clean customer email delivery list
-- Select customer_id, first_name, last_name, email
-- From customers
-- Where email IS NOT NULL AND TRIM(email) != ''
-- Order by customer_id ASC;

`,
      expectedQuery: "SELECT customer_id, first_name, last_name, email FROM customers WHERE email IS NOT NULL AND TRIM(email) != '' ORDER BY customer_id ASC;",
      hints: [
        'Select customer_id, first_name, last_name, email from customers.',
        "Use WHERE email IS NOT NULL AND TRIM(email) != ''."
      ],
      solutionExplanation: 'This dual filter guarantees that only valid, non-null, non-blank email destinations are selected.'
    }
  },
  {
    id: 'sql-case-when-logic',
    moduleTitle: 'Part 2: Intermediate SQL (Aggregations & Data Cleaning)',
    moduleOrder: 2,
    lessonOrder: 6,
    title: '15. SQL CASE Statements (Conditional Logic)',
    description: 'Implement if-else branching directly inside SQL queries to classify and tag records.',
    sections: [
      {
        title: 'Conditional Branching with CASE',
        body: 'CASE WHEN works like an IF-ELSE block in programming. It evaluates conditions in order and returns a corresponding value when a condition is met.',
        exampleSql: `-- Employee salary tiering
SELECT 
    name,
    salary,
    CASE 
        WHEN salary >= 130000 THEN 'High Earner'
        WHEN salary >= 100000 THEN 'Mid Earner'
        ELSE 'Standard Earner'
    END AS compensation_tier
FROM employees;`
      }
    ],
    quickReference: [
      { goal: 'CASE WHEN syntax', syntax: "CASE WHEN col > 10 THEN 'High' ELSE 'Low' END AS label" }
    ],
    challenge: {
      title: 'Segment Order Shipment Packaging Tiers',
      scenario: 'Our shipping department assigns packing workflows based on invoice totals. An order of $300 or more is tagged "Freight". Orders between $150 and $299.99 are tagged "Priority". All other orders are tagged "Standard".',
      instructions: "Select sale_id, sale_amount, and assign shipping_tier using a CASE statement based on these order thresholds from sales. Sort by sale_amount descending and limit to 6 rows.",
      starterCode: `-- Challenge 15: Categorize shipment packaging tiers
-- Select sale_id, sale_amount,
-- CASE WHEN sale_amount >= 300 THEN 'Freight'
--      WHEN sale_amount >= 150 THEN 'Priority'
--      ELSE 'Standard' END AS shipping_tier
-- From sales
-- Order by sale_amount DESC LIMIT 6;

`,
      expectedQuery: "SELECT sale_id, sale_amount, CASE WHEN sale_amount >= 300 THEN 'Freight' WHEN sale_amount >= 150 THEN 'Priority' ELSE 'Standard' END AS shipping_tier FROM sales ORDER BY sale_amount DESC LIMIT 6;",
      hints: [
        "Use CASE WHEN sale_amount >= 300 THEN 'Freight' WHEN sale_amount >= 150 THEN 'Priority' ELSE 'Standard' END AS shipping_tier.",
        'Order by sale_amount DESC LIMIT 6.'
      ],
      solutionExplanation: 'CASE WHEN dynamically labels each order with the correct logistics handling tier based on amount.'
    }
  },
  {
    id: 'sql-date-functions',
    moduleTitle: 'Part 2: Intermediate SQL (Aggregations & Data Cleaning)',
    moduleOrder: 2,
    lessonOrder: 7,
    title: '16. Date & Timestamp Functions (strftime)',
    description: 'Extract months, years, and format dates for monthly analytics and time-series reports.',
    sections: [
      {
        title: 'Extracting Dates with strftime',
        body: 'SQLite stores dates as text (YYYY-MM-DD). Use strftime() to extract parts of the date:\n- strftime(\'%Y\', col): 4-digit year (e.g. 2024)\n- strftime(\'%m\', col): 2-digit month (e.g. 01)\n- strftime(\'%Y-%m\', col): Year and month together',
        exampleSql: `-- Monthly sales totals
SELECT 
    sale_id,
    strftime('%Y-%m', sale_date) AS sale_month,
    sale_amount
FROM sales
WHERE strftime('%Y', sale_date) = '2024'
LIMIT 5;`
      }
    ],
    quickReference: [
      { goal: 'Extract year and month', syntax: "strftime('%Y-%m', date_col)" }
    ],
    challenge: {
      title: 'Analyze Customer Signup Cohorts',
      scenario: 'Product growth is examining which cohort month new users registered. They want to see the signup month for our earliest users.',
      instructions: "Retrieve customer_id, first_name, and signup_month (formatted as 'YYYY-MM' using strftime('%Y-%m', signup_date)) from customers. Order by customer_id ascending and limit to 5 rows.",
      starterCode: `-- Challenge 16: Extract customer signup cohort month
-- Select customer_id, first_name, strftime('%Y-%m', signup_date) AS signup_month
-- From customers
-- Order by customer_id ASC
-- Limit 5;

`,
      expectedQuery: "SELECT customer_id, first_name, strftime('%Y-%m', signup_date) AS signup_month FROM customers ORDER BY customer_id ASC LIMIT 5;",
      hints: [
        "Use strftime('%Y-%m', signup_date) AS signup_month.",
        'Order by customer_id ASC LIMIT 5.'
      ],
      solutionExplanation: 'strftime converts ISO timestamps into monthly cohort tags for retention and churn analysis.'
    }
  },

  // ==========================================
  // PART 3: RELATIONAL SQL (LESSONS 17 - 19)
  // ==========================================
  {
    id: 'relational-keys-joins',
    moduleTitle: 'Part 3: Relational SQL (Joins & Set Logic)',
    moduleOrder: 3,
    lessonOrder: 1,
    title: '17. Relational Modeling: Primary & Foreign Keys',
    description: 'Understand why databases split data into multiple tables and how keys connect them.',
    sections: [
      {
        title: 'Why Split Data Across Tables?',
        body: 'Splitting data into normalized tables prevents redundant data entry. We link tables together using keys:\n- Primary Key (PK): Unique ID for each row in a parent table (e.g. customers.customer_id).\n- Foreign Key (FK): Reference in a child table pointing back to the parent PK (e.g. sales.customer_id).'
      },
      {
        title: 'INNER JOIN Syntax',
        body: 'INNER JOIN connects two tables and keeps records ONLY when there is a match in both tables:',
        exampleSql: `-- Combine sales with customer names
SELECT 
    s.sale_id,
    c.first_name,
    c.last_name,
    s.sale_amount
FROM sales s
INNER JOIN customers c ON s.customer_id = c.customer_id
LIMIT 5;`
      }
    ],
    quickReference: [
      { goal: 'INNER JOIN', syntax: 'FROM tableA a INNER JOIN tableB b ON a.id = b.a_id' }
    ],
    challenge: {
      title: 'Build Employee Department Directory',
      scenario: 'People Operations is compiling an official company directory. They need to pair every staff member with the official title of their department.',
      instructions: 'Perform an INNER JOIN between employees (e) and departments (d) on department_id. Return e.employee_id, e.name, d.department_name, and e.salary. Order by e.employee_id ascending.',
      starterCode: `-- Challenge 17: Build employee department directory
-- Select e.employee_id, e.name, d.department_name, e.salary
-- From employees e
-- Inner join departments d on e.department_id = d.department_id
-- Order by e.employee_id ASC;

`,
      expectedQuery: 'SELECT e.employee_id, e.name, d.department_name, e.salary FROM employees e INNER JOIN departments d ON e.department_id = d.department_id ORDER BY e.employee_id ASC;',
      hints: [
        'Alias employees as e and departments as d.',
        'Join condition is ON e.department_id = d.department_id.',
        'Order by e.employee_id ASC.'
      ],
      solutionExplanation: 'INNER JOIN combines employee records with their respective department metadata using department_id.'
    }
  },
  {
    id: 'inner-vs-left-join-logic',
    moduleTitle: 'Part 3: Relational SQL (Joins & Set Logic)',
    moduleOrder: 3,
    lessonOrder: 2,
    title: '18. INNER JOIN vs. LEFT JOIN',
    description: 'Learn when to use LEFT JOIN to preserve all primary records even when no match exists.',
    sections: [
      {
        title: 'The Danger of INNER JOIN',
        body: 'If a product has never been ordered, an INNER JOIN drops that product entirely!\n\nA LEFT JOIN guarantees that every single row from the LEFT table is preserved. If no match exists on the right, right table columns are filled with NULL.',
        exampleSql: `-- Keep all products, even unsold ones
SELECT 
    p.product_name,
    s.sale_amount
FROM products p
LEFT JOIN sales s ON p.product_id = s.product_id
ORDER BY p.product_id ASC
LIMIT 6;`
      }
    ],
    quickReference: [
      { goal: 'Preserve all left rows', syntax: 'FROM tableA a LEFT JOIN tableB b ON a.id = b.a_id' }
    ],
    challenge: {
      title: 'Complete Customer Purchase History Audit',
      scenario: 'Account managers need a complete master audit of all registered customers and any purchases they have completed. Crucially, they need to see EVERY customer—even those who signed up and have not placed an order yet.',
      instructions: 'Perform a LEFT JOIN from customers (c) to sales (s) on customer_id. Return c.customer_id, c.first_name, s.sale_id, and s.sale_amount. Order by c.customer_id ASC, s.sale_id ASC and limit to 8 rows.',
      starterCode: `-- Challenge 18: Complete customer purchase audit
-- Select c.customer_id, c.first_name, s.sale_id, s.sale_amount
-- From customers c
-- Left join sales s on c.customer_id = s.customer_id
-- Order by c.customer_id ASC, s.sale_id ASC
-- Limit 8;

`,
      expectedQuery: 'SELECT c.customer_id, c.first_name, s.sale_id, s.sale_amount FROM customers c LEFT JOIN sales s ON c.customer_id = s.customer_id ORDER BY c.customer_id ASC, s.sale_id ASC LIMIT 8;',
      hints: [
        'LEFT JOIN sales s ON c.customer_id = s.customer_id.',
        'Order by c.customer_id ASC, s.sale_id ASC.',
        'Limit to 8 rows.'
      ],
      solutionExplanation: 'LEFT JOIN retains all customer accounts; customers without sales show NULL for sale_id and sale_amount.'
    }
  },
  {
    id: 'anti-join-missing-events',
    moduleTitle: 'Part 3: Relational SQL (Joins & Set Logic)',
    moduleOrder: 3,
    lessonOrder: 3,
    title: '19. The Anti-Join Pattern (Zero Engagements / Unsold Items)',
    description: 'Master the high-priority pattern for finding unliked pages, unsold items, or inactive users.',
    sections: [
      {
        title: 'The "Never Happened" Problem',
        body: 'A staple of FAANG data interviews is finding rows that have ZERO activity (e.g. DataLemur Facebook Page with No Likes).\n\nThe Anti-Join recipe:\n1. LEFT JOIN parent table to activity table.\n2. Add WHERE right_table.id IS NULL!'
      },
      {
        title: 'Example',
        body: 'Finding Facebook pages with zero likes:',
        exampleSql: `-- Pages that have 0 likes
SELECT 
    p.page_id,
    p.page_name
FROM pages p
LEFT JOIN page_likes l ON p.page_id = l.page_id
WHERE l.page_id IS NULL;`
      }
    ],
    quickReference: [
      { goal: 'Anti-Join pattern', syntax: 'FROM parent p LEFT JOIN child c ON p.id = c.p_id WHERE c.id IS NULL' }
    ],
    challenge: {
      title: 'Identify Unsold Inventory Items (Anti-Join)',
      scenario: 'Unsold items in our catalog sit on warehouse shelves and incur storage fees. The warehouse manager needs to identify products in the catalog that have NEVER generated a single sale so they can be liquidated.',
      instructions: 'Find all products from the products table that do NOT exist in the sales table. Use a LEFT JOIN from products (p) to sales (s) on product_id and filter for unsold items. Return p.product_id and p.product_name. Sort by p.product_id ascending.',
      starterCode: `-- Challenge 19: Identify unsold inventory items (Anti-Join)
-- Select p.product_id, p.product_name
-- From products p
-- Left join sales s on p.product_id = s.product_id
-- Where s.sale_id IS NULL
-- Order by p.product_id ASC;

`,
      expectedQuery: 'SELECT p.product_id, p.product_name FROM products p LEFT JOIN sales s ON p.product_id = s.product_id WHERE s.sale_id IS NULL ORDER BY p.product_id ASC;',
      hints: [
        'Perform a LEFT JOIN from products p to sales s on product_id.',
        'Add WHERE s.sale_id IS NULL.',
        'Order by p.product_id ASC.'
      ],
      solutionExplanation: 'Products with no recorded sales have NULL in sales.sale_id; filtering for IS NULL isolates unsold inventory.'
    }
  },

  // ==========================================
  // PART 4: ADVANCED SQL (LESSONS 20 - 23)
  // ==========================================
  {
    id: 'subqueries-nested-select',
    moduleTitle: 'Part 4: Advanced SQL (Data Engineering Core)',
    moduleOrder: 4,
    lessonOrder: 1,
    title: '20. Subqueries (Nested SELECT Statements)',
    description: 'Embed queries inside other queries to filter dynamically against calculated benchmarks.',
    sections: [
      {
        title: 'What is a Subquery?',
        body: 'A subquery is a query nested inside parentheses. The database executes the inner query first and passes its output to the outer query.'
      },
      {
        title: 'Dynamic Filtering in WHERE',
        body: 'Find employees earning above the company average without hardcoding numbers:',
        exampleSql: `-- Compare against dynamic average
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees)
ORDER BY salary DESC;`
      }
    ],
    quickReference: [
      { goal: 'Subquery in WHERE', syntax: 'WHERE col > (SELECT AVG(col) FROM table)' }
    ],
    challenge: {
      title: 'Detect Outlier High-Value Sales Transactions',
      scenario: 'The revenue operations team wants to identify unusually large sales transactions that beat company-wide benchmarks. Find all individual sales where the order amount exceeds the overall average sale amount across the entire company.',
      instructions: 'Select sale_id, customer_id, and sale_amount from sales where sale_amount is greater than a subquery calculating (SELECT AVG(sale_amount) FROM sales). Order by sale_amount descending.',
      starterCode: `-- Challenge 20: Find above-average sales transactions
-- Select sale_id, customer_id, sale_amount
-- From sales
-- Where sale_amount > (SELECT AVG(sale_amount) FROM sales)
-- Order by sale_amount DESC;

`,
      expectedQuery: 'SELECT sale_id, customer_id, sale_amount FROM sales WHERE sale_amount > (SELECT AVG(sale_amount) FROM sales) ORDER BY sale_amount DESC;',
      hints: [
        'Use WHERE sale_amount > (SELECT AVG(sale_amount) FROM sales).',
        'Order by sale_amount DESC.'
      ],
      solutionExplanation: 'The subquery dynamically computes the company-wide average sale value, allowing the outer query to filter for outperforming orders.'
    }
  },
  {
    id: 'ctes-common-table-expressions',
    moduleTitle: 'Part 4: Advanced SQL (Data Engineering Core)',
    moduleOrder: 4,
    lessonOrder: 2,
    title: '21. CTEs (Common Table Expressions with WITH)',
    description: 'Break complex multi-step pipelines into clean, readable, modular temporary tables.',
    sections: [
      {
        title: 'Why CTEs (WITH Statements)?',
        body: 'Deeply nested subqueries are hard to read and debug. A Common Table Expression (CTE) begins with WITH and defines a named virtual table that you can query directly below.'
      },
      {
        title: 'Multi-Stage Data Pipeline Example',
        body: 'Calculate department averages first, then join employees to find standout earners:',
        exampleSql: `-- Clean CTE workflow
WITH dept_averages AS (
    SELECT 
        department_id,
        AVG(salary) AS avg_sal
    FROM employees
    GROUP BY department_id
)
SELECT 
    e.name,
    e.salary,
    ROUND(d.avg_sal, 2) AS dept_avg
FROM employees e
JOIN dept_averages d ON e.department_id = d.department_id
WHERE e.salary > d.avg_sal
ORDER BY e.salary DESC;`
      }
    ],
    quickReference: [
      { goal: 'Define CTE', syntax: 'WITH cte AS (SELECT col FROM table) SELECT * FROM cte;' }
    ],
    challenge: {
      title: 'VIP Spender Staging Pipeline (CTE)',
      scenario: 'In production ETL pipelines, we aggregate transaction metrics in a clean CTE before applying downstream business thresholds. Build a CTE called customer_totals that calculates total spend per customer. Then query this CTE to extract customers who spent strictly more than $400.',
      instructions: 'Write a query with a CTE named customer_totals calculating customer_id and SUM(sale_amount) AS total_spent from sales grouped by customer_id. In the outer query, select customer_id and ROUND(total_spent, 2) AS total_spent where total_spent > 400 ordered by total_spent descending.',
      starterCode: `-- Challenge 21: Customer spending CTE pipeline
WITH customer_totals AS (
    -- calculate customer_id and SUM(sale_amount) AS total_spent
    -- group by customer_id
)
-- Select customer_id, ROUND(total_spent, 2) AS total_spent
-- from customer_totals where total_spent > 400
-- order by total_spent DESC;

`,
      expectedQuery: 'WITH customer_totals AS (SELECT customer_id, SUM(sale_amount) AS total_spent FROM sales GROUP BY customer_id) SELECT customer_id, ROUND(total_spent, 2) AS total_spent FROM customer_totals WHERE total_spent > 400 ORDER BY total_spent DESC;',
      hints: [
        'Inside WITH customer_totals AS (...), calculate customer_id and SUM(sale_amount) AS total_spent.',
        'In the outer query, filter with WHERE total_spent > 400.',
        'Order by total_spent DESC.'
      ],
      solutionExplanation: 'The CTE encapsulates customer aggregation cleanly, leaving the outer query concise and easy to audit.'
    }
  },
  {
    id: 'window-functions-row-number',
    moduleTitle: 'Part 4: Advanced SQL (Data Engineering Core)',
    moduleOrder: 4,
    lessonOrder: 3,
    title: '22. Window Functions: ROW_NUMBER & PARTITION BY',
    description: 'Number records per group and extract the latest event without collapsing rows.',
    sections: [
      {
        title: 'Why Window Functions?',
        body: 'GROUP BY collapses 10 rows into 1 row. Window functions calculate values across a partition of rows while KEEPING every individual row intact in your output!'
      },
      {
        title: 'ROW_NUMBER() Syntax',
        body: 'OVER (PARTITION BY group_col ORDER BY sort_col DESC) numbers rows sequentially per group, starting over at 1 for each new group:',
        exampleSql: `-- Number transactions for each customer newest to oldest
SELECT 
    transaction_id,
    customer_id,
    amount,
    transaction_date,
    ROW_NUMBER() OVER (
        PARTITION BY customer_id 
        ORDER BY transaction_date DESC
    ) AS rn
FROM transactions;`
      }
    ],
    quickReference: [
      { goal: 'Number rows per partition', syntax: 'ROW_NUMBER() OVER (PARTITION BY col ORDER BY sort_col DESC)' }
    ],
    challenge: {
      title: 'Rank Products by Price Inside Category',
      scenario: 'Merchandising wants to identify the highest priced items inside each product category. Number the products sequentially (1, 2, 3...) within each category, ordered from most expensive to least expensive.',
      instructions: 'Select product_id, product_name, category, price, and assign category_price_rank using ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC) from the products table.',
      starterCode: `-- Challenge 22: Number products by price within each category
-- Select product_id, product_name, category, price,
--        ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC) AS category_price_rank
-- From products;

`,
      expectedQuery: 'SELECT product_id, product_name, category, price, ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC) AS category_price_rank FROM products;',
      hints: [
        'Use ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC) AS category_price_rank.',
        'Query the products table.'
      ],
      solutionExplanation: 'PARTITION BY category partitions rows by department, and ORDER BY price DESC assigns rank 1 to the most expensive item in each group.'
    }
  },
  {
    id: 'window-functions-rank-dense',
    moduleTitle: 'Part 4: Advanced SQL (Data Engineering Core)',
    moduleOrder: 4,
    lessonOrder: 4,
    title: '23. Window Functions: RANK vs DENSE_RANK',
    description: 'Rank leaders, products, and metrics with proper handling of numerical ties.',
    sections: [
      {
        title: 'RANK() vs DENSE_RANK()',
        body: '- RANK(): Leaves gaps on ties (1, 1, 3).\n- DENSE_RANK(): Consecutive rankings with no gaps (1, 1, 2).\n\nIn Data Engineering, DENSE_RANK() is used when you need clean consecutive ranks.'
      },
      {
        title: 'Example',
        body: 'Ranking product performance by total revenue:',
        exampleSql: `-- Rank products by sales without gaps
SELECT 
    product_id,
    ROUND(SUM(sale_amount), 2) AS total_revenue,
    DENSE_RANK() OVER (ORDER BY SUM(sale_amount) DESC) AS revenue_rank
FROM sales
GROUP BY product_id
ORDER BY revenue_rank ASC, product_id ASC;`
      }
    ],
    quickReference: [
      { goal: 'Dense rank without gaps', syntax: 'DENSE_RANK() OVER (ORDER BY col DESC)' },
      { goal: 'Standard rank with gaps', syntax: 'RANK() OVER (ORDER BY col DESC)' }
    ],
    challenge: {
      title: 'Departmental Salary Hierarchy (DENSE_RANK)',
      scenario: 'HR is building an executive compensation report. They want to rank employees within each department based on salary from highest to lowest. Because some colleagues in the same department earn equal pay, use DENSE_RANK() so that ties receive the same rank and no rank numbers are skipped.',
      instructions: 'Select name, department_id, salary, and compute dept_salary_rank using DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) from the employees table. Order by department_id ASC, dept_salary_rank ASC.',
      starterCode: `-- Challenge 23: Rank employees within department with DENSE_RANK()
-- Select name, department_id, salary,
--        DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS dept_salary_rank
-- From employees
-- Order by department_id ASC, dept_salary_rank ASC;

`,
      expectedQuery: 'SELECT name, department_id, salary, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS dept_salary_rank FROM employees ORDER BY department_id ASC, dept_salary_rank ASC;',
      hints: [
        'Use DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS dept_salary_rank.',
        'Order by department_id ASC, dept_salary_rank ASC.'
      ],
      solutionExplanation: 'DENSE_RANK ensures consecutive tier numbering within each department without missing ranks when salaries tie.'
    }
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
    goal: "Write a query to calculate each customer's total spending. Return customer_id and total_sales (rounded to 2 decimal places). Sort the output by total_sales descending and limit to the top 5 records.",
    tablesUsed: ['sales'],
    sampleInputs: [
      {
        tableName: 'sales',
        description: 'Records of all individual customer purchases',
        headers: ['sale_id', 'customer_id', 'product_id', 'region', 'sale_amount', 'sale_date'],
        rows: [
          [1001, 1, 101, 'East', 149.99, '2024-01-10'],
          [1002, 1, 102, 'East', 499.99, '2024-01-22'],
          [1003, 2, 103, 'Midwest', 299.50, '2024-01-25'],
          [1004, 3, 105, 'West', 179.99, '2024-02-03'],
          [1005, 4, 102, 'South', 499.99, '2024-02-14'],
          [1006, 1, 108, 'East', 129.00, '2024-02-18']
        ]
      }
    ],
    expectedOutputPreview: {
      headers: ['customer_id', 'total_sales'],
      sampleRows: [
        [1, 977.98],
        [10, 698.99],
        [4, 679.98],
        [2, 428.50],
        [6, 329.98]
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
    sampleInputs: [
      {
        tableName: 'customers',
        description: 'Customer contact directory',
        headers: ['customer_id', 'first_name', 'last_name', 'email', 'city', 'signup_date'],
        rows: [
          [1, 'Alice', 'Morgan', 'alice.m@gmail.com', 'New York', '2023-01-15'],
          [2, 'Bob', 'Stone', 'bob.stone@yahoo.com', 'Chicago', '2023-02-20'],
          [3, 'Charlie', 'Kim', null, 'San Francisco', '2023-03-10'],
          [7, 'Bob', 'Stone', 'bob.stone@yahoo.com', 'Chicago', '2023-05-18']
        ]
      }
    ],
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
    sampleInputs: [
      {
        tableName: 'products',
        description: 'Complete product catalog',
        headers: ['product_id', 'product_name', 'category', 'price'],
        rows: [
          [101, 'Mechanical Keyboard Pro', 'Electronics', 149.99],
          [102, '4K Ultra-wide Monitor', 'Electronics', 499.99],
          [106, 'Titanium Coffee Mug', 'Kitchen', 45.00],
          [107, 'Vintage Desk Lamp', 'Furniture', 55.00]
        ]
      },
      {
        tableName: 'sales',
        description: 'Recorded sales transactions',
        headers: ['sale_id', 'customer_id', 'product_id', 'region', 'sale_amount'],
        rows: [
          [1001, 1, 101, 'East', 149.99],
          [1002, 1, 102, 'East', 499.99],
          [1003, 2, 103, 'Midwest', 299.50]
        ]
      }
    ],
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
    sampleInputs: [
      {
        tableName: 'sales',
        description: 'Sales records with timestamps',
        headers: ['sale_id', 'customer_id', 'product_id', 'region', 'sale_amount', 'sale_date'],
        rows: [
          [1001, 1, 101, 'East', 149.99, '2024-01-10'],
          [1002, 1, 102, 'East', 499.99, '2024-01-22'],
          [1003, 2, 103, 'Midwest', 299.50, '2024-01-25'],
          [1005, 4, 102, 'South', 499.99, '2024-02-14'],
          [1006, 1, 108, 'East', 129.00, '2024-02-18']
        ]
      }
    ],
    expectedOutputPreview: {
      headers: ['region', 'sales_month', 'total_sales'],
      sampleRows: [
        ['East', '2024-01', 649.98],
        ['East', '2024-02', 129.00],
        ['East', '2024-03', 149.99]
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
    tablesUsed: ['employees', 'departments'],
    sampleInputs: [
      {
        tableName: 'employees',
        description: 'Employee compensation and department mapping',
        headers: ['employee_id', 'name', 'department_id', 'salary', 'hire_date'],
        rows: [
          [201, 'Amaya Balion', 10, 135000, '2021-03-15'],
          [202, 'Marcus Vance', 10, 110000, '2022-06-01'],
          [203, 'Elena Rostova', 10, 95000, '2023-01-10'],
          [204, 'David Chen', 20, 140000, '2020-08-20'],
          [206, 'Priya Patel', 20, 160000, '2019-04-01']
        ]
      },
      {
        tableName: 'departments',
        description: 'Department master table',
        headers: ['department_id', 'department_name'],
        rows: [
          [10, 'Data Engineering'],
          [20, 'Platform Infra'],
          [30, 'Product Analytics']
        ]
      }
    ],
    expectedOutputPreview: {
      headers: ['employee_id', 'name', 'department_id', 'salary'],
      sampleRows: [
        [201, 'Amaya Balion', 10, 135000],
        [206, 'Priya Patel', 20, 160000],
        [208, 'Zoe Washington', 30, 105000]
      ],
      totalExpectedRows: 3
    },
    starterCode: `-- Exercise 5: Employees above their department average
-- Step 1: Create a CTE (dept_averages) to calculate average salary per department
WITH dept_averages AS (
    -- Write your query to calculate department_id and AVG(salary) AS avg_sal
)
-- Step 2: Join employees with dept_averages and filter for salary > avg_sal
SELECT 
    e.employee_id,
    e.name,
    e.department_id,
    e.salary
FROM employees e
-- Join to dept_averages on department_id
-- Filter for employees earning above department average
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
    walkthrough: "We first calculate the department average in a Common Table Expression (CTE). Then we join each employee back to their department's benchmark row and filter for records where e.salary > d.avg_sal."
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
    sampleInputs: [
      {
        tableName: 'customers',
        description: 'Customer contact directory with dirty entries',
        headers: ['customer_id', 'first_name', 'last_name', 'email', 'city'],
        rows: [
          [1, 'Alice', 'Morgan', 'alice.m@gmail.com', 'New York'],
          [3, 'Charlie', 'Kim', null, 'San Francisco'],
          [4, 'Diana', 'Prince', 'diana.p@gmail.com', 'Austin'],
          [5, 'Evan', 'Wright', '', 'Seattle'],
          [8, 'George', 'Miller', null, 'Denver']
        ]
      }
    ],
    expectedOutputPreview: {
      headers: ['customer_id', 'first_name', 'last_name'],
      sampleRows: [
        [3, 'Charlie', 'Kim'],
        [5, 'Evan', 'Wright'],
        [8, 'George', 'Miller']
      ],
      totalExpectedRows: 3
    },
    starterCode: `-- Exercise 6: Identify customers with missing email addresses
SELECT 
    customer_id,
    first_name,
    last_name
FROM customers
-- Filter for records where email IS NULL or is an empty string
-- Order by customer_id ASC
;`,
    expectedQuery: `SELECT 
    customer_id, 
    first_name, 
    last_name 
FROM customers 
WHERE email IS NULL OR TRIM(email) = '' 
ORDER BY customer_id ASC;`,
    hints: [
      'In SQL, use IS NULL to check for missing database markers.',
      "Use TRIM(email) = '' to also catch empty blank text strings.",
      'Combine both checks with an OR condition.'
    ],
    walkthrough: "In real databases, missing data comes in two forms: genuine NULLs and empty strings (''). By writing WHERE email IS NULL OR TRIM(email) = '', we catch both categories."
  },
  {
    id: 'act-7-rank-products-revenue',
    order: 7,
    moduleTag: 'Window Functions',
    title: '7. Rank Products Based on Total Revenue',
    difficulty: 'Intermediate',
    context: 'Catalog performance: Rank items from highest revenue to lowest without rank gaps.',
    goal: 'Write a query to calculate total revenue per product (sum of sale_amount rounded to 2 decimals) and assign a ranking using DENSE_RANK() as revenue_rank. Sort by revenue_rank ASC, then product_id ASC.',
    tablesUsed: ['sales', 'products'],
    sampleInputs: [
      {
        tableName: 'sales',
        description: 'Sales records with order amounts',
        headers: ['sale_id', 'product_id', 'sale_amount'],
        rows: [
          [1001, 101, 149.99],
          [1002, 102, 499.99],
          [1003, 103, 299.50],
          [1005, 102, 499.99],
          [1007, 101, 149.99],
          [1013, 102, 499.99]
        ]
      },
      {
        tableName: 'products',
        description: 'Product master directory',
        headers: ['product_id', 'product_name', 'category', 'price'],
        rows: [
          [101, 'Mechanical Keyboard Pro', 'Electronics', 149.99],
          [102, '4K Ultra-wide Monitor', 'Electronics', 499.99],
          [103, 'Ergonomic Desk Chair', 'Furniture', 299.50]
        ]
      }
    ],
    expectedOutputPreview: {
      headers: ['product_id', 'total_revenue', 'revenue_rank'],
      sampleRows: [
        [102, 1499.97, 1],
        [103, 599.00, 2],
        [104, 398.00, 3],
        [105, 359.98, 4],
        [101, 299.98, 5]
      ],
      totalExpectedRows: 6
    },
    starterCode: `-- Exercise 7: Rank products by total revenue
SELECT 
    product_id,
    ROUND(SUM(sale_amount), 2) AS total_revenue
    -- Step 1: Add DENSE_RANK() window function ordered by SUM(sale_amount) DESC
FROM sales
-- Step 2: Group by product_id
-- Step 3: Sort by revenue_rank ASC, then product_id ASC
;`,
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
    sampleInputs: [
      {
        tableName: 'transactions',
        description: 'Payment log with precise timestamps',
        headers: ['transaction_id', 'customer_id', 'amount', 'transaction_date'],
        rows: [
          [5001, 1, 45.50, '2024-01-05 10:20:00'],
          [5002, 1, 120.00, '2024-02-14 14:15:00'],
          [5003, 1, 85.25, '2024-03-22 09:30:00'],
          [5004, 2, 210.00, '2024-01-18 16:45:00'],
          [5005, 2, 95.00, '2024-04-10 11:00:00'],
          [5006, 3, 340.00, '2024-02-28 13:20:00'],
          [5007, 4, 15.00, '2024-01-12 08:15:00'],
          [5008, 4, 180.50, '2024-05-01 17:05:00']
        ]
      }
    ],
    expectedOutputPreview: {
      headers: ['customer_id', 'transaction_id', 'amount', 'transaction_date'],
      sampleRows: [
        [1, 5003, 85.25, '2024-03-22 09:30:00'],
        [2, 5005, 95.00, '2024-04-10 11:00:00'],
        [3, 5006, 340.00, '2024-02-28 13:20:00'],
        [4, 5008, 180.50, '2024-05-01 17:05:00']
      ],
      totalExpectedRows: 4
    },
    starterCode: `-- Exercise 8: Latest transaction per customer
WITH ranked_transactions AS (
    SELECT 
        transaction_id,
        customer_id,
        amount,
        transaction_date
        -- Add ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY transaction_date DESC) AS rn
    FROM transactions
)
SELECT 
    customer_id,
    transaction_id,
    amount,
    transaction_date
FROM ranked_transactions
-- Step 1: Filter where rn = 1
-- Step 2: Sort by customer_id ASC
;`,
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
    walkthrough: "By partitioning on customer_id and sorting transaction_date descending, every customer's newest transaction is labeled rn = 1. Filtering WHERE rn = 1 extracts exactly one latest event per customer."
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
    sampleInputs: [
      {
        tableName: 'pages',
        description: 'Directory of Facebook pages',
        headers: ['page_id', 'page_name'],
        rows: [
          [20001, 'SQL Solutions'],
          [20045, 'Brain Exercises'],
          [20701, 'Tips for Data Analysts']
        ]
      },
      {
        tableName: 'page_likes',
        description: 'Log of user likes on pages',
        headers: ['user_id', 'page_id', 'liked_date'],
        rows: [
          [111, 20001, '2022-04-08 00:00:00'],
          [121, 20045, '2022-03-12 00:00:00'],
          [156, 20001, '2022-07-25 00:00:00']
        ]
      }
    ],
    expectedOutputPreview: {
      headers: ['page_id'],
      sampleRows: [[20701]],
      totalExpectedRows: 1
    },
    starterCode: `-- Exercise 9: Facebook Page With No Likes
SELECT p.page_id
FROM pages p
-- Step 1: Perform a LEFT JOIN with page_likes on page_id
-- Step 2: Filter for pages that have no likes (NULL in page_likes)
-- Step 3: Sort by page_id ascending
;`,
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
    sampleInputs: [
      {
        tableName: 'candidates',
        description: 'Candidate skill tags',
        headers: ['candidate_id', 'skill'],
        rows: [
          [123, 'Python'],
          [123, 'Tableau'],
          [123, 'PostgreSQL'],
          [234, 'R'],
          [234, 'PowerBI'],
          [345, 'Python'],
          [147, 'Java'],
          [147, 'PostgreSQL'],
          [147, 'Python'],
          [147, 'Tableau']
        ]
      }
    ],
    expectedOutputPreview: {
      headers: ['candidate_id'],
      sampleRows: [[123], [147]],
      totalExpectedRows: 2
    },
    starterCode: `-- Exercise 10: Candidates with all 3 skills
SELECT candidate_id
FROM candidates
-- Step 1: Filter for rows matching any of the 3 required skills
-- Step 2: Group by candidate_id
-- Step 3: Assert they have all 3 distinct skills
-- Step 4: Sort by candidate_id ascending
;`,
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
