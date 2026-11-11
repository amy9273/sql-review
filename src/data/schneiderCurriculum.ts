// Schneider Electric Data Engineering Internship: Master Curriculum & Interview Prep
// Auto-generated and structured for DE Academy

export interface SchneiderModule {
  id: string;
  number: number;
  title: string;
  description: string;
  iconName: string;
}

export interface SchneiderSection {
  title: string;
  body: string;
}

export interface SchneiderLesson {
  id: string;
  moduleId: string;
  number: number;
  title: string;
  subtitle: string;
  durationMinutes: number;
  sections: SchneiderSection[];
  keyTakeaways: string[];
}

export interface SituationalDrill {
  id: string;
  code: string;
  title: string;
  prompt: string;
  category: 'data_quality' | 'pipelines' | 'governance' | 'behavioral' | 'problem_solving';
  modelAnswer: string;
  sixStepBreakdown: {
    step: string;
    action: string;
  }[];
  keyPrinciples: string[];
}

export interface BehavioralPitch {
  id: string;
  question: string;
  recommendedPitch: string;
  whyThisWorks: string;
  talkingPoints: string[];
}

export interface RapidFlashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface QualityScenario {
  id: string;
  number: number;
  title: string;
  dimension: string;
  description: string;
  sampleData: {
    system: string;
    columns: string[];
    rows: (string | number | null)[][];
  }[];
  problemStatement: string;
  investigationSteps: string[];
  recommendedSql: string;
  interviewAnswer: string;
}

export interface SchneiderActivity {
  id: string;
  number: number;
  title: string;
  description: string;
  targetTable: string;
  starterSql: string;
  expectedSql: string;
  explanation: string;
}

export const SCHNEIDER_MODULES: SchneiderModule[] = [
  {
    "id": "schneider-mod-1",
    "number": 1,
    "title": "Data Engineering Foundations & Relational DBs",
    "description": "Core concepts of Data Engineering, ETL vs ELT, relational keys, normalization, ACID properties, and indexing.",
    "iconName": "Database"
  },
  {
    "id": "schneider-mod-2",
    "number": 2,
    "title": "Enterprise Architecture, Warehouses & MDM",
    "description": "Star schemas, OLTP vs OLAP, data migration, data harmonization, and Master Data Management (Golden Records).",
    "iconName": "Layers"
  },
  {
    "id": "schneider-mod-3",
    "number": 3,
    "title": "Data Quality, Integration & Troubleshooting",
    "description": "The 6 dimensions of data quality, rules and indicators, the 7 real enterprise scenarios, APIs, logs, and pipeline monitoring.",
    "iconName": "ShieldCheck"
  },
  {
    "id": "schneider-mod-4",
    "number": 4,
    "title": "Practical SQL Transformation & Technical Q&A",
    "description": "Interactive data cleaning SQL activities, deduplication queries, aggregate checks, and technical interview question bank.",
    "iconName": "Code2"
  },
  {
    "id": "schneider-mod-5",
    "number": 5,
    "title": "Situational Interview Mastery & Personal Pitch",
    "description": "The 6-step situational response framework, 8 real interview situations (A-H), personal pitch scripts, and mental cheat sheet.",
    "iconName": "Target"
  }
];

