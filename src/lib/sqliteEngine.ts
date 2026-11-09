import initSqlJs, { type Database } from 'sql.js';

let SQLInstance: any = null;
let currentDb: Database | null = null;

export const SEED_SQL = `
-- 1. Customers Table (includes duplicate names & missing emails for exercises #2 and #6)
DROP TABLE IF EXISTS customers;
CREATE TABLE customers (
  customer_id INTEGER PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  city TEXT,
  signup_date TEXT
);

INSERT INTO customers VALUES
  (1, 'Alice', 'Morgan', 'alice.m@gmail.com', 'New York', '2023-01-15'),
  (2, 'Bob', 'Stone', 'bob.stone@yahoo.com', 'Chicago', '2023-02-20'),
  (3, 'Charlie', 'Kim', NULL, 'San Francisco', '2023-03-10'),
  (4, 'Diana', 'Prince', 'diana.p@gmail.com', 'Austin', '2023-04-05'),
  (5, 'Evan', 'Wright', '', 'Seattle', '2023-04-12'),
  (6, 'Fiona', 'Gallagher', 'fiona.g@hotmail.com', 'Boston', '2023-05-01'),
  (7, 'Bob', 'Stone', 'bob.stone@yahoo.com', 'Chicago', '2023-05-18'), -- duplicate customer
  (8, 'George', 'Miller', NULL, 'Denver', '2023-06-22'),
  (9, 'Hannah', 'Abbott', 'hannah.a@gmail.com', 'Dallas', '2023-07-04'),
  (10, 'Ian', 'Malcolm', 'ian.m@jurassic.org', 'Orlando', '2023-08-11');

-- 2. Products Table (Includes unsold products for exercise #3)
DROP TABLE IF EXISTS products;
CREATE TABLE products (
  product_id INTEGER PRIMARY KEY,
  product_name TEXT NOT NULL,
  category TEXT NOT NULL,
  price REAL NOT NULL
);

INSERT INTO products VALUES
  (101, 'Mechanical Keyboard Pro', 'Electronics', 149.99),
  (102, '4K Ultra-wide Monitor', 'Electronics', 499.99),
  (103, 'Ergonomic Desk Chair', 'Furniture', 299.50),
  (104, 'Standing Desk Converter', 'Furniture', 199.00),
  (105, 'Noise-canceling Headset', 'Audio', 179.99),
  (106, 'Titanium Coffee Mug', 'Kitchen', 45.00),     -- Never sold!
  (107, 'Vintage Desk Lamp', 'Furniture', 55.00),       -- Never sold!
  (108, 'USB-C Thunderbolt Dock', 'Electronics', 129.00);

-- 3. Sales Table (Orders with dates, regions, and revenue for #1, #4, #7)
DROP TABLE IF EXISTS sales;
CREATE TABLE sales (
  sale_id INTEGER PRIMARY KEY,
  customer_id INTEGER,
  product_id INTEGER,
  region TEXT NOT NULL,
  sale_amount REAL NOT NULL,
  sale_date TEXT NOT NULL
);

INSERT INTO sales VALUES
  (1001, 1, 101, 'East', 149.99, '2024-01-10'),
  (1002, 1, 102, 'East', 499.99, '2024-01-22'),
  (1003, 2, 103, 'Midwest', 299.50, '2024-01-25'),
  (1004, 3, 105, 'West', 179.99, '2024-02-03'),
  (1005, 4, 102, 'South', 499.99, '2024-02-14'),
  (1006, 1, 108, 'East', 129.00, '2024-02-18'),
  (1007, 6, 101, 'East', 149.99, '2024-03-01'),
  (1008, 9, 103, 'South', 299.50, '2024-03-12'),
  (1009, 10, 104, 'South', 199.00, '2024-03-20'),
  (1010, 4, 105, 'South', 179.99, '2024-04-05'),
  (1011, 2, 108, 'Midwest', 129.00, '2024-04-19'),
  (1012, 1, 104, 'East', 199.00, '2024-05-02'),
  (1013, 10, 102, 'South', 499.99, '2024-05-15'),
  (1014, 6, 105, 'East', 179.99, '2024-05-28');

-- 4. Departments & Employees (For #5: employees above their department's average)
DROP TABLE IF EXISTS departments;
CREATE TABLE departments (
  department_id INTEGER PRIMARY KEY,
  department_name TEXT NOT NULL
);

INSERT INTO departments VALUES
  (10, 'Data Engineering'),
  (20, 'Platform Infra'),
  (30, 'Product Analytics');

DROP TABLE IF EXISTS employees;
CREATE TABLE employees (
  employee_id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  department_id INTEGER NOT NULL,
  salary REAL NOT NULL,
  hire_date TEXT NOT NULL
);

INSERT INTO employees VALUES
  (201, 'Amaya Balion', 10, 135000, '2021-03-15'),
  (202, 'Marcus Vance', 10, 110000, '2022-06-01'),
  (203, 'Elena Rostova', 10, 95000, '2023-01-10'),
  (204, 'David Chen', 20, 140000, '2020-08-20'),
  (205, 'Sarah Jenkins', 20, 125000, '2021-11-15'),
  (206, 'Priya Patel', 20, 160000, '2019-04-01'),
  (207, 'Liam O''Connor', 30, 85000, '2023-09-01'),
  (208, 'Zoe Washington', 30, 105000, '2022-02-15');

-- 5. Transactions Table (For #8: Find the latest transaction for each customer)
DROP TABLE IF EXISTS transactions;
CREATE TABLE transactions (
  transaction_id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  amount REAL NOT NULL,
  transaction_date TEXT NOT NULL
);

INSERT INTO transactions VALUES
  (5001, 1, 45.50, '2024-01-05 10:20:00'),
  (5002, 1, 120.00, '2024-02-14 14:15:00'),
  (5003, 1, 85.25, '2024-03-22 09:30:00'), -- latest for 1
  (5004, 2, 210.00, '2024-01-18 16:45:00'),
  (5005, 2, 95.00, '2024-04-10 11:00:00'), -- latest for 2
  (5006, 3, 340.00, '2024-02-28 13:20:00'), -- latest for 3
  (5007, 4, 15.00, '2024-01-12 08:15:00'),
  (5008, 4, 180.50, '2024-05-01 17:05:00'); -- latest for 4

-- 6. Facebook "Page With No Likes"
DROP TABLE IF EXISTS pages;
CREATE TABLE pages (
  page_id INTEGER PRIMARY KEY,
  page_name TEXT NOT NULL
);

INSERT INTO pages VALUES
  (20001, 'SQL Solutions'),
  (20045, 'Brain Exercises'),
  (20701, 'Tips for Data Analysts');

DROP TABLE IF EXISTS page_likes;
CREATE TABLE page_likes (
  user_id INTEGER,
  page_id INTEGER,
  liked_date TEXT
);

INSERT INTO page_likes VALUES
  (111, 20001, '2022-04-08 00:00:00'),
  (121, 20045, '2022-03-12 00:00:00'),
  (156, 20001, '2022-07-25 00:00:00');

-- 7. LinkedIn "Data Science Skills"
DROP TABLE IF EXISTS candidates;
CREATE TABLE candidates (
  candidate_id INTEGER,
  skill TEXT NOT NULL
);

INSERT INTO candidates VALUES
  (123, 'Python'),
  (123, 'Tableau'),
  (123, 'PostgreSQL'),
  (234, 'R'),
  (234, 'PowerBI'),
  (234, 'SQL'),
  (345, 'Python'),
  (345, 'Tableau'),
  (147, 'Java'),
  (147, 'PostgreSQL'),
  (147, 'Python'),
  (147, 'Tableau'); -- 123 and 147 qualify!
`;

