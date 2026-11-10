export interface LessonSection {
  title: string;
  body: string;
  exampleSql?: string;
}

export interface LessonChallenge {
  title: string;
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
      title: 'Practice: Inspect the Products Table',
      instructions: 'Write a query to view all columns from the products table. Limit the result to the first 5 rows.',
      starterCode: `-- Challenge 1: View all columns from products
-- 1. SELECT *
-- 2. FROM products
-- 3. LIMIT 5;

`,
      expectedQuery: 'SELECT * FROM products LIMIT 5;',
      hints: [
        'Use SELECT * to pick all columns.',
        'Specify FROM products.',
        'Add LIMIT 5 at the end.'
      ],
      solutionExplanation: 'SELECT * retrieves every column available in the products table, and LIMIT 5 returns the first 5 records.'
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
        exampleSql: `-- Retrieve only product name and price
SELECT product_name, price
FROM products;`
      }
    ],
    quickReference: [
      { goal: 'Pick specific columns', syntax: 'SELECT col1, col2 FROM table;' }
    ],
    commonMistake: {
      wrongSql: 'SELECT product_name price FROM products;',
      correctSql: 'SELECT product_name, price FROM products;',
      explanation: 'Always separate multiple column names with a comma.'
    },
    challenge: {
      title: 'Practice: Select Product Names and Prices',
      instructions: 'Write a query to select product_name, category, and price from the products table. Limit to 5 rows.',
      starterCode: `-- Challenge 2: Select specific columns
-- Select product_name, category, price
-- From products
-- Limit 5;

`,
      expectedQuery: 'SELECT product_name, category, price FROM products LIMIT 5;',
      hints: [
        'Separate the columns with commas: product_name, category, price.',
        'Query the products table.',
        'Add LIMIT 5.'
      ],
      solutionExplanation: 'We selected only the 3 columns we care about, keeping the query lightweight and readable.'
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
        exampleSql: `-- Rename first_name to customer_name
SELECT first_name AS customer_name, city
FROM customers
LIMIT 3;`
      }
    ],
    quickReference: [
      { goal: 'Limit rows', syntax: 'LIMIT 10;' },
      { goal: 'Rename column in output', syntax: 'SELECT col AS new_label FROM table;' }
    ],
    challenge: {
      title: 'Practice: Rename Customer Names',
      instructions: 'Write a query to select first_name aliased as customer_name and city from the customers table. Limit the result to 3 rows.',
      starterCode: `-- Challenge 3: Aliasing with AS and limiting rows
-- Select first_name AS customer_name, city
-- From customers
-- Limit 3;

`,
      expectedQuery: 'SELECT first_name AS customer_name, city FROM customers LIMIT 3;',
      hints: [
        'Use first_name AS customer_name.',
        'Include city as the second column.',
        'Limit to 3 rows.'
      ],
      solutionExplanation: 'AS customer_name renames the header in the output table, making the report intuitive.'
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
      title: 'Practice: Filter Affordable Products',
      instructions: 'Write a query to retrieve product_name and price from the products table for all items where price < 100.',
      starterCode: `-- Challenge 4: Filter products priced under 100
-- Select product_name, price
-- From products
-- Where price < 100;

`,
      expectedQuery: 'SELECT product_name, price FROM products WHERE price < 100;',
      hints: [
        'Select product_name, price from products.',
        'Add WHERE price < 100.'
      ],
      solutionExplanation: 'The WHERE clause checks every row and keeps only items with price strictly under 100.'
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
      title: 'Practice: High-Value East Coast Sales',
      instructions: "Write a query to select sale_id, region, and sale_amount from the sales table where region = 'East' AND sale_amount > 140.",
      starterCode: `-- Challenge 5: Multiple conditions with AND
-- Select sale_id, region, sale_amount
-- From sales
-- Where region = 'East' AND sale_amount > 140;

`,
      expectedQuery: "SELECT sale_id, region, sale_amount FROM sales WHERE region = 'East' AND sale_amount > 140;",
      hints: [
        'Select sale_id, region, sale_amount from sales.',
        "Use WHERE region = 'East' AND sale_amount > 140."
      ],
      solutionExplanation: 'AND ensures only records that satisfy BOTH region is East and sale amount is greater than 140 appear in the result.'
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
      title: 'Practice: Products in Price Range',
      instructions: 'Write a query to select product_name and price from products for all items where price is BETWEEN 50 AND 200.',
      starterCode: `-- Challenge 6: Range filtering with BETWEEN
-- Select product_name, price
-- From products
-- Where price BETWEEN 50 AND 200;

`,
      expectedQuery: 'SELECT product_name, price FROM products WHERE price BETWEEN 50 AND 200;',
      hints: [
        'Select product_name, price from products.',
        'Use WHERE price BETWEEN 50 AND 200.'
      ],
      solutionExplanation: 'BETWEEN 50 AND 200 cleanly checks both the lower and upper bounds inclusively.'
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
      title: 'Practice: Match Specific Categories',
      instructions: "Write a query to select product_name and category from products where category is in ('Electronics', 'Furniture').",
      starterCode: `-- Challenge 7: Filter with IN
-- Select product_name, category
-- From products
-- Where category IN ('Electronics', 'Furniture');

`,
      expectedQuery: "SELECT product_name, category FROM products WHERE category IN ('Electronics', 'Furniture');",
      hints: [
        'Select product_name, category from products.',
        "Use WHERE category IN ('Electronics', 'Furniture')."
      ],
      solutionExplanation: 'IN checks if the category matches any element in the specified list.'
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
      title: 'Practice: Find Gmail Users',
      instructions: "Write a query to select customer_id, first_name, and email from customers where email LIKE '%@gmail.com'.",
      starterCode: `-- Challenge 8: Text pattern matching with LIKE
-- Select customer_id, first_name, email
-- From customers
-- Where email LIKE '%@gmail.com';

`,
      expectedQuery: "SELECT customer_id, first_name, email FROM customers WHERE email LIKE '%@gmail.com';",
      hints: [
        'Select customer_id, first_name, email from customers.',
        "Add WHERE email LIKE '%@gmail.com'."
      ],
      solutionExplanation: 'The wildcard % matches any username preceding @gmail.com.'
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
      title: 'Practice: Top 3 Most Expensive Products',
      instructions: 'Write a query to select product_name and price from products, sorted by price in descending order (DESC), limited to the top 3 items.',
      starterCode: `-- Challenge 9: Sort by price descending
-- Select product_name, price
-- From products
-- Order by price DESC
-- Limit 3;

`,
      expectedQuery: 'SELECT product_name, price FROM products ORDER BY price DESC LIMIT 3;',
      hints: [
        'Select product_name, price from products.',
        'Use ORDER BY price DESC.',
        'Add LIMIT 3.'
      ],
      solutionExplanation: 'ORDER BY price DESC puts the most expensive items first, and LIMIT 3 isolates the top 3.'
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
      title: 'Practice: Unique Product Categories',
      instructions: 'Write a query to retrieve the unique list of categories from the products table using DISTINCT. Sort the categories alphabetically (ASC).',
      starterCode: `-- Challenge 10: Unique categories with DISTINCT
-- Select DISTINCT category
-- From products
-- Order by category ASC;

`,
      expectedQuery: 'SELECT DISTINCT category FROM products ORDER BY category ASC;',
      hints: [
        'Write SELECT DISTINCT category FROM products.',
        'Add ORDER BY category ASC.'
      ],
      solutionExplanation: 'DISTINCT removes duplicate categories, giving a clean list of all unique categories in the catalog.'
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
    COUNT(*) AS total_sales_count,
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
      title: 'Practice: Overall Sales Metrics',
      instructions: 'Write a query to calculate COUNT(*) AS total_sales_count, ROUND(SUM(sale_amount), 2) AS total_revenue, and ROUND(AVG(sale_amount), 2) AS avg_sale from sales.',
      starterCode: `-- Challenge 11: Sales summary metrics
-- Select COUNT(*) AS total_sales_count,
--        ROUND(SUM(sale_amount), 2) AS total_revenue,
--        ROUND(AVG(sale_amount), 2) AS avg_sale
-- From sales;

`,
      expectedQuery: 'SELECT COUNT(*) AS total_sales_count, ROUND(SUM(sale_amount), 2) AS total_revenue, ROUND(AVG(sale_amount), 2) AS avg_sale FROM sales;',
      hints: [
        'Use COUNT(*) AS total_sales_count.',
        'Use ROUND(SUM(sale_amount), 2) AS total_revenue.',
        'Use ROUND(AVG(sale_amount), 2) AS avg_sale.'
      ],
      solutionExplanation: 'These aggregates summarize all individual transactions into a single executive KPI row.'
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
      title: 'Practice: Total Sales per Region',
      instructions: 'Write a query to calculate region and ROUND(SUM(sale_amount), 2) AS total_sales from sales. Group by region and order by total_sales DESC.',
      starterCode: `-- Challenge 12: Sales grouped by region
-- Select region, ROUND(SUM(sale_amount), 2) AS total_sales
-- From sales
-- Group by region
-- Order by total_sales DESC;

`,
      expectedQuery: 'SELECT region, ROUND(SUM(sale_amount), 2) AS total_sales FROM sales GROUP BY region ORDER BY total_sales DESC;',
      hints: [
        'Select region and ROUND(SUM(sale_amount), 2) AS total_sales.',
        'Add GROUP BY region.',
        'Add ORDER BY total_sales DESC.'
      ],
      solutionExplanation: 'GROUP BY region bundles sales into regional buckets and calculates total revenue for each.'
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
      title: 'Practice: Find Customers Spending Over 500',
      instructions: 'Write a query to select customer_id and ROUND(SUM(sale_amount), 2) AS total_spent from sales. Group by customer_id and use HAVING SUM(sale_amount) > 500. Order by total_spent DESC.',
      starterCode: `-- Challenge 13: Filter grouped data with HAVING
-- Select customer_id, ROUND(SUM(sale_amount), 2) AS total_spent
-- From sales
-- Group by customer_id
-- Having SUM(sale_amount) > 500
-- Order by total_spent DESC;

`,
      expectedQuery: 'SELECT customer_id, ROUND(SUM(sale_amount), 2) AS total_spent FROM sales GROUP BY customer_id HAVING SUM(sale_amount) > 500 ORDER BY total_spent DESC;',
      hints: [
        'Group by customer_id.',
        'Filter with HAVING SUM(sale_amount) > 500.',
        'Order by total_spent DESC.'
      ],
      solutionExplanation: 'HAVING inspects the total spending for each customer and only retains those exceeding 500.'
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
      title: 'Practice: Identify Incomplete Profiles',
      instructions: "Write a query to select customer_id, first_name, and email from customers where email IS NULL OR TRIM(email) = ''.",
      starterCode: `-- Challenge 14: Data cleaning for missing emails
-- Select customer_id, first_name, email
-- From customers
-- Where email IS NULL OR TRIM(email) = '';

`,
      expectedQuery: "SELECT customer_id, first_name, email FROM customers WHERE email IS NULL OR TRIM(email) = '';",
      hints: [
        'Select customer_id, first_name, email from customers.',
        "Use WHERE email IS NULL OR TRIM(email) = ''."
      ],
      solutionExplanation: 'Checking both IS NULL and TRIM catches both true database NULLs and dirty whitespace strings.'
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
        exampleSql: `-- Pricing tiers
SELECT 
    product_name,
    price,
    CASE 
        WHEN price >= 150 THEN 'Premium'
        ELSE 'Standard'
    END AS price_tier
FROM products
ORDER BY price DESC;`
      }
    ],
    quickReference: [
      { goal: 'CASE WHEN syntax', syntax: "CASE WHEN col > 10 THEN 'High' ELSE 'Low' END AS label" }
    ],
    challenge: {
      title: 'Practice: Classify Product Pricing Tiers',
      instructions: "Write a query to select product_name, price, and price_tier using CASE WHEN: if price >= 150 then 'Premium', otherwise 'Standard'. Order by price DESC.",
      starterCode: `-- Challenge 15: Product tier classification
-- Select product_name, price,
-- CASE WHEN price >= 150 THEN 'Premium' ELSE 'Standard' END AS price_tier
-- From products
-- Order by price DESC;

`,
      expectedQuery: "SELECT product_name, price, CASE WHEN price >= 150 THEN 'Premium' ELSE 'Standard' END AS price_tier FROM products ORDER BY price DESC;",
      hints: [
        "Use CASE WHEN price >= 150 THEN 'Premium' ELSE 'Standard' END AS price_tier.",
        'Query products and order by price DESC.'
      ],
      solutionExplanation: 'CASE WHEN assigns categories on the fly based on price thresholds without altering the source table.'
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
        exampleSql: `-- Monthly sales
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
      title: 'Practice: Extract Monthly Sales',
      instructions: "Write a query to select sale_id, strftime('%Y-%m', sale_date) AS sale_month, and sale_amount from sales where strftime('%Y', sale_date) = '2024'. Limit to 5 rows.",
      starterCode: `-- Challenge 16: Date extraction with strftime
-- Select sale_id, strftime('%Y-%m', sale_date) AS sale_month, sale_amount
-- From sales
-- Where strftime('%Y', sale_date) = '2024'
-- Limit 5;

`,
      expectedQuery: "SELECT sale_id, strftime('%Y-%m', sale_date) AS sale_month, sale_amount FROM sales WHERE strftime('%Y', sale_date) = '2024' LIMIT 5;",
      hints: [
        "Use strftime('%Y-%m', sale_date) AS sale_month.",
        "Filter with WHERE strftime('%Y', sale_date) = '2024'.",
        'Add LIMIT 5.'
      ],
      solutionExplanation: 'strftime extracts the year-month format, which is the foundational building block for cohort and trend analysis.'
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
      title: 'Practice: Join Sales with Customers',
      instructions: 'Write a query using an INNER JOIN between sales (s) and customers (c) on customer_id. Return s.sale_id, c.first_name, c.last_name, and s.sale_amount. Limit to 5 rows.',
      starterCode: `-- Challenge 17: INNER JOIN on customer_id
-- Select s.sale_id, c.first_name, c.last_name, s.sale_amount
-- From sales s
-- Inner join customers c on s.customer_id = c.customer_id
-- Limit 5;

`,
      expectedQuery: 'SELECT s.sale_id, c.first_name, c.last_name, s.sale_amount FROM sales s INNER JOIN customers c ON s.customer_id = c.customer_id LIMIT 5;',
      hints: [
        'Alias sales as s and customers as c.',
        'Join condition is ON s.customer_id = c.customer_id.',
        'Limit to 5 rows.'
      ],
      solutionExplanation: 'INNER JOIN pairs each sale with its corresponding customer name using the customer_id foreign key.'
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
      title: 'Practice: LEFT JOIN Products with Sales',
      instructions: 'Write a query to perform a LEFT JOIN from products (p) to sales (s) on product_id. Return p.product_name and s.sale_amount. Order by p.product_id ASC and limit to 6 rows.',
      starterCode: `-- Challenge 18: LEFT JOIN to keep all products
-- Select p.product_name, s.sale_amount
-- From products p
-- Left join sales s on p.product_id = s.product_id
-- Order by p.product_id ASC
-- Limit 6;

`,
      expectedQuery: 'SELECT p.product_name, s.sale_amount FROM products p LEFT JOIN sales s ON p.product_id = s.product_id ORDER BY p.product_id ASC LIMIT 6;',
      hints: [
        'Use LEFT JOIN sales s ON p.product_id = s.product_id.',
        'Order by p.product_id ASC.',
        'Add LIMIT 6.'
      ],
      solutionExplanation: 'The LEFT JOIN keeps all products; items that were never purchased display NULL for sale_amount.'
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
      title: 'Practice: Find Unliked Facebook Pages',
      instructions: 'Write a query using a LEFT JOIN between pages (p) and page_likes (l) to find pages with zero likes. Return p.page_id and p.page_name. Order by p.page_id ASC.',
      starterCode: `-- Challenge 19: Find pages with 0 likes
-- Select p.page_id, p.page_name
-- From pages p
-- Left join page_likes l on p.page_id = l.page_id
-- Where l.page_id IS NULL
-- Order by p.page_id ASC;

`,
      expectedQuery: 'SELECT p.page_id, p.page_name FROM pages p LEFT JOIN page_likes l ON p.page_id = l.page_id WHERE l.page_id IS NULL ORDER BY p.page_id ASC;',
      hints: [
        'LEFT JOIN pages p with page_likes l on p.page_id = l.page_id.',
        'Add WHERE l.page_id IS NULL.',
        'Order by p.page_id ASC.'
      ],
      solutionExplanation: 'LEFT JOIN retains all pages, and filtering WHERE l.page_id IS NULL strips away pages that had likes, leaving only zero-like pages.'
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
      title: 'Practice: Employees Above Company Average',
      instructions: 'Write a query to select name and salary from employees where salary is strictly greater than the overall average salary (SELECT AVG(salary) FROM employees). Order by salary DESC.',
      starterCode: `-- Challenge 20: Subquery in WHERE
-- Select name, salary
-- From employees
-- Where salary > (SELECT AVG(salary) FROM employees)
-- Order by salary DESC;

`,
      expectedQuery: 'SELECT name, salary FROM employees WHERE salary > (SELECT AVG(salary) FROM employees) ORDER BY salary DESC;',
      hints: [
        'Write WHERE salary > (SELECT AVG(salary) FROM employees).',
        'Order by salary DESC.'
      ],
      solutionExplanation: 'The inner subquery calculates company-wide average salary, and the outer query filters employees earning more than that benchmark.'
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
      title: 'Practice: Department Benchmark CTE',
      instructions: 'Write a query using a CTE named dept_averages to calculate department_id and AVG(salary) AS avg_sal from employees grouped by department_id. Then join employees (e) to dept_averages (d) on department_id to select e.name, e.salary, and ROUND(d.avg_sal, 2) AS dept_avg where e.salary > d.avg_sal. Order by e.salary DESC.',
      starterCode: `-- Challenge 21: Multi-stage CTE calculation
WITH dept_averages AS (
    -- calculate department_id and AVG(salary) AS avg_sal
    -- group by department_id
)
-- Select e.name, e.salary, ROUND(d.avg_sal, 2) AS dept_avg
-- Join employees e to dept_averages d on department_id
-- Filter e.salary > d.avg_sal
-- Order by e.salary DESC;

`,
      expectedQuery: 'WITH dept_averages AS (SELECT department_id, AVG(salary) AS avg_sal FROM employees GROUP BY department_id) SELECT e.name, e.salary, ROUND(d.avg_sal, 2) AS dept_avg FROM employees e JOIN dept_averages d ON e.department_id = d.department_id WHERE e.salary > d.avg_sal ORDER BY e.salary DESC;',
      hints: [
        'Calculate department_id and AVG(salary) AS avg_sal inside the CTE.',
        'Join on department_id in the main query.',
        'Filter e.salary > d.avg_sal.'
      ],
      solutionExplanation: 'The CTE pre-calculates the department benchmark, allowing the outer query to cleanly join and filter in a readable manner.'
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
      title: 'Practice: Number Transactions per Customer',
      instructions: 'Write a query to select transaction_id, customer_id, amount, transaction_date, and ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY transaction_date DESC) AS rn from transactions.',
      starterCode: `-- Challenge 22: Window function row numbering
-- Select transaction_id, customer_id, amount, transaction_date,
--        ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY transaction_date DESC) AS rn
-- From transactions;