export const SCHNEIDER_LESSONS: SchneiderLesson[] = [
  {
    "id": "schneider-lesson-1",
    "moduleId": "schneider-mod-1",
    "number": 1,
    "title": "Understanding what Data Engineering actually is",
    "subtitle": "Understanding what Data Engineering actually is, ETL vs ELT, and the 5-stage workflow.",
    "durationMinutes": 20,
    "sections": [
      {
        "title": "1.1 What is Data Engineering?",
        "body": "Imagine Schneider Electric has different departments and systems:\n\n- Sales department: Stores customer purchases.\n- Finance department: Stores invoices and payments.\n- HR department: Stores employee information.\n- Supply chain: Stores supplier and inventory information.\n- Operations: Stores delivery and production information.\n\nEach system generates data independently.\n\nThe problem is that these systems might store information differently.\n\nFor example:\n\n| System | Customer name | Customer ID |\n|---|---|---|\n| Sales | ABC Corporation | C001 |\n| Finance | ABC Corp. | 001 |\n| Operations | ABC Corporation | C001 |\n\nAre these three different customers?\n\nNo. They might represent the same company, but their information is inconsistent.\n\nThis is where Data Engineering comes in.\n\n**Data Engineering is the process of collecting, integrating, cleaning, transforming, and organizing data so that it can be reliably used by other systems, reports, and applications.**"
      },
      {
        "title": "1.2 Data Engineering vs. Data Analytics",
        "body": "| Data Engineering | Data Analytics |\n|---|---|\n| Builds data pipelines | Analyzes available data |\n| Collects data from sources | Examines trends and patterns |\n| Cleans and transforms data | Interprets results |\n| Manages data integration | Creates reports and dashboards |\n| Maintains data infrastructure | Supports business decisions |\n\n**Example:**\n\nA company wants to know which products generated the highest revenue last month.\n\n- Data Engineer: Collects sales data, removes duplicates, validates transactions, and prepares the dataset.\n- Data Analyst: Uses the prepared dataset to calculate revenue and identify the best-performing products.\n\nThink of it this way:\n\n**Data Engineering prepares the ingredients. Data Analytics uses those ingredients to prepare the meal.**"
      },
      {
        "title": "1.3 What does a Data Engineer actually do?",
        "body": "A typical workflow looks like this:\n\n  \n    **1. Data Sources**\n\n    Databases, Excel files, APIs, business applications\n  \n  \n    \n  \n  \n    **2. Data Extraction**\n\n    Retrieve information from different sources\n  \n  \n    \n  \n  \n    **3. Data Transformation**\n\n    Clean, standardize, validate, and combine data\n  \n  \n    \n  \n  \n    **4. Data Loading**\n\n    Store processed information in a database or warehouse\n  \n  \n    \n  \n  \n    **5. Data Consumption**\n\n    Dashboards, reports, analytics, and business applications\n  \n\nThis process is commonly associated with ETL."
      },
      {
        "title": "1.4 ETL and ELT",
        "body": "These are two important concepts you should know.\n\n**ETL = Extract, Transform, Load**\n\n1. Extract: Get data from a source.\n2. Transform: Clean and modify the data.\n3. Load: Store the transformed data in the destination.\n\nExample:\n\nA company receives an Excel file containing customer information.\n\n- Extract: Read the Excel file.\n- Transform: Remove duplicates, standardize phone numbers, and correct date formats.\n- Load: Insert the cleaned records into PostgreSQL.\n\n**ELT = Extract, Load, Transform**\n\nThe difference is that raw data is loaded into the destination first. Transformations happen afterward, usually within the destination system.\n\n| ETL | ELT |\n|---|---|\n| Transform before loading | Load before transforming |\n| Data is cleaned before entering destination | Raw data is initially stored |\n| Useful for controlled processing | Useful for modern cloud data platforms |\n\nInterview question:\n\n**Q: What is the difference between ETL and ELT?**\n\nSample answer:\n\n\"ETL transforms data before loading it into the destination, while ELT loads the raw data first and performs transformations afterward. Both are used to integrate data, but they differ in where the transformation happens.\"\n\n---"
      }
    ],
    "keyTakeaways": [
      "Data Engineering prepares reliable datasets; Data Analytics interprets them for business insights.",
      "ETL cleans data before destination loading; ELT loads raw data first and transforms inside modern platforms.",
      "A core responsibility is ensuring consistent, clean information across disparate enterprise systems."
    ]
  },
  {
    "id": "schneider-lesson-2",
    "moduleId": "schneider-mod-1",
    "number": 2,
    "title": "Database foundations",
    "subtitle": "Keys, 1:1 / 1:N / N:N relationships, SQL aggregation, and JOIN orphan detection.",
    "durationMinutes": 20,
    "sections": [
      {
        "title": "Overview",
        "body": "This is one of the most important sections because SQL and relational databases are fundamental to data engineering."
      },
      {
        "title": "2.1 What is a database?",
        "body": "A database is an organized collection of information that can be stored, retrieved, updated, and managed.\n\nFor example, an online store might have:\n\n- Customers\n- Products\n- Orders\n- Payments\n- Suppliers\n\nEach category can be stored in a separate table."
      },
      {
        "title": "2.2 Understanding tables, rows, and columns",
        "body": "Consider a customer table:\n\n**customers**\n\n| customer_id | customer_name | city |\n|---|---|---|\n| 101 | John Santos | Manila |\n| 102 | Maria Cruz | Lipa |\n| 103 | Mark Reyes | Batangas |\n\n- Table: The entire collection of customer records.\n- Row: One individual customer.\n- Column: A particular attribute, such as customer_name.\n- Record: Another term for a row.\n- Field: A particular value within a record."
      },
      {
        "title": "2.3 Primary keys and foreign keys",
        "body": "These are extremely important.\n\n**Primary Key (PK)**\n\nA primary key uniquely identifies each record in a table.\n\nExample:\n\n| customer_id (PK) | customer_name |\n|---|---|\n| 101 | John Santos |\n| 102 | Maria Cruz |\n| 103 | Mark Reyes |\n\nYou cannot have two customer records with the same primary key.\n\n**Foreign Key (FK)**\n\nA foreign key references a primary key in another table.\n\nImagine these two tables:\n\nCustomers:\n\n| customer_id (PK) | customer_name |\n|---|---|\n| 101 | John Santos |\n| 102 | Maria Cruz |\n\nOrders:\n\n| order_id (PK) | customer_id (FK) | amount |\n|---|---|---:|\n| 5001 | 101 | 1500 |\n| 5002 | 102 | 2500 |\n| 5003 | 101 | 800 |\n\nThe `customer_id` in Orders references the `customer_id` in Customers.\n\nThis allows the database to associate orders with their respective customers.\n\n  **How the relationship works**\n  \n    \n      \n        **Customers**\n\n        Primary key\n        - 101\n        - 102\n      \n    \n    \n      \n        **Orders**\n\n        Foreign key\n        - 101\n        - 102\n        - 101\n      \n    \n  \n  One customer can have multiple orders. This is a one-to-many relationship.\n\nInterview question:\n\n**Q: What is the difference between a primary key and a foreign key?**\n\n\"A primary key uniquely identifies a record within a table. A foreign key establishes a relationship between tables by referencing a key in another table.\""
      },
      {
        "title": "2.4 Types of relationships",
        "body": "| Relationship | Meaning | Example |\n|---|---|---|\n| One-to-one | One record relates to one record | Employee and employee profile |\n| One-to-many | One record relates to multiple records | Customer and orders |\n| Many-to-many | Multiple records relate to multiple records | Students and courses |\n\nFor many-to-many relationships, databases commonly use a junction table.\n\nFor example:\n\n- Students\n- Courses\n- Student_Courses"
      },
      {
        "title": "2.5 SQL foundations",
        "body": "SQL stands for Structured Query Language.\n\nIt is used to communicate with relational databases.\n\nYou should be comfortable with these commands:\n\n| Command | Purpose |\n|---|---|\n| SELECT | Retrieve data |\n| FROM | Specify the table |\n| WHERE | Filter records |\n| ORDER BY | Sort records |\n| GROUP BY | Group records |\n| HAVING | Filter grouped results |\n| DISTINCT | Remove duplicate results |\n| INSERT | Add records |\n| UPDATE | Modify records |\n| DELETE | Remove records |\n| JOIN | Combine tables |\n\n### Example database\n\nImagine you have this table:\n\n**employees**\n\n| employee_id | name | department | salary |\n|---|---|---|---:|\n| 1 | John | IT | 30000 |\n| 2 | Maria | HR | 25000 |\n| 3 | Mark | IT | 35000 |\n| 4 | Anna | Finance | 28000 |\n| 5 | James | IT | 32000 |\n\n**A. SELECT**\n\nGet all employees.\n\n```sql\nSELECT *\nFROM employees;\n```\n\n**B. WHERE**\n\nGet employees working in IT.\n\n```sql\nSELECT *\nFROM employees\nWHERE department = 'IT';\n```\n\n**C. ORDER BY**\n\nSort employees by salary, highest first.\n\n```sql\nSELECT *\nFROM employees\nORDER BY salary DESC;\n```\n\n**D. DISTINCT**\n\nGet unique department names.\n\n```sql\nSELECT DISTINCT department\nFROM employees;\n```\n\n**E. COUNT**\n\nCount the number of employees.\n\n```sql\nSELECT COUNT(*)\nFROM employees;\n```\n\n**F. GROUP BY**\n\nCount employees per department.\n\n```sql\nSELECT\n    department,\n    COUNT(*) AS employee_count\nFROM employees\nGROUP BY department;\n```\n\nExpected result:\n\n| department | employee_count |\n|---|---:|\n| Finance | 1 |\n| HR | 1 |\n| IT | 3 |\n\n**G. HAVING**\n\nFind departments with more than one employee.\n\n```sql\nSELECT\n    department,\n    COUNT(*) AS employee_count\nFROM employees\nGROUP BY department\nHAVING COUNT(*) > 1;\n```\n\nRemember:\n\n- WHERE filters individual rows.\n- HAVING filters grouped results."
      },
      {
        "title": "2.6 SQL JOINs",
        "body": "JOINs are essential when data is distributed across multiple tables.\n\nImagine:\n\nCustomers:\n\n| customer_id | customer_name |\n|---|---|\n| 1 | John |\n| 2 | Maria |\n| 3 | Mark |\n\nOrders:\n\n| order_id | customer_id | amount |\n|---|---|---:|\n| 101 | 1 | 1500 |\n| 102 | 1 | 2000 |\n| 103 | 2 | 3000 |\n\n**INNER JOIN**\n\nReturns only matching records.\n\n```sql\nSELECT\n    customers.customer_name,\n    orders.amount\nFROM customers\nINNER JOIN orders\n    ON customers.customer_id = orders.customer_id;\n```\n\n**LEFT JOIN**\n\nReturns every customer, even if they have no orders.\n\n```sql\nSELECT\n    customers.customer_name,\n    orders.amount\nFROM customers\nLEFT JOIN orders\n    ON customers.customer_id = orders.customer_id;\n```\n\nMark will still appear, but his order amount will be NULL.\n\n**Other JOINs**\n\n| JOIN | Meaning |\n|---|---|\n| INNER JOIN | Matching records from both tables |\n| LEFT JOIN | All left records + matching right records |\n| RIGHT JOIN | All right records + matching left records |\n| FULL OUTER JOIN | All records from both sides, matched where possible |\n\nOne important data-quality use of LEFT JOIN:\n\nFind customers who have no orders.\n\n```sql\nSELECT\n    c.customer_id,\n    c.customer_name\nFROM customers c\nLEFT JOIN orders o\n    ON c.customer_id = o.customer_id\nWHERE o.order_id IS NULL;\n```\n\nThis is a practical example of using SQL to investigate incomplete or missing relationships.\n\n---"
      }
    ],
    "keyTakeaways": [
      "Primary keys guarantee unique records; foreign keys enforce relational consistency.",
      "LEFT JOIN with 'WHERE right.key IS NULL' is the primary tool to detect missing or orphaned relationships.",
      "WHERE filters rows before aggregation; HAVING filters aggregated groups."
    ]
  },
  {
    "id": "schneider-lesson-3",
    "moduleId": "schneider-mod-1",
    "number": 3,
    "title": "Database concepts beyond basic SQL",
    "subtitle": "Database normalization (1NF-3NF), transactions, ACID properties, and indexing tradeoffs.",
    "durationMinutes": 20,
    "sections": [
      {
        "title": "3.1 What is normalization?",
        "body": "Normalization is the process of organizing database tables to reduce unnecessary duplication and improve data integrity.\n\nConsider a poorly designed table:\n\n| order_id | customer_name | customer_city | product |\n|---|---|---|---|\n| 101 | John | Manila | Laptop |\n| 102 | John | Manila | Mouse |\n| 103 | Maria | Lipa | Keyboard |\n\nJohn's information is repeated.\n\nInstead, separate customers and orders.\n\nCustomers:\n\n| customer_id | customer_name | city |\n|---|---|---|\n| 1 | John | Manila |\n| 2 | Maria | Lipa |\n\nOrders:\n\n| order_id | customer_id | product |\n|---|---|---|\n| 101 | 1 | Laptop |\n| 102 | 1 | Mouse |\n| 103 | 2 | Keyboard |\n\nNow, John's information is stored once.\n\nThree common normal forms:\n\n- 1NF: Each field should contain a single, atomic value.\n- 2NF: Meet 1NF and remove partial dependencies on a composite key.\n- 3NF: Meet 2NF and remove transitive dependencies of non-key attributes.\n\nFor an internship interview, understand the purpose of normalization rather than memorizing every formal rule."
      },
      {
        "title": "3.2 What is a database transaction?",
        "body": "A transaction is a group of database operations treated as one logical unit.\n\nImagine transferring \u20b11,000 from Account A to Account B.\n\nTwo operations must happen:\n\n1. Subtract \u20b11,000 from Account A.\n2. Add \u20b11,000 to Account B.\n\nIf the first operation succeeds but the second fails, the account balances become incorrect.\n\nTransactions help prevent this.\n\n```sql\nBEGIN;\n\nUPDATE accounts\nSET balance = balance - 1000\nWHERE account_id = 1;\n\nUPDATE accounts\nSET balance = balance + 1000\nWHERE account_id = 2;\n\nCOMMIT;\n```\n\nIf something goes wrong, the transaction can be rolled back instead of leaving a partially completed transfer."
      },
      {
        "title": "3.3 ACID properties",
        "body": "| Property | Meaning |\n|---|---|\n| Atomicity | All operations succeed or none do |\n| Consistency | Data remains valid according to defined rules |\n| Isolation | Concurrent transactions do not improperly interfere |\n| Durability | Committed changes are persisted |\n\nInterview question:\n\n**Q: What is ACID in databases?**\n\n\"ACID refers to Atomicity, Consistency, Isolation, and Durability. These properties help ensure that database transactions are reliable and maintain data integrity.\""
      },
      {
        "title": "3.4 What are indexes?",
        "body": "An index helps a database find records more efficiently.\n\nImagine a book with 1,000 pages.\n\nWithout an index, you might need to search page by page to find a topic.\n\nWith an index, you can locate the relevant page much faster.\n\nDatabase example:\n\n```sql\nCREATE INDEX idx_employee_department\nON employees(department);\n```\n\nNow queries filtering by department may execute faster.\n\nHowever, indexes also require storage and can slow down INSERT, UPDATE, and DELETE operations because indexes need maintenance."
      },
      {
        "title": "3.5 SQL vs. NoSQL",
        "body": "| SQL databases | NoSQL databases |\n|---|---|\n| Relational structure | Non-relational or flexible data models |\n| Tables, rows, columns | Documents, key-value pairs, graphs, etc. |\n| Often uses predefined schemas | Often supports flexible schemas |\n| Supports relationships and joins | Relationships are handled differently |\n| PostgreSQL, MySQL | MongoDB, Redis, Firestore |\n\nYour existing PostgreSQL experience is relevant here.\n\n---\n\n---"
      }
    ],
    "keyTakeaways": [
      "Normalization (1NF-3NF) eliminates data redundancy and prevents update anomalies.",
      "Transactions use BEGIN, COMMIT, and ROLLBACK to guarantee ACID atomicity.",
      "Indexes accelerate query lookups but introduce storage and write-overhead."
    ]
  },
  {
    "id": "schneider-lesson-4",
    "moduleId": "schneider-mod-2",
    "number": 4,
    "title": "Data Engineering concepts directly related to the job description",
    "subtitle": "Pipelines, OLTP vs OLAP, data warehouses, fact vs dimension tables, and star schema.",
    "durationMinutes": 20,
    "sections": [
      {
        "title": "Overview",
        "body": "This is where your preparation becomes more specific to Schneider Electric."
      },
      {
        "title": "4.1 What is a data pipeline?",
        "body": "A data pipeline is a sequence of processes that transfers data from one or more sources to a destination.\n\nExample:\n\nA company has three systems:\n\n- Sales system\n- Inventory system\n- Finance system\n\nThe company wants to combine their information into one centralized database.\n\nThe data pipeline might:\n\n1. Retrieve sales records.\n2. Retrieve inventory records.\n3. Retrieve financial records.\n4. Standardize their formats.\n5. Validate the records.\n6. Combine related information.\n7. Load everything into a data warehouse.\n\n**Important terms:**\n\n| Term | Meaning |\n|---|---|\n| Source | Where the data originates |\n| Destination | Where the data is sent |\n| Pipeline | The sequence of data-processing steps |\n| Transformation | Modifying data into the required format |\n| Validation | Checking whether data meets requirements |\n| Scheduling | Determining when a pipeline runs |\n| Monitoring | Checking whether a pipeline works correctly |"
      },
      {
        "title": "4.2 What is a data warehouse?",
        "body": "A data warehouse is a centralized repository that stores integrated data from different sources, primarily for reporting and analysis.\n\nExample:\n\nA multinational company might have sales data from the Philippines, Japan, Singapore, and the United States.\n\nInstead of analyzing each country's system separately, the company integrates the information into a data warehouse.\n\nThis allows management to compare:\n\n- Regional sales performance.\n- Product demand.\n- Customer activity.\n- Revenue trends.\n- Operational efficiency.\n\n### Database vs. Data Warehouse\n\n| Database | Data Warehouse |\n|---|---|\n| Supports daily operations | Supports analysis and reporting |\n| Frequent inserts and updates | Primarily optimized for analytical queries |\n| Stores operational records | Integrates historical and current data |\n| Example: Order management | Example: Global sales reporting |\n\nA useful distinction:\n\n- OLTP: Online Transaction Processing. Handles everyday transactions.\n- OLAP: Online Analytical Processing. Supports complex analysis and reporting.\n\nFor example, recording a customer purchase is OLTP. Analyzing five years of regional sales is OLAP."
      },
      {
        "title": "4.3 What are fact tables and dimension tables?",
        "body": "This is related to dimensional modeling, which is commonly used in data warehouses.\n\nImagine a company wants to analyze its sales.\n\n**Fact table:**\n\nStores measurable business events.\n\n| sale_id | customer_id | product_id | date_id | revenue |\n|---|---|---|---|---:|\n| 1 | 101 | 201 | 20260101 | 5000 |\n| 2 | 102 | 202 | 20260102 | 3000 |\n| 3 | 101 | 203 | 20260103 | 2000 |\n\n**Dimension tables:**\n\nStore descriptive information.\n\nCustomer dimension:\n\n| customer_id | customer_name | region |\n|---|---|---|\n| 101 | John | Philippines |\n| 102 | Maria | Singapore |\n\nProduct dimension:\n\n| product_id | product_name | category |\n|---|---|---|\n| 201 | Laptop | Electronics |\n| 202 | Monitor | Electronics |\n| 203 | Keyboard | Accessories |\n\nDate dimension:\n\n| date_id | date | month | year |\n|---|---|---|---|\n| 20260101 | Jan 1 | January | 2026 |\n| 20260102 | Jan 2 | January | 2026 |\n\n**Remember:**\n\n- Fact = What happened? How much? How many?\n- Dimension = Who? What? Where? When?\n\n### Star schema\n\nA star schema is a data warehouse design where a central fact table connects to multiple dimension tables.\n\n  \n    \n      **Customer Dimension**\n      Customer ID, name, region\n    \n    \n  \n  \n    \n      \n        **Date Dimension**\n        Date, month, year\n      \n    \n    \n      \n        **Product Dimension**\n        Product, category\n      \n    \n  \n  \n    \n    \n      **Sales Fact Table**\n      Sales ID, foreign keys, revenue, quantity\n    \n  \n\nYou actually have some familiarity with this concept from your previous SQL and SQLite warehouse work. That is a useful example to draw on if the interviewer asks about database modeling."
      },
      {
        "title": "4.4 What is data migration?",
        "body": "This appears directly in the Schneider Electric job description.\n\nData migration is the process of transferring data from one system, database, or platform to another.\n\nExample:\n\nA company currently uses an old customer management system and wants to migrate to a new platform.\n\nOld system:\n\n| Customer No. | Full Name | Birth Date |\n|---|---|---|\n| 001 | John Santos | 01/05/1998 |\n| 002 | Maria Cruz | 1999-08-10 |\n\nNew system:\n\n| customer_id | first_name | last_name | birth_date |\n|---|---|---|---|\n| 1 | John | Santos | 1998-05-01 |\n| 2 | Maria | Cruz | 1999-08-10 |\n\nNotice that the structure changed.\n\nThe migration process must ensure that:\n\n- All required records are transferred.\n- The information is mapped correctly.\n- Data formats are standardized.\n- Duplicate records are handled.\n- No important information is lost.\n- The migrated records are validated.\n\n### Five steps of data migration\n\n1. **Assessment:** Understand the old and new systems.\n2. **Mapping:** Identify which old fields correspond to new fields.\n3. **Transformation:** Convert the data into the new format.\n4. **Loading:** Insert the transformed data into the new system.\n5. **Validation:** Compare the old and new records to ensure correctness.\n\nInterview question:\n\n**Q: How would you ensure a successful data migration?**\n\nSample answer:\n\n\"I would first understand the structure of the source and destination systems. Then I would map the corresponding fields, identify possible inconsistencies, and transform the data according to the destination requirements. After migration, I would validate record counts, check for missing or duplicate records, and compare important values between the two systems.\""
      },
      {
        "title": "4.5 What is data harmonization?",
        "body": "This is another important term from the job description.\n\nData harmonization means making data from different systems consistent so that it can be combined and understood correctly.\n\nExample:\n\nThree countries have different ways of recording customer information.\n\n| Country | Stored value |\n|---|---|\n| Philippines | PH |\n| Japan | JP |\n| Singapore | SG |\n\nYou establish a standard country-code format.\n\nAnother example:\n\n| System A | System B | Standardized value |\n|---|---|---|\n| Active | A | ACTIVE |\n| Inactive | I | INACTIVE |\n| Pending | P | PENDING |\n\nThe goal is to establish consistent values across systems.\n\n**Data migration vs. data harmonization**\n\n- Migration: Moving data between systems.\n- Harmonization: Making data consistent across systems.\n\nYou can perform both during the same transformation project."
      },
      {
        "title": "4.6 What is Master Data Management (MDM)?",
        "body": "**[Very relevant to this role]**\n\nMaster Data Management is the practice of maintaining consistent, reliable, and authoritative records for important business entities.\n\nCommon master data includes:\n\n- Customers\n- Suppliers\n- Products\n- Employees\n- Locations\n- Business units\n\nImagine Schneider Electric has multiple systems containing supplier information.\n\n| System | Supplier |\n|---|---|\n| Procurement | ABC Industrial Supplies |\n| Finance | ABC Industrial Supply |\n| Inventory | ABC Supplies |\n\nThe company needs to determine whether these are the same supplier.\n\nMDM helps establish a trusted, standardized supplier record that can be referenced by different systems.\n\n### What is a golden record?\n\nA golden record is the trusted, consolidated version of an entity's information.\n\nExample:\n\n  **Records from different systems**\n  \n    Procurement: ABC Industrial Supplies\n  \n  \n    Finance: ABC Industrial Supply\n  \n  \n    Inventory: ABC Supplies\n  \n  \n    \n    Matching, verification, and consolidation\n  \n  \n    \n      **Golden Record**\n      \n      **[Verified]**\n    \n    ABC Industrial Supplies\n\n    One trusted supplier record, with a standardized name and unique identifier.\n  \n\nAn important distinction: You should not automatically merge records just because their names look similar. You need to verify that they represent the same entity.\n\nInterview question:\n\n**Q: What is Master Data Management?**\n\n\"Master Data Management is a practice used to maintain consistent and reliable information about important business entities, such as customers, suppliers, and products, across different systems. Its purpose is to establish trusted records and reduce inconsistencies.\"\n\n---"
      }
    ],
    "keyTakeaways": [
      "Data warehouses centralize analytical reporting; transactional DBs support daily OLTP operations.",
      "Fact tables record numerical measurements; dimension tables provide descriptive context.",
      "Star schemas place the central fact table in the middle surrounded by radial dimensions."
    ]
  },
  {
    "id": "schneider-lesson-5",
    "moduleId": "schneider-mod-2",
    "number": 5,
    "title": "Data quality: The heart of this internship",
    "subtitle": "The 5 steps of data migration, data harmonization, MDM, and creating golden records.",
    "durationMinutes": 20,
    "sections": [
      {
        "title": "Overview",
        "body": "This is probably one of the most important subjects to understand for your interview."
      },
      {
        "title": "5.1 What is data quality?",
        "body": "Data quality refers to how suitable and reliable data is for its intended purpose.\n\nThere are six important dimensions.\n\n| Dimension | Meaning | Example of a problem |\n|---|---|---|\n| Accuracy | Is the information correct? | Incorrect customer address |\n| Completeness | Are required fields present? | Missing supplier ID |\n| Consistency | Does information agree across systems? | Different customer names |\n| Validity | Does data follow defined rules? | Invalid email format |\n| Uniqueness | Are records free from unintended duplicates? | Same customer recorded twice |\n| Timeliness | Is information updated when needed? | Yesterday's sales data missing |\n\nMemorize these six dimensions.\n\n### How to understand the difference\n\nSuppose a supplier's phone number is `12345`.\n\n- Accuracy: Is `12345` actually their phone number?\n- Completeness: Is the phone number provided?\n- Consistency: Does the same phone number appear in other systems?\n- Validity: Does it follow the required phone-number format?\n- Uniqueness: Is the supplier accidentally registered multiple times?\n- Timeliness: Is this still the supplier's current phone number?\n\nNotice that these are different questions."
      },
      {
        "title": "5.2 What are data quality rules?",
        "body": "Data quality rules are conditions that data must satisfy to be considered acceptable.\n\nExamples:\n\n| Field | Rule |\n|---|---|\n| Customer ID | Must be unique |\n| Email | Must follow valid email format |\n| Phone number | Must follow approved format |\n| Product price | Must not be negative |\n| Transaction date | Must be a valid date |\n| Supplier name | Cannot be empty |\n| Country code | Must use an approved code |\n\nYou can implement these rules using SQL.\n\nExample: Find records with missing customer names.\n\n```sql\nSELECT *\nFROM customers\nWHERE customer_name IS NULL\n   OR TRIM(customer_name) = '';\n```\n\nFind duplicate customer IDs:\n\n```sql\nSELECT\n    customer_id,\n    COUNT(*) AS total\nFROM customers\nGROUP BY customer_id\nHAVING COUNT(*) > 1;\n```\n\nFind negative product prices:\n\n```sql\nSELECT *\nFROM products\nWHERE price < 0;\n```\n\nFind invalid or missing email addresses using a basic pattern:\n\n```sql\nSELECT *\nFROM customers\nWHERE email IS NULL\n   OR email NOT LIKE '%_@_%._%';\n```\n\nThis is a simplified validation example, not a complete email validator."
      },
      {
        "title": "5.3 What are data quality indicators?",
        "body": "Data quality indicators are measurements used to evaluate the quality of a dataset.\n\nFor example:\n\n| Indicator | Result |\n|---|---:|\n| Total records | 10,000 |\n| Complete records | 9,500 |\n| Duplicate records | 100 |\n| Invalid records | 50 |\n| Records passing validation | 95% |\n\nA simple completeness calculation:\n\n\\[\n\\text{Completeness} =\n\\frac{\\text{Complete records}}{\\text{Total records}}\n\\times 100\n\\]\n\nExample:\n\n\\[\n\\frac{9500}{10000}\\times100=95\\%\n\\]\n\nThis tells you that 95% of the records meet the completeness requirement being measured.\n\nA company could monitor this percentage daily or weekly."
      },
      {
        "title": "5.4 Understanding your original seven scenarios",
        "body": "Now let's properly break down the situations in your reviewer.\n\n### Scenario 1: Duplicate customer records\n\n**[Data quality + MDM]**\n\nSuppose you find:\n\n| customer_id | name | email |\n|---|---|---|\n| 101 | John Santos | john@email.com |\n| 102 | John Santos | john@email.com |\n| 103 | Maria Cruz | maria@email.com |\n\nProblem: John appears twice.\n\nWhat do you do?\n\n1. Identify potential duplicates.\n2. Compare identifiers such as email, customer ID, phone number, and address.\n3. Determine whether the records genuinely represent the same customer.\n4. Identify which record should be retained as the master record.\n5. Consolidate or merge records according to company policy.\n6. Validate that no important transactions or relationships were lost.\n\nSQL:\n\n```sql\nSELECT\n    email,\n    COUNT(*) AS total\nFROM customers\nGROUP BY email\nHAVING COUNT(*) > 1;\n```\n\n**Interview answer:**\n\n\"I would first identify potential duplicate records using unique identifiers or matching fields such as email addresses. I would then verify whether they represent the same customer before consolidating them. I would also check related records and validate that the consolidation did not result in data loss.\"\n\nImportant: Don't immediately delete duplicates. One customer record might have orders, invoices, or other relationships attached to it.\n\n### Scenario 2: Missing supplier information\n\n**[Completeness]**\n\nExample:\n\n| supplier_id | supplier_name | contact_email |\n|---|---|---|\n| 001 | ABC Supplies | abc@email.com |\n| 002 | XYZ Trading | NULL |\n| 003 | Global Parts | global@email.com |\n\nProblem: Supplier 002 has no contact email.\n\nWhat do you do?\n\n1. Identify the missing field.\n2. Determine whether the field is mandatory.\n3. Check whether the information exists in another authorized system or source.\n4. If available, verify and update it.\n5. If unavailable, flag the record for follow-up rather than inventing a value.\n6. Validate the corrected record.\n\n**Interview answer:**\n\n\"I would identify which records have missing information and determine whether the missing field is required. I would check the available source systems for the correct information. If it cannot be verified, I would flag the record for follow-up rather than inserting an assumed value.\"\n\n### Scenario 3: Different date formats\n\n**[Standardization]**\n\nExample:\n\n| Original value |\n|---|\n| 11/10/2026 |\n| 2026-11-10 |\n| Nov 10, 2026 |\n| 10-Nov-2026 |\n\nProblem: Different formats make processing and comparisons difficult.\n\nSolution: Standardize dates into a consistent format, such as ISO 8601.\n\n`YYYY-MM-DD`\n\nResult:\n\n| Standardized value |\n|---|\n| 2026-11-10 |\n| 2026-11-10 |\n| 2026-11-10 |\n| 2026-11-10 |\n\nHowever, there is an important issue.\n\n`01/05/2026` could mean January 5 or May 1, depending on the original format.\n\nYou must identify the source's date convention before converting it.\n\n**Interview answer:**\n\n\"I would first identify the original date formats and understand their conventions. Then I would convert them into an agreed standard format, such as YYYY-MM-DD. I would also validate the converted dates to avoid incorrect interpretations.\"\n\n### Scenario 4: Inconsistent product names\n\n**[Data harmonization]**\n\nExample:\n\n| System | Product |\n|---|---|\n| Sales | Schneider Circuit Breaker |\n| Inventory | Schneider CB |\n| Procurement | Circuit Breaker - Schneider |\n\nProblem: The same product might have different names.\n\nSolution:\n\n1. Identify possible matches.\n2. Compare product IDs, descriptions, specifications, and other identifiers.\n3. Establish standardized naming conventions.\n4. Create mappings between old names and standard names.\n5. Validate the results.\n\nA product catalog might establish:\n\n`SCH-CB-001 = Schneider Circuit Breaker`\n\n**Interview answer:**\n\n\"I would identify inconsistent product names and compare their identifiers and descriptions to determine which records refer to the same product. I would then follow the established naming convention and maintain a mapping between the original and standardized values.\"\n\n### Scenario 5: Incorrect sales figures\n\n**[Reconciliation + investigation]**\n\nExample:\n\n| System | Total sales |\n|---|---:|\n| Sales system | \u20b1500,000 |\n| Finance system | \u20b1470,000 |\n\nProblem: The totals differ by \u20b130,000.\n\nDon't immediately assume one system is wrong.\n\nInvestigate:\n\n- Are both systems using the same reporting period?\n- Are canceled orders included?\n- Are returns deducted?\n- Are duplicate transactions present?\n- Are some transactions missing?\n- Are currencies or exchange rates different?\n- Are taxes included in one total but excluded in the other?\n\nSQL example:\n\n```sql\nSELECT\n    SUM(amount) AS total_sales\nFROM transactions\nWHERE status = 'COMPLETED';\n```\n\n**Interview answer:**\n\n\"I would first identify the scope of the discrepancy and compare the reporting periods and calculation rules used by both systems. Then I would examine individual transactions to determine whether there are missing, duplicated, or incorrectly processed records. Once I identify the cause, I would coordinate the correction and validate the updated totals.\"\n\n### Scenario 6: Missing transactions\n\n**[Data pipeline troubleshooting]**\n\nExample:\n\nA sales system shows 1,000 transactions, but the reporting database only contains 950.\n\nProblem: Fifty transactions are missing.\n\nPossible causes:\n\n- The data extraction process failed.\n- Some records failed validation.\n- The database connection was interrupted.\n- A transformation incorrectly filtered records.\n- The loading process stopped halfway.\n- Some records were rejected due to constraint violations.\n\nWhat do you do?\n\n1. Compare source and destination record counts.\n2. Check pipeline execution logs.\n3. Identify the last successfully processed record or batch.\n4. Inspect rejected records and error messages.\n5. Determine whether the missing records can safely be reprocessed.\n6. Reprocess and validate the final counts.\n\n**Interview answer:**\n\n\"I would compare the source and destination records to identify the missing transactions. Then I would check the pipeline logs and processing steps to determine whether the issue occurred during extraction, transformation, or loading. After identifying the cause, I would reprocess the affected records and validate that the destination matches the expected data.\"\n\n### Scenario 7: Different values across systems\n\n**[Data governance + MDM]**\n\nExample:\n\n| System | Supplier status |\n|---|---|\n| Procurement | Active |\n| Finance | Inactive |\n| Inventory | Active |\n\nProblem: The same supplier has conflicting statuses.\n\nWhat do you do?\n\n1. Identify the conflicting values.\n2. Determine which system is designated as the authoritative source for supplier status.\n3. Check the last updated timestamps.\n4. Review the organization's data ownership and governance rules.\n5. Coordinate with the responsible data owner.\n6. Correct or synchronize the information where appropriate.\n\n**Interview answer:**\n\n\"I would identify the conflicting values and determine which system is considered the authoritative source for that particular information. I would also check when the records were last updated and coordinate with the responsible data owner before making changes. Then I would validate that the systems are aligned.\"\n\n**Important concept: A system can be authoritative for one type of data but not another.**\n\nFor example, Finance might own payment status, while Procurement owns supplier approval status.\n\n---"
      }
    ],
    "keyTakeaways": [
      "Migration moves data between systems; harmonization standardizes values across systems.",
      "The 5 migration steps: Assessment, Mapping, Transformation, Loading, and Validation.",
      "Master Data Management creates a single trusted Golden Record for customers, suppliers, and parts."
    ]
  },
  {
    "id": "schneider-lesson-6",
    "moduleId": "schneider-mod-3",
    "number": 6,
    "title": "Data integration and troubleshooting",
    "subtitle": "The 6 dimensions of data quality, business rules, and completeness calculations.",
    "durationMinutes": 20,
    "sections": [
      {
        "title": "Overview",
        "body": "This is another major responsibility mentioned in the job description."
      },
      {
        "title": "6.1 What is data integration?",
        "body": "Data integration is the process of combining data from multiple sources into a unified view or destination.\n\nExample:\n\nA company wants to combine:\n\n- Customer information from CRM.\n- Orders from an e-commerce platform.\n- Payments from a financial system.\n\nThe goal is to produce one reliable dataset that connects customers, orders, and payments."
      },
      {
        "title": "6.2 What is an API?",
        "body": "API stands for Application Programming Interface.\n\nAn API allows different applications or systems to communicate and exchange information.\n\nExample:\n\nAn inventory application requests product information from another system.\n\n```http\nGET /api/products\n```\n\nThe system might return:\n\n```json\n{\n  \"product_id\": 101,\n  \"product_name\": \"Circuit Breaker\",\n  \"quantity\": 50\n}\n```\n\nCommon HTTP methods:\n\n| Method | Purpose |\n|---|---|\n| GET | Retrieve information |\n| POST | Create or submit information |\n| PUT | Replace/update a resource |\n| PATCH | Partially update a resource |\n| DELETE | Remove a resource |\n\nCommon HTTP status codes:\n\n| Code | Meaning |\n|---|---|\n| 200 | Successful request |\n| 201 | Resource created |\n| 400 | Bad request |\n| 401 | Unauthorized |\n| 403 | Forbidden |\n| 404 | Resource not found |\n| 500 | Internal server error |\n| 503 | Service unavailable |\n\nYou already have backend development experience with APIs, so this is an area where you can connect your existing knowledge to data integration."
      },
      {
        "title": "6.3 What happens when a data pipeline fails?",
        "body": "Imagine a pipeline that runs every midnight.\n\nIt normally:\n\n1. Extracts transactions.\n2. Transforms the data.\n3. Loads the results into a warehouse.\n\nOne morning, the dashboard shows no new transactions.\n\nYou should not immediately start changing code.\n\nInvestigate systematically:\n\n| Step | What to check |\n|---|---|\n| 1. Identify | When did the pipeline last succeed? |\n| 2. Extract | Is the source system accessible? |\n| 3. Transform | Are there invalid values or unexpected formats? |\n| 4. Load | Is the destination database available? |\n| 5. Logs | What error messages were recorded? |\n| 6. Recovery | Can the failed batch be safely reprocessed? |\n| 7. Validation | Did all expected records arrive? |"
      },
      {
        "title": "6.4 What are logs?",
        "body": "Logs are records of events that happen during an application's execution.\n\nExample:\n\n```text\n00:00:01 - Pipeline started\n00:00:05 - Extracted 1000 records\n00:00:08 - Transformation started\n00:00:12 - 50 records rejected\n00:00:15 - Database connection failed\n00:00:15 - Pipeline terminated\n```\n\nFrom these logs, you can identify where the problem happened."
      },
      {
        "title": "6.5 What is monitoring and alerting?",
        "body": "**Monitoring** means continuously checking whether a system or process is operating correctly.\n\n**Alerting** means notifying responsible people when something requires attention.\n\nExamples:\n\n| Condition | Possible alert |\n|---|---|\n| Pipeline fails | Send failure notification |\n| No new records received | Flag missing data |\n| Duplicate rate increases | Notify data quality team |\n| Processing takes too long | Alert operations team |\n| Database connection fails | Notify technical support |\n\nThe goal is to detect issues before they affect business operations."
      },
      {
        "title": "6.6 What is automation?",
        "body": "Automation means using technology to perform repetitive tasks with minimal manual intervention.\n\nExample:\n\nA company receives a supplier Excel file every day.\n\nWithout automation:\n\n1. An employee downloads the file.\n2. Opens it manually.\n3. Checks missing fields.\n4. Removes duplicates.\n5. Copies the records into another system.\n\nWith automation:\n\n1. A scheduled process retrieves the file.\n2. A script validates the records.\n3. Valid records are processed automatically.\n4. Invalid records are placed in an exception report.\n5. The process sends a notification.\n\nAutomation improves:\n\n- Efficiency.\n- Consistency.\n- Processing speed.\n- Error detection.\n- Productivity.\n\nA practical example from your own experience is your UiPath appointment-scheduling project. You can explain how automating repetitive administrative tasks relates to the automation responsibility in this job.\n\n---"
      }
    ],
    "keyTakeaways": [
      "Memorize the 6 DQ dimensions: Accuracy, Completeness, Consistency, Validity, Uniqueness, Timeliness.",
      "Data quality rules translate business requirements into enforceable SQL and pipeline constraints.",
      "Monitor data quality indicators over time to spot data pipeline regressions early."
    ]
  },
  {
    "id": "schneider-lesson-7",
    "moduleId": "schneider-mod-3",
    "number": 7,
    "title": "Data transformation and practical SQL activities",
    "subtitle": "Deep-dive analysis of duplicates, missing suppliers, date formats, and conflicting systems.",
    "durationMinutes": 20,
    "sections": [
      {
        "title": "Overview",
        "body": "Now let's connect the concepts to actual SQL work.\n\nImagine the following table:\n\n**transactions**\n\n| transaction_id | customer_id | product | amount | status |\n|---|---|---|---:|---|\n| 1 | 101 | Laptop | 50000 | COMPLETED |\n| 2 | 102 | Mouse | 500 | COMPLETED |\n| 3 | 101 | Laptop | 50000 | COMPLETED |\n| 4 | 103 | Keyboard | -200 | COMPLETED |\n| 5 | 104 | Monitor | 12000 | PENDING |\n| 6 | NULL | Mouse | 500 | COMPLETED |\n| 7 | 105 | Keyboard | 1000 | COMPLETED |\n\nSuppose you are asked to clean this dataset."
      },
      {
        "title": "Activity 1: Find missing customer IDs",
        "body": "```sql\nSELECT *\nFROM transactions\nWHERE customer_id IS NULL;\n```\n\nWhy?\n\nTo identify records that cannot be associated with a customer."
      },
      {
        "title": "Activity 2: Find duplicate transactions",
        "body": "```sql\nSELECT\n    transaction_id,\n    COUNT(*) AS total\nFROM transactions\nGROUP BY transaction_id\nHAVING COUNT(*) > 1;\n```\n\nThis checks duplicated transaction IDs.\n\nHowever, if transaction IDs are already enforced as primary keys, duplicates should be impossible within that table. In a real pipeline, you might instead check duplicated source transaction references or business keys."
      },
      {
        "title": "Activity 3: Find invalid amounts",
        "body": "```sql\nSELECT *\nFROM transactions\nWHERE amount < 0;\n```\n\nWhy?\n\nBecause negative values may violate the business rule for a normal sale. But don't automatically classify every negative amount as wrong: refunds and adjustments may legitimately be negative."
      },
      {
        "title": "Activity 4: Count transactions by status",
        "body": "```sql\nSELECT\n    status,\n    COUNT(*) AS total_transactions\nFROM transactions\nGROUP BY status;\n```\n\nWhy?\n\nTo understand the distribution of completed and pending transactions."
      },
      {
        "title": "Activity 5: Calculate completed sales",
        "body": "```sql\nSELECT\n    SUM(amount) AS total_sales\nFROM transactions\nWHERE status = 'COMPLETED';\n```\n\nWhy?\n\nTo calculate sales using completed transactions only."
      },
      {
        "title": "Activity 6: Find customers with multiple transactions",
        "body": "```sql\nSELECT\n    customer_id,\n    COUNT(*) AS transaction_count,\n    SUM(amount) AS total_amount\nFROM transactions\nWHERE customer_id IS NOT NULL\nGROUP BY customer_id\nHAVING COUNT(*) > 1;\n```\n\nWhy?\n\nTo identify customers with multiple transactions and examine their activity."
      },
      {
        "title": "Activity 7: Clean product names",
        "body": "Suppose your product values contain extra spaces and inconsistent capitalization.\n\n```sql\nSELECT\n    UPPER(TRIM(product)) AS standardized_product\nFROM transactions;\n```\n\n- TRIM removes unnecessary leading and trailing spaces.\n- UPPER converts text to uppercase.\n\nThese are examples of basic data transformations.\n\n---"
      }
    ],
    "keyTakeaways": [
      "Never delete duplicate customer records immediately; check related orders and transaction histories first.",
      "Flag missing mandatory fields for verification rather than inventing default dummy values.",
      "Resolve conflicting cross-system records by identifying the designated Authoritative Source."
    ]
  },
  {
    "id": "schneider-lesson-8",
    "moduleId": "schneider-mod-3",
    "number": 8,
    "title": "How to answer situational interview questions",
    "subtitle": "APIs, HTTP status codes, debugging pipeline failures, execution logs, and UiPath automation.",
    "durationMinutes": 20,
    "sections": [
      {
        "title": "Overview",
        "body": "This is arguably more important than memorizing definitions.\n\nThe interviewer may give you a situation without telling you exactly which technology to use.\n\nYour job is to demonstrate logical thinking."
      },
      {
        "title": "8.1 Use this six-step framework",
        "body": "**Identify the problem**\n\n      Understand what is incorrect, missing, inconsistent, or failing.\n    \n    \n      **Investigate the source**\n\n      Examine the original records, systems, logs, and processing steps.\n    \n    \n      **Determine the impact**\n\n      Find out how many records or business processes are affected.\n    \n    \n      **Correct or isolate the issue**\n\n      Apply an approved correction, or isolate invalid records for further review.\n    \n    \n      **Validate the results**\n\n      Check that the correction worked and did not introduce new issues.\n    \n    \n      **Document and prevent recurrence**\n\n      Record the cause, solution, and possible improvements to prevent the issue from happening again.\n    \n  \n\nThis framework can be applied to almost every scenario in your job description."
      },
      {
        "title": "8.2 Situational interview examples",
        "body": "### Situation A: You discover that 20% of a dataset has missing values. What would you do?\n\nGood answer:\n\n\"I would first identify which fields contain missing values and determine whether those fields are required. Then I would investigate where the missing information originated and check whether it is available from another reliable source. I would avoid automatically filling in unknown values. After applying the appropriate correction or flagging the records, I would validate the dataset and document the issue.\"\n\n### Situation B: Your supervisor asks you to clean a large dataset, but you don't know the business rules.\n\nGood answer:\n\n\"I would first review the dataset and identify potential quality issues. However, before making changes, I would clarify the expected business rules with my supervisor or the data owner. This would help ensure that I do not remove valid records or make incorrect assumptions. I would also test the cleaning process on a smaller sample before applying it to the full dataset.\"\n\n### Situation C: Two departments disagree about which customer information is correct.\n\nGood answer:\n\n\"I would first identify the conflicting information and determine which fields are affected. Then I would check the organization's data ownership rules to identify the authoritative source for those fields. If the issue cannot be resolved through the existing rules, I would coordinate with the responsible data owners before making changes.\"\n\n### Situation D: A data pipeline suddenly stops working.\n\nGood answer:\n\n\"I would check the pipeline's execution logs and identify the last successful processing step. I would investigate whether the issue came from the source system, transformation logic, database connection, or destination. After identifying the cause, I would coordinate the necessary correction, reprocess affected records if appropriate, and validate the results.\"\n\n### Situation E: You have three urgent tasks from different team members. How would you prioritize them?\n\nGood answer:\n\n\"I would clarify the deadlines and business impact of each task. I would prioritize issues that could affect critical operations or data reliability, while keeping the other team members informed about my progress. If the priorities conflict, I would ask my supervisor for clarification rather than making assumptions.\"\n\n### Situation F: You are assigned a task involving a technology you have never used.\n\nGood answer:\n\n\"I would first understand the objective of the task and review the available documentation or internal resources. I would try to understand the basic workflow and test my understanding in a controlled environment. If I encounter difficulties, I would ask for guidance and communicate what I have already tried.\"\n\n### Situation G: You accidentally modify or delete an incorrect record.\n\nGood answer:\n\n\"I would immediately communicate the issue to my supervisor or the responsible team rather than attempting an unapproved correction. I would identify the affected records, check whether recovery is possible through backups or transaction history, and follow the established recovery process. Afterward, I would help identify how the mistake happened and how to prevent it.\"\n\n### Situation H: Your validation results show that 500 records failed.\n\nGood answer:\n\n\"I would first categorize the failed records based on the validation rules they violated. Then I would identify whether the failures share a common cause, such as missing fields or invalid formats. I would separate the affected records from valid records, investigate the source, and coordinate the appropriate corrections. I would rerun the validation afterward to confirm the results.\"\n\n---"
      }
    ],
    "keyTakeaways": [
      "When a pipeline fails, start with execution logs and the last successfully processed batch.",
      "Ensure pipeline idempotency so re-running a failed job does not create duplicate transactions.",
      "Connect repetitive data entry tasks to automation tools like Python scripts or UiPath."
    ]
  },
  {
    "id": "schneider-lesson-9",
    "moduleId": "schneider-mod-4",
    "number": 9,
    "title": "Understanding the actual Schneider Electric responsibilities",
    "subtitle": "SQL data transformation: deduplication, negative amounts, status grouping, and text cleaning.",
    "durationMinutes": 20,
    "sections": [
      {
        "title": "Overview",
        "body": "Let's translate every major responsibility into what you might actually be doing as an intern.\n\n| Job responsibility | What it means in practice | Knowledge to prepare |\n|---|---|---|\n| Data migration | Transfer data between old and new systems | ETL, SQL, data mapping |\n| Data harmonization | Standardize information across systems | Data cleaning, MDM |\n| Master data alignment | Establish consistent customer, supplier, and product records | Primary keys, golden records |\n| Process standardization | Make different departments follow consistent processes | Documentation, business rules |\n| Data integration | Connect multiple systems and datasets | SQL, APIs, pipelines |\n| Troubleshooting | Investigate missing or incorrect records | SQL, logs, debugging |\n| Data quality rules | Define conditions that data must satisfy | Validation, constraints |\n| Monitor indicators | Track quality measurements | Completeness, accuracy, consistency |\n| Anomaly investigation | Identify unusual values or patterns | SQL aggregation, comparisons |\n| Process automation | Reduce repetitive manual tasks | Python, scripting, UiPath |\n| Monitoring and alerting | Detect pipeline failures | Logs, notifications |\n| Trusted datasets | Prepare reliable data for reports | Data warehouses, SQL |\n| Requirements gathering | Understand what users and stakeholders need | Communication, documentation |\n| Deployment | Move tested changes into an operational environment | Git, testing, CI/CD |\n| Risk and timeline management | Track blockers, deadlines, and dependencies | Organization, communication |"
      },
      {
        "title": "What should you emphasize about your own experience?",
        "body": "You have a few relevant experiences you can connect to this role:\n\n| Your experience | How it relates |\n|---|---|\n| PostgreSQL and SQLite | Relational database foundations |\n| B2B billing backend project | Data integrity, transactions, tenant isolation |\n| SQL warehouse project | Fact tables, dimension tables, data modeling |\n| Python and pandas | Data cleaning and transformation |\n| UiPath appointment scheduling | Process automation |\n| Kamunica | Database integration and application data management |\n\nFor example, your billing project already involves database constraints, transactional consistency, and data integrity. Those are relevant foundations, although you should distinguish application backend development from building enterprise data pipelines.\n\nA good way to describe your experience:\n\n\"I have worked with relational databases such as PostgreSQL and SQLite through my academic and personal projects. I have also worked with SQL queries, data modeling, and backend systems where maintaining data integrity is important. I am interested in applying those foundations to larger data integration and data quality workflows.\"\n\n---"
      }
    ],
    "keyTakeaways": [
      "Identify NULL foreign keys to detect records disconnected from parent entities.",
      "Check for duplicate transaction references with GROUP BY and HAVING COUNT(*) > 1.",
      "Use TRIM() and UPPER() to clean leading spaces and harmonize inconsistent casing."
    ]
  },
  {
    "id": "schneider-lesson-10",
    "moduleId": "schneider-mod-4",
    "number": 10,
    "title": "Technical interview questions you should be ready for",
    "subtitle": "Comprehensive technical question bank spanning fundamentals, SQL, quality, and pipelines.",
    "durationMinutes": 20,
    "sections": [
      {
        "title": "Overview",
        "body": "Here are additional questions beyond your original eight."
      },
      {
        "title": "A. Data Engineering fundamentals",
        "body": "| Question | What your answer should cover |\n|---|---|\n| What is Data Engineering? | Collecting, processing, transforming, and organizing data |\n| What is ETL? | Extract, Transform, Load |\n| What is ELT? | Extract, Load, Transform |\n| What is a data pipeline? | Automated sequence of data-processing steps |\n| What is a data warehouse? | Centralized analytical data repository |\n| What is data migration? | Moving data between systems |\n| What is data harmonization? | Standardizing data from different sources |\n| What is MDM? | Maintaining trusted master records |\n| What is a golden record? | Trusted consolidated version of an entity |\n| What is data integration? | Combining information from multiple sources |"
      },
      {
        "title": "B. Database and SQL",
        "body": "| Question | What your answer should cover |\n|---|---|\n| What is a primary key? | Unique record identifier |\n| What is a foreign key? | References another table's key |\n| What is normalization? | Reducing redundancy and improving integrity |\n| What is denormalization? | Introducing redundancy to support read performance or analytical design |\n| What is an index? | Improves data retrieval performance |\n| What is a JOIN? | Combines related records |\n| WHERE vs HAVING? | Row filtering vs grouped-result filtering |\n| DELETE vs TRUNCATE? | Removes selected rows vs removes all rows |\n| What is a transaction? | Group of operations treated as one unit |\n| What is ACID? | Atomicity, Consistency, Isolation, Durability |\n| What is NULL? | Missing or unknown value |\n| What is a constraint? | Rule enforced on database data |"
      },
      {
        "title": "C. Data Quality and Governance",
        "body": "| Question | What your answer should cover |\n|---|---|\n| What makes data high quality? | Accuracy, completeness, consistency, validity, uniqueness, timeliness |\n| How do you detect duplicates? | Identifiers, grouping, matching rules |\n| How do you handle missing data? | Investigate, verify, flag, or apply approved treatment |\n| What is data validation? | Checking records against defined rules |\n| What is data governance? | Policies, ownership, standards, and accountability for data |\n| What is an authoritative source? | Designated trusted source for a specific field or entity |\n| What is data lineage? | Tracking where data comes from and how it changes |\n| What is a data anomaly? | Unusual or unexpected data |\n| What is reconciliation? | Comparing records or totals across systems |"
      },
      {
        "title": "D. Data Pipeline and Integration",
        "body": "| Question | What your answer should cover |\n|---|---|\n| How do you troubleshoot a failed pipeline? | Check stages, logs, connections, errors |\n| What is an API? | Interface for system communication |\n| What is JSON? | Common structured data-exchange format |\n| What is batch processing? | Processing data in groups at intervals |\n| What is real-time processing? | Processing data as it arrives or with minimal delay |\n| What is an ETL failure? | Extraction, transformation, or loading failure |\n| Why are logs important? | Troubleshooting and tracing execution |\n| Why is monitoring important? | Detecting problems early |\n| What is idempotency? | Repeating an operation produces the same intended result without unintended duplicate effects |"
      },
      {
        "title": "E. General technical problem-solving",
        "body": "| Question | What your answer should cover |\n|---|---|\n| What if your SQL query returns unexpected results? | Check joins, filters, grouping, and source data |\n| What if a query is slow? | Inspect query plan, indexes, filtering, joins |\n| What if two systems have different totals? | Reconcile transactions and business rules |\n| What if data is incomplete? | Find the source and assess impact |\n| What if you don't understand a requirement? | Clarify with the stakeholder |\n| What if you make an error? | Communicate, recover, validate, document |\n\n---"
      }
    ],
    "keyTakeaways": [
      "Be prepared to explain the difference between DELETE and TRUNCATE, and WHERE vs HAVING.",
      "Understand data governance, data lineage, and reconciliation across enterprise systems.",
      "Show clarity when explaining slow query diagnosis and index performance tradeoffs."
    ]
  },
  {
    "id": "schneider-lesson-11",
    "moduleId": "schneider-mod-4",
    "number": 11,
    "title": "More practical exercises",
    "subtitle": "Referential integrity drills, orphaned orders detection, and tricky edge-case investigations.",
    "durationMinutes": 20,
    "sections": [
      {
        "title": "Overview",
        "body": "Don't just read these. Try solving them yourself.\n\nUse the following database as your practice environment.\n\n**customers**\n\n| customer_id | customer_name | country |\n|---|---|---|\n| 1 | John | Philippines |\n| 2 | Maria | Singapore |\n| 3 | James | Philippines |\n| 4 | Anna | Japan |\n\n**orders**\n\n| order_id | customer_id | amount | status |\n|---|---|---:|---|\n| 101 | 1 | 5000 | COMPLETED |\n| 102 | 1 | 3000 | COMPLETED |\n| 103 | 2 | 2000 | PENDING |\n| 104 | 3 | 7000 | COMPLETED |\n| 105 | 5 | 1000 | COMPLETED |\n\nNotice something unusual: order 105 references customer 5, but customer 5 does not exist.\n\nThis is an example of a referential integrity issue."
      },
      {
        "title": "Exercises",
        "body": ",{q:\"Count the total number of customers.\",a:\"SELECT COUNT(*) FROM customers;\",why:\"COUNT(*) counts all rows.\"},{q:\"Calculate total completed order amounts.\",a:\"SELECT SUM(amount) FROM orders WHERE status = 'COMPLETED';\",why:\"Filter first, then aggregate.\"},{q:\"Find the number of orders per customer.\",a:\"SELECT customer_id, COUNT(*) AS total_orders FROM orders GROUP BY customer_id;\",why:\"GROUP BY groups records by customer.\"},{q:\"Find customers who have no orders.\",a:\"SELECT c.* FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id WHERE o.order_id IS NULL;\",why:\"LEFT JOIN preserves customers without matching orders.\"},{q:\"Find orders with customer IDs that don't exist.\",a:\"SELECT o.* FROM orders o LEFT JOIN customers c ON o.customer_id = c.customer_id WHERE c.customer_id IS NULL;\",why:\"This identifies orphaned records.\"},{q:\"Find customers with completed orders totaling more than 5000.\",a:\"SELECT customer_id, SUM(amount) AS total FROM orders WHERE status = 'COMPLETED' GROUP BY customer_id HAVING SUM(amount) > 5000;\",why:\"HAVING filters aggregated results.\"}]}\n)}\n\n  \n    **SQL practice worksheet**\n    **[{Object.keys(revealed).filter(k=>revealed[k]).length}/{exercises.length} revealed]**\n  \n  Try writing the SQL before revealing the solution.\n  {#each exercises as ex,i}\n    \n      **{i+1}. {ex.q}**\n      <button block size=\"sm\" color=\"secondary\" variant=\"outline\" onClick={()=>setRevealed(p=>({...p,[i]:!p[i]}))}>{revealed[i]?\"Hide solution\":\"Reveal solution\"}</button>\n      {#if revealed[i]}\n        \n          SOLUTION\n          {ex.a}\n          {ex.why}\n          <button size=\"sm\" variant=\"ghost\" color=\"secondary\" onClick={()=>GenUI.copy(ex.a)}>\n             Copy SQL\n          </button>\n        \n      {/if}\n    \n    {#if i!==exercises.length-1}\n      \n    {/if}\n  {/each}"
      },
      {
        "title": "More challenging data-quality exercises",
        "body": "These are closer to the actual internship:\n\n1. A source database has 5,000 records, but the destination only has 4,850. How would you investigate?\n2. Three systems contain different addresses for the same customer. How would you determine the correct one?\n3. Your SQL query returns twice the expected sales amount after joining two tables. What might have happened?\n4. A pipeline runs successfully, but the resulting dataset contains incorrect values. What would you investigate?\n5. A supplier has two records with different IDs but identical names and addresses. Would you merge them immediately?\n6. A manager requests that you remove every record containing NULL. Would you do it?\n7. A dashboard shows outdated sales figures even though the pipeline reports success. What would you check?\n\n**My advice:** Pay special attention to questions 3, 4, 5, and 6. They test whether you understand that data problems aren't always solved by simply deleting or modifying records.\n\n---"
      }
    ],
    "keyTakeaways": [
      "Referential integrity violations occur when child records reference non-existent parents.",
      "Always question whether a negative amount is a valid refund or an ingestion error.",
      "Avoid blind mass-deletion when asked to clean NULL values; evaluate business significance first."
    ]
  },
  {
    "id": "schneider-lesson-12",
    "moduleId": "schneider-mod-5",
    "number": 12,
    "title": "How to introduce yourself and explain your technical background",
    "subtitle": "The 6-step problem-solving framework and model answers for 8 real interview situations (A-H).",
    "durationMinutes": 20,
    "sections": [
      {
        "title": "Overview",
        "body": "You may be asked to describe your experience before the technical questions begin.\n\nHere is a sample answer that connects your actual experience to this position.\n\nI am currently a fourth-year Information Technology student at De La Salle Lipa. Throughout my studies, I have worked on different projects involving software development, databases, and application development.\n\nI have experience using SQL and relational databases such as PostgreSQL and SQLite, particularly in retrieving, organizing, and managing data. I have also worked on backend development projects where data integrity, database relationships, and proper handling of information are important.\n\nAside from that, I have some experience with Python and data-related tools, as well as process automation through an academic project using UiPath.\n\nI am interested in this internship because I want to expand my understanding of how data is managed across larger systems, particularly in data integration, data quality, and data engineering. I believe it would be a good opportunity to apply what I have learned while gaining practical experience from the team."
      },
      {
        "title": "If they ask: Why Data Engineering?",
        "body": "I am interested in Data Engineering because I enjoy working with databases, understanding how systems communicate, and solving technical problems. I find it interesting how information from different sources can be collected, processed, and organized into something reliable and useful.\n\nAlthough most of my experience so far has been in software and backend development, I see Data Engineering as an opportunity to expand my technical knowledge, particularly in data integration, database management, and automation."
      },
      {
        "title": "If they ask: You have a software development background. Why apply for this role?",
        "body": "My background is mainly in Information Technology and software development, but I have also worked with databases, SQL, and data management through my projects.\n\nI think these areas are closely related because applications depend on reliable data and properly structured databases. I want to understand more about how organizations manage data across multiple systems, and I believe this internship would allow me to develop skills beyond application development."
      },
      {
        "title": "If they ask: What do you know about the role?",
        "body": "Based on the job description, my understanding is that the role focuses on maintaining reliable and consistent data across different business systems.\n\nSome of the responsibilities include supporting data migration and harmonization, investigating data quality issues, troubleshooting data integration problems, and helping automate manual processes.\n\nI also understand that the position involves collaborating with different teams to ensure that the data used for reporting and business operations is accurate and reliable.\n\n---"
      }
    ],
    "keyTakeaways": [
      "Follow the 6-Step Framework: Identify, Investigate, Impact, Correct/Isolate, Validate, Document.",
      "Never guess or apply unapproved fixes; consult the supervisor and data owners on ambiguity.",
      "In case of errors or deletions, report immediately, rely on transaction logs, and isolate."
    ]
  },
  {
    "id": "schneider-lesson-13",
    "moduleId": "schneider-mod-5",
    "number": 13,
    "title": "What to prioritize before your interview",
    "subtitle": "Translating Schneider job requirements to real intern tasks and framing your IT background.",
    "durationMinutes": 20,
    "sections": [
      {
        "title": "Overview",
        "body": "You don't need to master everything in this guide equally.\n\nHere is how I would prioritize your preparation.\n\n  Your study priorities\n  \n    \n      **1. SQL fundamentals**\n      **[Highest priority]**\n    \n    SELECT, WHERE, JOIN, GROUP BY, HAVING, COUNT, SUM, NULL, duplicate detection.\n    \n      \n    \n  \n  \n    \n      **2. Data quality**\n      **[Highest priority]**\n    \n    Accuracy, completeness, consistency, validity, uniqueness, timeliness.\n    \n      \n    \n  \n  \n    \n      **3. Data migration and MDM**\n      **[Highest priority]**\n    \n    ETL, harmonization, field mapping, golden records, authoritative sources.\n    \n      \n    \n  \n  \n    \n      **4. Database foundations**\n      **[High priority]**\n    \n    Keys, relationships, normalization, transactions, indexes, ACID.\n    \n      \n    \n  \n  \n    \n      **5. Data pipelines**\n      **[High priority]**\n    \n    ETL/ELT, integration, logs, monitoring, batch processing, troubleshooting.\n    \n      \n    \n  \n  \n    \n      **6. Python and automation**\n      **[Additional]**\n    \n    pandas, CSV processing, validation scripts, repetitive task automation."
      },
      {
        "title": "A practical study schedule",
        "body": "If you have around four hours to prepare, I would divide them this way:\n\n| Time | Activity |\n|---|---|\n| 45 minutes | SQL queries and JOIN exercises |\n| 30 minutes | Database foundations |\n| 45 minutes | ETL, pipelines, migration, MDM |\n| 30 minutes | Data quality and validation |\n| 30 minutes | Situational questions |\n| 30 minutes | Personal introduction and project explanations |\n| 30 minutes | Mock interview without notes |\n\n---"
      }
    ],
    "keyTakeaways": [
      "Connect your software engineering background to data integrity, backend APIs, and transactions.",
      "Highlight practical experience with PostgreSQL, SQLite, Python, and automation tools.",
      "Express clear enthusiasm for enterprise data consistency, MDM, and integration challenges."
    ]
  },
  {
    "id": "schneider-lesson-14",
    "moduleId": "schneider-mod-5",
    "number": 14,
    "title": "The most important thing: How to think during the interview",
    "subtitle": "Personal pitch scripts, 4-hour study schedule, 5 golden mindsets, and final mock drill.",
    "durationMinutes": 20,
    "sections": [
      {
        "title": "Overview",
        "body": "I want you to remember these five principles.\n\n**1. Never modify data without understanding the problem.**\n\nIf you find duplicate records, don't immediately delete them. Investigate whether they represent the same entity.\n\n**2. Always identify the source of the problem.**\n\nIf information is missing, determine whether it was missing from the original system or lost during processing.\n\n**3. Validate everything.**\n\nIf you clean 10,000 records, don't simply assume the operation succeeded. Check the results.\n\n**4. Understand business rules before making assumptions.**\n\nA negative transaction amount might be a refund. A NULL value might be intentional. An inactive supplier might have a legitimate reason for that status.\n\n**5. Communicate when something is unclear.**\n\nYou're applying as an intern. They don't expect you to know every enterprise technology. They do expect you to be careful, logical, willing to learn, and able to communicate problems."
      },
      {
        "title": "Your mental cheat sheet",
        "body": "| If you hear... | Think about... |\n|---|---|\n| Duplicate records | Deduplication, MDM |\n| Missing information | Completeness |\n| Different formats | Standardization |\n| Conflicting values | Authoritative source |\n| Data transfer | Migration, ETL |\n| Multiple systems | Integration, harmonization |\n| Incorrect reports | Reconciliation |\n| Pipeline failure | Logs, extraction, transformation, loading |\n| Unusual values | Anomaly detection |\n| Repetitive tasks | Automation |\n| Reliable reporting | Data warehouse, validation |\n| Data ownership | Data governance |"
      },
      {
        "title": "Final mock interview: Test your understanding",
        "body": "Try answering these without looking at the guide.\n\n,{q:\"What is a golden record?\",a:\"A trusted, consolidated version of an entity's information, such as a customer or supplier.\"},{q:\"Why shouldn't you immediately delete duplicate records?\",a:\"They may have related transactions or represent different entities. Verify and check dependencies first.\"},{q:\"What are the six dimensions of data quality?\",a:\"Accuracy, completeness, consistency, validity, uniqueness, and timeliness.\"},{q:\"What would you check if a pipeline failed?\",a:\"Execution logs, source availability, extraction, transformation, destination connectivity, and loading errors.\"},{q:\"What is an authoritative source?\",a:\"The designated trusted system for a particular piece of information.\"},{q:\"What is the purpose of a data warehouse?\",a:\"To integrate and store data for reporting, analysis, and business decisions.\"},{q:\"What is the difference between a fact and dimension table?\",a:\"Fact tables contain measurable events. Dimension tables contain descriptive context.\"},{q:\"What is data reconciliation?\",a:\"Comparing data across systems to identify differences and verify consistency.\"},{q:\"What would you do if you didn't know how to solve a data issue?\",a:\"Investigate first, review documentation, identify what I have tried, and ask the appropriate team member for guidance.\"}]}\n\n)}\n\n  \n    **Technical interview drill**\n    **[{idx+1} of {questions.length}]**\n  \n  \n    \n  \n  **Question {idx+1}**\n\n  {questions[idx].q}\n  setAnswers(p=>({...p,[idx]:v}))} placeholder=\"Explain your answer in your own words...\"/>\n  <button block color=\"secondary\" variant=\"outline\" onClick={()=>setShow(!show)}>{show?\"Hide suggested answer\":\"Show suggested answer\"}</button>\n  {#if show}\n    \n      SUGGESTED ANSWER\n      {questions[idx].a}\n    \n  {/if}\n  \n    <button color=\"secondary\" variant=\"outline\" disabled={idx===0} onClick={()=>{setIdx(i=>i-1);setShow(false)}}>Previous</button>\n    \n    <button onClick={()=>{setIdx(i=>Math.min(questions.length-1,i+1));setShow(false)}} disabled={idx===questions.length-1}>Next question </button>\n  \n  Your answers stay in this practice session. Focus on explaining the reasoning, not memorizing exact wording.\n\n**My overall recommendation:** Your existing software development and database experience gives you a reasonable foundation for this internship. Your biggest preparation gap is likely not programming itself, but understanding enterprise data processes: how data moves between systems, how organizations maintain consistent records, and how data quality problems are investigated.\n\nThat's what I would focus on most.\n\nI can also run a fresh 10-minute Schneider Electric Data Office situational interview drill with you tomorrow.\n\n---\n\nIf you want, I can:\n\n- Explain data harmonization fully\n- Describe typical data migration challenges\n- Outline a data pipeline design example"
      }
    ],
    "keyTakeaways": [
      "Never modify data without understanding the root problem.",
      "Always identify the source of the issue and validate post-cleaning results.",
      "Understand business rules before assuming, and communicate clearly when anything is ambiguous."
    ]
  }
];