export interface QueryResult {
  columns: string[];
  values: any[][];
  executionTimeMs: number;
  error?: string;
}

export async function initDatabase(): Promise<Database> {
  if (!SQLInstance) {
    SQLInstance = await initSqlJs({
      locateFile: () => `/sql-wasm.wasm`,
    });
  }

  const db = new SQLInstance.Database();
  db.run(SEED_SQL);
  currentDb = db;
  return db;
}

export async function getDatabase(): Promise<Database> {
  if (!currentDb) {
    return await initDatabase();
  }
  return currentDb;
}

export async function resetDatabase(): Promise<void> {
  if (currentDb) {
    currentDb.close();
    currentDb = null;
  }
  await initDatabase();
}

export async function executeQuery(sql: string): Promise<QueryResult> {
  const db = await getDatabase();
  const startTime = performance.now();

  try {
    const res = db.exec(sql);
    const executionTimeMs = +(performance.now() - startTime).toFixed(2);

    if (res.length === 0) {
      return {
        columns: [],
        values: [],
        executionTimeMs,
      };
    }

    return {
      columns: res[0].columns,
      values: res[0].values,
      executionTimeMs,
    };
  } catch (err: any) {
    const executionTimeMs = +(performance.now() - startTime).toFixed(2);
    return {
      columns: [],
      values: [],
      executionTimeMs,
      error: err?.message || String(err),
    };
  }
}