`,
      expectedQuery: 'SELECT transaction_id, customer_id, amount, transaction_date, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY transaction_date DESC) AS rn FROM transactions;',
      hints: [
        'Use ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY transaction_date DESC) AS rn.',
        'Query the transactions table.'
      ],
      solutionExplanation: 'PARTITION BY customer_id groups by customer, and ORDER BY transaction_date DESC assigns rn = 1 to the newest event.'
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
      title: 'Practice: Rank Products with DENSE_RANK',
      instructions: 'Write a query to calculate product_id, ROUND(SUM(sale_amount), 2) AS total_revenue, and DENSE_RANK() OVER (ORDER BY SUM(sale_amount) DESC) AS revenue_rank from sales. Group by product_id and order by revenue_rank ASC, product_id ASC.',
      starterCode: `-- Challenge 23: DENSE_RANK for product revenue
-- Select product_id,
--        ROUND(SUM(sale_amount), 2) AS total_revenue,
--        DENSE_RANK() OVER (ORDER BY SUM(sale_amount) DESC) AS revenue_rank
-- From sales
-- Group by product_id
-- Order by revenue_rank ASC, product_id ASC;

`,
      expectedQuery: 'SELECT product_id, ROUND(SUM(sale_amount), 2) AS total_revenue, DENSE_RANK() OVER (ORDER BY SUM(sale_amount) DESC) AS revenue_rank FROM sales GROUP BY product_id ORDER BY revenue_rank ASC, product_id ASC;',
      hints: [
        'Use DENSE_RANK() OVER (ORDER BY SUM(sale_amount) DESC) AS revenue_rank.',
        'Group by product_id.',
        'Order by revenue_rank ASC, product_id ASC.'
      ],
      solutionExplanation: 'DENSE_RANK assigns consecutive rank positions to all products based on their total sales revenue.'
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