export const SCHNEIDER_SITUATIONAL_DRILLS: SituationalDrill[] = [
  {
    "id": "sit-a",
    "code": "Situation A",
    "title": "20% of Dataset Has Missing Values",
    "prompt": "You discover that 20% of a dataset has missing values. What would you do?",
    "category": "data_quality",
    "modelAnswer": "I would first identify which fields contain missing values and determine whether those fields are required by business rules. Then I would investigate where the missing information originated and check whether it is available from another reliable source. I would avoid automatically filling in unknown values. After applying the appropriate correction or flagging the records, I would validate the dataset and document the issue.",
    "sixStepBreakdown": [
      {
        "step": "1. Identify",
        "action": "Determine exact columns with missing data and calculate the % affected."
      },
      {
        "step": "2. Investigate",
        "action": "Check whether data was missing at the source or dropped during ETL transformation."
      },
      {
        "step": "3. Impact",
        "action": "Assess whether missing fields break downstream reporting or transactional integrity."
      },
      {
        "step": "4. Correct/Isolate",
        "action": "Cross-reference authoritative sources or flag records for data steward review; do NOT invent dummy values."
      },
      {
        "step": "5. Validate",
        "action": "Rerun completeness checks to verify null rate reduction."
      },
      {
        "step": "6. Document",
        "action": "Log the root cause and recommend schema constraints or ingestion validation."
      }
    ],
    "keyPrinciples": [
      "Never invent placeholder data without business authorization.",
      "Distinguish between legitimate optional NULLs and broken data pipelines."
    ]
  },
  {
    "id": "sit-b",
    "code": "Situation B",
    "title": "Cleaning Large Dataset Without Business Rules",
    "prompt": "Your supervisor asks you to clean a large dataset, but you don't know the business rules.",
    "category": "governance",
    "modelAnswer": "I would first review the dataset and identify potential quality issues. However, before making changes, I would clarify the expected business rules with my supervisor or the data owner. This would help ensure that I do not remove valid records or make incorrect assumptions. I would also test the cleaning process on a smaller sample before applying it to the full dataset.",
    "sixStepBreakdown": [
      {
        "step": "1. Identify",
        "action": "Profile the dataset: inspect outliers, nulls, negative numbers, and duplicates."
      },
      {
        "step": "2. Investigate",
        "action": "Formulate specific questions with concrete examples for the data owner."
      },
      {
        "step": "3. Impact",
        "action": "Evaluate risk of accidental data loss or false positives."
      },
      {
        "step": "4. Correct/Isolate",
        "action": "Draft proposed transformation rules and get explicit approval."
      },
      {
        "step": "5. Validate",
        "action": "Execute the logic on a test sample and verify before/after distribution."
      },
      {
        "step": "6. Document",
        "action": "Maintain clear rule definitions in the data dictionary."
      }
    ],
    "keyPrinciples": [
      "Assumptions in data engineering cause silent data corruption.",
      "Always test transformation scripts on a dry-run or sample partition."
    ]
  },
  {
    "id": "sit-c",
    "code": "Situation C",
    "title": "Conflicting Information Across Two Departments",
    "prompt": "Two departments disagree about which customer information is correct.",
    "category": "governance",
    "modelAnswer": "I would first identify the conflicting information and determine which fields are affected. Then I would check the organization's data ownership rules to identify the authoritative source for those fields. If the issue cannot be resolved through the existing rules, I would coordinate with the responsible data owners before making changes.",
    "sixStepBreakdown": [
      {
        "step": "1. Identify",
        "action": "Compare records side-by-side to highlight exact field mismatches."
      },
      {
        "step": "2. Investigate",
        "action": "Inspect timestamps, audit logs, and recent transaction history."
      },
      {
        "step": "3. Impact",
        "action": "Identify downstream reports and invoices reliant on this customer."
      },
      {
        "step": "4. Correct/Isolate",
        "action": "Consult Master Data Management (MDM) policy to determine the Authoritative Source."
      },
      {
        "step": "5. Validate",
        "action": "Synchronize the Golden Record across both department databases."
      },
      {
        "step": "6. Document",
        "action": "Record the decision and update data stewardship mappings."
      }
    ],
    "keyPrinciples": [
      "A system can be authoritative for billing (Finance) but not contact information (Sales).",
      "Coordinate with data stewards rather than deciding arbitrarily."
    ]
  },
  {
    "id": "sit-d",
    "code": "Situation D",
    "title": "Data Pipeline Suddenly Stops Working",
    "prompt": "A data pipeline suddenly stops working. How would you investigate and resolve it?",
    "category": "pipelines",
    "modelAnswer": "I would check the pipeline's execution logs and identify the last successful processing step. I would investigate whether the issue came from the source system, transformation logic, database connection, or destination. After identifying the cause, I would coordinate the necessary correction, reprocess affected records if appropriate, and validate the results.",
    "sixStepBreakdown": [
      {
        "step": "1. Identify",
        "action": "Check monitoring dashboards and determine when the pipeline last ran successfully."
      },
      {
        "step": "2. Investigate",
        "action": "Inspect error logs: examine network timeouts, schema changes, or unhandled nulls."
      },
      {
        "step": "3. Impact",
        "action": "Determine how many downstream dashboards or consumers are delayed."
      },
      {
        "step": "4. Correct/Isolate",
        "action": "Fix connection or quarantine bad record batches; ensure pipeline idempotency."
      },
      {
        "step": "5. Validate",
        "action": "Reprocess the missed batch and reconcile source vs destination record counts."
      },
      {
        "step": "6. Document",
        "action": "Conduct post-mortem and add automated alerts for early detection."
      }
    ],
    "keyPrinciples": [
      "Never alter production pipeline code without checking execution logs first.",
      "Ensure pipeline idempotency so re-runs never insert duplicate records."
    ]
  },
  {
    "id": "sit-e",
    "code": "Situation E",
    "title": "Three Urgent Tasks from Different Team Members",
    "prompt": "You have three urgent tasks from different team members. How would you prioritize them?",
    "category": "behavioral",
    "modelAnswer": "I would clarify the deadlines and business impact of each task. I would prioritize issues that could affect critical operations or data reliability, while keeping the other team members informed about my progress. If the priorities conflict, I would ask my supervisor for clarification rather than making assumptions.",
    "sixStepBreakdown": [
      {
        "step": "1. Identify",
        "action": "Review the technical scope, dependencies, and requested deadlines of all 3 tasks."
      },
      {
        "step": "2. Investigate",
        "action": "Assess business severity: pipeline breakage > reporting delay > ad-hoc query."
      },
      {
        "step": "3. Impact",
        "action": "Quantify operational risk: does one issue block active manufacturing or billing?"
      },
      {
        "step": "4. Correct/Isolate",
        "action": "Establish an execution order and communicate realistic ETAs to stakeholders."
      },
      {
        "step": "5. Validate",
        "action": "Seek supervisory alignment if competing stakeholders both claim priority #1."
      },
      {
        "step": "6. Document",
        "action": "Keep task progress visible in the team's project tracking board."
      }
    ],
    "keyPrinciples": [
      "Severity is driven by business impact, not who asks the loudest.",
      "Proactive communication prevents stakeholder frustration."
    ]
  },
  {
    "id": "sit-f",
    "code": "Situation F",
    "title": "Assigned a Task with Unfamiliar Technology",
    "prompt": "You are assigned a task involving a technology you have never used. How do you handle it?",
    "category": "behavioral",
    "modelAnswer": "I would first understand the objective of the task and review the available documentation or internal resources. I would try to understand the basic workflow and test my understanding in a controlled environment. If I encounter difficulties, I would ask for guidance and communicate what I have already tried.",
    "sixStepBreakdown": [
      {
        "step": "1. Identify",
        "action": "Deconstruct the end goal into distinct technical steps."
      },
      {
        "step": "2. Investigate",
        "action": "Study official docs, team repos, and existing internal code snippets."
      },
      {
        "step": "3. Impact",
        "action": "Set a strict time-box (e.g. 1-2 hours) for self-guided research."
      },
      {
        "step": "4. Correct/Isolate",
        "action": "Build a minimal proof-of-concept in a sandbox environment."
      },
      {
        "step": "5. Validate",
        "action": "Verify outputs against known test data."
      },
      {
        "step": "6. Document",
        "action": "Ask concise questions showing what was tried, what worked, and where the blocker is."
      }
    ],
    "keyPrinciples": [
      "Asking for guidance after structured self-investigation is a mark of a strong intern.",
      "Never experiment directly in a production database."
    ]
  },
  {
    "id": "sit-g",
    "code": "Situation G",
    "title": "Accidentally Modified or Deleted an Incorrect Record",
    "prompt": "You accidentally modify or delete an incorrect record in a database. What do you do?",
    "category": "problem_solving",
    "modelAnswer": "I would immediately communicate the issue to my supervisor or the responsible team rather than attempting an unapproved correction. I would identify the affected records, check whether recovery is possible through backups or transaction history, and follow the established recovery process. Afterward, I would help identify how the mistake happened and how to prevent it.",
    "sixStepBreakdown": [
      {
        "step": "1. Identify",
        "action": "Stop all further modification scripts immediately."
      },
      {
        "step": "2. Investigate",
        "action": "Determine exact table, primary keys, and timestamp of the errant query."
      },
      {
        "step": "3. Impact",
        "action": "Determine if uncommitted transaction can be rolled back (`ROLLBACK`)."
      },
      {
        "step": "4. Correct/Isolate",
        "action": "Notify supervisor immediately; restore affected rows from WAL logs or backup."
      },
      {
        "step": "5. Validate",
        "action": "Recheck row count and column values against the audit trail."
      },
      {
        "step": "6. Document",
        "action": "Implement query safeguards: always use transactions (`BEGIN TRANSACTION`) and dry-run `SELECT` before `DELETE`."
      }
    ],
    "keyPrinciples": [
      "Never attempt a panicked, unapproved cover-up fix\u2014it multiplies the damage.",
      "Always wrap exploratory DML in `BEGIN TRANSACTION` and test `WHERE` clauses with `SELECT` first."
    ]
  },
  {
    "id": "sit-h",
    "code": "Situation H",
    "title": "Validation Results Show 500 Records Failed",
    "prompt": "Your validation results show that 500 records failed after a migration or ETL run. What do you do?",
    "category": "data_quality",
    "modelAnswer": "I would first categorize the failed records based on the validation rules they violated. Then I would identify whether the failures share a common cause, such as missing fields or invalid formats. I would separate the affected records from valid records, investigate the source, and coordinate the appropriate corrections. I would rerun the validation afterward to confirm the results.",
    "sixStepBreakdown": [
      {
        "step": "1. Identify",
        "action": "Isolate the 500 records into an exception quarantine table."
      },
      {
        "step": "2. Investigate",
        "action": "Group failures by error code: missing foreign key, date parse error, constraint violation."
      },
      {
        "step": "3. Impact",
        "action": "Check if valid records can proceed while quarantined records are examined."
      },
      {
        "step": "4. Correct/Isolate",
        "action": "Identify if a single transformation bug caused hundreds of failures."
      },
      {
        "step": "5. Validate",
        "action": "Apply the fix and rerun the validation suite until 100% pass."
      },
      {
        "step": "6. Document",
        "action": "Update the validation rules and log the exception summary."
      }
    ],
    "keyPrinciples": [
      "Large failure counts usually indicate a systematic mapping bug, not 500 individual typos.",
      "Quarantine bad records so they don't block the entire healthy data pipeline."
    ]
  }
];