/**
 * Normalizes values for comparison (handles float tolerance, case-insensitivity, trim)
 */
export function normalizeValue(val: any): string {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'number') {
    return Number.isInteger(val) ? String(val) : val.toFixed(2);
  }
  return String(val).trim().toLowerCase();
}

/**
 * Validates user query output against expected query output
 */
export async function validateAnswer(
  userSql: string,
  expectedSql: string,
  enforceOrder = false
): Promise<{ passed: boolean; message: string; userResult?: QueryResult; expectedResult?: QueryResult }> {
  const userResult = await executeQuery(userSql);
  if (userResult.error) {
    return {
      passed: false,
      message: `SQL Error: ${userResult.error}`,
      userResult,
    };
  }

  const expectedResult = await executeQuery(expectedSql);

  // Compare row counts
  if (userResult.values.length !== expectedResult.values.length) {
    return {
      passed: false,
      message: `Row count mismatch. Expected ${expectedResult.values.length} rows, but got ${userResult.values.length} rows.`,
      userResult,
      expectedResult,
    };
  }

  // Compare column counts
  if (userResult.columns.length !== expectedResult.columns.length) {
    return {
      passed: false,
      message: `Column count mismatch. Expected ${expectedResult.columns.length} columns, but got ${userResult.columns.length}.`,
      userResult,
      expectedResult,
    };
  }

  if (enforceOrder) {
    for (let r = 0; r < expectedResult.values.length; r++) {
      for (let c = 0; c < expectedResult.columns.length; c++) {
        const userVal = normalizeValue(userResult.values[r][c]);
        const expVal = normalizeValue(expectedResult.values[r][c]);
        if (userVal !== expVal) {
          return {
            passed: false,
            message: `Value mismatch at row ${r + 1}, column ${userResult.columns[c]}. Expected "${expVal}", got "${userVal}".`,
            userResult,
            expectedResult,
          };
        }
      }
    }
  } else {
    // Sort rows for order-agnostic check
    const formatRow = (row: any[]) => row.map(normalizeValue).join('|||');
    const userRows = userResult.values.map(formatRow).sort();
    const expectedRows = expectedResult.values.map(formatRow).sort();

    for (let i = 0; i < expectedRows.length; i++) {
      if (userRows[i] !== expectedRows[i]) {
        return {
          passed: false,
          message: `Results do not match expected records. Double check your filters or calculations.`,
          userResult,
          expectedResult,
        };
      }
    }
  }

  return {
    passed: true,
    message: `Perfect! All ${expectedResult.values.length} records match the expected output.`,
    userResult,
    expectedResult,
  };
}