export const SCHNEIDER_BEHAVIORAL_PITCHES: BehavioralPitch[] = [
  {
    "id": "pitch-intro",
    "question": "Tell Me About Yourself / Walk Me Through Your Resume",
    "recommendedPitch": "I am currently a fourth-year Information Technology student at De La Salle Lipa. Throughout my studies, I have worked on different projects involving software development, databases, and application development.\n\nI have experience using SQL and relational databases such as PostgreSQL and SQLite, particularly in retrieving, organizing, and managing data. I have also worked on backend development projects where data integrity, database relationships, and proper handling of information are important.\n\nAside from that, I have some experience with Python and data-related tools, as well as process automation through an academic project using UiPath.\n\nI am interested in this internship because I want to expand my understanding of how data is managed across larger systems, particularly in data integration, data quality, and data engineering. I believe it would be a good opportunity to apply what I have learned while gaining practical experience from the team.",
    "whyThisWorks": "This answer directly anchors your academic background to the exact requirements of Schneider Electric's Data Office: relational databases, data integrity, Python, and automation.",
    "talkingPoints": [
      "4th-year IT student at De La Salle Lipa.",
      "Hands-on SQL with PostgreSQL & SQLite (retrieval, modeling, relational integrity).",
      "Backend project experience focusing on data integrity and database relationships.",
      "Python data manipulation and UiPath RPA automation experience.",
      "Genuine motivation: expanding from app development to enterprise data engineering and MDM."
    ]
  },
  {
    "id": "pitch-why-de",
    "question": "Why Are You Interested in Data Engineering?",
    "recommendedPitch": "I am interested in Data Engineering because I enjoy working with databases, understanding how systems communicate, and solving technical problems. I find it interesting how information from different sources can be collected, processed, and organized into something reliable and useful.\n\nAlthough most of my experience so far has been in software and backend development, I see Data Engineering as an opportunity to expand my technical knowledge, particularly in data integration, database management, and automation.",
    "whyThisWorks": "It frames Data Engineering as the vital foundation that powers all business applications and reports, rather than just an isolated scripting job.",
    "talkingPoints": [
      "Enjoys understanding system-to-system communication and data pipelines.",
      "Appreciates the impact of transforming messy source inputs into trusted, reliable data.",
      "Sees data engineering as the natural architectural evolution of backend systems."
    ]
  },
  {
    "id": "pitch-sw-to-de",
    "question": "You Have a Software Development Background. Why Apply for This Role?",
    "recommendedPitch": "My background is mainly in Information Technology and software development, but I have also worked with databases, SQL, and data management through my projects.\n\nI think these areas are closely related because applications depend on reliable data and properly structured databases. I want to understand more about how organizations manage data across multiple systems, and I believe this internship would allow me to develop skills beyond application development.",
    "whyThisWorks": "It turns your software background into an asset. Great data engineers write clean code, understand API contracts, and think in terms of reliability and transactions.",
    "talkingPoints": [
      "Software applications are only as good as the reliability of their underlying databases.",
      "Software engineering skills (APIs, modular code, testing, Git) directly elevate data engineering.",
      "Desire to solve enterprise-scale integration challenges across multiple enterprise platforms."
    ]
  },
  {
    "id": "pitch-role-knowledge",
    "question": "What Do You Know About This Role at Schneider Electric?",
    "recommendedPitch": "Based on the job description, my understanding is that the role focuses on maintaining reliable and consistent data across different business systems.\n\nSome of the responsibilities include supporting data migration and harmonization, investigating data quality issues, troubleshooting data integration problems, and helping automate manual processes.\n\nI also understand that the position involves collaborating with different teams to ensure that the data used for reporting and business operations is accurate and reliable.",
    "whyThisWorks": "It proves you actually read the job description and understand the real day-to-day challenges: migration, harmonization, quality rules, and automation.",
    "talkingPoints": [
      "Maintaining reliable, unified data across diverse enterprise applications.",
      "Supporting data migration between legacy platforms and new destinations.",
      "Data harmonization and Master Data Management (establishing Golden Records).",
      "Troubleshooting data integration failures and automating manual processes."
    ]
  }
];

export const SCHNEIDER_RAPID_FLASHCARDS: RapidFlashcard[] = [
  {
    "id": "flash-1",
    "question": "What is the difference between data migration and data harmonization?",
    "answer": "Data Migration is the process of moving data from one system, database, or platform to another. Data Harmonization is the process of making data from different systems consistent and standardized so it can be combined and compared reliably.",
    "category": "Architecture"
  },
  {
    "id": "flash-2",
    "question": "What is a 'Golden Record' in Master Data Management?",
    "answer": "A Golden Record is the single, trusted, consolidated version of an entity's information (such as a customer, supplier, or part) created by matching, verifying, and reconciling records from multiple source systems.",
    "category": "MDM"
  },
  {
    "id": "flash-3",
    "question": "Why shouldn't you immediately delete duplicate customer records?",
    "answer": "Duplicate records often have related foreign keys, order histories, or payments attached in other tables. Immediately deleting one can cause orphaned records or data loss. You must verify if they represent the same entity, consolidate relationships, and follow governance rules.",
    "category": "Data Quality"
  },
  {
    "id": "flash-4",
    "question": "What are the six core dimensions of data quality?",
    "answer": "1. Accuracy (Is it correct?)\n2. Completeness (Are required fields present?)\n3. Consistency (Does it agree across systems?)\n4. Validity (Does it follow the format/rules?)\n5. Uniqueness (Is it free from duplicates?)\n6. Timeliness (Is it up to date?)",
    "category": "Data Quality"
  },
  {
    "id": "flash-5",
    "question": "What steps would you take if a data pipeline failed overnight?",
    "answer": "1. Check execution logs to find the exact error.\n2. Determine the last successfully processed batch.\n3. Check source accessibility and destination connectivity.\n4. Inspect rejected records for schema or format anomalies.\n5. Safely reprocess the batch (ensuring idempotency) and validate record counts.",
    "category": "Pipelines"
  },
  {
    "id": "flash-6",
    "question": "What is an 'Authoritative Source' in data governance?",
    "answer": "An Authoritative Source (or System of Record) is the officially designated, trusted system responsible for maintaining the accurate value of a specific field or entity (e.g. Finance owns payment terms; HR owns employee statuses).",
    "category": "Governance"
  },
  {
    "id": "flash-7",
    "question": "What is the difference between a transactional database and a data warehouse?",
    "answer": "A database is optimized for OLTP (daily operational transactions, fast single-row inserts/updates). A data warehouse is optimized for OLAP (complex analytical queries, historical aggregations across multiple integrated systems).",
    "category": "Warehousing"
  },
  {
    "id": "flash-8",
    "question": "What is the difference between a Fact table and a Dimension table?",
    "answer": "Fact tables store quantitative numerical metrics and business events (e.g. revenue, quantity, timestamps). Dimension tables store the descriptive context (e.g. customer name, product category, store location) used to slice and filter facts.",
    "category": "Warehousing"
  },
  {
    "id": "flash-9",
    "question": "What is data reconciliation and why is it necessary?",
    "answer": "Data reconciliation is the systematic comparison of datasets or totals across different systems (e.g., comparing Sales ERP total with Finance Ledger total) to identify discrepancies, missing records, or calculation differences.",
    "category": "Quality & MDM"
  },
  {
    "id": "flash-10",
    "question": "What would you do as an intern if you didn't know how to solve a data issue?",
    "answer": "I would profile and investigate the problem first, consult existing documentation, check what has already been tried, and communicate clearly with my supervisor or team members with specific findings rather than making unverified assumptions.",
    "category": "Behavioral"
  }
];

export const SCHNEIDER_QUALITY_SCENARIOS: QualityScenario[] = [
  {
    "id": "scenario-1",
    "number": 1,
    "title": "Duplicate Customer Records",
    "dimension": "MDM + Uniqueness",
    "description": "The customer table contains multiple records for 'John Santos' with identical email addresses.",
    "sampleData": [
      {
        "system": "CRM System",
        "columns": [
          "customer_id",
          "name",
          "email",
          "city"
        ],
        "rows": [
          [
            101,
            "John Santos",
            "john@email.com",
            "Manila"
          ],
          [
            102,
            "John Santos",
            "john@email.com",
            "Manila"
          ],
          [
            103,
            "Maria Cruz",
            "maria@email.com",
            "Lipa"
          ]
        ]
      }
    ],
    "problemStatement": "Customer 101 and 102 share the same email and name. Blindly deleting one could orphan orders tied to customer_id 102.",
    "investigationSteps": [
      "Group by email and identifier fields having count > 1.",
      "Inspect order and transaction history for both customer IDs.",
      "Determine which customer_id is designated as the Golden Record master.",
      "Update child foreign keys to point to the master ID before merging.",
      "Deactivate or consolidate the duplicate record according to governance policy."
    ],
    "recommendedSql": "SELECT email, COUNT(*) AS duplicate_count FROM customers GROUP BY email HAVING COUNT(*) > 1;",
    "interviewAnswer": "I would first identify potential duplicate records using matching attributes such as email addresses. I would verify whether they represent the same customer before consolidating them, check related transaction records, and validate that the consolidation preserved all historical data."
  },
  {
    "id": "scenario-2",
    "number": 2,
    "title": "Missing Supplier Information",
    "dimension": "Completeness",
    "description": "Supplier records have NULL contact email addresses in the procurement system.",
    "sampleData": [
      {
        "system": "Procurement Database",
        "columns": [
          "supplier_id",
          "supplier_name",
          "contact_email",
          "status"
        ],
        "rows": [
          [
            1,
            "ABC Supplies",
            "abc@email.com",
            "Active"
          ],
          [
            2,
            "XYZ Trading",
            null,
            "Inactive"
          ],
          [
            3,
            "Global Parts",
            "global@email.com",
            "Active"
          ]
        ]
      }
    ],
    "problemStatement": "Automated order confirmation emails fail because Supplier 2 has a NULL email.",
    "investigationSteps": [
      "Query for records where contact_email IS NULL or TRIM(contact_email) = ''.",
      "Determine whether the contact email is legally required for inactive vs active suppliers.",
      "Cross-reference the ERP vendor master or invoices for recorded contacts.",
      "Flag incomplete records for procurement steward review; never fabricate a fake email."
    ],
    "recommendedSql": "SELECT supplier_id, supplier_name, status FROM schneider_suppliers WHERE contact_email IS NULL OR TRIM(contact_email) = '';",
    "interviewAnswer": "I would identify which records have missing information and check whether the field is mandatory for their active status. I would check authorized source systems for the verified information. If unavailable, I would flag the record for review rather than inserting an assumed value."
  },
  {
    "id": "scenario-3",
    "number": 3,
    "title": "Different Date Formats Across Systems",
    "dimension": "Validity & Standardization",
    "description": "Transactions arrive in mixed date conventions: '11/10/2026', '2026-11-10', 'Nov 10, 2026'.",
    "sampleData": [
      {
        "system": "Raw Ingestion Batch",
        "columns": [
          "raw_date_string"
        ],
        "rows": [
          [
            "11/10/2026"
          ],
          [
            "2026-11-10"
          ],
          [
            "Nov 10, 2026"
          ],
          [
            "10-Nov-2026"
          ]
        ]
      }
    ],
    "problemStatement": "Ambiguity in '01/05/2026'\u2014does it represent January 5th (US format) or May 1st (European/Asian format)?",
    "investigationSteps": [
      "Inspect the regional source system locale and contract metadata.",
      "Check other records in the same feed with day numbers > 12 to infer convention.",
      "Convert and standardize all parsed dates into standard ISO-8601 (YYYY-MM-DD).",
      "Implement schema validation to reject non-standard date formats at ingestion."
    ],
    "recommendedSql": "-- SQLite date conversion example:\nSELECT date('now') AS iso_standard_format;",
    "interviewAnswer": "I would first identify the original date formats and verify their source regional convention. Then I would convert them into an agreed standard format such as ISO-8601 (YYYY-MM-DD) and validate the converted values to prevent day/month swapping."
  },
  {
    "id": "scenario-4",
    "number": 4,
    "title": "Inconsistent Product Names",
    "dimension": "Harmonization",
    "description": "The same product is named 'Schneider Circuit Breaker' in Sales, 'Schneider CB' in Inventory, and 'Circuit Breaker - Schneider' in Procurement.",
    "sampleData": [
      {
        "system": "Multi-System Catalog",
        "columns": [
          "system",
          "product_name"
        ],
        "rows": [
          [
            "Sales",
            "Schneider Circuit Breaker"
          ],
          [
            "Inventory",
            "Schneider CB"
          ],
          [
            "Procurement",
            "Circuit Breaker - Schneider"
          ]
        ]
      }
    ],
    "problemStatement": "Product-level sales aggregations fail because grouping by product_name splits one item into three rows.",
    "investigationSteps": [
      "Identify candidate matches by comparing product SKU, part numbers, and technical specifications.",
      "Establish an enterprise Master Data mapping table linking system-specific names to a unified SKU (e.g. SCH-CB-001).",
      "Use the unified master product table in analytical queries.",
      "Validate that total aggregated quantity matches across all source systems."
    ],
    "recommendedSql": "-- Harmonized mapping query:\nSELECT p.master_sku, p.standard_name, SUM(s.amount) AS total_revenue\nFROM schneider_transactions s\nJOIN product_mappings p ON s.product = p.raw_name\nGROUP BY p.master_sku, p.standard_name;",
    "interviewAnswer": "I would identify inconsistent product names and compare their SKUs and specifications to confirm they refer to the same item. I would follow the established naming convention and maintain a mapping table between original and standardized values."
  },
  {
    "id": "scenario-5",
    "number": 5,
    "title": "Conflicting Sales Figures (\u20b1500,000 vs \u20b1470,000)",
    "dimension": "Reconciliation",
    "description": "Sales system reports total revenue of \u20b1500,000, while Finance reports \u20b1470,000\u2014a \u20b130,000 discrepancy.",
    "sampleData": [
      {
        "system": "Discrepancy Audit",
        "columns": [
          "source_system",
          "total_sales",
          "variance"
        ],
        "rows": [
          [
            "Sales CRM",
            500000,
            "+30,000"
          ],
          [
            "Finance Ledger",
            470000,
            "Baseline"
          ]
        ]
      }
    ],
    "problemStatement": "Do not assume either system is broken. Differences often stem from business rules: returns, cancellations, taxes, or cutoff times.",
    "investigationSteps": [
      "Check reporting date ranges and timezone cutoff boundaries.",
      "Verify whether canceled orders or returns are deducted in Finance but kept in Sales.",
      "Check for duplicate transactions or currency exchange rate discrepancies.",
      "Query transactions by status: COMPLETED vs PENDING vs CANCELED."
    ],
    "recommendedSql": "SELECT status, SUM(amount) AS total FROM schneider_transactions GROUP BY status;",
    "interviewAnswer": "I would identify the scope of the discrepancy and compare the reporting periods and calculation rules used by both systems. I would examine individual transactions for missing, duplicated, or canceled orders. Once identified, I would coordinate with both teams and validate the updated reconciliation."
  },
  {
    "id": "scenario-6",
    "number": 6,
    "title": "Missing Transactions (1,000 in Source, 950 in Warehouse)",
    "dimension": "Pipeline Troubleshooting",
    "description": "Sales system recorded 1,000 transactions, but the reporting warehouse only contains 950 records.",
    "sampleData": [
      {
        "system": "Pipeline Health Check",
        "columns": [
          "stage",
          "record_count",
          "status"
        ],
        "rows": [
          [
            "Source Sales DB",
            1000,
            "Extracted"
          ],
          [
            "Transform / Filter",
            950,
            "50 Rejected"
          ],
          [
            "Target Warehouse",
            950,
            "Loaded"
          ]
        ]
      }
    ],
    "problemStatement": "Fifty transactions were dropped during the ETL process.",
    "investigationSteps": [
      "Compare source vs destination transaction IDs using a LEFT JOIN.",
      "Inspect the pipeline transformation logs and error quarantine table.",
      "Identify whether the 50 rows were dropped due to null keys, schema constraint failures, or network interrupts.",
      "Fix the root validation logic and safely reprocess the 50 quarantined records."
    ],
    "recommendedSql": "SELECT s.transaction_id\nFROM source_transactions s\nLEFT JOIN warehouse_transactions w ON s.transaction_id = w.transaction_id\nWHERE w.transaction_id IS NULL;",
    "interviewAnswer": "I would compare source and destination records to identify the specific missing transactions. Then I would inspect pipeline execution logs to determine whether the issue occurred during extraction, transformation, or loading. After identifying the cause, I would reprocess the affected records and validate final counts."
  },
  {
    "id": "scenario-7",
    "number": 7,
    "title": "Conflicting Supplier Status (Active vs Inactive)",
    "dimension": "Governance & Authoritative Sources",
    "description": "Procurement marks a supplier as 'Active', while Finance marks the same supplier as 'Inactive'.",
    "sampleData": [
      {
        "system": "Cross-System Conflict",
        "columns": [
          "system",
          "supplier_name",
          "recorded_status"
        ],
        "rows": [
          [
            "Procurement",
            "ABC Industrial Supplies",
            "Active"
          ],
          [
            "Finance",
            "ABC Industrial Supplies",
            "Inactive"
          ],
          [
            "Inventory",
            "ABC Industrial Supplies",
            "Active"
          ]
        ]
      }
    ],
    "problemStatement": "Orders are blocked because Finance flagged the supplier as Inactive for missing tax documents, even though Procurement approved them.",
    "investigationSteps": [
      "Check update timestamps to see which system changed the status most recently.",
      "Identify the Authoritative Source for vendor payment eligibility (Finance) vs operational ordering (Procurement).",
      "Coordinate between Procurement and Finance data stewards to resolve the business cause.",
      "Synchronize the agreed Golden Record status across all systems."
    ],
    "recommendedSql": "SELECT s.supplier_id, s.supplier_name, s.status FROM schneider_suppliers s;",
    "interviewAnswer": "I would identify the conflicting values and check data governance rules to determine which system is designated as the authoritative source for supplier status. I would verify timestamps and coordinate with the responsible data stewards before synchronizing the systems."
  }
];

export const SCHNEIDER_PRACTICUM_ACTIVITIES: SchneiderActivity[] = [
  {
    "id": "act-1",
    "number": 1,
    "title": "Find Missing Customer IDs",
    "description": "Identify transactions that cannot be associated with any customer due to NULL foreign keys.",
    "targetTable": "schneider_transactions",
    "starterSql": "-- Find transactions where customer_id is missing\nSELECT *\nFROM schneider_transactions\nWHERE ...;\n",
    "expectedSql": "SELECT *\nFROM schneider_transactions\nWHERE customer_id IS NULL;\n",
    "explanation": "WHERE customer_id IS NULL identifies orphaned transactions that lack customer attribution."
  },
  {
    "id": "act-2",
    "number": 2,
    "title": "Find Duplicate Transactions",
    "description": "Check for duplicate transaction IDs in the transactions dataset.",
    "targetTable": "schneider_transactions",
    "starterSql": "-- Find duplicated transaction_id records\nSELECT transaction_id, COUNT(*) AS total\nFROM schneider_transactions\nGROUP BY ...\nHAVING ...;\n",
    "expectedSql": "SELECT transaction_id, COUNT(*) AS total\nFROM schneider_transactions\nGROUP BY transaction_id\nHAVING COUNT(*) > 1;\n",
    "explanation": "GROUP BY with HAVING COUNT(*) > 1 identifies primary key or transaction reference collisions."
  },
  {
    "id": "act-3",
    "number": 3,
    "title": "Find Invalid Negative Amounts",
    "description": "Detect transactions with negative amount values that may violate standard sales rules.",
    "targetTable": "schneider_transactions",
    "starterSql": "-- Find records with negative sales amounts\nSELECT *\nFROM schneider_transactions\nWHERE ...;\n",
    "expectedSql": "SELECT *\nFROM schneider_transactions\nWHERE amount < 0;\n",
    "explanation": "WHERE amount < 0 flags negative amounts for investigation to distinguish valid refunds from data errors."
  },
  {
    "id": "act-4",
    "number": 4,
    "title": "Count Transactions by Status",
    "description": "Calculate the distribution of transactions across different status categories.",
    "targetTable": "schneider_transactions",
    "starterSql": "-- Group and count transactions by status\nSELECT status, COUNT(*) AS total_transactions\nFROM schneider_transactions\nGROUP BY ...;\n",
    "expectedSql": "SELECT status, COUNT(*) AS total_transactions\nFROM schneider_transactions\nGROUP BY status;\n",
    "explanation": "GROUP BY status provides insight into completed vs pending vs canceled transaction volumes."
  },
  {
    "id": "act-5",
    "number": 5,
    "title": "Calculate Completed Sales Total",
    "description": "Calculate total revenue by aggregating only completed sales transactions.",
    "targetTable": "schneider_transactions",
    "starterSql": "-- Sum amounts for completed transactions only\nSELECT SUM(amount) AS total_sales\nFROM schneider_transactions\nWHERE ...;\n",
    "expectedSql": "SELECT SUM(amount) AS total_sales\nFROM schneider_transactions\nWHERE status = 'COMPLETED';\n",
    "explanation": "Filtering with WHERE status = 'COMPLETED' ensures unconfirmed or pending orders do not inflate revenue."
  },
  {
    "id": "act-6",
    "number": 6,
    "title": "Find Customers with Multiple Transactions",
    "description": "Identify repeat customers and calculate their total transaction count and aggregate spend.",
    "targetTable": "schneider_transactions",
    "starterSql": "-- Find customers with more than 1 transaction\nSELECT customer_id, COUNT(*) AS transaction_count, SUM(amount) AS total_amount\nFROM schneider_transactions\nWHERE customer_id IS NOT NULL\nGROUP BY ...\nHAVING ...;\n",
    "expectedSql": "SELECT customer_id, COUNT(*) AS transaction_count, SUM(amount) AS total_amount\nFROM schneider_transactions\nWHERE customer_id IS NOT NULL\nGROUP BY customer_id\nHAVING COUNT(*) > 1;\n",
    "explanation": "HAVING COUNT(*) > 1 filters customer aggregates to only repeat purchasers."
  },
  {
    "id": "act-7",
    "number": 7,
    "title": "Clean Product Names (TRIM & UPPER)",
    "description": "Standardize product strings by removing leading/trailing spaces and converting to uppercase.",
    "targetTable": "schneider_transactions",
    "starterSql": "-- Standardize product text with TRIM and UPPER\nSELECT transaction_id, UPPER(TRIM(product)) AS standardized_product\nFROM schneider_transactions;\n",
    "expectedSql": "SELECT transaction_id, UPPER(TRIM(product)) AS standardized_product\nFROM schneider_transactions;\n",
    "explanation": "TRIM() eliminates irregular whitespace and UPPER() standardizes character casing for consistent grouping."
  },
  {
    "id": "act-8",
    "number": 8,
    "title": "Detect Orphaned Orders (Referential Integrity Check)",
    "description": "Find orders that reference a customer_id that does not exist in the customers table.",
    "targetTable": "schneider_orders",
    "starterSql": "-- Use LEFT JOIN to find orphaned orders with no matching customer\nSELECT o.*\nFROM schneider_orders o\nLEFT JOIN schneider_customers c ON o.customer_id = c.customer_id\nWHERE ...;\n",
    "expectedSql": "SELECT o.*\nFROM schneider_orders o\nLEFT JOIN schneider_customers c ON o.customer_id = c.customer_id\nWHERE c.customer_id IS NULL;\n",
    "explanation": "A LEFT JOIN followed by WHERE c.customer_id IS NULL is the industry-standard SQL pattern to detect referential integrity violations."
  }
];
